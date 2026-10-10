"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // মেনুর বাইরে ক্লিক করলে বন্ধ হবে
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (isPending) {
        return <div className="h-10 w-40" />;
    }

    if (!session) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/signin"
                    className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                    সাইন ইন
                </Link>
                <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();
        setOpen(false);

        if (error) return toast.error(error.message ?? "সাইন আউট করা যায়নি।");

        toast.success("সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-gray-50 transition-colors"
            >
                {session.user.image ? (
                    <Image
                        src={session.user.image}
                        alt={session.user.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white">
                        {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                )}

                <span className="text-sm font-medium text-gray-700">
                    {session.user.name}
                </span>
                <span className="text-xs text-gray-500">▾</span>
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-gray-200 bg-white p-1 shadow-lg">
                    <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        প্রোফাইল
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                        সাইন আউট
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserInfo;