import Image from "next/image";
import Link from "next/link";
import DateText from "./DateText";

const Banner = () => {
    return (
        <section className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-green-50/40 px-8 py-10 md:px-12">
                <div className="max-w-2xl">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        <DateText />
                    </span>

                    <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-5 text-base leading-relaxed text-gray-600">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="/products"
                        className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-800"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                <div className="hidden shrink-0 md:block">
                    <Image
                        src="/bazar-hero.png"
                        alt="banner"
                        width={300}
                        height={240}
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;