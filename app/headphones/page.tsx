import Link from "next/link";
import Categories from "../components/shared/Categories";
import About from "../components/shared/About";

export const metadata = {
    title: "Headphones | Audiophile",
    description: "Shop our premium headphones collection",
};

export default function HeadphonesPage() {
  const headphones = [
    {
      id: 1,
      slug: "xx99-mark-two-headphones",
      name: "XX99 Mark II Headphones",
      description:
        "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
      image: "/assets/images/products/xx99-mark-two.jpg",
      isNew: true,
    },
    {
      id: 2,
      slug: "xx99-mark-one-headphones",
      name: "XX99 Mark I Headphones",
      description:
        "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
      image: "/assets/images/products/xx99-mark-one.jpg",
      isNew: false,
    },
    {
      id: 3,
      slug: "xx59-headphones",
      name: "XX59 Headphones",
      description:
        "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
      image: "/assets/images/products/xx59.jpg",
      isNew: false,
    },
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="bg-[#191919] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-24 text-center">
          <h2>Headphones</h2>
        </div>
      </section>

      {/* Products List */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-32">
        <div className="space-y-32">
          {headphones.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Product Image */}
              <div className="flex-1 w-full">
                <div className="bg-[#F1F1F1] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                  <div className="w-64 h-64 bg-gray-300 rounded-lg"></div>
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