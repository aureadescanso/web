/* Servidor local para ver y probar la web en el ordenador.
 *
 *   node herramientas/servidor.js        → http://127.0.0.1:8137
 *
 * Imita lo que hace Netlify, para que lo que funciona aquí funcione
 * publicado:
 *   · las direcciones sin .html (/colchones sirve colchones.html)
 *   · las redirecciones 301 de _redirects, incluidas las que dependen
 *     de un parámetro (/producto.html?m=aurea → /colchones/nuvora-aurea)
 *
 * Lo que NO hace: ejecutar las funciones de netlify/functions. Las
 * llamadas a /.netlify/functions/... devuelven 404. Para probarlas hay
 * que llamarlas desde Node o publicar.
 *
 * Lo necesita herramientas/generar-fichas.js, que abre las fichas en un
 * navegador a través de este servidor.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const PUERTO = parseInt(process.env.PUERTO || '8137', 10);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml',
  '.mp4': 'video/mp4', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};

/* Reglas de _redirects. Dos formas:
     /origen            /destino   301!
     /origen   m=valor  /destino   301!   (condicionada a un parámetro) */
const REGLAS = [];
try {
  fs.readFileSync(path.join(RAIZ, '_redirects'), 'utf8').split('\n').forEach(function (linea) {
    const l = linea.trim();
    if (!l || l.charAt(0) === '#') return;
    const p = l.split(/\s+/);
    if (p.length === 3 && /^301!?$/.test(p[2])) REGLAS.push({ de: p[0], a: p[1] });
    else if (p.length === 4 && /^301!?$/.test(p[3]) && p[1].indexOf('=') > 0) {
      const kv = p[1].split('=');
      REGLAS.push({ de: p[0], param: kv[0], valor: kv[1], a: p[2] });
    }
  });
} catch (e) {}

http.createServer(function (req, res) {
  const url = new URL(req.url, 'http://localhost');
  let ruta = decodeURIComponent(url.pathname);

  /* Primero las redirecciones, igual que Netlify con el 301! */
  for (const r of REGLAS) {
    if (r.de !== ruta) continue;
    if (r.param && url.searchParams.get(r.param) !== r.valor) continue;
    /* Netlify arrastra los parámetros que no ha usado para casar la regla */
    const resto = new URLSearchParams(url.search);
    if (r.param) resto.delete(r.param);
    const q = resto.toString();
    res.writeHead(301, { Location: r.a + (q ? '?' + q : '') });
    return res.end();
  }

  if (ruta === '/') ruta = '/index.html';
  let fichero = path.join(RAIZ, ruta);
  if (!fichero.startsWith(RAIZ)) { res.writeHead(403); return res.end('no'); }
  /* Dirección sin extensión → su .html, como hace Netlify */
  if (!path.extname(ruta) && fs.existsSync(fichero + '.html')) fichero += '.html';

  fs.readFile(fichero, function (err, datos) {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('404 ' + ruta); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(fichero).toLowerCase()] || 'application/octet-stream' });
    res.end(datos);
  });
}).listen(PUERTO, '127.0.0.1', function () {
  console.log('Web en http://127.0.0.1:' + PUERTO + '/  (' + REGLAS.length + ' redirecciones cargadas)');
});
