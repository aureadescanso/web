/* =============================================
   GENERAR FACTURA PDF
   =============================================
   POST /.netlify/functions/generar-factura
   Body: {referencia, email, nombre, direccion, items, total, fecha}
   Devuelve: PDF descargable o URL para descargar
   ============================================= */

const PDFDocument = require('pdfkit');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'POST only' };
  }

  let datos;
  try {
    datos = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: 'JSON inválido' };
  }

  const { referencia, nombre, direccion, items, total, email, fecha } = datos;

  if (!referencia || !nombre || !items || !total) {
    return { statusCode: 400, body: 'Faltan datos obligatorios' };
  }

  try {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const chunks = [];

    doc.on('data', function (chunk) { chunks.push(chunk); });
    doc.on('end', function () {});

    /* Cabecera */
    doc.fontSize(24).font('Helvetica-Bold').text('Nuvora Descanso', 40, 40);
    doc.fontSize(10).font('Helvetica').text('Descanso diseñado y fabricado en España', 40, 70);
    doc.text('nuvoradescanso@gmail.com | https://nuvoradescanso.com', 40, 85);

    /* Factura */
    doc.fontSize(16).font('Helvetica-Bold').text('FACTURA', 400, 50);
    doc.fontSize(10).font('Helvetica');
    doc.text('Referencia: ' + referencia, 400, 80);
    doc.text('Fecha: ' + fecha, 400, 95);

    /* Cliente */
    doc.fontSize(12).font('Helvetica-Bold').text('CLIENTE', 40, 140);
    doc.fontSize(10).font('Helvetica');
    doc.text(nombre, 40, 160);
    doc.text(direccion, 40, 175);
    doc.text('Email: ' + email, 40, 190);

    /* Tabla de artículos */
    doc.fontSize(11).font('Helvetica-Bold').text('CONCEPTO', 40, 230);
    doc.text('CANTIDAD', 250, 230);
    doc.text('PRECIO', 380, 230);
    doc.text('TOTAL', 480, 230);

    doc.moveTo(40, 245).lineTo(550, 245).stroke();

    let y = 260;
    doc.fontSize(10).font('Helvetica');
    items.forEach(function (item) {
      const linea = item.split(' — ');
      const desc = linea[0] || '';
      const precio = linea[1] || '';
      doc.text(desc, 40, y, { width: 200 });
      doc.text('1', 250, y);
      doc.text(precio, 380, y);
      doc.text(precio, 480, y);
      y += 30;
    });

    doc.moveTo(40, y).lineTo(550, y).stroke();
    y += 20;

    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('TOTAL: ' + total, 400, y);

    /* Pie */
    doc.fontSize(9).font('Helvetica').fillColor('#666');
    doc.text('Gracias por tu confianza. 100 noches de prueba. 5 años de garantía.', 40, 700, { align: 'center' });

    doc.end();

    /* Esperar a que termine de escribir */
    await new Promise(function (resolve) {
      doc.on('end', resolve);
    });

    const buffer = Buffer.concat(chunks);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="factura-' + referencia + '.pdf"'
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };

  } catch (err) {
    console.error('Error generando PDF:', err);
    return { statusCode: 500, body: 'Error generando factura: ' + err.message };
  }
};
