import Link from "next/link";
import Categories from "../components/shared/Categories";
import About from "../components/shared/About";

export const metadata = {
  title: "Earphones | Audiophile",
  description: "Shop our premium earphones collection",
};

export default function EarphonesPage() {
  const earphones = [
    {
      id: 1,
      slug: "yx1-earphones",
      name: "YX1 Wireless Earphones",
      description:
        "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
      image: "/assets/images/products/yx1-earphones.jpg",
      isNew: true,
    },
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="bg-[#191919] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-24 text-center">
          <h2>Earphones</h2>
        </div>
      </section>

      {/* Products List */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-32">
        <div className="space-y-32">
          {earphones.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Product Image */}
              <div className="flex-1 w-full">
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
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center md:text-left">
                {product.isNew && (
                  <p className="overline text-[#D87D4A] mb-4">NEW PRODUCT</p>
                )}
                <h2 className="mb-6 max-w-[400px] mx-auto md:mx-0">
                  {product.name}
                </h2>
                <p className="text-black/50 mb-8 max-w-[445px] mx-auto md:mx-0">
                  {product.description}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-block bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
                >
                  See Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* About Section */}
      <About />
    </main>
  );
}
