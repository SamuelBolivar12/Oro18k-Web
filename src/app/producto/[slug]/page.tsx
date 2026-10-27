'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product, quantity, selectedVariant || undefined);
      alert('Producto agregado al carrito');
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id && p.isPublished)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/catalogo" className="text-gold hover:text-gold-dark transition-colors">
            ← Volver al catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-semibold text-gold">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-6">Precios en Pesos Colombianos (COP)</p>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="border-t border-b border-gray-200 py-4 mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">{product.material}</span>
              </div>
              {product.karat && product.karat !== 'N/A' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Quilataje:</span>
                  <span className="font-medium">{product.karat}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Peso:</span>
                  <span className="font-medium">
                    {product.weight} gramos {product.weightType === 'approximate' && '(aproximado)'}
                  </span>
                </div>
              )}
              {product.length && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Longitud:</span>
                  <span className="font-medium">{product.length}</span>
                </div>
              )}
              {product.linkType && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de eslabón:</span>
                  <span className="font-medium">{product.linkType}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensiones:</span>
                  <span className="font-medium">{product.dimensions}</span>
                </div>
              )}
            </div>

            {product.note && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6">
                <p className="text-sm text-yellow-800">{product.note}</p>
              </div>
            )}

            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Talla / Variante</label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300"
                >
                  {product.variants.map((variant) => (
                    <option key={variant} value={variant}>{variant}</option>
                  ))}
                </select>
              </div>
            )}

            {product.inStock ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Cantidad</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gold hover:bg-gold-dark text-white py-3 text-lg font-medium mb-4 transition-colors"
                >
                  Agregar al Carrito
                </button>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-black hover:bg-gray-900 text-white py-3 text-lg font-medium mb-6 transition-colors"
                  onClick={handleAddToCart}
                >
                  Comprar Ahora
                </Link>
              </>
            ) : (
              <div className="mb-6">
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 text-lg font-medium mb-4 cursor-not-allowed"
                >
                  Agotado
                </button>
                <p className="text-sm text-gray-600">Producto agotado o bajo pedido. Contactar por WhatsApp.</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
              <p>🚚 <strong>Envío:</strong> A toda Colombia</p>
              <p>✓ <strong>Garantía:</strong> En joyas de oro macizo</p>
              <p>🔒 <strong>Compra segura:</strong> Protegemos tu información</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-serif mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
