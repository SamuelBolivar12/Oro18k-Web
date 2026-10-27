import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts, getNewProducts, categories } from '@/data/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 6);
  const newProducts = getNewProducts().slice(0, 6);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Elegancia en <span className="text-gold">Oro Auténtico</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Cadenas, manillas, aretes y joyas de oro macizo para ocasiones especiales y uso diario
            </p>
            <Link
              href="/catalogo"
              className="inline-block bg-gold hover:bg-gold-dark text-white px-8 py-3 text-lg font-medium transition-colors"
            >
              Explorar Colección
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Categorías Destacadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group relative overflow-hidden bg-gray-100 aspect-square hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img
                  src={`https://images.unsplash.com/photo-${cat.slug === 'cadenas' ? '1515562141207-7a88fb7ce338' : cat.slug === 'manillas' ? '1611652022419-a9419f74343d' : cat.slug === 'aretes' ? '1535632066927-ab7c9ab60908' : cat.slug === 'dijes' ? '1608042314453-ae338d80c427' : '1605100804763-247f67b3557e'}?w=400&h=400&fit=crop`}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-white font-serif text-lg">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">Más Vendidos</h2>
            <Link href="/catalogo" className="text-gold hover:text-gold-dark transition-colors font-medium">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Gold Collection Info */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Colección de Oro</h2>
            <p className="text-xl text-gray-300">Diferentes quilatajes para cada presupuesto</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gold/30">
              <h3 className="text-2xl font-serif text-gold mb-2">Oro 18K</h3>
              <p className="text-gray-300 mb-4">75% oro puro - Máxima calidad</p>
              <p className="text-sm text-gray-400">Ideal para joyería fina y uso prolongado</p>
            </div>
            <div className="text-center p-6 border border-gold/30">
              <h3 className="text-2xl font-serif text-gold mb-2">Oro 14K</h3>
              <p className="text-gray-300 mb-4">58.3% oro puro - Excelente relación calidad-precio</p>
              <p className="text-sm text-gray-400">Más resistente, ideal para uso diario</p>
            </div>
            <div className="text-center p-6 border border-gold/30">
              <h3 className="text-2xl font-serif text-gold mb-2">Oro 10K</h3>
              <p className="text-gray-300 mb-4">41.7% oro puro - Más económico</p>
              <p className="text-sm text-gray-400">Buena durabilidad a precio accesible</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">Novedades</h2>
            <Link href="/catalogo" className="text-gold hover:text-gold-dark transition-colors font-medium">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Materials Guide */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Guía de Materiales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-serif text-xl mb-2 text-gold">Oro 18K</h3>
              <p className="text-sm text-gray-600">Oro macizo con 75% de oro puro. Alta calidad, color dorado intenso.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-serif text-xl mb-2 text-gold">Oro 14K</h3>
              <p className="text-sm text-gray-600">Oro macizo con 58.3% de oro puro. Más resistente y económico.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-serif text-xl mb-2 text-gold">Plata 925</h3>
              <p className="text-sm text-gray-600">Plata esterlina 92.5% pura. Brillante, duradera e hipoalergénica.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-serif text-xl mb-2">Bañadas en Oro</h3>
              <p className="text-sm text-gray-600">Acero inoxidable o plata con baño de oro. <strong>NO es oro macizo</strong> - claramente diferenciadas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Confianza y Servicio</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-serif text-lg mb-2">Envío Nacional</h3>
              <p className="text-sm text-gray-600">A toda Colombia</p>
            </div>
            <div>
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-serif text-lg mb-2">Oro Auténtico</h3>
              <p className="text-sm text-gray-600">Garantía en joyas de oro macizo</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-serif text-lg mb-2">Compra Segura</h3>
              <p className="text-sm text-gray-600">Protección de datos</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-serif text-lg mb-2">Atención Personalizada</h3>
              <p className="text-sm text-gray-600">Por WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
