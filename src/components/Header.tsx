
import Image from "next/image";
import Navlinks from "./Navlinks";
import DateText from "./DateText";
import UserInfo from "./UserInfo";
const Header = () => {



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
                        <div className="text-sm text-gray-500"><DateText /></div>
                    </div>
                </div>

            </div>
            <div className="container mx-auto flex items-center justify-between ...">
                <div className="flex items-center gap-3"> ...লোগো, নাম, তারিখ... </div>
                <UserInfo />   {/* এখানে, ডান দিকে যাবে */}
            </div>

            <Navlinks></Navlinks>
        </header>
    );
};

export default Header;