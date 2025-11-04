import Image from "next/image";
import Link from "next/link";
import Categories from "../components/shared/Categories";
import About from "../components/shared/About";

export const metadata = {
    title: "Speakers | Audiophile",
    description: "Shop our premium speakers collection",
};

export default function SpeakersPage() {
    const speakers = [
        {
            id: 1,
            slug: "zx9-speaker",
            name: "ZX9 Speaker",
            description:
                "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
            image: "/assets/images/products/zx9-speaker.png",
            isNew: true,
        },
        {
            id: 2,
            slug: "zx7-speaker",
            name: "ZX7 Speaker",
            description:
                "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
            image: "/assets/images/products/zx7-speaker.png",
            isNew: false,
        },
    ];

    return (
        <main>
            {/* Page Header */}
            <section className="bg-[#191919] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-8 md:py-[97px] text-center">
                    <h2>Speakers</h2>
                </div>
            </section>

            {/* Products List */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-32 lg:pb-0">
                <div className="space-y-32">
                    {speakers.map((product, index) => (
                        <div
                            key={product.id}
                            className={`flex flex-col ${
                                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                            } gap-12 items-center`}
                        >
                            {/* Product Image */}
                            <div className="flex-1 w-full">
                                <div className="bg-[#F1F1F1] rounded-lg overflow-hidden w-full md:h-[352px] aspect-square flex items-center justify-center">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="object-contain max-w-full h-auto"
                                    />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 text-center lg:text-left">
                                {product.isNew && (
                                    <p className="text-[#D87D4A] mb-6 text-sm tracking-[10px]">NEW PRODUCT</p>
                                )}
                                <h2 className="mb-6 max-w-[400px] mx-auto md:mx-0">{product.name}</h2>
                                <p className="text-black/50 mb-8 max-w-[445px] mx-auto md:mx-0">{product.description}</p>
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