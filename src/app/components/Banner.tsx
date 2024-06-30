import React from "react";
import Image from "next/image";

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-64 z-1">
      <Image src="/Banner.jpg" alt="Banner" layout="fill" objectFit="cover" />
    </div>
  );
};

export default Banner;
