import Image from "next/image";
import Link from "next/link";
import Categories from "./components/shared/Categories";
import About from "./components/shared/About";

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="bg-[#191919] text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-[400px] text-center lg:text-left mx-auto lg:mx-0">
                        <p className="text-white/50 text-sm tracking-[10px] font-normal mb-4">NEW PRODUCT</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6">XX99 MARK II<br />HEADPHONES</h1>
                        <p className="text-white/75 mb-10">
                            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                        </p>
                        <Link 
                            href="/products/xx99-mark-two-headphones"
                            className="inline-block bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
                        >
                            See Product
                        </Link>
                    </div>
                    <div className="hidden lg:flex justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[600px] h-[600px] border border-white/10 rounded-full"></div>
                            <div className="absolute w-[500px] h-[500px] border border-white/10 rounded-full"></div>
                            <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full"></div>
                        </div>
                        <div className="relative z-10">
                            <Image 
                                src="/assets/images/hero-headphones.png"
                                alt="XX99 Mark II Headphones"
                                width={400}
                                height={400}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <Categories />

            {/* Featured Product - ZX9 Speaker */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-32">
                <div className="bg-[#D87D4A] rounded-lg p-12 md:p-20 lg:p-24 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-1/4 lg:-translate-x-1/4 w-[600px] h-[600px] opacity-20">
                        <div className="absolute inset-0 border border-white rounded-full"></div>
                        <div className="absolute inset-12 border border-white rounded-full"></div>
                        <div className="absolute inset-24 border border-white rounded-full"></div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="flex-1 flex justify-center">
                            <Image 
                                src="/assets/images/speakers.png"
                                alt="ZX9 Speaker"
                                width={320}
                                height={320}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6">ZX9<br />SPEAKER</h2>
                            <p className="text-white/75 mb-10 max-w-[350px] mx-auto md:mx-0">
                                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                            </p>
                            <Link 
                                href="/products/zx9-speaker"
                                className="inline-block bg-black hover:bg-[#4C4C4C] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
                            >
                                See Product
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product - ZX7 Speaker */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-32">
                <div className="bg-[#F1F1F1] rounded-lg p-12 md:p-20 relative overflow-hidden min-h-80 flex items-center">
                    <div className="absolute inset-0">
                        <Image 
                            src="/assets/images/zx7-speaker.png"
                            alt="ZX7 Speaker"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10">
                        <h4 className="text-3xl font-bold tracking-wider mb-8">ZX7 SPEAKER</h4>
                        <Link 
                            href="/products/zx7-speaker"
                            className="inline-block border-2 border-black hover:bg-black hover:text-white text-black uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
                        >
                            See Product
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Product - YX1 Earphones */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#F1F1F1] rounded-lg min-h-80 relative overflow-hidden">
                        <Image 
                            src="/assets/images/yx1-earphones.jpg"
                            alt="YX1 Earphones"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="bg-[#F1F1F1] rounded-lg p-12 flex flex-col justify-center">
                        <h4 className="text-3xl font-bold tracking-wider mb-8">YX1 EARPHONES</h4>
                        <Link 
                            href="/products/yx1-earphones"
                            className="inline-block border-2 border-black hover:bg-black hover:text-white text-black uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors w-fit"
                        >
                            See Product
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <About />
        </main>
    );
}