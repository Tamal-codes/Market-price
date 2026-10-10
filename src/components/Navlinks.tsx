import Link from "next/link";

interface Navs {
    id: string | number;
    slug: string;
    nameBn: string;
    icon: string;
}

interface NavlinksProps {
    activeCategory?: string;
}

const Navlinks = async ({ activeCategory }: NavlinksProps) => {
    let data: Navs[] = [];

    try {
        const res = await fetch(
            "https://openapi.programming-hero.com/api/bazardor/categories"
        );
        if (res.ok) {
            data = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    return (
        <div className="flex gap-3 py-5 px-4 container mx-auto overflow-x-auto">
            {data.map((n) => {
                const isActive = activeCategory === n.slug;
                return (
                    <Link
                        key={n.id}
                        href={`/?category=${n.slug}`}
                        scroll={false}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium whitespace-nowrap ${
                            isActive
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                        }`}
                    >
                        <span>{n.icon}</span>
                        <span>{n.nameBn}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default Navlinks;