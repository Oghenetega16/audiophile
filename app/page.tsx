import Image from "next/image";
import Link from "next/link";
import Categories from "./components/shared/Categories";
import About from "./components/shared/About";

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="bg-[#191919] text-white relative overflow-hidden">
                {/* Desktop Background Image */}
                <div className="hidden lg:block absolute inset-0">
                    <Image 
                        src="/assets/images/hero-headphone-bg.png"
                        alt=""
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

                {/* Tablet/Mobile Background Image */}
                <div className="lg:hidden absolute inset-0">
                    <Image 
                        src="/assets/images/hero-headphone-sm.png"
                        alt=""
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-32 lg:py-40 relative z-10">
                    <div className="max-w-[400px] text-center lg:text-left mx-auto lg:mx-0">
                        <p className="text-white/50 text-sm tracking-[10px] font-normal mb-4 uppercase">New Product</p>
                        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-wide mb-6 uppercase">
                            XX99 Mark II<br />Headphones
                        </h1>
                        <p className="text-white/75 mb-10 leading-relaxed md:w-[349px]">
                            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                        </p>
                        <Link 
                            href="/products/xx99-mark-two-headphones"
                            className="inline-block bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
                        >
                            See Product
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <Categories />

            {/* Featured Product - ZX9 Speaker */}
            <section className="max-w-7xl pt-16 mx-auto px-6 md:px-10 md:pt-13 lg:px-20 pb-4 md:pb-6 lg:pb-8">
                <div className="bg-[#D87D4A] rounded-lg p-12 md:p-20 lg:p-24 text-white relative overflow-hidden lg:h-[560px]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-1/4 lg:-translate-x-1/4 w-[600px] h-[600px] opacity-20">
                        <div className="w-[279px] h-[279px] md:w-[472px] md:h-[472px] m-[19px] md:-mt-23 lg:mt-55 lg:-left-60 mx-auto absolute inset-0 border border-white rounded-full"></div>
                        <div className="w-80 h-80 md:w-[542px] md:h-[542px] -m-[50px] md:-mt-45 left-7 lg:mt-35 lg:-left-48 mx-auto absolute inset-12 border border-white rounded-full"></div>
                        <div className="w-[558px] h-[558px] md:w-[944px] md:h-[944px] -m-[235px] left-7 md:-left-45 md:-mt-110 lg:-mt-40 lg:-left-78 mx-auto absolute inset-24 border border-white rounded-full"></div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-12 relative z-10">
                        <div className="flex-1 flex justify-center">
                            <Image 
                                src="/assets/images/speaker.png"
                                alt="ZX9 Speaker"
                                width={172.25}
                                height={207}
                                className="object-contain w-[172.25px] h-[207px] lg:w-[410.23px] lg:h-[493px]"
                            />
                        </div>
                        <div className="flex-1 text-center lg:text-left lg:pl-28 lg:mt-14">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6">ZX9<br />SPEAKER</h2>
                            <p className="text-white/75 text-xs mb-10 max-w-[350px] mx-auto md:mx-0 md:text-[15px]">
                                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                            </p>
                            <Link 
                                href="/products/zx9-speaker"
                                className="inline-block bg-black hover:bg-[#4C4C4C] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 mb-2 transition-colors"
                            >
                                See Product
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product - ZX7 Speaker */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-4 md:pb-6 lg:mb-8 lg:h-80">
                <div className="bg-[#F1F1F1] rounded-lg relative overflow-hidden flex items-center h-80 bg-cover md:bg-contain bg-center zx7-speaker-bg">
                    <div className="relative z-10 p-6 md:px-13 lg:px-[95px]">
                        <h4 className="text-2xl md:text-[28px] font-bold tracking-wider md:tracking-widest mb-8">ZX7 SPEAKER</h4>
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
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-4 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#F1F1F1] rounded-lg min-h-80 relative overflow-hidden">
                        <Image 
                            src="/assets/images/yx1-earphones.jpg"
                            alt="YX1 Earphones"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="bg-[#F1F1F1] rounded-lg p-6 flex flex-col justify-center lg:px-[95px]">
                        <h4 className="text-2xl md:text-2xl font-bold tracking-wider md:tracking-widest mb-8">YX1 EARPHONES</h4>
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