import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/app/lib/products";
import Categories from "@/app/components/shared/Categories";
import About from "@/app/components/shared/About";
import AddToCart from "@/app/components/products/AddToCart";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Audiophile",
    };
  }

  return {
    title: `${product.name} | Audiophile`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.relatedProducts);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main>
      {/* Go Back Button */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-20">
        <Link
          href={`/${product.category}`}
          className="text-black/50 hover:text-[#D87D4A] transition-colors text-[15px]"
        >
          Go Back
        </Link>
      </section>

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="bg-[#F1F1F1] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            {/* Placeholder - Replace with actual image */}
            <div className="w-64 h-64 bg-gray-300 rounded-lg"></div>
            {/* 
            <Image
              src={product.image}
              alt={product.name}
              width={540}
              height={560}
              className="object-cover w-full h-full"
            />
            */}
          </div>

          {/* Product Info */}
          <div>
            {product.isNew && (
              <p className="overline text-[#D87D4A] mb-4">NEW PRODUCT</p>
            )}
            <h2 className="mb-6">{product.name}</h2>
            <p className="text-black/50 mb-8">{product.description}</p>
            <p className="text-[18px] font-bold tracking-[1.3px] mb-8">
              {formatPrice(product.price)}
            </p>

            {/* Add to Cart Component */}
            <AddToCart product={product} />
          </div>
        </div>
      </section>

      {/* Features & In The Box */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Features */}
          <div className="lg:col-span-2">
            <h3 className="mb-8">Features</h3>
            <div className="text-black/50 whitespace-pre-line">
              {product.features}
            </div>
          </div>

          {/* In The Box */}
          <div>
            <h3 className="mb-8">In The Box</h3>
            <ul className="space-y-2">
              {product.includedItems.map((item, index) => (
                <li key={index} className="flex gap-6">
                  <span className="text-[#D87D4A] font-bold min-w-5">
                    {item.quantity}x
                  </span>
                  <span className="text-black/50">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#F1F1F1] rounded-lg h-[174px] md:h-[280px]"></div>
            <div className="bg-[#F1F1F1] rounded-lg h-[174px] md:h-[280px]"></div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-[#F1F1F1] rounded-lg h-[368px] md:h-[592px]"></div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-32">
        <h3 className="text-center mb-16">You May Also Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="text-center">
              <div className="bg-[#F1F1F1] rounded-lg mb-8 h-[318px] flex items-center justify-center">
                {/* Placeholder */}
                <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
              </div>
              <h5 className="mb-8">{relatedProduct.name}</h5>
              <Link
                href={`/products/${relatedProduct.slug}`}
                className="inline-block bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
              >
                See Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <Categories />

      {/* About */}
      <About />
    </main>
  );
}