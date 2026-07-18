import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStorefrontCategoryBySlug } from "@/services/storefrontCategoryService";
import { CATEGORY_VISIBILITY } from "@/types/category";
import CategoryHero from "@/components/storefront/categories/CategoryHero";
import CategoryBreadcrumb from "@/components/storefront/categories/CategoryBreadcrumb";
import CategoryProductsGrid from "@/components/storefront/categories/CategoryProductsGrid";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getStorefrontCategoryBySlug(slug);

  if (!data || data.category.visibility !== CATEGORY_VISIBILITY.VISIBLE || data.category.deleted_at) {
    return {
      title: "Category Not Found | AL-HAYAT",
    };
  }

  const { category } = data;
  const title = category.meta_title || `${category.name} Skincare Collection | AL-HAYAT`;
  const description =
    category.meta_description ||
    category.description ||
    `Explore AL-HAYAT's natural and botanical ${category.name} skincare line crafted from organic herbal ingredients.`;
  const keywords = category.meta_keywords || [
    category.name,
    "herbal skincare",
    "natural skincare",
    "botanical formulations",
    "AL-HAYAT",
  ];
  const url = `https://alhayat.com/products/category/${category.slug}`;
  const image = category.banner_url || category.thumbnail_url || "/logo.png";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "AL-HAYAT Herbal Skincare",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: category.alt_text || category.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getStorefrontCategoryBySlug(slug);

  if (!data || data.category.visibility !== CATEGORY_VISIBILITY.VISIBLE || data.category.deleted_at) {
    notFound();
  }

  const { category, products } = data;

  // Generate structured JSON-LD schemas
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || `AL-HAYAT ${category.name} Skincare Collection`,
    url: `https://alhayat.com/products/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((prod, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://alhayat.com/product/${prod.slug}`,
        name: prod.name,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://alhayat.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://alhayat.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://alhayat.com/products/category/${category.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#faf3ea] pb-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <CategoryBreadcrumb categoryName={category.name} />

      {/* Hero Banner Section */}
      <CategoryHero category={category} productCount={products.length} />

      {/* Main Product Grid */}
      <main className="max-w-7xl mx-auto px-6 pt-12">
        <CategoryProductsGrid products={products} categoryName={category.name} />
      </main>
    </div>
  );
}
