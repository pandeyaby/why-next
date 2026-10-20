/* Tiny static server with gzip, like GitHub Pages, for local Lighthouse runs.
   Usage: node scripts/serve_static.cjs [root=.] [port=8765] */
const http = require('http'), fs = require('fs'), path = require('path'), zlib = require('zlib');
const root = path.resolve(process.argv[2] || '.'), port = +(process.argv[3] || 8765);
const T = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end('not found') }
  const type = T[path.extname(p)] || 'application/octet-stream', body = fs.readFileSync(p);
  const gz = /gzip/.test(req.headers['accept-encoding'] || '') && /text|json|svg/.test(type);
  res.writeHead(200, { 'content-type': type, 'cache-control': 'max-age=600', ...(gz ? { 'content-encoding': 'gzip' } : {}) });
  res.end(gz ? zlib.gzipSync(body, { level: 9 }) : body);
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
