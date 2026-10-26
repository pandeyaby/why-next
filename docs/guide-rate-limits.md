# Live AI Guide rate limits (shared store)

`api/guide.js` limits each IP to 6 requests a minute and 60 a day, and all users to 800 a day. The limits are
enforced in two places:

1. An in-memory limiter in each warm function instance. It is cheap and stops bursts before any network call.
2. A shared limiter in Why Next's own Supabase project (`why-next`, ref `etzqrmcwnxpbysnltdxt`, free tier). Every
   Vercel instance calls one Postgres function, so the counts hold across instances and cold starts.

It fails closed. If the shared store is not configured, does not answer within 2.5 s, or returns an error, the proxy
answers 503 and the browser falls back to the offline Guide. Only local dev and unit tests may set `WN_RL_MEMORY=1`
to run on the in-memory limiter alone.

## Environment (Vercel, Preview only)

| Variable | Value |
| --- | --- |
| `WN_RL_URL` | `https://etzqrmcwnxpbysnltdxt.supabase.co` |
| `WN_RL_KEY` | the project's publishable key (public by design) |
| `WN_RL_SECRET` | a random shared secret; the database stores only its SHA-256 |

## Database objects (migration `guide_rate_limits`)

- Schema `guide_rl`, which the Data API does not expose: tables `hits (k, at)`, `days (day, n)` and `secret (h)`, all
  with RLS on and no policies.
- `public.guide_rate_hit(p_key, p_secret, p_per_min, p_per_day, p_global)` is `SECURITY DEFINER` and executable by
  `anon`. It rejects calls whose secret hash does not match. It locks today's global row and the caller's key, then
  returns `ok`, `minute`, `day` or `busy`, and records the hit only on `ok`. About 2% of calls prune hits older
  than 2 days.
- `p_key` is a salted SHA-256 of the IP (salted with the secret), so raw IPs never leave Vercel.

To rotate the secret, run `update guide_rl.secret set h = encode(extensions.digest('<new>', 'sha256'), 'hex');` and
set `WN_RL_SECRET` to the new value.
