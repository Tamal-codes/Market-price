import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import ProductDetails from "@/components/ProductDetails";
import ProductSection from "@/components/ProductSection";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; sort?: string }>;
}) {
    const { category, sort } = await searchParams;

    return (
        <div>
            <Marquee />
            {category ? (
                <ProductDetails selectedCategory={category} sort={sort} />
            ) : (
                <>
                    <Banner />
                    <ProductSection />
                </>
            )}
        </div>
    );
}
