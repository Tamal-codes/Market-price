import Link from "next/link";

interface Navs {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const Navlinks = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data = await res.json();

    console.log(data);

    return (
        <div className="flex gap-3 py-5 px-13 container mx-auto">
          
            {data.map((n: Navs) => (
                <Link key={n.id} href={`/${n.slug}`}>
                    <span>{n.icon}</span> {n.nameBn}
                </Link>
            ))}
        </div>
    );
};

export default Navlinks;