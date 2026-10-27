'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="bg-black text-white text-center py-2 text-sm">
        <p>✨ Envío a toda Colombia | Compra segura | Precios en COP</p>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <Link href="/" className="flex items-center">
            <div className="text-2xl md:text-3xl font-serif tracking-wide">
              <span className="text-gold">AURUM</span> <span className="text-black">JOYERÍA</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/catalogo" className="text-gray-900 hover:text-gold transition-colors font-medium">
              Catálogo
            </Link>
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                className="text-gray-700 hover:text-gold transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/carrito" className="relative p-2 hover:text-gold transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link href="/catalogo" className="text-gray-900 hover:text-gold transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
              Catálogo Completo
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                className="text-gray-700 hover:text-gold transition-colors pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
