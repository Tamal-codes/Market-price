"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
    const { data: session, isPending } = authClient.useSession();

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

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">{session.user.name}</span>
            <button
                onClick={() => authClient.signOut()}
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
                সাইন আউট
            </button>
        </div>
    );
};

export default UserInfo;