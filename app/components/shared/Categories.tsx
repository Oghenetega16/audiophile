import Image from "next/image";
import Link from "next/link";

export default function Categories() {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Headphones Category */}
                <div className="bg-[#F1F1F1] rounded-lg pt-24 pb-8 px-8 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image 
                            src="/assets/images/headphones.png"
                            alt="Headphones"
                            width={160}
                            height={160}
                            className="object-contain"
                        />
                    </div>
                    <h6 className="text-lg font-bold tracking-wider mb-4 mt-8">HEADPHONES</h6>
                    <Link 
                        href="/headphones"
                        className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[1px] text-black/50 hover:text-[#D87D4A] transition-colors"
                    >
                        Shop
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/>
                        </svg>
                    </Link>
                </div>

                {/* Speakers Category */}
                <div className="bg-[#F1F1F1] rounded-lg pt-24 pb-8 px-8 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image 
                            src="/assets/images/speakers.png"
                            alt="Speakers"
                            width={160}
                            height={160}
                            className="object-contain"
                        />
                    </div>
                    <h6 className="text-lg font-bold tracking-wider mb-4 mt-8">SPEAKERS</h6>
                    <Link 
                        href="/speakers"
                        className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[1px] text-black/50 hover:text-[#D87D4A] transition-colors"
                    >
                        Shop
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/>
                        </svg>
                    </Link>
                </div>

                {/* Earphones Category */}
                <div className="bg-[#F1F1F1] rounded-lg pt-24 pb-8 px-8 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image 
                            src="/assets/images/earphones.png"
                            alt="Earphones"
                            width={160}
                            height={160}
                            className="object-contain"
                        />
                    </div>
                    <h6 className="text-lg font-bold tracking-wider mb-4 mt-8">EARPHONES</h6>
                    <Link 
                        href="/earphones"
                        className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[1px] text-black/50 hover:text-[#D87D4A] transition-colors"
                    >
                        Shop
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}