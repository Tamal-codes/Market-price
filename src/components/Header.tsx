



import Image from "next/image";
import Navlinks from "./Navlinks";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    });

    return (
        <header className="border-b border-gray-100 bg-white py-4">
            <div className="container mx-auto flex items-center justify-between px-4">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                        <Image
                            src="/logo-icon.png"
                            alt="logo"
                            width={28}
                            height={28}
                        />
                    </div>


                    <div className="flex flex-col">
                        <div className="text-2xl font-bold text-gray-900">
                            বাজার দর
                        </div>
                        <div className="text-sm text-gray-500">{date}</div>
                    </div>
                </div>


                <div className="flex items-center gap-3">

                    <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                        সাইন ইন
                    </button>
                    <button className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-800 transition-colors">
                        সাইন আপ
                    </button>

                </div>

            </div>

            <Navlinks></Navlinks>

        </header>
    );
};

export default Header;