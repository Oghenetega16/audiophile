import Image from "next/image";
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
            <section className="max-w-7xl mx-auto px-6 pt-4 pb-6 md:py-8 md:px-10 lg:px-20">
                <Link
                    href={`/${product.category}`}
                    className="text-black/50 hover:text-[#D87D4A] transition-colors text-[15px]"
                >
                    Go Back
                </Link>
            </section>

            {/* Product Details */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Product Image */}
                    <div className="bg-[#F1F1F1] rounded-lg h-[327px] md:h-[480px] w-full overflow-hidden aspect-square flex items-center justify-center">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="object-contain max-w-full h-auto"
                        />
                    </div>

                    {/* Product Info */}
                    <div>
                        {product.isNew && (<p className="text-[#D87D4A] mb-6 text-sm tracking-[10px]">NEW PRODUCT</p>)}
                        <h2 className="mb-6">{product.name}</h2>
                        <p className="text-black/50 mb-8">{product.description}</p>
                        <p className="text-[18px] font-bold tracking-[1.3px] mb-8">{formatPrice(product.price)}</p>

                        {/* Add to Cart Component */}
                        <AddToCart product={product} />
                    </div>
                </div>
            </section>

            {/* Features & In The Box */}
            <section className="max-w-7xl mx-auto px-6 mt-22 md:px-10 lg:px-20 pb-20 md:mb-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-[125px]">
                    {/* Features */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-8">Features</h3>
                        <div className="text-black/50 whitespace-pre-line">{product.features}</div>
                    </div>

                    {/* In The Box */}
                    <div className="mt-22 flex flex-col md:flex-row md:gap-[11px] lg:flex-col lg:mt-0">
                        <h3 className="mb-8 w-[339px] md:mb-0">In The Box</h3>
                        <ul className="space-y-2">
                            {product.includedItems.map((item, index) => (
                                <li key={index} className="flex gap-6">
                                    <span className="text-[#D87D4A] font-bold min-w-5">{item.quantity}x</span>
                                    <span className="text-black/50">{item.item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="max-w-7xl mx-auto mb-30 px-6 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 lg:gap-8">
                    <div className="md:col-span-2 space-y-5 lg:space-y-8">
                        <div className="bg-[#F1F1F1] rounded-lg h-[174px] lg:h-[280px] relative overflow-hidden">
                            <Image
                                src={product.gallery.first}
                                alt={`${product.name} gallery 1`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-[#F1F1F1] rounded-lg h-[174px] lg:h-[280px] relative overflow-hidden">
                            <Image
                                src={product.gallery.second}
                                alt={`${product.name} gallery 2`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <div className="bg-[#F1F1F1] rounded-lg h-[368px] lg:h-[592px] relative overflow-hidden">
                            <Image
                                src={product.gallery.third}
                                alt={`${product.name} gallery 3`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-10">
                <h3 className="text-center mb-16">You May Also Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="text-center flex flex-col">
                            <div className="bg-[#F1F1F1] rounded-lg mb-8 h-30 md:h-[318px] flex items-center justify-center">
                                <Image
                                    src={relatedProduct.image}
                                    alt={relatedProduct.name}
                                    width={200}
                                    height={200}
                                    className="object-contain max-w-full w-[75px] h-[93px] md:w-[200px] md:h-[200px]"
                                />
                            </div>
                            <h5 className="mb-8">{relatedProduct.name}</h5>
                            <Link
                                href={`/products/${relatedProduct.slug}`}
                                className="inline-block bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold w-[164px] mx-auto tracking-[1px] px-8 py-4 transition-colors mt-auto"
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