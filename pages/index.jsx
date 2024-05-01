import React from "react";
import Banner from "@/components/containers/Banner";
import Head from "next/head";
import NavMenu from "@/components/containers/NavMenu";
import MustRead from "@/components/containers/MustRead";
import Footer from "@/components/containers/Footer";
import { Montserrat } from "next/font/google";
import LatestBlogs from "@/components/containers/LatestBlogs";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Home({ logo, logo_black, banner, blog_list }) {
  return (
    <div className={myFont.className}>
      <Head>
        <title>Digital Spy</title>
      </Head>
      <Banner
        logo={logo_black}
        badge={banner.value.badge}
        title={banner.value.title}
        tagline={banner.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${banner?.file_name}`}
      />
      <NavMenu logo={logo} />
      <MustRead articles={blog_list} />
      <LatestBlogs blogs={blog_list} />
      <Footer
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${logo?.file_name}`}
      />
    </div>
  );
}

export async function getStaticProps() {
  const _logo_black = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"logo_black"}`
  );
  const logo_black = await _logo_black.json();

  const _logo = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"logo"}`
  );
  const logo = await _logo.json();

  const _banner = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"banner"}`
  );
  const banner = await _banner.json();

  const _blog_list = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"blog_list"}`
  );
  const blog_list = await _blog_list.json();

  return {
    props: {
      logo_black: logo_black.data[0],
      logo: logo.data[0],
      banner: banner.data[0],
      blog_list: blog_list.data[0].value,
    },
  };
}
