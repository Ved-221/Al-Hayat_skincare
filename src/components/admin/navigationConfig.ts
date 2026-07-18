/**
 * navigationConfig.ts
 * -------------------
 * Configuration-driven sidebar navigation for the Admin Dashboard.
 * Easily extensible when new modules (Orders, Categories, Analytics, Reviews, Settings)
 * become active.
 */

export interface NavItemConfig {
  label: string;
  href: string;
  icon: string;
  disabled?: boolean;
  badge?: string;
}

export const ADMIN_NAV_ITEMS: NavItemConfig[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "space_dashboard",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: "inventory_2",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: "shopping_cart",
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: "category",
  },
  {
    label: "Settings",
    href: "#",
    icon: "settings",
    disabled: true,
    badge: "Soon",
  },
];
