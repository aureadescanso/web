/* =============================================
   NUVORA DESCANSO — Multidioma (i18n)
   ES · EN · IT · FR · DE  ·  sin dependencias
   Traduce los elementos con [data-i18n] / [data-i18n-ph]
   ============================================= */
(function () {
  'use strict';
  var KEY = 'nuvora_lang';
  var SUPPORTED = ['es', 'en', 'it', 'fr', 'de'];
  /* Metadatos de cada idioma (código · nombre nativo · clase de bandera) */
  var LANGS = [
    { code: 'es', name: 'Español',  flag: 'flag--es' },
    { code: 'en', name: 'English',  flag: 'flag--en' },
    { code: 'it', name: 'Italiano', flag: 'flag--it' },
    { code: 'fr', name: 'Français', flag: 'flag--fr' },
    { code: 'de', name: 'Deutsch',  flag: 'flag--de' }
  ];
  function meta(code) {
    for (var i = 0; i < LANGS.length; i++) { if (LANGS[i].code === code) return LANGS[i]; }
    return LANGS[0];
  }

  var DICT = {
    es: {
      'nav.colchones': 'Colchones',
      'nav.canapes': 'Canapés',
      'nav.complementos': 'Complementos',
      'nav.blog': 'Blog',
      'nav.contacto': 'Contacto',
      'nav.inicio': 'Inicio',
      'nav.comprar': 'Comprar',
      'hero.title': 'Duerme como nunca.',
      'hero.sub': 'Colchones diseñados para transformar tu descanso',
      'hero.cta1': 'Descubre nuestros colchones',
      'hero.cta2': 'Ver canapés',
      'hero.t1': 'Envío gratis 3–5 días',
      'hero.t2': '100 noches de prueba',
      'hero.t3': '5 años de garantía',
      'home.products': 'Nuestros colchones',
      'home.allsizes': 'Ver todos los detalles y medidas',
      'footer.legal': 'Aviso legal',
      'footer.privacy': 'Privacidad',
      'footer.cookies': 'Cookies',
      'footer.terms': 'Condiciones de venta',
      'footer.contact': 'Contacto',
      'footer.claim': 'Descanso diseñado y fabricado en España. 100 noches de prueba y 5 años de garantía.',
      'footer.shop': 'Comprar',
      'footer.help': 'Ayuda',
      'footer.guides': 'Guías de descanso',
      'footer.shipping': 'Envíos y devoluciones',
      'cart.title': 'Tu cesta',
      'cart.empty': 'Tu cesta está vacía.',
      'cart.emptysub': 'El buen descanso te espera.',
      'cart.shop': 'Ver colchones',
      'cart.total': 'Total (envío incluido)',
      'cart.checkout': 'Tramitar pedido',
      'cart.continue': 'Seguir comprando',
      'cart.remove': 'Eliminar',
      'cart.gift': 'Regalo por tu colchón · Valorado en 10 €'
    },
    en: {
      'nav.colchones': 'Mattresses',
      'nav.canapes': 'Storage beds',
      'nav.complementos': 'Accessories',
      'nav.blog': 'Blog',
      'nav.contacto': 'Contact',
      'nav.inicio': 'Home',
      'nav.comprar': 'Shop',
      'hero.title': 'Sleep like never before.',
      'hero.sub': 'Mattresses designed to transform your rest',
      'hero.cta1': 'Discover our mattresses',
      'hero.cta2': 'See storage beds',
      'hero.t1': 'Free shipping 3–5 days',
      'hero.t2': '100-night trial',
      'hero.t3': '5-year warranty',
      'home.products': 'Our mattresses',
      'home.allsizes': 'See all details and sizes',
      'footer.legal': 'Legal notice',
      'footer.privacy': 'Privacy',
      'footer.cookies': 'Cookies',
      'footer.terms': 'Terms of sale',
      'footer.contact': 'Contact',
      'footer.claim': 'Rest designed and made in Spain. 100-night trial and a 5-year warranty.',
      'footer.shop': 'Shop',
      'footer.help': 'Help',
      'footer.guides': 'Sleep guides',
      'footer.shipping': 'Shipping & returns',
      'cart.title': 'Your cart',
      'cart.empty': 'Your cart is empty.',
      'cart.emptysub': 'A great night of sleep awaits.',
      'cart.shop': 'See mattresses',
      'cart.total': 'Total (shipping included)',
      'cart.checkout': 'Checkout',
      'cart.continue': 'Continue shopping',
      'cart.remove': 'Remove',
      'cart.gift': 'Gift with your mattress · Worth €10'
    },
    it: {
      'nav.colchones': 'Materassi',
      'nav.canapes': 'Sommier contenitore',
      'nav.complementos': 'Accessori',
      'nav.blog': 'Blog',
      'nav.contacto': 'Contatti',
      'nav.inicio': 'Home',
      'nav.comprar': 'Acquista',
      'hero.title': 'Dormi come mai prima.',
      'hero.sub': 'Materassi pensati per trasformare il tuo riposo',
      'hero.cta1': 'Scopri i nostri materassi',
      'hero.cta2': 'Vedi i sommier',
      'hero.t1': 'Spedizione gratis 3–5 giorni',
      'hero.t2': '100 notti di prova',
      'hero.t3': '5 anni di garanzia',
      'home.products': 'I nostri materassi',
      'home.allsizes': 'Vedi tutti i dettagli e le misure',
      'footer.legal': 'Note legali',
      'footer.privacy': 'Privacy',
      'footer.cookies': 'Cookie',
      'footer.terms': 'Condizioni di vendita',
      'footer.contact': 'Contatti',
      'footer.claim': 'Riposo progettato e prodotto in Spagna. 100 notti di prova e 5 anni di garanzia.',
      'footer.shop': 'Acquista',
      'footer.help': 'Assistenza',
      'footer.guides': 'Guide al riposo',
      'footer.shipping': 'Spedizioni e resi',
      'cart.title': 'Il tuo carrello',
      'cart.empty': 'Il tuo carrello è vuoto.',
      'cart.emptysub': 'Un ottimo riposo ti aspetta.',
      'cart.shop': 'Vedi i materassi',
      'cart.total': 'Totale (spedizione inclusa)',
      'cart.checkout': 'Procedi all’ordine',
      'cart.continue': 'Continua lo shopping',
      'cart.remove': 'Rimuovi',
      'cart.gift': 'Omaggio con il materasso · Valore 10 €'
    },
    fr: {
      'nav.colchones': 'Matelas',
      'nav.canapes': 'Sommiers coffre',
      'nav.complementos': 'Accessoires',
      'nav.blog': 'Blog',
      'nav.contacto': 'Contact',
      'nav.inicio': 'Accueil',
      'nav.comprar': 'Acheter',
      'hero.title': 'Dormez comme jamais.',
      'hero.sub': 'Des matelas conçus pour transformer votre repos',
      'hero.cta1': 'Découvrez nos matelas',
      'hero.cta2': 'Voir les sommiers',
      'hero.t1': 'Livraison gratuite 3–5 jours',
      'hero.t2': '100 nuits d’essai',
      'hero.t3': '5 ans de garantie',
      'home.products': 'Nos matelas',
      'home.allsizes': 'Voir tous les détails et tailles',
      'footer.legal': 'Mentions légales',
      'footer.privacy': 'Confidentialité',
      'footer.cookies': 'Cookies',
      'footer.terms': 'Conditions de vente',
      'footer.contact': 'Contact',
      'footer.claim': 'Un sommeil conçu et fabriqué en Espagne. 100 nuits d’essai et 5 ans de garantie.',
      'footer.shop': 'Acheter',
      'footer.help': 'Aide',
      'footer.guides': 'Guides du sommeil',
      'footer.shipping': 'Livraison et retours',
      'cart.title': 'Votre panier',
      'cart.empty': 'Votre panier est vide.',
      'cart.emptysub': 'Un excellent sommeil vous attend.',
      'cart.shop': 'Voir les matelas',
      'cart.total': 'Total (livraison incluse)',
      'cart.checkout': 'Commander',
      'cart.continue': 'Continuer mes achats',
      'cart.remove': 'Retirer',
      'cart.gift': 'Cadeau avec votre matelas · Valeur 10 €'
    },
    de: {
      'nav.colchones': 'Matratzen',
      'nav.canapes': 'Bettkästen',
      'nav.complementos': 'Zubehör',
      'nav.blog': 'Blog',
      'nav.contacto': 'Kontakt',
      'nav.inicio': 'Start',
      'nav.comprar': 'Kaufen',
      'hero.title': 'Schlaf wie nie zuvor.',
      'hero.sub': 'Matratzen, die Ihren Schlaf verwandeln',
      'hero.cta1': 'Entdecke unsere Matratzen',
      'hero.cta2': 'Bettkästen ansehen',
      'hero.t1': 'Gratisversand 3–5 Tage',
      'hero.t2': '100 Nächte Probeschlafen',
      'hero.t3': '5 Jahre Garantie',
      'home.products': 'Unsere Matratzen',
      'home.allsizes': 'Alle Details und Größen ansehen',
      'footer.legal': 'Impressum',
      'footer.privacy': 'Datenschutz',
      'footer.cookies': 'Cookies',
      'footer.terms': 'Verkaufsbedingungen',
      'footer.contact': 'Kontakt',
      'footer.claim': 'Schlafkomfort, entworfen und gefertigt in Spanien. 100 Nächte Probeschlafen und 5 Jahre Garantie.',
      'footer.shop': 'Einkaufen',
      'footer.help': 'Hilfe',
      'footer.guides': 'Schlaf-Ratgeber',
      'footer.shipping': 'Versand & Rückgabe',
      'cart.title': 'Dein Warenkorb',
      'cart.empty': 'Dein Warenkorb ist leer.',
      'cart.emptysub': 'Erholsamer Schlaf wartet auf dich.',
      'cart.shop': 'Matratzen ansehen',
      'cart.total': 'Gesamt (inkl. Versand)',
      'cart.checkout': 'Zur Kasse',
      'cart.continue': 'Weiter einkaufen',
      'cart.remove': 'Entfernen',
      'cart.gift': 'Geschenk zur Matratze · Wert 10 €'
    }
  };

  /* ── HOME (textos de la página de inicio) ── */
  var HOME = {
    es: {
      'home.products': 'Nuestros colchones',
      'home.aurea_desc': 'Firmeza media. Viscoelástica adaptable de 2 cm sobre núcleo HR de 28 kg/m³ y 30 cm de altura.',
      'home.serenity_desc': 'Firmeza media-alta. Muelles ensacados con doble capa de viscoelástica.',
      'home.discover': 'Descubrir →',
      'home.cross_t': '¿Necesitas también <em>canapé</em>?',
      'home.cross_sub': 'Almacenaje oculto y la base perfecta para tu colchón. Desde 399 €.',
      'home.cross_btn': 'Descubrir canapés →',
      'fab.eyebrow': 'Hecho en España',
      'fab.title': 'Lo fabricamos <em>nosotros</em>, sin intermediarios',
      'fab.lead': 'Cada colchón Nuvora sale de nuestra propia línea de producción: el mismo núcleo, el mismo acolchado tapa a tapa y la misma marca que recibes en casa. Sin marcas blancas, sin distribuidores que inflen el precio.',
      'fab.p1': 'Producción propia en España, de principio a fin',
      'fab.p2': 'Materiales certificados y tejidos OEKO-TEX',
      'fab.p3': 'Directo de fábrica a tu casa: pagas el colchón, no la cadena',
      'fab.badge': 'En directo desde la fábrica',
      'prom.eyebrow': 'Nuestro compromiso',
      'prom.title': 'Comprar bien es <em>dormir tranquilo</em>',
      'prom.l1': 'Envío gratuito', 'prom.n1': 'Directo de fábrica a tu casa, comprimido al vacío y con seguimiento.',
      'prom.l2': 'De prueba en casa', 'prom.n2': 'Si no te convence, lo recogemos gratis y te devolvemos cada euro.',
      'prom.l3': 'De garantía total', 'prom.n3': 'Defectos, hundimientos e irregularidades cubiertos. Sin letra pequeña.',
      'prom.cta': 'Elige tu colchón',
      'u.days': 'días', 'u.nights': 'noches', 'u.years': 'años',
      'seals.eyebrow': 'La promesa Nuvora',
      'seals.s1t': 'Fabricado en España', 'seals.s1d': 'Producción propia, sin intermediarios',
      'seals.s2t': 'Tejidos OEKO-TEX', 'seals.s2d': 'Libres de sustancias nocivas',
      'seals.s3t': '100 noches de prueba', 'seals.s3d': 'Devolución gratuita si no convence',
      'seals.s4t': '5 años de garantía', 'seals.s4d': 'Atención directa de fábrica',
      'cta.title': 'Tu mejor descanso<br>empieza aquí.', 'cta.btn': 'Ver colchones',
      'bh.label': 'Blog de descanso', 'bh.title': 'Aprende a dormir mejor',
      'bh.intro': 'Guías expertas sobre colchones, descanso y bienestar. Todo lo que necesitas para elegir bien y dormir mejor.',
      'bh.next': 'Siguiente',
      'footer.ssl': 'Pago cifrado SSL', 'footer.rights': 'Todos los derechos reservados.'
    },
    en: {
      'home.products': 'Our mattresses',
      'home.aurea_desc': 'Medium firmness. 2 cm of adaptive memory foam over a 28 kg/m³ HR core, 30 cm tall.',
      'home.serenity_desc': 'Medium-firm. Pocket springs with a double layer of memory foam.',
      'home.discover': 'Discover →',
      'home.cross_t': 'Need a <em>storage bed</em> too?',
      'home.cross_sub': 'Hidden storage and the perfect base for your mattress. From €399.',
      'home.cross_btn': 'Discover storage beds →',
      'fab.eyebrow': 'Made in Spain',
      'fab.title': 'We make them <em>ourselves</em>, no middlemen',
      'fab.lead': 'Every Nuvora mattress comes off our own production line: the same core, the same tufted padding and the same brand you receive at home. No white labels, no distributors inflating the price.',
      'fab.p1': 'Own production in Spain, from start to finish',
      'fab.p2': 'Certified materials and OEKO-TEX fabrics',
      'fab.p3': 'Straight from the factory to your home: you pay for the mattress, not the chain',
      'fab.badge': 'Live from the factory',
      'prom.eyebrow': 'Our commitment',
      'prom.title': 'Buying well means <em>sleeping easy</em>',
      'prom.l1': 'Free shipping', 'prom.n1': 'Straight from the factory to your home, vacuum-packed and tracked.',
      'prom.l2': 'Home trial', 'prom.n2': 'If it’s not for you, we collect it free and refund every cent.',
      'prom.l3': 'Full warranty', 'prom.n3': 'Defects, sagging and irregularities covered. No fine print.',
      'prom.cta': 'Choose your mattress',
      'u.days': 'days', 'u.nights': 'nights', 'u.years': 'years',
      'seals.eyebrow': 'The Nuvora promise',
      'seals.s1t': 'Made in Spain', 'seals.s1d': 'Own production, no middlemen',
      'seals.s2t': 'OEKO-TEX fabrics', 'seals.s2d': 'Free of harmful substances',
      'seals.s3t': '100-night trial', 'seals.s3d': 'Free return if you’re not convinced',
      'seals.s4t': '5-year warranty', 'seals.s4d': 'Direct support from the factory',
      'cta.title': 'Your best sleep<br>starts here.', 'cta.btn': 'See mattresses',
      'bh.label': 'Sleep blog', 'bh.title': 'Learn to sleep better',
      'bh.intro': 'Expert guides on mattresses, rest and wellbeing. Everything you need to choose well and sleep better.',
      'bh.next': 'Next',
      'footer.ssl': 'SSL-encrypted payment', 'footer.rights': 'All rights reserved.'
    },
    it: {
      'home.products': 'I nostri materassi',
      'home.aurea_desc': 'Rigidità media. 2 cm di memory adattabile su nucleo HR da 28 kg/m³, alto 30 cm.',
      'home.serenity_desc': 'Rigidità medio-alta. Molle insacchettate con doppio strato di memory.',
      'home.discover': 'Scopri →',
      'home.cross_t': 'Ti serve anche un <em>sommier</em>?',
      'home.cross_sub': 'Spazio nascosto e la base perfetta per il tuo materasso. Da 399 €.',
      'home.cross_btn': 'Scopri i sommier →',
      'fab.eyebrow': 'Fatto in Spagna',
      'fab.title': 'Li produciamo <em>noi</em>, senza intermediari',
      'fab.lead': 'Ogni materasso Nuvora esce dalla nostra linea di produzione: lo stesso nucleo, la stessa imbottitura e lo stesso marchio che ricevi a casa. Niente marchi terzi, niente distributori che gonfiano il prezzo.',
      'fab.p1': 'Produzione propria in Spagna, dall’inizio alla fine',
      'fab.p2': 'Materiali certificati e tessuti OEKO-TEX',
      'fab.p3': 'Dalla fabbrica a casa tua: paghi il materasso, non la catena',
      'fab.badge': 'In diretta dalla fabbrica',
      'prom.eyebrow': 'Il nostro impegno',
      'prom.title': 'Comprare bene è <em>dormire sereni</em>',
      'prom.l1': 'Spedizione gratuita', 'prom.n1': 'Dalla fabbrica a casa tua, sottovuoto e con tracciamento.',
      'prom.l2': 'Prova a casa', 'prom.n2': 'Se non ti convince, lo ritiriamo gratis e ti rimborsiamo tutto.',
      'prom.l3': 'Garanzia totale', 'prom.n3': 'Difetti, avvallamenti e irregolarità coperti. Senza sorprese.',
      'prom.cta': 'Scegli il tuo materasso',
      'u.days': 'giorni', 'u.nights': 'notti', 'u.years': 'anni',
      'seals.eyebrow': 'La promessa Nuvora',
      'seals.s1t': 'Fatto in Spagna', 'seals.s1d': 'Produzione propria, senza intermediari',
      'seals.s2t': 'Tessuti OEKO-TEX', 'seals.s2d': 'Privi di sostanze nocive',
      'seals.s3t': '100 notti di prova', 'seals.s3d': 'Reso gratuito se non ti convince',
      'seals.s4t': '5 anni di garanzia', 'seals.s4d': 'Assistenza diretta dalla fabbrica',
      'cta.title': 'Il tuo miglior riposo<br>inizia qui.', 'cta.btn': 'Vedi i materassi',
      'bh.label': 'Blog del riposo', 'bh.title': 'Impara a dormire meglio',
      'bh.intro': 'Guide esperte su materassi, riposo e benessere. Tutto ciò che serve per scegliere bene e dormire meglio.',
      'bh.next': 'Avanti',
      'footer.ssl': 'Pagamento cifrato SSL', 'footer.rights': 'Tutti i diritti riservati.'
    },
    fr: {
      'home.products': 'Nos matelas',
      'home.aurea_desc': 'Fermeté moyenne. 2 cm de mousse à mémoire adaptable sur noyau HR de 28 kg/m³, 30 cm de hauteur.',
      'home.serenity_desc': 'Fermeté moyenne-ferme. Ressorts ensachés avec double couche de mousse à mémoire.',
      'home.discover': 'Découvrir →',
      'home.cross_t': 'Besoin aussi d’un <em>sommier coffre</em> ?',
      'home.cross_sub': 'Rangement caché et la base parfaite pour votre matelas. Dès 399 €.',
      'home.cross_btn': 'Découvrir les sommiers →',
      'fab.eyebrow': 'Fabriqué en Espagne',
      'fab.title': 'Nous les fabriquons <em>nous-mêmes</em>, sans intermédiaires',
      'fab.lead': 'Chaque matelas Nuvora sort de notre propre ligne de production : le même noyau, le même capitonnage et la même marque que vous recevez chez vous. Sans marques blanches, sans distributeurs qui gonflent le prix.',
      'fab.p1': 'Production propre en Espagne, du début à la fin',
      'fab.p2': 'Matériaux certifiés et tissus OEKO-TEX',
      'fab.p3': 'De l’usine à votre maison : vous payez le matelas, pas la chaîne',
      'fab.badge': 'En direct de l’usine',
      'prom.eyebrow': 'Notre engagement',
      'prom.title': 'Bien acheter, c’est <em>dormir tranquille</em>',
      'prom.l1': 'Livraison gratuite', 'prom.n1': 'De l’usine à votre maison, sous vide et suivi.',
      'prom.l2': 'Essai à domicile', 'prom.n2': 'S’il ne vous convient pas, nous le récupérons gratuitement et vous remboursons.',
      'prom.l3': 'Garantie totale', 'prom.n3': 'Défauts, affaissements et irrégularités couverts. Sans petites lignes.',
      'prom.cta': 'Choisissez votre matelas',
      'u.days': 'jours', 'u.nights': 'nuits', 'u.years': 'ans',
      'seals.eyebrow': 'La promesse Nuvora',
      'seals.s1t': 'Fabriqué en Espagne', 'seals.s1d': 'Production propre, sans intermédiaires',
      'seals.s2t': 'Tissus OEKO-TEX', 'seals.s2d': 'Sans substances nocives',
      'seals.s3t': '100 nuits d’essai', 'seals.s3d': 'Retour gratuit si non convaincu',
      'seals.s4t': '5 ans de garantie', 'seals.s4d': 'Assistance directe de l’usine',
      'cta.title': 'Votre meilleur sommeil<br>commence ici.', 'cta.btn': 'Voir les matelas',
      'bh.label': 'Blog du sommeil', 'bh.title': 'Apprenez à mieux dormir',
      'bh.intro': 'Des guides experts sur les matelas, le repos et le bien-être. Tout pour bien choisir et mieux dormir.',
      'bh.next': 'Suivant',
      'footer.ssl': 'Paiement chiffré SSL', 'footer.rights': 'Tous droits réservés.'
    },
    de: {
      'home.products': 'Unsere Matratzen',
      'home.aurea_desc': 'Mittlere Festigkeit. 2 cm anpassungsfähiger Memory-Schaum über 28 kg/m³ HR-Kern, 30 cm hoch.',
      'home.serenity_desc': 'Mittel-fest. Taschenfederkern mit doppelter Memory-Schaum-Schicht.',
      'home.discover': 'Entdecken →',
      'home.cross_t': 'Brauchst du auch einen <em>Bettkasten</em>?',
      'home.cross_sub': 'Versteckter Stauraum und die perfekte Basis für deine Matratze. Ab 399 €.',
      'home.cross_btn': 'Bettkästen entdecken →',
      'fab.eyebrow': 'Hergestellt in Spanien',
      'fab.title': 'Wir fertigen sie <em>selbst</em>, ohne Zwischenhändler',
      'fab.lead': 'Jede Nuvora-Matratze kommt aus unserer eigenen Produktion: derselbe Kern, dieselbe Polsterung und dieselbe Marke, die du zu Hause erhältst. Keine Handelsmarken, keine Zwischenhändler, die den Preis aufblähen.',
      'fab.p1': 'Eigene Produktion in Spanien, von Anfang bis Ende',
      'fab.p2': 'Zertifizierte Materialien und OEKO-TEX-Stoffe',
      'fab.p3': 'Direkt ab Werk zu dir: du zahlst die Matratze, nicht die Kette',
      'fab.badge': 'Live aus der Fabrik',
      'prom.eyebrow': 'Unser Versprechen',
      'prom.title': 'Gut kaufen heißt <em>ruhig schlafen</em>',
      'prom.l1': 'Gratisversand', 'prom.n1': 'Direkt ab Werk zu dir, vakuumverpackt und mit Sendungsverfolgung.',
      'prom.l2': 'Probeschlafen zu Hause', 'prom.n2': 'Wenn sie dir nicht zusagt, holen wir sie gratis ab und erstatten alles.',
      'prom.l3': 'Volle Garantie', 'prom.n3': 'Mängel, Kuhlen und Unregelmäßigkeiten abgedeckt. Ohne Kleingedrucktes.',
      'prom.cta': 'Wähle deine Matratze',
      'u.days': 'Tage', 'u.nights': 'Nächte', 'u.years': 'Jahre',
      'seals.eyebrow': 'Das Nuvora-Versprechen',
      'seals.s1t': 'Hergestellt in Spanien', 'seals.s1d': 'Eigene Produktion, ohne Zwischenhändler',
      'seals.s2t': 'OEKO-TEX-Stoffe', 'seals.s2d': 'Frei von Schadstoffen',
      'seals.s3t': '100 Nächte Probeschlafen', 'seals.s3d': 'Kostenlose Rückgabe, wenn sie nicht überzeugt',
      'seals.s4t': '5 Jahre Garantie', 'seals.s4d': 'Direkter Support ab Werk',
      'cta.title': 'Dein bester Schlaf<br>beginnt hier.', 'cta.btn': 'Matratzen ansehen',
      'bh.label': 'Schlaf-Blog', 'bh.title': 'Lerne, besser zu schlafen',
      'bh.intro': 'Experten-Ratgeber zu Matratzen, Erholung und Wohlbefinden. Alles, um gut zu wählen und besser zu schlafen.',
      'bh.next': 'Weiter',
      'footer.ssl': 'SSL-verschlüsselte Zahlung', 'footer.rights': 'Alle Rechte vorbehalten.'
    }
  };
  /* ── Banda superior + cupón de checkout ── */
  var EXTRA = {
    es: {
      'ann.1': '−10 % en tu primera compra con el código NUVORA10',
      'ann.2': 'Envío gratuito siempre, sin pedido mínimo',
      'ann.3': 'Mouth Tape de regalo con cada colchón',
      'chk.coupon_q': '¿Tienes un código de descuento?',
      'chk.coupon_ph': 'Código',
      'chk.coupon_btn': 'Aplicar',
      'chk.coupon_ok': 'Código NUVORA10 aplicado: −10 %',
      'chk.coupon_bad': 'Código no válido',
      'chk.discount': 'Descuento',
      'soon.badge': 'Próximamente',
      'soon.price': 'Precio por desvelar',
      'soon.notify': 'Avísame del lanzamiento',
      'soon.teaser': 'El próximo capítulo del descanso Nuvora. Estamos afinando cada detalle. Muy pronto.',
      'soon.lead': 'Algo grande está en camino. Estamos afinando cada detalle para subir el listón del descanso — y serás de los primeros en saberlo.',
      'soon.email_ph': 'Tu correo',
      'soon.note': 'Sé el primero en saberlo. Sin spam, solo el aviso de lanzamiento.',
      'soon.ok': '¡Estás en la lista! Te avisaremos el día del lanzamiento.'
    },
    en: {
      'ann.1': '−10% off your first order with code NUVORA10',
      'ann.2': 'Free shipping always, no minimum order',
      'ann.3': 'Free Mouth Tape with every mattress',
      'chk.coupon_q': 'Have a discount code?',
      'chk.coupon_ph': 'Code',
      'chk.coupon_btn': 'Apply',
      'chk.coupon_ok': 'Code NUVORA10 applied: −10%',
      'chk.coupon_bad': 'Invalid code',
      'chk.discount': 'Discount',
      'soon.badge': 'Coming soon',
      'soon.price': 'Price to be revealed',
      'soon.notify': 'Notify me at launch',
      'soon.teaser': 'The next chapter of Nuvora rest. We are perfecting every detail. Very soon.',
      'soon.lead': 'Something big is on its way. We are perfecting every detail to raise the bar — and you will be among the first to know.',
      'soon.email_ph': 'Your email',
      'soon.note': 'Be the first to know. No spam — just the launch alert.',
      'soon.ok': 'You are on the list! We will notify you on launch day.'
    },
    it: {
      'ann.1': '−10% sul tuo primo ordine con il codice NUVORA10',
      'ann.2': 'Spedizione sempre gratuita, senza minimo d’ordine',
      'ann.3': 'Mouth Tape in omaggio con ogni materasso',
      'chk.coupon_q': 'Hai un codice sconto?',
      'chk.coupon_ph': 'Codice',
      'chk.coupon_btn': 'Applica',
      'chk.coupon_ok': 'Codice NUVORA10 applicato: −10%',
      'chk.coupon_bad': 'Codice non valido',
      'chk.discount': 'Sconto',
      'soon.badge': 'Prossimamente',
      'soon.price': 'Prezzo da svelare',
      'soon.notify': 'Avvisami al lancio',
      'soon.teaser': 'Il prossimo capitolo del riposo Nuvora. Stiamo rifinendo ogni dettaglio. Molto presto.',
      'soon.lead': 'Sta arrivando qualcosa di grande. Stiamo rifinendo ogni dettaglio per alzare l’asticella del riposo — e sarai tra i primi a saperlo.',
      'soon.email_ph': 'La tua email',
      'soon.note': 'Sii il primo a saperlo. Niente spam, solo l’avviso di lancio.',
      'soon.ok': 'Sei in lista! Ti avviseremo il giorno del lancio.'
    },
    fr: {
      'ann.1': '−10 % sur votre première commande avec le code NUVORA10',
      'ann.2': 'Livraison toujours gratuite, sans minimum',
      'ann.3': 'Mouth Tape offert avec chaque matelas',
      'chk.coupon_q': 'Vous avez un code promo ?',
      'chk.coupon_ph': 'Code',
      'chk.coupon_btn': 'Appliquer',
      'chk.coupon_ok': 'Code NUVORA10 appliqué : −10 %',
      'chk.coupon_bad': 'Code non valide',
      'chk.discount': 'Remise',
      'soon.badge': 'Bientôt',
      'soon.price': 'Prix à dévoiler',
      'soon.notify': 'Prévenez-moi au lancement',
      'soon.teaser': 'Le prochain chapitre du repos Nuvora. Nous peaufinons chaque détail. Très bientôt.',
      'soon.lead': 'Quelque chose de grand arrive. Nous peaufinons chaque détail pour élever le niveau du repos — et vous serez parmi les premiers informés.',
      'soon.email_ph': 'Votre e-mail',
      'soon.note': 'Soyez le premier informé. Pas de spam, juste l’alerte de lancement.',
      'soon.ok': 'Vous êtes sur la liste ! Nous vous préviendrons le jour du lancement.'
    },
    de: {
      'ann.1': '−10 % auf deine erste Bestellung mit dem Code NUVORA10',
      'ann.2': 'Immer Gratisversand, ohne Mindestbestellwert',
      'ann.3': 'Gratis Mouth Tape zu jeder Matratze',
      'chk.coupon_q': 'Hast du einen Rabattcode?',
      'chk.coupon_ph': 'Code',
      'chk.coupon_btn': 'Anwenden',
      'chk.coupon_ok': 'Code NUVORA10 angewendet: −10 %',
      'chk.coupon_bad': 'Ungültiger Code',
      'chk.discount': 'Rabatt',
      'soon.badge': 'Demnächst',
      'soon.price': 'Preis wird enthüllt',
      'soon.notify': 'Benachrichtige mich zum Launch',
      'soon.teaser': 'Das nächste Kapitel des Nuvora-Schlafs. Wir verfeinern jedes Detail. Sehr bald.',
      'soon.lead': 'Etwas Großes ist unterwegs. Wir verfeinern jedes Detail, um den Schlaf auf ein neues Level zu heben — und du erfährst es als Erster.',
      'soon.email_ph': 'Deine E-Mail',
      'soon.note': 'Erfahre es als Erster. Kein Spam, nur die Launch-Info.',
      'soon.ok': 'Du bist auf der Liste! Wir benachrichtigen dich zum Launch.'
    }
  };

  /* Fusionar HOME + EXTRA en el diccionario principal */
  SUPPORTED.forEach(function (l) {
    for (var k in HOME[l]) { if (HOME[l].hasOwnProperty(k)) DICT[l][k] = HOME[l][k]; }
    for (var k2 in EXTRA[l]) { if (EXTRA[l].hasOwnProperty(k2)) DICT[l][k2] = EXTRA[l][k2]; }
  });

  function getLang() {
    var l;
    try { l = localStorage.getItem(KEY); } catch (e) {}
    return SUPPORTED.indexOf(l) !== -1 ? l : 'es';
  }
  function t(key) {
    var l = getLang();
    return (DICT[l] && DICT[l][key] != null) ? DICT[l][key] : (DICT.es[key] || '');
  }
  function apply(l) {
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = DICT[l] && DICT[l][el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = DICT[l] && DICT[l][el.getAttribute('data-i18n-ph')];
      if (v != null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = DICT[l] && DICT[l][el.getAttribute('data-i18n-html')];
      if (v != null) el.innerHTML = v;
    });
    /* Actualizar el selector desplegable */
    var m = meta(l);
    document.querySelectorAll('.langpick').forEach(function (pick) {
      var cur = pick.querySelector('[data-flag]');
      if (cur) cur.className = 'flag ' + m.flag;
      pick.querySelectorAll('.langpick__opt').forEach(function (o) {
        o.classList.toggle('is-active', o.getAttribute('data-lang') === l);
      });
    });
    window.dispatchEvent(new CustomEvent('nuvora:lang', { detail: l }));
  }
  function setLang(l) {
    if (SUPPORTED.indexOf(l) === -1) return;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    apply(l);
  }

  window.NuvoraI18n = { t: t, lang: getLang, set: setLang };

  /* Construye el selector compacto (círculo actual + flecha → desplegable) */
  function buildPicker(host) {
    var cur = meta(getLang());
    var opts = '';
    LANGS.forEach(function (L) {
      opts += '<button type="button" class="langpick__opt" role="menuitem" data-lang="' + L.code + '">' +
                '<span class="flag ' + L.flag + '"></span><span>' + L.name + '</span>' +
              '</button>';
    });
    host.innerHTML =
      '<button type="button" class="langpick__btn" aria-haspopup="true" aria-expanded="false" aria-label="Idioma / Language">' +
        '<span class="flag ' + cur.flag + '" data-flag></span>' +
        '<svg class="langpick__chev" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>' +
      '</button>' +
      '<div class="langpick__menu" role="menu">' + opts + '</div>';

    var btn = host.querySelector('.langpick__btn');
    var menu = host.querySelector('.langpick__menu');
    function close() { host.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    function toggle() {
      var open = host.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    menu.querySelectorAll('.langpick__opt').forEach(function (o) {
      o.addEventListener('click', function () { setLang(o.getAttribute('data-lang')); close(); });
    });
    document.addEventListener('click', function (e) { if (!host.contains(e.target)) close(); });
    host.__close = close;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-langpick]').forEach(buildPicker);
    apply(getLang());
  });
})();
