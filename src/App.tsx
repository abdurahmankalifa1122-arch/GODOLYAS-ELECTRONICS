import { useEffect, useState } from 'react';
import type { ProductItem } from './data/catalog';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductsSection } from './components/ProductsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { BackToTopButton } from './components/BackToTopButton';

const SECTION_IDS = ['home', 'categories', 'products', 'about', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [prefilledInquiryProduct, setPrefilledInquiryProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + 110;
      for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('home');
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleResetFilters() {
    setSelectedCategoryId('all');
    setSearchQuery('');
  }

  function handleInquireProduct(product: ProductItem) {
    setPrefilledInquiryProduct(product);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar activeSection={activeSection} />

      <main>
        <HeroSection />

        <CategoriesSection
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        <ProductsSection
          selectedCategoryId={selectedCategoryId}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategoryId}
          onSearchChange={setSearchQuery}
          onResetFilters={handleResetFilters}
          onSelectProduct={setActiveProduct}
          onInquireProduct={handleInquireProduct}
        />

        <WhyChooseSection />

        <AboutSection />

        <ContactSection prefilledProduct={prefilledInquiryProduct} />
      </main>

      <Footer onSelectCategory={setSelectedCategoryId} />

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onPrefillContact={handleInquireProduct}
      />

      <BackToTopButton />
    </div>
  );
}
