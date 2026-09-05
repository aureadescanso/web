/* Genera una página propia por producto.
 *
 * Hasta ahora todas las fichas eran producto.html?m=algo: una plantilla
 * vacía que rellenaba el JavaScript. Un rastreador veía 155 palabras,
 * sin título propio, sin canonical y sin datos estructurados,
 * justamente en las páginas donde se vende.
 *
 * En vez de reescribir a mano el contenido de cada producto —que sería
 * duplicar la lógica del catálogo y condenarla a desincronizarse— se
 * abre la ficha en un navegador de verdad, se deja que el JavaScript
 * haga su trabajo y se guarda el resultado ya montado. Así lo que ve
 * Google es exactamente lo que ve una persona, sin margen de que se
 * separen.
 */
const { spawn } = require('child_process');
const fs = require('fs'); const os = require('os'); const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9751;
const RAIZ = path.resolve(__dirname, '..');
const BASE = 'http://127.0.0.1:8137';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const RUTAS = {
  'supreme':                '/colchones/nuvora-supreme',
  'aurea':                  '/colchones/nuvora-aurea',
  'aurea-muelles':          '/colchones/nuvora-aurea-muelles',
  'canape-nuvora-blanco':   '/canapes/canape-nuvora-blanco',
  'canape-nuvora-cambrian': '/canapes/canape-nuvora-cambrian',
  'canape-nuvora-wengue':   '/canapes/canape-nuvora-wengue',
  'almohada-nuvora':        '/almohadas/almohada-nuvora',
  'almohada-nuvora-tencel': '/almohadas/almohada-nuvora-tencel'
};

/* La plantilla vive en la raíz y las fichas cuelgan de /colchones/,
   /canapes/ y /almohadas/. Los enlaces relativos a hojas de estilo,
   guiones e iconos apuntarían dentro de esa carpeta, así que se pasan a
   absolutos desde la raíz. */
function rutasAbsolutas(html) {
  return html
    .replace(/(href|src)="(?!https?:|\/|#|data:|mailto:|tel:)([^"]+)"/g, '$1="/$2"');
}

async function main() {
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'nv-gen-'));
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + prof, 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 60 && !list; i++) { await sleep(300);
    try { list = await (await fetch('http://127.0.0.1:' + PORT + '/json/list')).json(); } catch (e) {} }
  const ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pe = new Map(); const errores = [];
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && pe.has(m.id)) { pe.get(m.id)(m.result); pe.delete(m.id); return; }
    if (m.method === 'Runtime.exceptionThrown') errores.push(m.params.exceptionDetails.text || 'error');
  });
  const send = (me, p) => new Promise(r => { const i = ++id; pe.set(i, r); ws.send(JSON.stringify({ id: i, method: me, params: p || {} })); });
  const ev = async x => (await send('Runtime.evaluate', { expression: x, returnByValue: true })).result.value;
  await send('Page.enable'); await send('Runtime.enable');

  const plantilla = fs.readFileSync(path.join(RAIZ, 'producto.html'), 'utf8').replace(/^\uFEFF/, '');

  for (const pid of Object.keys(RUTAS)) {
    errores.length = 0;
    await send('Page.navigate', { url: BASE + '/producto.html?m=' + pid });
    await sleep(3000);

    /* Lo que el navegador ha construido */
    const datos = await ev(`(function(){
      var g = function(sel, attr){ var e=document.querySelector(sel); return e ? e.getAttribute(attr) : ''; };
      var root = document.getElementById('pdpRoot');
      var esquema = document.getElementById('pdpSchema');
      return JSON.stringify({
        titulo:  document.title,
        desc:    g('meta[name="description"]','content'),
        ogT:     g('meta[property="og:title"]','content'),
        ogD:     g('meta[property="og:description"]','content'),
        ogImg:   g('meta[property="og:image"]','content'),
        esquema: esquema ? esquema.textContent : '',
        cuerpo:  root ? root.innerHTML : '',
        h1:      (document.querySelector('h1')||{}).textContent || '',
        palabras: (root ? root.innerText : '').trim().split(/\\s+/).length
      });
    })()`);
    const d = JSON.parse(datos);
    if (!d.cuerpo || !d.h1.trim()) { console.log('X ' + pid + ': no ha renderizado'); continue; }
    if (errores.length) { console.log('X ' + pid + ': ' + errores[0].slice(0, 80)); continue; }

    const ruta = RUTAS[pid];
    const canonica = 'https://nuvoradescanso.com' + ruta;

    /* Cabecera: se sustituyen los marcadores de la plantilla por lo que
       corresponde a este producto, y se añaden canonical y datos
       estructurados, que antes solo existían tras ejecutar el guion. */
    let h = plantilla
      .replace(/<title>[^<]*<\/title>/,
        '<title>' + d.titulo + '</title>')
      .replace(/(<meta name="description" content=")[^"]*(">)/,
        '$1' + d.desc + '$2')
      .replace(/(<meta property="og:title" content=")[^"]*(">)/,
        '$1' + d.ogT + '$2')
      .replace(/(<meta property="og:description" content=")[^"]*(">)/,
        '$1' + d.ogD + '$2')
      .replace(/(<meta property="og:image" content=")[^"]*(">)/,
        '$1' + d.ogImg + '$2')
      .replace(/(<meta name="description")/,
        '<link rel="canonical" href="' + canonica + '">\n  $1')
      .replace(/(<meta name="twitter:card")/,
        '<meta property="og:url" content="' + canonica + '">\n  $1');

    /* Datos estructurados del producto, ya escritos */
    if (d.esquema) {
      h = h.replace(/(<link rel="stylesheet" href="css\/styles\.css">)/,
        '<script type="application/ld+json" id="pdpSchema">' + d.esquema + '</script>\n  $1');
    }

    /* Cuerpo de la ficha, ya montado. El identificador va en el HTML
       para que shop.js sepa qué producto es sin necesidad del ?m= */
    h = h.replace(/(<main class="pdp" id="pdpRoot")([^>]*)>[\s\S]*?<\/main>/,
      '$1 data-producto="' + pid + '"$2>\n' + d.cuerpo + '\n  </main>');

    h = rutasAbsolutas(h);

    const destino = path.join(RAIZ, ruta.replace(/^\//, '') + '.html');
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, h);
    console.log('· ' + ruta.padEnd(38) + String(d.palabras).padStart(4) + ' palabras · ' + d.h1.trim());
  }

  ws.close(); chrome.kill(); await sleep(300);
  try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) {}
}
main().catch(e => { console.error('ERROR', e.message); process.exit(1); });
