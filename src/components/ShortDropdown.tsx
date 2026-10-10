"use client";

import { useRouter } from "next/navigation";

const options = [
    { value: "", label: "ডিফল্ট" },
    { value: "low", label: "দাম: কম থেকে বেশি" },
    { value: "high", label: "দাম: বেশি থেকে কম" },
];

type SortDropdownProps = {
    category: string;
    sort?: string;
};

export default function SortDropdown({ category, sort }: SortDropdownProps) {
    const router = useRouter();

    const handleChange = (value: string) => {
        const params = new URLSearchParams();
        if (category && category !== "all") params.set("category", category);
        if (value) params.set("sort", value);
        const qs = params.toString();
        router.push(qs ? `/?${qs}` : "/", { scroll: false });
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-500">
                সাজান:
            </label>
            <div className="relative">
                <select
                    id="sort"
                    value={sort ?? ""}
                    onChange={(e) => handleChange(e.target.value)}
                    className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2 pl-4 pr-9 text-sm text-gray-700 transition hover:border-emerald-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                    ▼
                </span>
            </div>
        </div>
    );
}