import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/sections/page-header";
import { getBlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/formatters";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

type BlogDetailProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: BlogDetailProps) {
  const post = getBlogPost(params.slug);
  if (!post) return buildMetadata("Článek nenalezen");
  return buildMetadata(post.title, post.excerpt);
}

export default function BlogDetailPage({ params }: BlogDetailProps) {
  const post = getBlogPost(params.slug);
  if (!post) {
    return notFound();
  }

  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Poradna", url: `${siteConfig.url}/poradna` },
    { name: post.title, url: `${siteConfig.url}/poradna/${post.slug}` },
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Domů" },
          { href: "/poradna", label: "Poradna" },
          { label: post.title },
        ]}
      />
      <PageHeader title={post.title} description={post.excerpt}>
        <p className="text-sm text-muted-foreground">
          {post.category} · {formatDate(post.createdAt)}
        </p>
      </PageHeader>
      <article className="space-y-4 text-muted-foreground">
        <p>{post.content}</p>
      </article>
      <div className="rounded-2xl border bg-muted/40 p-6 text-sm text-muted-foreground">
        Další články najdete v naší poradně. Sledujte nás pro pravidelné tipy.
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
