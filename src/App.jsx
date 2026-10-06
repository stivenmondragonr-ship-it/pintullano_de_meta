import { useEffect, useState } from 'react'

const products = [
  { name: 'Vinillo fino Tipo 1', image: `${import.meta.env.BASE_URL}vinillo fino tipo1 5g.png`, description: 'Ideal para interiores',  color: '#f4c400', category: 'Vinillos', finish: 'Mate', performance: 'Excelente cubrimiento', presentation: '5 Galón / 2.5 Galón / 1 Galón ', use: 'Muros interiores' },
  { name: 'Vinillo fino Tipo 2', image: `${import.meta.env.BASE_URL}vinillo fino tipo2 g5.png`, description: 'Lavable y fácil de aplicar',  color: '#3fa9f2', category: 'Vinillos', finish: 'Mate', performance: 'Alta resistencia al lavado', presentation: '5 Galón / 2.5 Galón / 1 Galón ', use: 'Paredes y techos interiores' },
  { name: 'Vinillo fino Tipo 3', image: `${import.meta.env.BASE_URL}vinillo fino tipo3 5g.png`, description: 'Ideal para interiores',  color: '#5fe853', category: 'Vinillos', finish: 'Mate', performance: 'Excelente cubrimiento', presentation: '5 Galón / 2.5 Galón / 1 Galón ', use: 'Muros interiores' },
  { name: 'Vinillo fino Tipo 1 industrial', image: `${import.meta.env.BASE_URL}vinillo fino tipo1 industrial 5g.png`, description: 'Ideal para interiores',  color: '#f20037', category: 'Vinillos', finish: 'Mate', performance: 'Excelente cubrimiento', presentation: '5 Galón / 2.5 Galón / 1 Galón ', use: 'Muros interiores' },
  { name: 'Vinillo concentrado', image: `${import.meta.env.BASE_URL}concentrado.png`, description: 'Ideal para interiores',  color: '#f4c400', category: 'Vinillos', finish: 'Mate', performance: 'Excelente cubrimiento', presentation: '1 galón / 1/2 Galón / 1/4 Galón / cuñete', use: 'Muros interiores' },
  { name: 'Esmalte sintetico', image: `${import.meta.env.BASE_URL}esmalte alcrilico.png`, description: 'Acabado resistente',  color: '#3fa9f2', category: 'Esmaltes', finish: 'Brillante', performance: 'Resistente a golpes y manchas', presentation: '1 galón / 1/4 de galón', use: 'Madera, metal y superficies preparadas' },
  { name: 'Esmalte 3 en 1', image: `${import.meta.env.BASE_URL}esmalte 3 en 1.png`, description: 'Acabado resistente',  color: '#5fe853', category: 'Esmaltes', finish: 'Brillante', performance: 'Resistente a golpes y manchas', presentation: '1 galón / 1/4 de galón', use: 'Madera, metal y superficies preparadas' },
  { name: 'Estuco Alcrilico', image: `${import.meta.env.BASE_URL}estuco alcrilico 30kg.png`, description: 'Protege de la humedad',  color: '#f4c400', category: 'Estuco', finish: 'Satinado', performance: 'Protección contra humedad', presentation: '30 KG / 15 KG / 6 KG', use: 'Fachadas, terrazas y exteriores' },
  { name: 'Estuco plastico', image: `${import.meta.env.BASE_URL}estuco plastico 5g.png`, description: 'Protege de la humedad',  color: '#3fa9f2', category: 'Estuco', finish: 'Satinado', performance: 'Protección contra humedad', presentation: '5 Galón / 2.5 Galón / 1 Galón / 1/2 Galón / 1/4 Galón / 1/8 Galón / 1/16 Galón', use: 'Fachadas, terrazas y exteriores' },
  { name: 'Impermeabilizante', image: `${import.meta.env.BASE_URL}imperproteja 5g.png`, description: 'Protege de la humedad',  color: '#5fe853', category: 'Impermeabilizante', finish: 'Satinado', performance: 'Protección contra humedad', presentation: '5 Galón / 1 galón', use: 'Fachadas, terrazas y exteriores' },
]
const slides = [
  ['Pintar mi hogar', '¿Qué quieres hacer hoy?', 'Encuentra el color, la protección y el acabado que tu proyecto necesita.', 'VER PRODUCTOS'],
  ['Inspírate', 'Dale vida a tus espacios', 'Colores que convierten cada rincón en un lugar más tuyo.', 'DESCUBRIR COLORES'],
  ['Protege lo que amas', 'Belleza que dura más', 'Soluciones resistentes para cuidar tus superficies por mucho tiempo.', 'CONOCE LA PROTECCIÓN'],
]
const slugify = (name) => name.toLowerCase().replaceAll(' ', '-')

function Header() {
  return <><div className="announcement"></div><header className="site-header"><a className="brand" href="/" onClick={goHome}><img src={`${import.meta.env.BASE_URL}logo-pintullano.png`} alt="Pintullano" /></a><nav><a href="/contacto">CONTACTO</a><a href="/productos">PRODUCTOS</a><a className="category-button" href="/">INICIO</a></nav></header></>
}
function goHome(event) { if (window.location.pathname !== '/') { event.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')) } }
function HeroCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => { const timer = setInterval(() => setActive((value) => (value + 1) % slides.length), 6000); return () => clearInterval(timer) }, [])
  const [eyebrow, title, description, cta] = slides[active]
  return <section className="hero" id="inicio"><img src={`${import.meta.env.BASE_URL}paint-hero.png`} alt="Persona pintando un espacio del hogar" /><div className="hero-overlay" /><div className="hero-copy"><p>{eyebrow}</p><h1>{title}</h1><p>{description}</p><a className="button" href="/productos">{cta} ↓</a></div><div className="slider-controls"><div className="dots" role="tablist" aria-label="Diapositivas principales">{slides.map((slide, index) => <button key={slide[1]} className={index === active ? 'list-active' : ''} onClick={() => setActive(index)} aria-label={`Ir a diapositiva ${index + 1}`} aria-selected={index === active} />)}</div><span>0{active + 1} / 03</span></div></section>
}
function AboutSection() {
  return (
    <section className="about-section" id="quienes-somos">
      <div className="about-visual">
        <img src={`${import.meta.env.BASE_URL}Logo Pintullano sobre Atardecer Vibrante.png`} />
        <div className="about-brand">
          
          <small>COLOR QUE TRANSFORMA</small>
        </div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">Conócenos</p>
        <h2>Colores que hablan de quién eres.</h2>
        <p className="about-lead">Somos una empresa independiente de pinturas dedicada a crear soluciones confiables para transformar hogares, negocios y proyectos.</p>
        <div className="about-values">
          <div>
            <span>01</span>
            <h3>Quiénes somos</h3>
            <p>Un equipo cercano que cree que pintar es mucho más que cambiar un color: es darle nueva vida a cada espacio.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Nuestra misión</h3>
            <p>Acompañarte con productos de calidad, asesoría honesta y colores que hagan realidad tu proyecto.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Nuestra visión</h3>
            <p>Ser la marca independiente de confianza para quienes quieren transformar sus espacios en Colombia.</p>
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
        src={product.image}
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
function ProductCard({ product }) { return <article className="product-card"><ProductVisual product={product} /><div className="product-info"><p>{product.description}</p><h3>{product.name}</h3><strong>{product.price}</strong><a href={`/producto/${slugify(product.name)}`}>VER PRODUCTO →</a></div></article> }
function Products({ title = 'Productos destacados' }) {
  const [category, setCategory] = useState('Todos')
  const categories = ['Todos', 'Vinillos',  'Esmaltes','Estuco',"Impermeabilizante"]
  const visible = category === 'Todos' ? products : products.filter((product) => product.category === category)
  return <section className="products" id="productos"><div className="section-heading"><div><p className="eyebrow">Calidad para cada proyecto</p><h2>Productos destacados</h2></div><p>Soluciones para pintar, renovar y proteger tus espacios.</p></div><div className="product-filter" role="tablist" aria-label="Filtrar productos">{categories.map((item) => <button key={item} className={category === item ? 'filter-active' : ''} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}</button>)}</div><div className="product-grid">{visible.map((product) => <ProductCard key={product.name} product={product} />)}</div></section>
}
function CatalogPage() {
  return <><Header /><main className="catalog-page"><Products title="Nuestros productos" /></main><Footer /></>
}
function ContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const message = [
      'Hola, quiero hablar sobre un proyecto de pintura.',
      '',
      `Nombre: ${data.get('name')}`,
      `Correo: ${data.get('email')}`,
      `Teléfono: ${data.get('phone') || 'No especificado'}`,
      `Necesidad: ${data.get('interest')}`,
      `Proyecto: ${data.get('message')}`,
    ].join('\n')
    const whatsappUrl = `https://wa.me/573143981200?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setSent(true)

    
  } 
  
  return <><Header />
  
  <main className="contact-page">
    <section className="contact-hero">
      <p className="eyebrow">Hablemos de tu proyecto</p>
      <h1>Cuéntanos qué quieres transformar.</h1>
      <p>Estamos listos para ayudarte a elegir los productos y colores ideales para tu espacio.</p>
      </section>
      <section className="contact-content">
        <div className="contact-intro">
          <p className="eyebrow">Asesoría personalizada</p>
          <h2>¿Tienes un proyecto en mente?</h2>
          <p>Déjanos tus datos y un especialista se pondrá en contacto contigo para acompañarte.</p>
          <div className="contact-details">
            <div>
              <strong>VISÍTANOS</strong>
              <span>Villavicencio Meta, Colombia</span>
              </div>
              <div>
                <strong>ESCRÍBENOS</strong>
                <a href="mailto:hola@pintullano.co">hola@pintullano.co</a>
                </div>
                <div>
                  <strong>LLÁMANOS</strong>
                  <span>+57 314 398 1200</span>
                  </div>
                  <div>
                  <strong>VISÍTANOS</strong>
                  
                  </div>
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
                  
                  <form className="contact-form" onSubmit={submit}><label>Nombre completo *<input name="name" required placeholder="Tu nombre" />
                  </label>
                  <label>Correo electrónico *<input type="email" name="email" required placeholder="tu@email.com" />
                  </label>
                  <label>Teléfono<input name="phone" placeholder="+57 300 000 0000" />
                  </label>
                  <label>¿Qué necesitas? *<select name="interest" required defaultValue="">
                    <option value="" disabled>Selecciona una opción</option>
                    <option>Asesoría para elegir pintura</option>
                    <option>Cotización de productos</option>
                    <option>Proyecto de pintura</option>
                    <option>Otro</option>
                    </select>
                    </label>
                    <label>Cuéntanos sobre tu proyecto *<textarea name="message" required rows="5" placeholder="Cuéntanos qué espacio quieres pintar...">
                      </textarea>
                      </label>
                      <label className="privacy">
                        <input type="checkbox" required /> Acepto la política de privacidad *</label>
                        <button className="button" type="submit">{sent ? 'MENSAJE ENVIADO ✓' : 'ENVIAR MENSAJE →'}
                          </button>{sent && <p className="form-success">Se abrió WhatsApp con tu mensaje listo para enviar.</p>}
                          <small>* Campos obligatorios. Te responderemos en menos de 24 horas hábiles.</small></form></section></main><Footer />
                          </>
                          
}
function Footer() { return <footer id="contacto"><div><div className="footer-brand"><img src={`${import.meta.env.BASE_URL}logo-pintullano.png`} alt="Pintullano" /></div><p>Pinturas para crear espacios que hablan de ti.</p></div><div><p className="eyebrow yellow-text">Contáctanos</p><p>+57 314 398 1200</p><a href="mailto:hola@pintullano.co">hola@pintullano.co</a><p>Villavicencio Meta, Colombia</p></div></footer> }
function Detail({ product }) { return <><Header /><main className="detail-page"><a className="back-home" href="/" onClick={goHome}>← Volver a la página de inicio</a><section className="product-detail"><ProductVisual product={product} large /><div className="detail-copy"><p className="eyebrow">Pintullano · {product.category}</p><h1>{product.name}</h1><p className="detail-description">{product.description}. Una solución confiable para renovar tus espacios con un acabado profesional.</p><strong className="detail-price">{product.price}</strong><button className="button">CONSULTAR DISPONIBILIDAD</button><dl><div><dt>Acabado</dt><dd>{product.finish}</dd></div><div><dt>Rendimiento</dt><dd>{product.performance}</dd></div><div><dt>Presentación</dt><dd>{product.presentation}</dd></div><div><dt>Uso recomendado</dt><dd>{product.use}</dd></div></dl></div></section><Products /></main><Footer /></> }
function getProduct() { const slug = window.location.pathname.match(/^\/producto\/([^/]+)/)?.[1]; return products.find((product) => slugify(product.name) === slug) }
export default function App() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    const click = (event) => {
      const link = event.target.closest('a[href^="/producto/"], a[href="/contacto"], a[href="/productos"]')
      if (!link) return
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
  if (path.startsWith('/productos')) return <CatalogPage />
  if (product) return <Detail product={product} />
  return <><Header /><main><HeroCarousel /><AboutSection /><section className="cta"><p className="eyebrow">Inspírate y atrévete</p><h2>El color cambia todo.</h2><p>Haz de tu casa un lugar más tuyo. Te acompañamos a elegir el tono perfecto.</p><a className="button yellow" href="/contacto">HABLEMOS DE TU PROYECTO</a></section></main><Footer /></>
}