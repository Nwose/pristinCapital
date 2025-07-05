import Image from "next/image";
import { BsFillBellFill } from "react-icons/bs";
import { FaLock, FaPlay } from "react-icons/fa";

const settingsOptions = [
  {
    id: 1,
    title: "Notifications",
    icon: <BsFillBellFill className="w-6 h-6" />,
    hasNotification: true,
  },
  {
    id: 2,
    title: "Security",
    icon: <FaLock className="w-6 h-6" />,
    hasNotification: false,
  },
];

export default function QuickSettings() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-teal-200 p-6">
      <h3 className="text-lg font-semibold text-[#001B2E] mb-6">
        Quick Settings
      </h3>

      <div className="flex gap-6 items-center">
        {/* Settings Options */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-6">
            {settingsOptions.map((option) => (
              <button
                key={option.id}
                className="p-4 border border-[#D0D5DD] rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative mb-2">
                    <span className="text-[#001B2E]">{option.icon}</span>
                    {option.hasNotification && (
                      <span className="absolute -top-2 -right-3 h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white font-semibold">
                        15
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#001B2E]">
                    {option.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Promo Image */}
        <div className="flex-1">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-full relative overflow-hidden min-h-[140px]">
            <div className="absolute inset-0">
              <Image
                src="/images/loginImage.png"
                alt="Fintech Dashboard"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaPlay className="text-gray-700 w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
