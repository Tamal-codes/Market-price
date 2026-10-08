const Footer = () => {
    return (
        <footer className="py-6 px-4 md:px-8 mt-10 border-t border-gray-200 text-gray-600">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm md:text-base">
                
                <div className="font-semibold text-gray-800">
                    বাজার দর — <span className="font-normal text-gray-600">প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
                </div>

                <div className="text-xs md:text-sm text-gray-500">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </div>
            </div>
        </footer>
    );
};

export default Footer;