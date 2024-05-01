import React from "react";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";

const footerList = [
  "Features",
  "Exclusives",
  "US TV",
  "Reality TV",
  "Soaps Spoilers",
  "Coronation Street",
  "EastEnders",
  "Emmerdale",
  "Home and Away",
  "Hollyoaks",
  "Casualty",
  "Neighbours",
  "Waterloo Road",
  "Doctors",
  "Black Friday",
  "Gaming",
  "Showbiz",
  "LGBTQ+ Spy",
  "Star Wars",
  "Marvel",
  "Anime",
  "Doctor Who",
  "WWE",
  "Netflix",
  "Disney+",
  "Apple TV+",
  "Prime Video",
  "NOW",
];

export default function Footer({ logo }) {
  return (
    <FullContainer className="bg-black text-white py-16">
      <Container>
        <div className="w-full text-xs md:text-sm">
          <Image height={70} width={150} src={logo} alt="logo" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-7 lg:gap-x-10 gap-y-3 md:gap-y-4 font-bold mt-10 text-xs md">
            {footerList.map((item, index) => (
              <div
                key={index}
                className="capitalize hover:opacity-70 cursor-pointer transition-all"
              >
                {item}
              </div>
            ))}
          </div>
          <Image
            height={60}
            width={60}
            alt="network"
            src="/network.svg"
            className="mt-10"
          />
          <p className="uppercase mt-10 font-bold">
            DIGITAL SPY, PART OF THE HEARST UK ENTERTAINMENT NETWORK
          </p>
          <p className="mt-5 font-bold">
            We earn a commission for products purchased through some links in
            this article.
          </p>
          <p className="mt-5 font-bold">
            ©2024 Hearst UK is the trading name of the National Magazine Company
            Ltd, 30 Panton Street, Leicester Square, London, SW1Y 4AJ.
            Registered in England. All Rights Reserved.
          </p>
          <div className="flex items-center flex-wrap gap-5 lg:gap-10 font-bold mt-5">
            <p>About & Contact Details</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
            <p>Complaints</p>
            <p>Sitemap</p>
            <p>Advertising</p>
          </div>
          <button className="border py-2 md:py-3 px-4 md:px-5 font-bold mt-10 hover:bg-white/80 hover:text-black transition-all">
            Cookies Choice
          </button>
        </div>
      </Container>
    </FullContainer>
  );
}
