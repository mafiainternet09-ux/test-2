
import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import PotteryProcess from './components/PotteryProcess';
import ProductGallery from './components/ProductGallery';
import CreativeStudio from './components/CreativeStudio';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12 space-y-16">
          <Introduction />
          <PotteryProcess />
          <ProductGallery />
          <CreativeStudio />
        </main>
        <Chatbot />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
