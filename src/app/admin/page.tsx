'use client';

import { useState } from 'react';
import { products, categories } from '@/data/products';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 border border-gray-200 w-full max-w-md">
          <h1 className="text-2xl font-serif mb-6 text-center">Panel Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300"
                placeholder="Ingrese contraseña"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-colors"
            >
              Ingresar
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Demo: contraseña = admin123<br />
            NO usar en producción
          </p>
        </div>
      </div>
    );
  }

  const totalProducts = products.filter(p => p.isPublished).length;
  const inStockProducts = products.filter(p => p.inStock && p.isPublished).length;
  const lowStockProducts = products.filter(p => p.inventory < 5 && p.inStock && p.isPublished).length;
  const totalValue = products.filter(p => p.isPublished).reduce((sum, p) => sum + (p.price * p.inventory), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-serif">Panel Administrativo - Aurum Joyería</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm hover:text-gold transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 bg-white border border-gray-200 p-4 h-fit">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-2 ${activeTab === 'dashboard' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-2 ${activeTab === 'products' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
              >
                Productos
              </button>
            </nav>
          </aside>

          <main className="flex-1">
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-serif mb-6">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                    <p className="text-2xl font-semibold">{totalProducts}</p>
                  </div>
                  <div className="bg-white p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">En Stock</p>
                    <p className="text-2xl font-semibold text-green-600">{inStockProducts}</p>
                  </div>
                  <div className="bg-white p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Stock Bajo (&lt;5)</p>
                    <p className="text-2xl font-semibold text-orange-600">{lowStockProducts}</p>
                  </div>
                  <div className="bg-white p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Valor Inventario</p>
                    <p className="text-xl font-semibold">{formatPrice(totalValue)}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
                  <p className="font-medium mb-2">Panel de Demostración</p>
                  <p>Este panel es solo para demostración. Para funcionalidad completa se requiere conexión a base de datos.</p>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h2 className="text-2xl font-serif mb-6">Gestión de Productos</h2>
                <div className="bg-white border border-gray-200 overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Producto</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Categoría</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Material</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Precio</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Inventario</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.images[0]} alt="" className="w-12 h-12 object-cover" />
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{categories.find(c => c.id === product.category)?.name}</td>
                          <td className="px-4 py-3 text-sm">{product.material} {product.karat && product.karat !== 'N/A' && product.karat}</td>
                          <td className="px-4 py-3 text-sm">{formatPrice(product.price)}</td>
                          <td className="px-4 py-3 text-sm">{product.inventory}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {product.inStock ? 'En Stock' : 'Agotado'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
