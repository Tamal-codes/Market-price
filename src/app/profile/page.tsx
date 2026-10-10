"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isPending && !session) router.push("/signin");
    }, [isPending, session, router]);

    if (isPending || !session) {
        return <div className="min-h-screen bg-[#f0f5f0]" />;
    }

    const { image, email } = session.user;

  
    const nameValue = name ?? session.user.name;

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nameValue.trim()) return toast.error("নাম খালি রাখা যাবে না।");

        setLoading(true);
        const { error } = await authClient.updateUser({ name: nameValue.trim() });
        setLoading(false);

        if (error) return toast.error(error.message ?? "আপডেট করা যায়নি।");
        toast.success("নাম আপডেট হয়েছে।");
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-[#f0f5f0] px-4 py-10 font-['Hind_Siliguri',sans-serif]">
            <div className="mx-auto w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-[#17261c]">আমার প্রোফাইল</h1>
                <p className="mt-1 mb-6 text-[#5d6e62]">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

             
                <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-4">
                        {image ? (
                          
                            <Image src={image} alt={session.user.name} referrerPolicy="no-referrer" className="h-16 w-16 rounded-xl object-cover" />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-600 text-2xl font-medium text-white">
                                {session.user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p className="text-lg font-semibold text-[#17261c]">{session.user.name}</p>
                            <p className="text-sm text-[#5d6e62]">{email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        সাইন আউট
                    </button>
                </div>

             
                <form onSubmit={handleUpdate} className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold text-[#17261c]">তথ্য</h2>

                    <label className="mb-1 block text-sm text-[#17261c]">নাম</label>
                    <input
                        type="text"
                        value={nameValue}
                        onChange={(e) => setName(e.target.value)}
                        className="input w-full"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn mt-4 w-full border-0 bg-[#08883f] text-white shadow-md hover:bg-[#066d32]"
                    >
                        {loading ? "অপেক্ষা করুন..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;