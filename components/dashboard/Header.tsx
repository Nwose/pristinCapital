import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";
import { Menu } from "lucide-react"; // added for hamburger

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-[#001B2E]"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex h-16 items-center">
            <Image
              src="/images/logo_1.png"
              alt="Pristin Capital"
              width={134}
              height={60}
              className=" w-auto"
            />
          </div>
        </div>

        <div className="flex-1 flex justify-center px-6">
          <div className="relative w-full max-w-3xl">
            {/* Icon circle */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center">
              <FaSearch className="text-[#667085] w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`block w-full py-3 rounded-full bg-[#F2F3F5] border border-[#C9CED4] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400 text-center placeholder:text-center ${
                searchValue ? "pl-16 pr-6" : "pl-16 pr-6"
              }`}
              style={{
                textAlign: searchValue ? "left" : "center",
              }}
            />
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Samuel"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-[#001B2E] font-semibold hidden lg:block uppercase mr-8">
            HI, SAMUEL
          </span>
          <span className="text-[#001B2E] hidden md:block font-medium mr-2">
            Support
          </span>
          <div className="w-5 h-5 hidden md:block mr-1">
            <Image
              src="/images/icons/support-icon.png"
              alt="Support Icon"
              width={24}
              height={24}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="relative">
            <BsFillBellFill className="text-[#001B2E] w-5 h-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white font-semibold">
              15
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
