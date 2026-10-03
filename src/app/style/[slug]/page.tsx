import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STYLE_LIST, getStyleMeta } from "@/lib/styles/registry";
import { StyleGallery } from "@/components/gallery/style-gallery";
import { ComingSoon } from "@/components/shell/coming-soon";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return STYLE_LIST.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getStyleMeta(slug);
  if (!meta) return { title: "Style not found" };
  const path = `/style/${meta.slug}`;
  const title = `${meta.name} UI style — ${meta.tagline}`;
  const description = `${meta.name}: ${meta.tagline}. Preview ${meta.name} components live in light and dark mode and copy clean HTML + Tailwind code, free.`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: path,
      title: `${title} — Chameleon UI`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Chameleon UI`,
      description,
    },
  };
}

export default async function StylePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getStyleMeta(slug);
  if (!meta) notFound();

  const live = meta.status === "live";

  // BreadcrumbList entity backing the visible breadcrumb nav rendered at the
  // top of `StyleGallery` (Home → Explore → {style}).
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Explore", item: siteUrl("/explore") },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.name,
        item: siteUrl(`/style/${meta.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {live ? (
        <StyleGallery slug={meta.slug} meta={meta} />
      ) : (
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ComingSoon meta={meta} />
        </div>
      )}
    </>
  );
}
