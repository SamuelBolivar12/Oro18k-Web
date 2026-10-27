'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    city: '',
    address: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shipping = subtotal > 500000 ? 0 : 15000;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  const handleWhatsAppOrder = () => {
    let message = `*PEDIDO - AURUM JOYERÍA*\n\n`;
    message += `*Cliente:*\n`;
    message += `Nombre: ${formData.name}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Dirección: ${formData.address}, ${formData.city}, ${formData.department}\n\n`;
    message += `*Productos:*\n`;
    
    items.forEach((item) => {
      message += `- ${item.product.name}\n`;
      if (item.variant) message += `  Variante: ${item.variant}\n`;
      message += `  Cantidad: ${item.quantity} x ${formatPrice(item.product.price)}\n`;
      message += `  Subtotal: ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });
    
    message += `*Resumen:*\n`;
    message += `Subtotal: ${formatPrice(subtotal)}\n`;
    message += `Envío: ${shipping === 0 ? 'GRATIS' : formatPrice(shipping)}\n`;
    message += `*TOTAL: ${formatPrice(total)}*\n\n`;
    message += `_Pedido generado desde aurum-joyeria.com_`;
    
    const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif mb-4">No hay productos en el carrito</h1>
          <Link href="/catalogo" className="text-gold hover:text-gold-dark">
            Ir al catálogo
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-3xl md:text-4xl font-serif mb-4">¡Pedido Recibido!</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Gracias por tu compra. Hemos recibido tu pedido correctamente.
          </p>
          <p className="text-gray-600 mb-8">
            Te contactaremos pronto por WhatsApp o correo electrónico para confirmar los detalles de tu pedido y envío.
          </p>
          <Link
            href="/"
            className="inline-block bg-gold hover:bg-gold-dark text-white px-8 py-3 transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="font-serif text-xl mb-4">Información de Contacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h2 className="font-serif text-xl mb-4">Información de Envío</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Departamento *</label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Municipio / Ciudad *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Dirección Completa *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300"
                      placeholder="Calle, número, barrio, apartamento..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h2 className="font-serif text-xl mb-4">Método de Pago</h2>
                <div className="space-y-3 mb-4">
                  <div className="p-4 border border-gray-300 bg-gray-50">
                    <p className="font-medium mb-2">Pedido por WhatsApp</p>
                    <p className="text-sm text-gray-600">Te enviaremos el resumen por WhatsApp para coordinar el pago y envío.</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
                  <p className="font-medium mb-1">Nota sobre pasarelas de pago</p>
                  <p>Para habilitar pagos online con Wompi, Mercado Pago o ePayco, se requieren credenciales. Esta es una versión de demostración.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gold hover:bg-gold-dark disabled:bg-gray-400 text-white py-3 text-lg font-medium transition-colors"
              >
                {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </form>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium transition-colors"
            >
              Enviar Pedido por WhatsApp
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-6 border border-gray-200 sticky top-24">
              <h2 className="font-serif text-xl mb-4">Resumen</h2>
              
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-gray-600">Cant: {item.quantity}</p>
                      {item.variant && <p className="text-gray-600 text-xs">{item.variant}</p>}
                      <p className="text-gold">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-300 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'GRATIS' : formatPrice(shipping)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
