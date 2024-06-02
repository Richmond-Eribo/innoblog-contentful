import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import Head from "next/head";
// import { CMS_NAME } from "../lib/constants";

export default function Index({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const preview = false;
  return (
    <>
      {/* {console.log(heroPost)} */}
      <Layout preview={preview}>
        <Head>
          <title>News</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              thumbnail={heroPost.thumbnail}
              date={heroPost.sys.publishedAt}
              author={heroPost.author.name}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = (await getAllPostsForHome()) ?? [];

  console.log(allPosts);
  return {
    props: { allPosts },
  };
}
