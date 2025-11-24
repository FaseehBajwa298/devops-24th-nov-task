const http = require('http');

function check() {
  return new Promise((resolve) => {
    http.get({ host: 'localhost', port: 3000, path: '/health', timeout: 2000 }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ ok: res.statusCode === 200, body: data }));
    }).on('error', () => resolve({ ok: false }));
  });
}

(async () => {
  const r = await check();
  if (r.ok) console.log('OK - API reachable', r.body);
  else { console.error('FAIL - API not reachable'); process.exit(1); }
})();
