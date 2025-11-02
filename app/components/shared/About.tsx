import Image from "next/image";

export default function About() {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-8">
                        BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
                    </h2>
                    <p className="text-black/50">
                        Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                    </p>
                </div>
                <div className="order-1 md:order-2">
                    <div className="bg-[#F1F1F1] rounded-lg h-[300px] md:h-[400px] relative overflow-hidden">
                        <Image 
                            src="/assets/images/about.png"
                            alt="about image"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}