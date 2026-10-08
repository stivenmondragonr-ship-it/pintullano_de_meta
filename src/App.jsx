import { useEffect, useState } from 'react'

// Ruta base del sitio: '/' en local o con dominio propio, '/pintullano_de_meta/' en GitHub Pages (la define vite.config.ts)
const BASE = import.meta.env.BASE_URL
const url = (path = '') => BASE + path                                  // url('contacto') -> '/pintullano_de_meta/contacto'
const asset = (file) => BASE + file.replace(/^\//, '')                  // asset('/logo.png') -> '/pintullano_de_meta/logo.png'
const currentPath = () => '/' + window.location.pathname.slice(BASE.length) // '/pintullano_de_meta/contacto' -> '/contacto'

// Datos de la empresa (se usan en la política de datos y en el contacto). Edita aquí.
const COMPANY = {
  legalName: '[RAZÓN SOCIAL]', // ← COMPLETAR antes de publicar
  nit: '[NIT]',                // ← COMPLETAR antes de publicar
  address: 'Villavicencio, Meta, Colombia',
  email: 'hola@pintullano.co',
  phone: '+57 314 398 1200',
  whatsapp: '573143981200',
}
const whatsappLink = (text) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`

const products = [
  { name: 'Vinilo fino Tipo 1', image: '/vinillo fino tipo1 5g.png', description: 'Vinilo superlavable de acabado mate, para exteriores e interiores', features: ['Superlavable y resistente al clima', 'Pintura lavable para muros', 'Excelente cobertura y durabilidad', 'Alta cobertura y rendimiento', 'Acabado mate, colores intensos'], color: '#f4c400', category: 'Vinilos', finish: 'Mate', presentation: '5, 2½ , 1 y ¼ galón', use: 'Exteriores e interiores' },
  { name: 'Vinilo fino Tipo 2', image: '/vinillo fino tipo2 g5.png', description: 'Vinilo lavable de acabado mate económico, para exteriores e interiores', features: ['Lavable', 'Acabado mate económico', 'Fácil aplicación y excelente cobertura', 'Duradero'], color: '#3fa9f2', category: 'Vinilos', finish: 'Mate', presentation: '5, 2½ , 1 y ¼ galón', use: 'Exteriores e interiores' },
  {name: 'Vinilo fino Tipo 3',image: '/vinillo fino tipo3 5g.png',description: 'Vinilo fino Tipo 3', image: '/vinillo fino tipo3 5g.png', description: 'Vinilo para interiores, ideal para renovar y dar color a los espacios del hogar y otros ambientes interiores',features: ['Ideal para superficies interiores','Acabado mate',    'Fácil aplicación',  'Disponible en varias presentaciones'],color: '#5fe853',category: 'Vinilos',  finish: 'Mate',  presentation: '5, 2½, 1 y ¼ galón',  use: 'Interiores'},
  { name: 'Vinilo fino Tipo 1 industrial', image: '/vinillo fino tipo1 industrial 5g.png', description: 'Vinilo de línea industrial, diseñado para el mantenimiento y la renovación de superficies interiores y exteriores', features: [  'Para interiores y exteriores',    'Acabado mate',    'Ideal para proyectos de mantenimiento',    'Disponible en varias presentaciones'  ], color: '#f20037', category: 'Vinilos', finish: 'Mate', presentation: '5, 2½ , 1 y ¼ galón', use: 'Interiores y exteriores' },
  { name: 'Concentrado', image: '/concentrado.png', description: 'Pigmentos concentrados para entintar pinturas y estucos', features: ['Pigmentos concentrados de alta pureza', 'Máxima concentración, fácil mezcla', 'Para entintar vinilos y estucos', 'Uso profesional'], color: '#f4c400', category: 'Vinilos', presentation: 'Frasco de 250 g' },
  { name: 'Esmalte sintético', image: '/esmalte alcrilico.png', description: 'Esmalte de acabado brillante, ideal para renovar y proteger superficies de madera y metal con una apariencia uniforme',features: [    'Acabado brillante',    'Para superficies de madera y metal',    'Ideal para renovar diversas superficies',    'Disponible en galón y cuarto de galón'  ], color: '#3fa9f2', category: 'Esmaltes', finish: 'Brillante', presentation: '1 galón y ¼ de galón', use: 'Madera, metal y superficies preparadas' },
  { name: 'Esmalte 3 en 1', image: '/esmalte 3 en 1.png', description: 'Esmalte 3 en 1: imprimante, esmalte y anticorrosivo, de secado rápido', features: ['Secado rápido', '3 en 1: imprimante, esmalte y anticorrosivo', 'Acabado brillante y duradero', 'Ideal para metal y madera'], color: '#5fe853', category: 'Esmaltes', finish: 'Brillante', presentation: '1 galón y ¼ de galón', use: 'Metal y madera' },
  { name: 'Estuco acrílico', image: '/estuco alcrilico 30kg.png', description: 'Estuco de acabado liso y resistente, para interiores y exteriores', features: ['Acabado liso y resistente', 'Alta adherencia y fácil aplicación', 'Secado rápido, listo para pintar', 'Ideal para interiores y exteriores'], color: '#f4c400', category: 'Estuco', presentation: '30, 15 y 6 kg', use: 'Interiores y exteriores' },
  { name: 'Estuco plástico', image: '/estuco plastico 5g.png', description: 'Estuco plástico de alta resistencia para preparar, rellenar y alisar muros', features: ['Preparación de superficies', 'Relleno y alisado de muros', 'Fácil de lijar, alta adherencia', 'Ideal para acabados finos', 'Acabado fino para muros interiores y exteriores'], color: '#3fa9f2', category: 'Estuco', presentation: '5, 2½, 1, ½, ¼, ⅛ y 1/16 de galón', use: 'Muros interiores y exteriores' },
  { name: 'Imper-Proteja', image: '/imperproteja 5g.png', description: 'Impermeabilizante acrílico para muros, placas y tejas', features: ['Impermeabilizante acrílico', 'Protege contra filtraciones y humedad', 'Excelente adherencia y elasticidad'], color: '#5fe853', category: 'Impermeabilizante', presentation: '5 galones y 1 galón', use: 'Muros, placas y tejas' },
]
// [etiqueta, título, descripción, texto del botón, página a la que lleva]
const slides = [
  ['Pintullano del Meta', 'Pinturas del Meta para tus espacios', 'Fabricamos vinilos, esmaltes, estucos e impermeabilizantes en el Meta para hogares, obras y negocios.', 'VER CATÁLOGO', 'productos'],
  ['Nuestro catálogo', 'Cada superficie tiene su producto', 'Conoce nuestra línea, sus usos y presentaciones.', 'EXPLORAR PRODUCTOS', 'productos'],
  ['Asesoría', 'Cuéntanos tu proyecto y te orientamos', 'Te ayudamos a elegir el producto adecuado y te enviamos tu cotización.', 'SOLICITAR COTIZACIÓN', 'contacto'],
]
const categories = [['Todos', 'Todos'], ['Vinilos', 'Vinilos'], ['Esmaltes', 'Esmaltes'], ['Estuco', 'Estucos'], ['Impermeabilizante', 'Impermeabilizantes']]
const slugify = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(' ', '-')

function Header() {
  const [open, setOpen] = useState(false)
  return <><a className="announcement" href={whatsappLink('Hola Pintullano, quiero cotizar un proyecto.')} target="_blank" rel="noreferrer">Cotiza tu proyecto por WhatsApp · {COMPANY.phone}</a><header className="site-header"><a className="brand" href={url()}><img src={asset('logo-pintullano.png')} alt="Pintullano" /></a><button className="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button><nav className={open ? 'open' : ''} onClick={() => setOpen(false)}><a href={url()}>INICIO</a><a href={url('productos')}>PRODUCTOS</a><a className="category-button" href={url('contacto')}>CONTACTO</a></nav></header></>
}
function HeroCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => { const timer = setInterval(() => setActive((value) => (value + 1) % slides.length), 6000); return () => clearInterval(timer) }, [])
  const [eyebrow, title, description, cta, link] = slides[active]
  return <section className="hero" id="inicio"><img src={asset('paint-hero.png')} alt="Sala pintada en azul con un cartel de Pintullano en la pared" /><div className="hero-overlay" /><div className="hero-copy"><p>{eyebrow}</p><h1>{title}</h1><p>{description}</p><a className="button" href={url(link)}>{cta} →</a></div><div className="slider-controls"><div className="dots" role="tablist" aria-label="Diapositivas principales">{slides.map((slide, index) => <button key={slide[1]} className={index === active ? 'list-active' : ''} onClick={() => setActive(index)} aria-label={`Ir a diapositiva ${index + 1}`} aria-selected={index === active} />)}</div><span>0{active + 1} / 03</span></div></section>
}
function AboutSection() {
  return (
    <section className="about-section" id="quienes-somos">
      <div className="about-visual">
        <img src={asset('Logo Pintullano sobre Atardecer Vibrante.png')} alt="Pintullano, pinturas del Meta" />
        <div className="about-brand">
          <small>LA PINTURA DEL META</small>
        </div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">Conócenos</p>
        <h2>Una marca de pinturas del Meta.</h2>
        <p className="about-lead">Somos Pintullano, una fábrica de pinturas de Villavicencio con más de 10 años de trayectoria. Fabricamos vinilos, esmaltes, estucos e impermeabilizantes para hogares, obras y negocios.</p>
        <div className="about-values">
          <div>
            <span>01</span>
            <h3>Quiénes somos</h3>
            <p>Una fábrica metense con más de 10 años haciendo pinturas para casas, locales y obras.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Nuestra misión</h3>
            <p>Ofrecer pinturas de calidad y orientar a cada cliente para que elija el producto correcto para su proyecto.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Nuestra visión</h3>
            <p>Ser la marca de pinturas de referencia en el Meta, reconocida por su calidad y su cercanía.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
function ProductVisual({ product, large }) {
  return (
    <div className="product-art" style={{ '--product-color': product.color }}>
      <img
        src={asset(product.image)}
        alt={product.name}
        style={{
          display: 'block',
          width: 'auto',
          maxWidth: '80%',
          height: large ? 'clamp(260px, 38vw, 440px)' : '210px',
          objectFit: 'contain',
          filter: 'drop-shadow(10px 14px 14px rgba(0,0,0,.28))',
        }}
      />
    </div>
  )
}
function ProductCard({ product }) { return <article className="product-card"><ProductVisual product={product} /><div className="product-info"><p>{product.description}</p><h3>{product.name}</h3><a href={url(`producto/${slugify(product.name)}`)}>VER DETALLES →</a></div></article> }
function Products({ title = 'Nuestros productos' }) {
  const [category, setCategory] = useState('Todos')
  const visible = category === 'Todos' ? products : products.filter((product) => product.category === category)
  return <section className="products" id="productos"><div className="section-heading"><div><p className="eyebrow">Catálogo</p><h2>{title}</h2></div><p>Este es nuestro catálogo. ¿Te interesa alguno? Escríbenos y te enviamos la cotización.</p></div><div className="product-filter" role="tablist" aria-label="Filtrar productos">{categories.map(([value, label]) => <button key={value} className={category === value ? 'filter-active' : ''} onClick={() => setCategory(value)} role="tab" aria-selected={category === value}>{label}</button>)}</div><div className="product-grid">{visible.map((product) => <ProductCard key={product.name} product={product} />)}</div></section>
}
function CatalogPage() {
  return <><Header /><main className="catalog-page"><Products /></main><Footer /></>
}
function ContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = [
      'Hola Pintullano, quiero hablar sobre un proyecto de pintura.',
      '',
      `Nombre: ${data.get('name')}`,
      `Correo: ${data.get('email')}`,
      `Teléfono: ${data.get('phone') || 'No especificado'}`,
      `Necesidad: ${data.get('interest')}`,
      `Proyecto: ${data.get('message')}`,
      '',
      `Autorizo el tratamiento de mis datos personales según la política de tratamiento de datos de Pintullano: ${window.location.origin}${url('politica-de-datos')}`,
    ].join('\n')
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }
  return (
    <>
      <Header />
      <main className="contact-page">
        <section className="contact-hero">
          <p className="eyebrow">Contacto</p>
          <h1>Cuéntanos tu proyecto y te cotizamos.</h1>
          <p>Escríbenos y te ayudamos a elegir los productos Pintullano adecuados para tu espacio.</p>
        </section>
        <section className="contact-content">
          <div className="contact-intro">
            <p className="eyebrow">Asesoría personalizada</p>
            <h2>¿Cómo podemos ayudarte?</h2>
            <p>Déjanos tus datos y te contactaremos para orientarte y enviarte tu cotización.</p>
            <div className="contact-details">
              <div><strong>VISÍTANOS</strong><span>{COMPANY.address}</span></div>
              <div><strong>ESCRÍBENOS</strong><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
              <div><strong>WHATSAPP Y LLAMADAS</strong><span>{COMPANY.phone}</span></div>
            </div>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3979.5450526903005!2d-73.61671252502411!3d4.112525495861265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMDYnNDUuMSJOIDczwrAzNic1MC45Ilc!5e0!3m2!1ses!2sco!4v1791238580015!5m2!1ses!2sco"
                title="Ubicación de Pintullano"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/eyJBzkboJ3LkfDkf9"
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir ubicación en Google Maps"
              ></a>
            </div>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <label>Nombre completo *<input name="name" required placeholder="Tu nombre" /></label>
            <label>Correo electrónico *<input type="email" name="email" required placeholder="tu@email.com" /></label>
            <label>Teléfono<input name="phone" placeholder="Ej. 314 000 0000" /></label>
            <label>¿Qué necesitas? *
              <select name="interest" required defaultValue="">
                <option value="" disabled>Selecciona una opción</option>
                <option>Quiero cotizar productos</option>
                <option>Necesito asesoría para elegir</option>
                <option>Soy constructor o distribuidor</option>
                <option>Otra consulta</option>
              </select>
            </label>
            <label>Cuéntanos sobre tu proyecto *<textarea name="message" required rows="5" placeholder="Ej. Quiero pintar una fachada de 80 m². ¿Qué producto me recomiendan?"></textarea></label>
            <label className="privacy"><input type="checkbox" required /><span>Autorizo a Pintullano a tratar mis datos para contactarme y responder mi solicitud, según la <a href={url('politica-de-datos')} target="_blank" rel="noreferrer">Política de tratamiento de datos</a>. *</span></label>
            <button className="button" type="submit">{sent ? 'ENVIADO ✓' : 'ENVIAR POR WHATSAPP →'}</button>
            {sent && <p className="form-success">Se abrió WhatsApp con tu mensaje listo. Solo falta que lo envíes.</p>}
            <small>* Campos obligatorios. Al enviar, se abrirá WhatsApp con tu mensaje. Te respondemos en nuestro horario de atención.</small>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <p className="eyebrow">Legal</p>
        <h1>Política de tratamiento de datos personales</h1>
        <p className="legal-updated">Última actualización: octubre de 2026</p>

        <h2>1. Responsable del tratamiento</h2>
        <p>{COMPANY.legalName}, con NIT {COMPANY.nit}, que opera bajo la marca comercial Pintullano, con domicilio en {COMPANY.address}.</p>
        <p>Correo: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · Teléfono y WhatsApp: {COMPANY.phone}</p>

        <h2>2. Qué datos recolectamos</h2>
        <p>Cuando usas el formulario de contacto te pedimos tu nombre, tu correo electrónico, tu teléfono (opcional), el tipo de ayuda que necesitas y la descripción de tu proyecto. No solicitamos datos sensibles.</p>

        <h2>3. Para qué usamos tus datos</h2>
        <ul>
          <li>Contactarte y responder tu solicitud.</li>
          <li>Orientarte en la elección de productos.</li>
          <li>Preparar y enviarte cotizaciones.</li>
        </ul>
        <p>No usaremos tus datos para enviarte publicidad sin tu autorización aparte.</p>

        <h2>4. Cómo llegan tus datos a nosotros</h2>
        <p>Este sitio web no almacena la información del formulario. Al enviarlo, se abre WhatsApp con tu mensaje ya escrito, y tus datos llegan a Pintullano solo cuando tú envías ese mensaje. WhatsApp es un servicio de un tercero con sus propias políticas de privacidad.</p>

        <h2>5. Tus derechos</h2>
        <ul>
          <li>Conocer, actualizar y rectificar tus datos personales.</li>
          <li>Solicitar prueba de la autorización que nos diste.</li>
          <li>Ser informado, si lo pides, del uso que se ha dado a tus datos.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
          <li>Revocar la autorización o solicitar la supresión de tus datos, cuando proceda según la ley.</li>
          <li>Acceder de forma gratuita a tus datos personales.</li>
        </ul>

        <h2>6. Cómo ejercer tus derechos</h2>
        <p>Escríbenos a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> o por WhatsApp al {COMPANY.phone}, indicando tu nombre, lo que quieres consultar, corregir o eliminar, y una forma de contactarte. Responderemos dentro de los plazos que establece la ley.</p>

        <h2>7. Conservación y seguridad</h2>
        <p>Conservamos tus datos solo el tiempo necesario para atender tu solicitud y cumplir obligaciones legales, y tomamos medidas razonables para protegerlos.</p>

        <h2>8. Servicios de terceros</h2>
        <p>Este sitio muestra un mapa de Google Maps y usa tipografías de Google Fonts. Esos servicios pueden recibir datos técnicos de tu visita según sus propias políticas.</p>

        <h2>9. Menores de edad</h2>
        <p>Este sitio no está dirigido a menores de edad y no recolectamos sus datos de forma intencional.</p>

        <h2>10. Cambios a esta política</h2>
        <p>Si actualizamos esta política, publicaremos la nueva versión en esta misma página con su fecha.</p>
      </main>
      <Footer />
    </>
  )
}
function Footer() { return <footer id="contacto"><div><div className="footer-brand"><img src={asset('logo-pintullano.png')} alt="Pintullano" /></div><p>Fábrica de pinturas en Villavicencio, Meta.</p><a className="footer-link" href={url('politica-de-datos')}>Política de tratamiento de datos</a></div><div><p className="eyebrow yellow-text">Contáctanos</p><p>{COMPANY.phone}</p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><p>{COMPANY.address}</p></div></footer> }
function Detail({ product }) {
  const quote = whatsappLink(`Hola Pintullano, quiero cotizar: ${product.name}. ¿Me pueden dar precio y presentaciones?`)
  const specs = [['Acabado', product.finish], ['Presentaciones', product.presentation], ['Usos recomendados', product.use]].filter(([, value]) => value)
  return <><Header /><main className="detail-page"><a className="back-home" href={url('productos')}>← Ver todos los productos</a><section className="product-detail"><ProductVisual product={product} large /><div className="detail-copy"><p className="eyebrow">Pintullano · {product.category}</p><h1>{product.name}</h1><p className="detail-description">{product.description}.</p>{product.features && <ul style={{ margin: '0 0 8px', paddingLeft: 20, maxWidth: 500, color: '#555', fontSize: 15, lineHeight: 1.8 }}>{product.features.map((item) => <li key={item}>{item}</li>)}</ul>}<a className="button" href={quote} target="_blank" rel="noreferrer">SOLICITAR COTIZACIÓN</a><p className="detail-note">Te respondemos con precios y presentaciones.</p><dl>{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></section><Products title="Otros productos" /></main><Footer /></>
}
function getProduct() { const slug = currentPath().match(/^\/producto\/([^/]+)/)?.[1]; return products.find((product) => slugify(product.name) === slug) }
export default function App() {
  const [path, setPath] = useState(currentPath)
  useEffect(() => {
    const update = () => setPath(currentPath())
    // Navegación interna: cualquier enlace del sitio cambia de página sin recargar
    const click = (event) => {
      const link = event.target.closest('a')
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
      if (link.target === '_blank' || link.origin !== window.location.origin || !link.pathname.startsWith(BASE)) return
      event.preventDefault()
      window.history.pushState({}, '', link.href)
      update()
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', update)
    document.addEventListener('click', click)
    return () => { window.removeEventListener('popstate', update); document.removeEventListener('click', click) }
  }, [])

  const product = getProduct()
  if (path.startsWith('/contacto')) return <ContactPage />
  if (path.startsWith('/politica-de-datos')) return <PrivacyPage />
  if (path.startsWith('/productos')) return <CatalogPage />
  if (product) return <Detail product={product} />
  return <><Header /><main><HeroCarousel /><AboutSection /><section className="cta"><p className="eyebrow">¿Tienes un proyecto?</p><h2>Cuéntanos qué necesitas.</h2><p>Te ayudamos a elegir el producto y la presentación adecuados, y te enviamos tu cotización.</p><a className="button yellow" href={url('contacto')}>SOLICITAR COTIZACIÓN</a></section></main><Footer /></>
}
