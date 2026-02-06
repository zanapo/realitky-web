import postsData from "@/content/blog.json";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  createdAt: string;
};

const posts = postsData as BlogPost[];

export const getBlogPosts = () =>
  [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

export const getBlogPost = (slug: string) =>
  posts.find((post) => post.slug === slug) ?? null;
