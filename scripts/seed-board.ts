/*
 * Seed the existing foundation roster into board_members. Idempotent —
 * skips anyone already in the table by name.
 *
 * Usage: npx tsx scripts/seed-board.ts
 *
 * Note: this only inserts people who aren't in the table yet. To restore or
 * refresh photos on rows that already exist, run scripts/backfill-board-photos.ts.
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
const sb = createClient(url, key, { auth: { persistSession: false } });

(async () => {
  for (let i = 0; i < ROSTER.length; i++) {
    const p = ROSTER[i]!;
    const { data: existing } = await sb.from('board_members').select('id').eq('name', p.name).maybeSingle();
    if (existing) { console.log(`· already present: ${p.name}`); continue; }
    const { error } = await sb.from('board_members').insert({
      name: p.name, title: p.title, category: p.category, bio: p.bio,
      image_url: portraitUrl(p.image), image_alt: portraitAlt(p.name),
      order_index: i, published: true
    });
    if (error) console.error(`✗ ${p.name}: ${error.message}`);
    else console.log(`✓ ${p.name}`);
  }
  console.log('Done.');
})().catch(err => { console.error(err); process.exit(1); });
