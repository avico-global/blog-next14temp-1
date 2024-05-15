import React, { useEffect, useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Banner from "@/components/containers/Banner";
import Footer from "@/components/containers/Footer";
import { Montserrat } from "next/font/google";
import MarkdownIt from "markdown-it";
import Head from "next/head";
import LatestBlogs from "@/components/containers/LatestBlogs";
import NavMenu from "@/components/containers/NavMenu";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Blog({
  logo,
  myblog,
  blog_list,
  project_id,
  imagePath,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);
  const breadcrumbs = useBreadcrumbs();

  const [domainName, setDomainName] = useState("");
  useEffect(() => {
    fetch("/api/domain")
      .then((response) => response.json())
      .then((data) => {
        setDomainName(data.domainName);
      });
  }, []);

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
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
      <NavMenu
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />
      <Banner
        // logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        title={myblog?.value.title}
        tagline={myblog?.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`}
        author={myblog?.value.author}
        published_at={myblog?.value.published_at}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <FullContainer>
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-home gap-14 w-full">
            <div>
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            <div className="bg-gray-300 flex flex-col items-center justify-center text-white text-2xl font-bold">
              <h1>Google Ad</h1>
            </div>
          </div>
        </Container>
      </FullContainer>
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
          "@type": "BlogPosting",
          headline: myblog?.value.title,
          tagline: myblog?.value.tagline,
          description: content,
          datePublished: myblog?.value.published_at,
          author: myblog?.value.author,
          image: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`,
          publisher: "Site Manager",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((breadcrumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: breadcrumb.label,
            item: `https://${domainName}${breadcrumb.url}`,
          })),
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ params, req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);
  const blog = await callBackendApi({
    domain,
    query,
    type: params.blog.replaceAll("-", "_"),
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });

  const isValidBlog = blog_list.data[0].value.some(
    (item) => item.title.toLowerCase().replaceAll(" ", "-") === params.blog
  );

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });

  return {
    props: {
      logo: logo.data[0],
      myblog: blog.data[0],
      blog_list: blog_list.data[0].value,
      meta: meta.data[0].value,
      imagePath,
      project_id,
    },
  };
}
