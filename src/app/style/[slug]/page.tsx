import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/shell/page-transition";
import { STYLE_LIST, getStyleMeta } from "@/lib/styles/registry";
import { StyleGallery } from "@/components/gallery/style-gallery";
import { ComingSoon } from "@/components/shell/coming-soon";

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
  return {
    title: `${meta.name} UI style`,
    description: meta.description,
  };
}

export default async function StylePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getStyleMeta(slug);
  if (!meta) notFound();

  const live = meta.status === "live";

  return (
    <PageTransition>
      {live ? (
        <StyleGallery slug={meta.slug} meta={meta} />
      ) : (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ComingSoon meta={meta} />
        </div>
      )}
    </PageTransition>
  );
}
