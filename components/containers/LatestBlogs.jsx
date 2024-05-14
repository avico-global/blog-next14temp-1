import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/SectionHeading";

export default function LatestBlogs({ blogs, project_id, imagePath }) {
  return (
    <FullContainer className="py-16 text-center">
      <Container>
        <SectionHeading title="latest news" tagline="This just in.." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 w-full mt-11 mb-3">
          {blogs?.map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              author={item.author}
              date={item.published_at}
              tagline={item.tagline}
              project_id={project_id}
              description={item.articleContent}
              image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`}
            />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image, description, project_id }) {
  return (
    <Link
      href={
        project_id
          ? `/${title?.toLowerCase().replaceAll(" ", "-")}?${project_id}`
          : `/${title?.toLowerCase().replaceAll(" ", "-")}`
      }
    >
      <div className="relative overflow-hidden w-full h-96 hover:opacity-80 transition-all">
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          sizes="400px, 300px"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
      </div>
      <h3 className="font-semibold text-lg mt-4 leading-5">{title}</h3>
      <p className="text-gray-500 mt-3 text-sm">{description}</p>
    </Link>
  );
}
