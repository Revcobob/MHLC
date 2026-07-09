/*
 * Restore board member portraits that were dropped when the foundation page
 * moved from static HTML to the CMS-driven board_members table. The original
 * seed inserted only name/title/bio, so existing rows have a null image_url
 * and their cards render without a photo.
 *
 * This walks the shared roster and, for each person matched by name, sets
 * image_url to their committed portrait (/assets/board-<slug>-web.jpg) and a
 * descriptive image_alt. Idempotent and safe to re-run.
 *
 * By default it only fills rows whose image_url is empty, so photos edited by
 * hand in the admin are left untouched. Pass --force to overwrite every match.
 *
 * Talks to Supabase's PostgREST endpoint directly with the built-in fetch, so
 * it has no runtime dependency on @supabase/supabase-js and works on any Node
 * version (avoids the realtime-js native-WebSocket requirement on Node < 22).
 *
 * Usage:
 *   npx tsx scripts/backfill-board-photos.ts          # fill only missing photos
 *   npx tsx scripts/backfill-board-photos.ts --force  # overwrite all matches
 */
import './loadEnv';
import { ROSTER, portraitUrl, portraitAlt } from './board-roster';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.');
  process.exit(1);
}
const force = process.argv.includes('--force');
const base = `${url.replace(/\/$/, '')}/rest/v1/board_members`;
const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

interface Row { id: string; image_url: string | null }

async function findByName(name: string): Promise<Row[]> {
  const res = await fetch(`${base}?name=eq.${encodeURIComponent(name)}&select=id,image_url`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
  return res.json() as Promise<Row[]>;
}

async function setPhoto(id: string, image: string, name: string): Promise<void> {
  const res = await fetch(`${base}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ image_url: portraitUrl(image), image_alt: portraitAlt(name) })
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
}

(async () => {
  let updated = 0, skipped = 0, missing = 0;
  for (const p of ROSTER) {
    try {
      const rows = await findByName(p.name);
      if (rows.length === 0) { console.log(`? not in table (run seed-board first): ${p.name}`); missing++; continue; }
      for (const row of rows) {
        if (row.image_url && !force) { console.log(`· already has photo: ${p.name}`); skipped++; continue; }
        await setPhoto(row.id, p.image, p.name);
        console.log(`✓ ${p.name} → ${portraitUrl(p.image)}`);
        updated++;
      }
    } catch (err) {
      console.error(`✗ ${p.name}: ${(err as Error).message}`);
    }
  }
  console.log(`\nDone. ${updated} updated, ${skipped} skipped, ${missing} not found.`);
})().catch(err => { console.error(err); process.exit(1); });
