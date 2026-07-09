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
 * Usage:
 *   npx tsx scripts/backfill-board-photos.ts          # fill only missing photos
 *   npx tsx scripts/backfill-board-photos.ts --force  # overwrite all matches
 */
import './loadEnv';
import { createClient } from '@supabase/supabase-js';
import { ROSTER, portraitUrl, portraitAlt } from './board-roster';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.');
  process.exit(1);
}
const force = process.argv.includes('--force');
const sb = createClient(url, key, { auth: { persistSession: false } });

(async () => {
  let updated = 0, skipped = 0, missing = 0;
  for (const p of ROSTER) {
    const { data: row, error: findErr } = await sb
      .from('board_members')
      .select('id, image_url')
      .eq('name', p.name)
      .maybeSingle();
    if (findErr) { console.error(`✗ ${p.name}: ${findErr.message}`); continue; }
    if (!row) { console.log(`? not in table (run seed-board first): ${p.name}`); missing++; continue; }
    if (row.image_url && !force) { console.log(`· already has photo: ${p.name}`); skipped++; continue; }

    const { error } = await sb
      .from('board_members')
      .update({ image_url: portraitUrl(p.image), image_alt: portraitAlt(p.name) })
      .eq('id', row.id);
    if (error) console.error(`✗ ${p.name}: ${error.message}`);
    else { console.log(`✓ ${p.name} → ${portraitUrl(p.image)}`); updated++; }
  }
  console.log(`\nDone. ${updated} updated, ${skipped} skipped, ${missing} not found.`);
})().catch(err => { console.error(err); process.exit(1); });
