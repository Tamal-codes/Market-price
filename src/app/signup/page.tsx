'use client';


import React, { useState } from 'react';

const SignUpPage = () => {
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value;

        if (password.length < 8) return setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
        if (password !== confirm) return setError('দুটি পাসওয়ার্ড মিলছে না।');

        setError('');
        console.log({ name, email, password }); 
    };

    return (
        <div className="min-h-screen bg-[#f0f5f0] flex flex-col items-center px-4 py-12 font-['Hind_Siliguri',sans-serif]">
            <h1 className="text-3xl font-bold text-[#17261c] text-center">অ্যাকাউন্ট তৈরি করুন</h1>
            <p className="text-[#5d6e62] mt-1 mb-6 text-center">
                বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <fieldset className="fieldset bg-[#fbfdfb] border-base-300 rounded-box w-full border p-6">
                    <label className="label text-[#17261c]">নাম</label>
                    <input
                        name="name"
                        type="text"
                        className="input w-full"
                        placeholder="যেমন: রহিম উদ্দিন"
                        required
                    />

                    <label className="label text-[#17261c] mt-2">ইমেইল</label>
                    <input
                        name="email"
                        type="email"
                        className="input w-full"
                        placeholder="you@example.com"
                        required
                    />

                    <label className="label text-[#17261c] mt-2">পাসওয়ার্ড</label>
                    <input
                        name="password"
                        type="password"
                        className="input w-full"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        required
                    />

                    <label className="label text-[#17261c] mt-2">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                        name="confirm"
                        type="password"
                        className="input w-full"
                        placeholder="আবার লিখুন"
                        required
                    />

                    {error && <p className="text-error text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="btn w-full mt-4 border-0 bg-[#08883f] hover:bg-[#066d32] text-white shadow-md"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>

                    <div className="divider text-sm text-[#5d6e62]">অথবা</div>

                    <div className="flex gap-2">
                        <button type="button" className="btn flex-1 bg-white border-base-300">
                            <svg width="18" height="18" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6.1C12.2 13.6 17.6 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
                                <path fill="#FBBC05" d="M10.4 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.9-4.6l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6.1z" />
                                <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.4 0-11.8-4.1-13.6-9.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
                            </svg>
                            Google দিয়ে চালিয়ে যান
                        </button>
                        <button type="button" className="btn flex-1 bg-white border-base-300">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="text-center mt-4 text-[#17261c]">
                        অ্যাকাউন্ট আছে?{' '}
                        <a href="/login" className="text-[#08883f] hover:underline">
                            সাইন ইন করুন
                        </a>
                    </p>
                </fieldset>
            </form>

            <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        </div>
    );
};

export default SignUpPage;