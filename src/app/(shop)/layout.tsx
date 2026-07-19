import type { ReactNode } from "react";
import TopNavBar from "@/components/TopNavBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { getStorefrontCategories } from "@/services/storefrontCategoryService";
import { getStoreSettings } from "@/services/settingsService";

export default async function ShopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, settings] = await Promise.all([
    getStorefrontCategories(),
    getStoreSettings(),
  ]);

  return (
    <>
      <TopNavBar categories={categories} settings={settings} />
      {children}
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.whatsapp_number} />
    </>
  );
}
