import Link from "next/link";
import SortDropdown from "./ShortDropdown";

interface Product {
    id: string | number;
    slug: string;
    nameBn: string;
    today: number;
    unit: string;
    image?: string;
    category?: string;
    categorySlug?: string;
    categoryNameBn?: string;
    categoryIcon?: string;
    change?: { dir: "up" | "down" | "flat"; pct: number };
}

interface ProductDetailsProps {
    selectedCategory: string;
    sort?: string;
}

const toBn = (n: number | string) =>
    String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitBn = (u: string) =>
    (
        ({ kg: "কেজি", liter: "লিটার", dozen: "ডজন", piece: "পিস" }) as Record<
            string,
            string
        >
    )[u] ?? u;

const ProductDetails = async ({ selectedCategory, sort }: ProductDetailsProps) => {
    let allProducts: Product[] = [];
    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/products",
            { cache: "no-store" }
        );
        if (res.ok) {
            allProducts = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }

    const filtered =
        selectedCategory === "all"
            ? allProducts
            : allProducts.filter(
                  (p) => (p.categorySlug ?? p.category) === selectedCategory
              );

    // দাম অনুযায়ী সাজানো (মূল তালিকা না বদলে কপি করে)
    const products = [...filtered];
    if (sort === "low") products.sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "high") products.sort((a, b) => Number(b.today) - Number(a.today));

    const first = filtered[0];
    const title = first?.categoryNameBn ?? selectedCategory;
    const icon = first?.categoryIcon ?? "🛒";

    return (
        <div
            id="সব-পণ্য"
            className="container mx-auto py-8 px-4 space-y-6 scroll-mt-6"
        >
            {/* Category header */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="text-4xl">{icon}</div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            {/* মোট সংখ্যা + সাজানোর dropdown */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                    মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>
                <SortDropdown category={selectedCategory} sort={sort} />
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map((p) => {
                        const dir = p.change?.dir ?? "flat";
                        const badge =
                            dir === "up"
                                ? "text-red-600 bg-red-50"
                                : dir === "down"
                                ? "text-green-600 bg-green-50"
                                : "text-gray-600 bg-gray-100";
                        const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

                        return (
                            <Link
                                key={p.id}
                                href={`/product/${p.slug}`}
                                className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-500 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl">
                                        {p.image ?? icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {p.nameBn}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            প্রতি {unitBn(p.unit)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">আজকের দাম</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {toBn(p.today)}{" "}
                                            <span className="text-sm font-normal">টাকা</span>
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${badge}`}
                                    >
                                        {arrow}{" "}
                                        {p.change ? `${toBn(p.change.pct)}%` : "০.০%"}
                                    </span>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-3 text-center py-10 text-gray-500">
                        এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি।
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
