import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface CategoriesSectionProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoriesSection({
  selectedCategoryId,
  onSelectCategory,
}: CategoriesSectionProps) {
  function handleCategoryClick(categoryId: string) {
    onSelectCategory(categoryId);
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <section id="categories" className="scroll-mt-[72px] bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-700">Product Categories</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore Technology by Category
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Select a category to filter our featured product lines. Specific models and availability
            are confirmed directly with our staff.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategoryId === category.id;
            return (
              <article
                key={category.id}
                className={`group flex flex-col overflow-hidden rounded-xl border bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isSelected
                    ? 'border-blue-600 ring-1 ring-blue-600'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <SafeImage
                    src={category.image}
                    alt={category.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="font-mono-tabular">{category.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>Category</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {category.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(category.id)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <span>View {category.name}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
