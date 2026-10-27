import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/producto/${product.slug}`} className="group">
      <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-gold text-white px-2 py-1 text-xs font-medium">
              NUEVO
            </span>
          )}
          {product.oldPrice && (
            <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-medium">
              OFERTA
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">AGOTADO</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg mb-2 line-clamp-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {product.material} {product.karat && product.karat !== 'N/A' && `• ${product.karat}`}
          </p>
          {product.weight && (
            <p className="text-xs text-gray-500 mb-2">
              Peso: {product.weight}g {product.weightType === 'approximate' && '(aprox.)'}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">COP</p>
        </div>
      </div>
    </Link>
  );
}
