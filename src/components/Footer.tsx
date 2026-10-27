import Link from 'next/link';
import { categories } from '@/data/products';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-serif mb-4">
              <span className="text-gold">AURUM</span> JOYERÍA
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Joyería de oro auténtico en Colombia. Calidad, elegancia y confianza.
            </p>
            <p className="text-gray-400 text-sm">
              Precios expresados en Pesos Colombianos (COP)
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4 text-gold">Categorías</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/catalogo?categoria=${cat.slug}`} className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4 text-gold">Información</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Envíos a toda Colombia</li>
              <li className="text-gray-400">Garantía en oro macizo</li>
              <li className="text-gray-400">Compra segura</li>
              <li className="text-gray-400">Atención al cliente</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4 text-gold">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>WhatsApp: +57 XXX XXX XXXX</li>
              <li>Atención: Lunes a Sábado</li>
              <li>8:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Aurum Joyería. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">Los precios y disponibilidad son estimados con fines demostrativos.</p>
        </div>
      </div>
    </footer>
  );
}
