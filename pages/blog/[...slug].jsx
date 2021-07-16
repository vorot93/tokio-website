import * as content from "../../lib/api";
import * as blog from "../../lib/blog";
import Page from "../../lib/page";

export default Page;

const SIDEBAR_POST_COUNT = 6;

export async function getStaticPaths() {
  const paths = content.getDateOrderedPaths("blog").map((page) => {
    return {
      params: { slug: [page.key] },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug: slugParam } }) {
  let slug = slugParam[0];
  let postsByYear = blog.getBlogPostsByYear({
    limit: SIDEBAR_POST_COUNT
  });

  const page = content.loadPage(`blog/${slug}`);

  let next = blog.getNextPost(slug);
  let previous = blog.getPreviousPost(slug);

  if (next) {
    page.next = {
      title: next.menuTitle || next.title,
      href: next.href
    };
  }

  if (previous) {
    page.prev = {
      title: previous.menuTitle || previous.title,
      href: previous.href,
    };
  }

  let menu = [];

  for (const [, entry] of Object.entries(postsByYear)) {
    menu.push(entry);
  }

  menu.sort((a, b) => b.key - a.key);

  return content.withAppProps({
    props: {
      page,
      menu,
    },
  });
}
