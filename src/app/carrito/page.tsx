'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shipping = subtotal > 500000 ? 0 : 15000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Carrito de Compras</h1>
          <p className="text-gray-600 mb-8">Tu carrito está vacío</p>
          <Link
            href="/catalogo"
            className="inline-block bg-gold hover:bg-gold-dark text-white px-8 py-3 transition-colors"
          >
            Ir al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.product.id}-${item.variant || index}`} className="flex gap-4 p-4 border border-gray-200">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/producto/${item.product.slug}`} className="font-serif text-lg hover:text-gold transition-colors">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.product.material} {item.product.karat && item.product.karat !== 'N/A' && `• ${item.product.karat}`}
                  </p>
                  {item.variant && (
                    <p className="text-sm text-gray-600">Variante: {item.variant}</p>
                  )}
                  <p className="text-gold font-semibold mt-2">{formatPrice(item.product.price)}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                        className="w-8 h-8 border border-gray-300 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                        className="w-8 h-8 border border-gray-300 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.variant)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-6 border border-gray-200 sticky top-24">
              <h2 className="font-serif text-xl mb-4">Resumen del Pedido</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'GRATIS' : formatPrice(shipping)}</span>
                </div>
                {subtotal < 500000 && (
                  <p className="text-xs text-gray-600">
                    Envío gratis en compras superiores a $500.000 COP
                  </p>
                )}
              </div>
              
              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="block w-full text-center bg-gold hover:bg-gold-dark text-white py-3 mb-3 transition-colors"
              >
                Proceder al Pago
              </Link>
              
              <Link
                href="/catalogo"
                className="block w-full text-center border border-gray-300 hover:bg-gray-50 py-3 transition-colors"
              >
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
