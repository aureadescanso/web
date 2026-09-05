# Herramientas

## generar-fichas.js — páginas de producto

Cada producto tiene su propia página escrita en el HTML:

    /colchones/nuvora-aurea
    /canapes/canape-nuvora-blanco
    /almohadas/almohada-nuvora
    …

Esos ficheros **no se editan a mano**. Se generan a partir del catálogo
que vive en `js/shop.js`, abriendo la ficha en un navegador de verdad y
guardando lo que el JavaScript ha montado. Así lo que lee Google es
exactamente lo que ve una persona, sin posibilidad de que se separen.

### Importante

**Después de tocar el catálogo hay que volver a generarlas.** Si cambias
un precio, una medida, una descripción o una foto en `js/shop.js` y no
regeneras, la página seguirá enseñando lo viejo al buscador y a quien
llegue con el JavaScript desactivado.

### Cómo se ejecuta

Hace falta un servidor sirviendo la web en `http://127.0.0.1:8137` y
Chrome instalado en la ruta habitual de Windows.

    node herramientas/generar-fichas.js

Escupe una línea por producto con el número de palabras y el titular,
para poder ver de un vistazo que ninguno ha salido vacío.

### Al añadir un producto nuevo

El identificador y su dirección tienen que estar en **tres** sitios, y
los tres han de coincidir:

- `RUTAS` en `js/shop.js`
- `RUTAS` en `netlify/functions/feed.js` (si no, Merchant Center manda
  a los compradores a una página que no existe)
- `RUTAS` en este generador

Y además: una regla en `_redirects` desde la dirección antigua, y la
línea correspondiente en `sitemap.xml`.
