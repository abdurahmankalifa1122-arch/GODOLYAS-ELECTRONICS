import { Search, X, MessageSquare, ArrowUpRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, type ProductItem } from '../data/catalog';
import { filterProducts, formatPriceEtb } from '../utils/commerce';
import { SafeImage } from './SafeImage';

interface ProductsSectionProps {
  selectedCategoryId: string;
  searchQuery: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onInquireProduct: (product: ProductItem) => void;
}

export function ProductsSection({
  selectedCategoryId,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onResetFilters,
  onSelectProduct,
  onInquireProduct,
}: ProductsSectionProps) {
  const filteredProducts = filterProducts(PRODUCTS, {
    categoryId: selectedCategoryId,
    searchQuery,
  });

  return (
    <section
      id="products"
      className="scroll-mt-[72px] border-t border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Search Input */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-700">Featured Catalog</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Electronics Showcase
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Browse our primary product lines. Where Ethiopian Birr (ETB) pricing is not listed,
              contact our team directly for live availability and pricing.
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <label htmlFor="product-search" className="sr-only">
              Search products and categories
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products or categories..."
                className="min-h-[44px] w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter products by category"
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategoryId === 'all'}
            onClick={() => onCategoryChange('all')}
            className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              selectedCategoryId === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            All Products
          </button>

          {CATEGORIES.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.id)}
                className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              No matching products found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Try adjusting your search term or selecting another category, or contact our team
              directly to check availability for a specific item.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            data-testid="product-grid"
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {filteredProducts.map((product) => {
              const priceLabel = formatPriceEtb(product.priceEtb);
              return (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <SafeImage
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span>{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Ethiopia</span>
                      </div>

                      <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                        {product.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-medium text-slate-500">Pricing (ETB)</span>
                        <span
                          className={
                            product.priceEtb !== null
                              ? 'font-mono-tabular text-sm font-semibold text-slate-900'
                              : 'font-display text-sm font-semibold text-blue-700'
                          }
                        >
                          {priceLabel}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onInquireProduct(product)}
                          className="inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Inquire</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
