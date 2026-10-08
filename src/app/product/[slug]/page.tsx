import { Product } from "@/types/product";

async function getProduct(slug: string): Promise<Product | undefined> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("ডেটা আনতে সমস্যা হয়েছে");
  }

  const products: Product[] = await res.json();

  return products.find((product) => product.slug === slug);
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return <div>Product পাওয়া যায়নি</div>;
  }

  return (
    <div>
      <h1>{product.nameBn}</h1>
      <p>আজকের দাম: {product.today} টাকা</p>
    </div>
  );
};

export default ProductDetailsPage;
