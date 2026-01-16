
import React, { useState } from 'react';
import type { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import EditProductModal from './EditProductModal';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { isLoggedIn } = useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-brand-dark">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        </div>
        {isLoggedIn && (
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="bg-brand-accent text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-opacity-80 transition-colors"
              aria-label={`Chỉnh sửa ${product.name}`}
            >
              Chỉnh sửa
            </button>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <EditProductModal
          product={product}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </>
  );
};


const ProductGallery: React.FC = () => {
  const { products } = useAuth();
  return (
    <section id="san-pham" className="mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-6 text-center">Sản phẩm tiêu biểu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGallery;
