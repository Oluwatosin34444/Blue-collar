"use client";

import WhatsappIcon from "@/assets/whatsAppIcon";
import { useState } from "react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
}

export default function FloatingWhatsApp({
  phoneNumber,
  message = "Hello, I’d like to inquire about your services",
}: FloatingWhatsAppProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="fixed bottom-7 right-7 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleClick}
        className="text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#67C15E] focus:ring-opacity-50"
        aria-label="Chat with us on Whatsapp button"
      >
        <div className="relative">
          <WhatsappIcon />
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-75"
            style={{ backgroundColor: "#67C15E" }}
          ></span>
        </div>
      </button>
      {isHovered && (
        <span className="absolute bottom-full right-0 mb-2 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap">
          Chat with us!
        </span>
      )}
    </div>
  );
}
