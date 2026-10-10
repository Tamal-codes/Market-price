
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("ডেটা আনতে সমস্যা হয়েছে");

  return res.json();
}

type GridProps = {
  title: string;
  products: Product[];
  subtitle?: string;
  icon?: string;
  iconColor?: string;
};

const Grid = ({ title, products, subtitle, icon, iconColor }: GridProps) => (
  <section className="container mx-auto px-4 py-6">
    <h2 className="text-xl font-bold text-gray-900">
      {icon && <span className={`mr-2 text-base ${iconColor}`}>{icon}</span>}
      {title}
    </h2>

    {subtitle && (
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    )}

    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

const ProductSection = async () => {
  const products = await getProducts();

  const increased = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const decreased = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Grid
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconColor="text-red-600"
        products={increased}
      />

      <Grid
        title="আজ দাম কমেছে"
        icon="▼"
        iconColor="text-green-600"
        products={decreased}
      />

      {/* All Products Section */}
      <section id="সব-পণ্য" className="scroll-mt-6">
        <Grid
          title="সব পণ্য"
          subtitle={`মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
          products={products}
        />
      </section>
    </>
  );
};

export default ProductSection;
