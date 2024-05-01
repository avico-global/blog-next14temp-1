import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";

const menuList = ["TV", "movies", "soaps", "tech", "news"];

export default function NavMenu({ logo }) {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <FullContainer className="bg-black text-white py-3 sticky -top-1 z-50">
        <Container className="md:flex-row md:justify-between">
          <div className="flex items-center gap-6">
            <Menu
              onClick={() => setSidebar(true)}
              className="cursor-pointer w-8"
            />
            <Link href="/">
              <Image
                height={70}
                width={120}
                src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${logo?.file_name}`}
                alt="logo"
                className="mt-1"
              />
            </Link>
            <div className="text-lg font-bold hidden lg:flex items-center gap-5">
              {menuList.map((item, index) => (
                <div className="uppercase font-extrabold" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center justify-end font-extrabold gap-5">
            <p>FORUMS</p>
            <p>NEWSLETTER</p>
          </div>
        </Container>
      </FullContainer>

      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-black text-white z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
      >
        <div>
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                height={70}
                width={140}
                src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${logo?.file_name}`}
                alt="logo"
                className="mt-1"
              />
            </Link>
            <X
              className="w-8 text-red-300 cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>
          <div className="flex items-center gap-3 font-normal mr-5 mt-8 w-full">
            <Search className="w-7" />
            <input
              className="bg-transparent border-b border-white/50 pb-1 outline-none flex-1"
              placeholder="Search..."
            />
          </div>
          <div className="text-2xl flex flex-col gap-6 mt-16">
            {menuList.map((item, index) => (
              <div
                className="uppercase font-bold cursor-pointer hover:opacity-70 transition-all"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm underline">Privacy Policy</p>
          <p className="text-sm underline">Terms & Conditions</p>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 0;
          transition: width 0.3s ease;
        }

        .sidebar.open {
          width: 300px;
        }
        @media only screen and (max-width: 600px) {
          .sidebar.open {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
