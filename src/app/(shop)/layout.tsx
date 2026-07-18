import type { ReactNode } from "react";
import TopNavBar from "@/components/TopNavBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getStorefrontCategories } from "@/services/storefrontCategoryService";

export default async function ShopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getStorefrontCategories();

  return (
    <>
      <TopNavBar categories={categories} />
      {children}
      <WhatsAppButton />
    </>
  );
}
