import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/SectionHeading";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";

export default function MustRead({ articles }) {
  return (
    <FullContainer className="py-16">
      <Container>
        <SectionHeading title="MUST READ" tagline={"IT'S KIND OF A BIG DEAL"} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-7 mt-10 w-full">
          {articles.map((item, index) => (
            <Link
              href={item.title?.toLowerCase().replaceAll(" ", "-")}
              key={index}
              title={item.imageTitle}
            >
              <div className="overflow-hidden relative h-44 lg:h-80 w-full bg-black">
                <Image
                  title={item.imageTitle}
                  src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${item.image}`}
                  fill={true}
                  loading="lazy"
                  alt="blog"
                  className="w-full h-full object-cover absolute top-0 scale-125"
                />
              </div>
              <p className="mt-2 lg:mt-3 text-lg md:text-xl lg:text-2xl font-bold text-center">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
