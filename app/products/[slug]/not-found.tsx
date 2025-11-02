import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h2 className="mb-6">Product Not Found</h2>
      <p className="text-black/50 mb-8 text-center">
        Sorry, we couldn&apos;t find the product you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
