import React from "react";
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

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Blog({ logo, myblog, blog_list }) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);

  return (
    <div className={myFont.className}>
      <Head>
        <title>{myblog?.value.title} | Next 14 Template</title>
      </Head>
      <NavMenu logo={logo} />
      <Banner
        logo={logo}
        title={myblog?.value.title}
        tagline={myblog?.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${myblog?.file_name}`}
        author={myblog?.value.author}
        published_at={myblog?.value.published_at}
      />
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
      <LatestBlogs blogs={blog_list} />
      <Footer
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${logo?.file_name}`}
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

  return {
    props: {
      logo: logo.data[0],
      myblog: blog.data[0],
      blog_list: blog_list.data[0].value,
      imagePath,
      project_id,
    },
  };
}
