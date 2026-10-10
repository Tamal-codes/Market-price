import { notFound } from "next/navigation";
import { Product } from "@/types/product";

async function getProduct(slug: string): Promise<Product | undefined> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("ডেটা আনতে সমস্যা হয়েছে");
  }

  const products: Product[] = await res.json();

  return products.find((product) => product.slug === slug);
}

const unitBn: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const marketPrices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const lowestPrice = Math.min(...marketPrices);
  const highestPrice = Math.max(...marketPrices);

  const averagePrice =
    marketPrices.reduce((sum, price) => sum + price, 0) /
    marketPrices.length;

  const priceDifference = product.today - product.yesterday;

  const arrow = {
    up: "▲",
    down: "▼",
    flat: "—",
  }[product.change.dir];

  const changeColor = {
    up: "text-red-600",
    down: "text-green-600",
    flat: "text-gray-500",
  }[product.change.dir];

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="text-gray-700">
            {product.nameBn}
          </span>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-3xl">
                {product.image}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs text-gray-500">
                  {unitBn[product.unit] || product.unit} · {product.categoryNameBn}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  গতকালকের তুলনায় আজকের দাম{" "}
                  <span className={`font-semibold ${changeColor}`}>
                    {priceDifference > 0
                      ? `${toBn(priceDifference)} টাকা বেড়েছে`
                      : priceDifference < 0
                        ? `${toBn(Math.abs(priceDifference))} টাকা কমেছে`
                        : "অপরিবর্তিত"}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#f0f5f1] px-5 py-3 sm:min-w-[110px]">
              <p className="text-xs text-gray-500">
                আজকের দাম
              </p>

              <p className="text-3xl font-bold text-gray-900">
                {toBn(product.today)}
              </p>

              <p className="text-xs text-gray-500">
                টাকা / {product.unit === 'kg' ? 'কেজি' : product.unit === 'litre' ? 'লিটার' : product.unit === 'dozen' ? 'ডজন' : 'পিস'}
              </p>

              <p
                className={`mt-1 text-xs font-semibold ${changeColor}`}
              >
                {arrow} {toBn(Math.abs(product.change.pct))}%
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
          <h2 className="text-base font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {toBn(lowestPrice)}
                <span className="ml-1 text-sm font-normal text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {toBn(highestPrice)}
                <span className="ml-1 text-sm font-normal text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বাধিক
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">
                গড় দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {toBn(Number(averagePrice.toFixed(2)))}
                <span className="ml-1 text-sm font-normal text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {unitBn[product.unit] || "প্রতি একক"}-এর গড় দাম
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-base font-bold text-gray-800">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">
                  <thead className="bg-[#f1f6f2]">
                    <tr className="text-left text-gray-500">
                      <th className="px-4 py-3 font-medium">
                        বাজার
                      </th>

                      <th className="px-4 py-3 font-medium">
                        বিভাগ
                      </th>

                      <th className="px-4 py-3 font-medium">
                        সর্বনিম্ন
                      </th>

                      <th className="px-4 py-3 font-medium">
                        সর্বাধিক
                      </th>

                      <th className="px-4 py-3 text-right font-medium">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.markets.map((market) => {
                      const average =
                        (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market}-${market.division}`}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {market.market}
                          </td>

                          <td className="px-4 py-3 text-gray-600">
                            {market.division}
                          </td>

                          <td className="px-4 py-3 text-gray-800">
                            {toBn(market.min)} টাকা
                          </td>

                          <td className="px-4 py-3 text-gray-800">
                            {toBn(market.max)} টাকা
                          </td>

                          <td className="px-4 py-3 text-right font-semibold text-gray-800">
                            {toBn(Number(average.toFixed(2)))} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;