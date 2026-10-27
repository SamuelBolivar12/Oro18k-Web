import { Suspense } from 'react';
import CatalogClient from './CatalogClient';

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <CatalogClient />
    </Suspense>
  );
}
