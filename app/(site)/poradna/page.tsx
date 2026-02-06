import { Breadcrumbs } from "@/components/breadcrumbs";
import { BlogCard } from "@/components/sections/blog-card";
import { PageHeader } from "@/components/sections/page-header";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Poradna");

export default function BlogPage() {
  const posts = getBlogPosts();
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Poradna", url: `${siteConfig.url}/poradna` },
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ href: "/", label: "Domů" }, { label: "Poradna" }]}
      />
      <PageHeader
        title="Poradna"
        description="Aktuální tipy, novinky a rady ze světa realit."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
