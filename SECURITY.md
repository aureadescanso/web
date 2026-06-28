# Auditoría de seguridad — Aurea Descanso

Fecha: 2026-06-25 · Alcance: todo el proyecto (`C:\Users\Javi\web`)

> **Naturaleza del proyecto:** sitio **100 % estático** (HTML + CSS + JavaScript vanilla).
> No hay backend, base de datos, autenticación de servidor, API ni dependencias de terceros
> (`package.json`/`node_modules` inexistentes). Esto determina qué áreas aplican y cuáles no.

---

## 1. Resumen ejecutivo

El sitio es estático y, en líneas generales, **limpio**: no hay secretos hardcodeados, no
realiza llamadas de red a APIs, no carga scripts de terceros ni trackers, y no usa
dependencias con CVE. La mayoría de vectores clásicos (SQLi, NoSQLi, RLS, CORS de servidor,
escalada de privilegios) **no aplican** por no existir backend.

Los riesgos reales encontrados son:

- **(ALTA)** El checkout recoge **datos de tarjeta (PAN, caducidad, CVC)** y datos personales,
  pero el pago está **simulado** y no hay pasarela PCI. Recoger tarjetas sin un proveedor de
  pago conforme es un riesgo legal y de datos. **Requiere decisión de negocio** (no se toca de
  forma automática para no romper el flujo actual).
- **(MEDIA)** Faltaban **cabeceras de seguridad** (CSP, anti-clickjacking, nosniff, HSTS,
  Referrer-Policy). → **Corregido**.
- **(BAJA)** Render con `innerHTML` de datos que pasan por `localStorage` (carrito): solo
  permite *self-XSS*, pero se ha añadido escapado por defensa en profundidad. → **Corregido**.
- **(BAJA)** Higiene: `.gitignore` no cubría `.env`/dependencias; restos temporales. → **Corregido**.

---

## 2. Lista priorizada de vulnerabilidades

| # | Severidad | Hallazgo | Estado |
|---|-----------|----------|--------|
| 1 | **ALTA** | Checkout captura tarjeta (PAN/CVC) + PII con pago simulado y sin pasarela PCI | **Recomendación** (requiere proveedor de pago) |
| 2 | **MEDIA** | Sin Content-Security-Policy ni cabeceras de seguridad | **Corregido** |
| 3 | **MEDIA** | Sin protección anti-clickjacking (`X-Frame-Options`/`frame-ancestors`) | **Corregido** (vía `_headers`/`.htaccess`) |
| 4 | **BAJA** | `innerHTML` con campos del carrito (origen `localStorage`) → self-XSS | **Corregido** (escapado) |
| 5 | **BAJA** | `.gitignore` no ignora `.env`, `node_modules`, temporales | **Corregido** |
| 6 | **BAJA** | Carpeta temporal `images/_d/` en el árbol | **Eliminada** |
| 7 | INFO | Fuentes Google y fotos Unsplash cargadas desde terceros | Permitidas en CSP; ver recomendaciones |

### Áreas del checklist que **no aplican** (y por qué)

| Área solicitada | Aplica | Motivo |
|-----------------|--------|--------|
| Rate limiting de servidor | ❌ | No hay endpoints de servidor. (Aplicar cuando se añada pasarela/back.) |
| API keys / secretos | ✅ revisado | **0 secretos** hardcodeados encontrados. |
| SQL / NoSQL injection | ❌ | No hay base de datos ni consultas. |
| XSS / sanitización | ✅ | Endurecido (ver #4). Sin `dangerouslySetInnerHTML` (no hay React). |
| Validación de inputs | ⚠️ parcial | Solo cliente (no hay servidor que validar). El checkout ya valida tarjeta (Luhn), email, caducidad y obligatorios. |
| Row Level Security | ❌ | No hay datos por usuario/tenant. |
| CORS de backend | ❌ | No hay API server. |
| Variables de entorno | ❌ | No hay build ni entorno de servidor. La única "config" (código `AUREA10`, precios) es pública por naturaleza en cliente. |
| Auth / autorización | ❌ | No hay login, sesiones, JWT ni roles. Carrito anónimo en `localStorage`. |
| Errores / logs | ✅ | No se exponen stack traces; no se loguean datos sensibles. |
| Dependencias | ✅ | **0 dependencias** de terceros. |

---

## 3. Archivos modificados

- `css/shop.css` — (cambios previos del modelo 3D; sin impacto de seguridad aquí).
- `js/cart.js` — escapado HTML en el render del carrito.
- `js/shop.js` — escapado HTML en el render del checkout + corrección de referencia de imagen.
- **21 archivos `.html`** (raíz + `blog/`) — meta `Content-Security-Policy` y `Referrer-Policy`.
- `.gitignore` — añadidos `.env*`, `node_modules/`, temporales, ficheros de SO.

### Archivos nuevos

- `_headers` — cabeceras de seguridad para Netlify / Cloudflare Pages.
- `.htaccess` — cabeceras de seguridad para Apache (inofensivo en otros hosts).
- `SECURITY.md` — este documento.

---

## 4. Cambios implementados (detalle)

1. **Content-Security-Policy** (meta en cada HTML + cabecera en `_headers`/`.htaccess`):
   permite solo `self`, Google Fonts (`fonts.googleapis.com`/`fonts.gstatic.com`) y fotos
   `images.unsplash.com`; bloquea `object-src`, restringe `base-uri`, `form-action`,
   `frame-ancestors 'none'` y `upgrade-insecure-requests`. Verificado: **0 violaciones** y
   render intacto en home, producto (modelo 3D), checkout y blog.
2. **Cabeceras adicionales** (`_headers`/`.htaccess`): `X-Frame-Options: DENY`,
   `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
   `Permissions-Policy` (desactiva geolocalización, cámara, micrófono, usb, topics),
   `Strict-Transport-Security` y `Cross-Origin-Opener-Policy: same-origin`.
3. **Escapado anti-XSS**: nueva función `esc()` en `cart.js` y `shop.js` aplicada a
   `name`, `sizeLabel` e `img` de las líneas del carrito/checkout (origen `localStorage`).
4. **`.gitignore`** endurecido para no subir nunca `.env` ni dependencias.
5. **Limpieza**: eliminada `images/_d/` (HTML/PNG de pruebas).
6. **Corrección**: `images[0]` del Mouth Tape apuntaba a un archivo renombrado; ajustado a
   `images/mt-face-front.png`.

---

## 5. Variables de entorno nuevas o modificadas

**Ninguna.** El sitio es estático y no tiene proceso de servidor ni build; no existen
variables de entorno. No se crea `.env.example` porque sería un artefacto vacío y engañoso.
La única "configuración" que vive en cliente (código de descuento `AUREA10`, precios del
catálogo en `js/shop.js`) es **pública por diseño** y no constituye un secreto.

> Cuando se integre una pasarela de pago o un backend, **ahí sí** habrá secretos
> (claves de API del PSP) que deberán ir en variables de entorno del servidor, nunca en el
> cliente, con su `.env.example` correspondiente.

---

## 6. Pasos para probar que todo funciona

1. Servir el sitio por HTTP (las cabeceras `?` y la CSP funcionan igual; con `file://` no se
   evalúan cabeceras). Por ejemplo, cualquier servidor estático en la raíz del proyecto.
2. Abrir `index.html`, `producto.html?m=mouth-tape`, `checkout.html?m=serenity&size=2` y un
   artículo del blog.
3. En **DevTools → Console**: no debe aparecer ningún error de *Content Security Policy*.
4. Comprobar que cargan **fuentes** (Playfair/Inter), **imágenes** y el **modelo 3D** del
   Mouth Tape, y que el **carrito/checkout** renderiza las líneas.
5. En **DevTools → Network → (documento) → Headers**: verificar que llegan `Content-Security-Policy`,
   `X-Frame-Options`, `X-Content-Type-Options`, etc. (requiere desplegar en Netlify/Cloudflare/Apache;
   en local dependerá del servidor que uses).

Verificación ya realizada en esta auditoría: render correcto y **sin violaciones de CSP** en las
cuatro páginas representativas.

---

## 7. Checklist final de seguridad

- [x] Sin secretos/API keys hardcodeados.
- [x] Sin llamadas de red a APIs ni trackers de terceros.
- [x] Sin dependencias vulnerables (no hay dependencias).
- [x] CSP estricta y verificada (sin `unsafe-inline` en scripts).
- [x] Anti-clickjacking, nosniff, Referrer-Policy, Permissions-Policy, HSTS, COOP.
- [x] `target="_blank"` con `rel="noopener noreferrer"` en todos los enlaces.
- [x] Escapado de datos del carrito antes de `innerHTML`.
- [x] `.gitignore` cubre `.env`, dependencias y temporales.
- [x] Sin restos temporales en el árbol del sitio.
- [ ] **Pasarela de pago PCI** para el checkout (pendiente, decisión de negocio).

---

## 8. Recomendaciones adicionales para producción

1. **Pasarela de pago (prioritario).** No recojas tarjetas en tu página. Integra un proveedor
   con campos alojados o redirección (**Stripe Checkout**, **Redsys**, o **Bizum** vía PSP),
   de modo que el PAN/CVC **nunca** toquen tu dominio. Mientras tanto, considera marcar el
   checkout como demo o deshabilitar el envío del formulario en producción.
   - Si lo integras, añade entonces: validación **en servidor**, **rate limiting** en el
     endpoint de pago/webhook, verificación de **firma de webhooks**, y `.env` con las claves.
2. **Despliegue de cabeceras.** Asegúrate de que el host aplica `_headers` (Netlify/Cloudflare)
   o `.htaccess` (Apache). Para **Nginx**, traslada las mismas directivas a `add_header`.
   Fuerza **HTTPS** y considera enviar el dominio a la lista **HSTS preload** una vez estable.
3. **Privacidad/GDPR.** Las fuentes de Google y las fotos de Unsplash se cargan desde terceros
   (transmiten IP del visitante). Para cumplimiento estricto, **autohospeda** las fuentes y las
   imágenes; así podrás endurecer la CSP a solo `self`.
4. **Formularios.** El formulario de lista de espera usa `mailto:` (sin servidor). Si quieres
   recoger esos correos de forma fiable, usa un servicio de formularios con protección
   anti-spam (honeypot/captcha) y rate limiting.
5. **Revisiones periódicas.** Reejecuta esta auditoría tras cualquier cambio que introduzca
   backend, autenticación, pagos o scripts de terceros.
