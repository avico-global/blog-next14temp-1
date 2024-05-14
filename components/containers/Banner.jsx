import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Cormorant } from "next/font/google";

const myFont = Cormorant({ subsets: ["cyrillic"] });

export default function Banner({
  title,
  image,
  badge,
  tagline,
  author,
  published_at,
  logo,
}) {
  return (
    <div className="lg:min-h-[calc(100vh-150px)] 2xl:min-h-[calc(100vh-230px)] overflow-hidden relative w-full flex flex-col justify-between p-10">
      <Image
        src={image}
        alt="Background Image"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
      />
      <div className="flex items-center justify-center">
        <Image
          height={100}
          width={200}
          src={logo}
          alt="logo"
          className="ml-auto mr-auto"
        />
      </div>
      <FullContainer className="flex-1 text-white">
        <Container className="gap-5 bg-black/50 p-9 my-9 max-w-2xl text-center">
          {badge && <Badge>{badge}</Badge>}
          <h1
            className={cn(
              "font-extrabold text-6xl capitalize max-w-screen-md",
              myFont.className
            )}
          >
            {title}
          </h1>
          {tagline && <p className="text-xl">{tagline}</p>}
          {author && (
            <div className="flex items-center justify-center gap-4">
              <p>{author}</p> -<p>{published_at}</p>
            </div>
          )}
        </Container>
      </FullContainer>
    </div>
  );
}
