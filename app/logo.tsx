import React from "react";
import Link from "next/link";
import Image from "next/image";
import daimaruLogo from "@/public/daimaru.svg";

const Logo = () => {
  return (
    <Link href="/dashboard">
      <Image src={daimaruLogo} alt="logo" width={140} />
    </Link>
  );
};

export default Logo;
