'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedKarat, setSelectedKarat] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.isPublished);

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => {
        const cat = categories.find(c => c.slug === selectedCategory);
        return cat && p.category === cat.id;
      });
    }

    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => 
        p.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
    }

    if (selectedKarat !== 'all') {
      filtered = filtered.filter(p => p.karat === selectedKarat);
    }

    if (priceRange.min) {
      filtered = filtered.filter(p => p.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(p => p.price <= parseInt(priceRange.max));
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, selectedMaterial, selectedKarat, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedKarat('all');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-cream py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif mb-2">Catálogo</h1>
          <p className="text-gray-600">Descubre nuestra colección de joyería de oro auténtico</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-xl">Filtros</h2>
                <button onClick={clearFilters} className="text-sm text-gold hover:text-gold-dark">
                  Limpiar
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Categoría</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="category" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} className="mr-2" />
                    <span className="text-sm">Todas</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center cursor-pointer">
                      <input type="radio" name="category" checked={selectedCategory === cat.slug} onChange={() => setSelectedCategory(cat.slug)} className="mr-2" />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Material</h3>
                <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)} className="w-full px-3 py-2 border border-gray-300 text-sm">
                  <option value="all">Todos</option>
                  <option value="Oro macizo">Oro macizo</option>
                  <option value="Plata 925">Plata 925</option>
                  <option value="baño">Baño de oro</option>
                </select>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Quilataje</h3>
                <select value={selectedKarat} onChange={(e) => setSelectedKarat(e.target.value)} className="w-full px-3 py-2 border border-gray-300 text-sm">
                  <option value="all">Todos</option>
                  <option value="18K">18K</option>
                  <option value="14K">14K</option>
                </select>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Precio (COP)</h3>
                <div className="space-y-2">
                  <input type="number" placeholder="Mínimo" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="w-full px-3 py-2 border border-gray-300 text-sm" />
                  <input type="number" placeholder="Máximo" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="w-full px-3 py-2 border border-gray-300 text-sm" />
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredProducts.length} producto(s)</p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-gray-300">
                <option value="newest">Más recientes</option>
                <option value="featured">Destacados</option>
                <option value="price-asc">Menor a Mayor</option>
                <option value="price-desc">Mayor a Menor</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No se encontraron productos</p>
                <button onClick={clearFilters} className="text-gold hover:text-gold-dark">Limpiar filtros</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
