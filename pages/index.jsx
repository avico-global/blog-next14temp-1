import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Montserrat } from "next/font/google";
import Banner from "@/components/containers/Banner";
import NavMenu from "@/components/containers/NavMenu";
import MustRead from "@/components/containers/MustRead";
import Footer from "@/components/containers/Footer";
import LatestBlogs from "@/components/containers/LatestBlogs";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/utils/useBreadcrumbs";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Home({
  logo,
  banner,
  blog_list,
  project_id,
  imagePath,
  meta,
}) {
  const [domainName, setDomainName] = useState("");
  useEffect(() => {
    fetch("/api/domain")
      .then((response) => response.json())
      .then((data) => {
        setDomainName(data.domainName);
      });
  }, []);

  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="author" href={`http://${domainName}`} />
        <link rel="publisher" href={`http://${domainName}`} />
        <link rel="canonical" href={`http://${domainName}`} />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`https://api15.ecommcube.com/${domainName}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`https://api15.ecommcube.com/${domainName}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`https://api15.ecommcube.com/${domainName}/favicon-16x16.png`}
        />
      </Head>
      <Banner
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${banner.file_name}`}
        badge={banner.value.badge}
        title={banner.value.title}
        tagline={banner.value.tagline}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />
      <NavMenu
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />
      <MustRead articles={blog_list} project_id={project_id} />
      <LatestBlogs
        blogs={blog_list}
        project_id={project_id}
        imagePath={imagePath}
      />
      <Footer
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domainName}/#webpage`,
              url: `http://${domainName}/`,
              name: meta.title,
              isPartOf: {
                "@id": `http://${domainName}/#website`,
              },
              description: meta.description,
              inLanguage: "en-US",
            },
            {
              "@type": "Organization",
              "@id": `http://${domainName}/#organization`,
              name: "Your Organization Name",
              url: `http://${domainName}/`,
              logo: {
                "@type": "ImageObject",
                url: `http://${domainName}/path/to/logo.png`,
              },
              sameAs: [
                "http://www.facebook.com/yourprofile",
                "http://www.twitter.com/yourprofile",
                "http://instagram.com/yourprofile",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `https://${domainName}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "ItemList",
              itemListElement: blog_list.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `http://${domainName}/blog/${blog.slug}`,
                name: blog.title,
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const project_id = getProjectId(query);
  const imagePath = await getImagePath({ domain, query });

  const logo_black = await callBackendApi({
    domain,
    query,
    type: "logo_black",
  });

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });

  const banner = await callBackendApi({ domain, query, type: "banner" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });

  return {
    props: {
      logo_black: logo_black?.data[0] || null,
      logo: logo.data[0],
      banner: banner.data[0],
      blog_list: blog_list.data[0].value,
      meta: meta.data[0].value,
      imagePath,
      project_id,
    },
  };
}
