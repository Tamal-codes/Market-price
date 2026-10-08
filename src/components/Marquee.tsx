import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data = await res.json();

  return (
    <div className="w-full overflow-hidden py-2">
      <MarqueeText direction="right" duration={40} startOffset={0}>
        {data.map((h) => {
          const dir = h.change?.dir;
          const pct = h.change?.pct;
          const isUp = dir === "up";
          const isDown = dir === "down";

          return (
            <span key={h.id} className="inline-flex items-center gap-2 mr-8 whitespace-nowrap">
              <span>{h.categoryIcon}</span>
              <span>{h.nameBn}</span>
              <span className="font-semibold">
                {h.today} টাকা/{h.unit}
              </span>

              {pct && (
                <span
                  className={`inline-flex items-center font-bold ${
                    isUp ? "text-red-500" : isDown ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : ""}</span>
                  <span>{pct}%</span>
                </span>
              )}

              <span className="mx-2 text-gray-300">●</span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;