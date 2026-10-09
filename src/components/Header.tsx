
import Image from "next/image";
import Navlinks from "./Navlinks";
import DateText from "./DateText";
import UserInfo from "./UserInfo";

const Header = () => {
    return (
        <header className="border-b border-gray-100 bg-white">

            {/* Logo, Website Name & Login Buttons */}
            <div className="container mx-auto flex items-center justify-between px-4 py-3">

                {/* Logo & Website Name */}
                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
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

                        <div className="text-sm text-gray-500">
                            <DateText />
                        </div>
                    </div>

                </div>

                {/* Login / Signup Buttons */}
                <UserInfo />

            </div>

            {/* Navigation Links */}
            <Navlinks />

        </header>
    );
};

export default Header;

