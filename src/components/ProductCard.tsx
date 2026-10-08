import { Product } from "@/types/product";

const unitBn = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

const ProductCard = ({ product }: { product: Product }) => {
  const { nameBn, image, unit, today, change } = product;

  const badgeStyle = {
    up: "bg-red-50 text-red-600",
    down: "bg-green-50 text-green-600",
    flat: "bg-gray-100 text-gray-600",
  }[change.dir];

  const arrow = { up: "▲", down: "▼", flat: "—" }[change.dir];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {image}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{nameBn}</h3>
          <p className="text-xs text-gray-500">{unitBn[unit]}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">
            {toBn(today)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>

        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeStyle}`}>
          {arrow} {toBn(Math.abs(change.pct))}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;