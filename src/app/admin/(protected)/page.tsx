/**
 * /admin/(protected)/page.tsx
 * ---------------------------
 * Server Component landing page for the Admin Dashboard (/admin).
 * - Enforces authentication via requireAdmin().
 * - Fetches stats, recent orders, low stock items, recent products, and activity feed
 *   concurrently using Promise.all() via the dashboardService orchestration layer.
 * - Arranges widgets in a clean, responsive 2-column SaaS layout.
 */

import { requireAdmin } from "@/lib/auth";
import {
  getDashboardStats,
  getRecentProducts,
  getRecentOrders as getDashboardOrders,
  getLowStockProducts,
  getRecentActivity,
  getCategoryDashboardMetrics,
} from "@/services/dashboardService";
import StatCard from "@/components/admin/StatCard";
import QuickActions from "@/components/admin/QuickActions";
import RecentOrders from "@/components/admin/RecentOrders";
import RecentProducts from "@/components/admin/RecentProducts";
import LowStockProducts from "@/components/admin/LowStockProducts";
import RecentActivityFeed from "@/components/admin/RecentActivityFeed";
import CategorySummary from "@/components/admin/categories/CategorySummary";

export const metadata = {
  title: "Admin Dashboard | AL-HAYAT",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Concurrent data fetching with complete error isolation handled by dashboardService
  const [stats, recentProducts, recentOrders, lowStockProducts, recentActivities, categoryMetrics] =
    await Promise.all([
      getDashboardStats(),
      getRecentProducts(5),
      getDashboardOrders(5),
      getLowStockProducts(5),
      getRecentActivity(6),
      getCategoryDashboardMetrics(),
    ]);

  return (
    <div className="space-y-8">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Business Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time analytics and catalog activity across your online store.
          </p>
        </div>
      </div>

      {/* 1. Statistics Cards Grid (5 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Products"
          value={stats.totalProducts}
          description="Active catalog items"
          icon="inventory_2"
          href="/admin/products"
          iconBgColor="bg-blue-50"
          iconTextColor="text-blue-600"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          description="Orders awaiting action"
          icon="pending_actions"
          href="/admin/orders?status=pending"
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />
        <StatCard
          title="Completed Orders"
          value={stats.completedOrders}
          description="Delivered & finalized"
          icon="check_circle"
          href="/admin/orders?status=completed"
          iconBgColor="bg-green-50"
          iconTextColor="text-green-600"
        />
        <StatCard
          title="Today's Orders"
          value={stats.todaysOrders}
          description="Orders placed today"
          icon="calendar_today"
          href="/admin/orders"
          iconBgColor="bg-purple-50"
          iconTextColor="text-purple-600"
        />
        <StatCard
          title="Revenue Today"
          value={`₹${Number(stats.revenueToday || 0).toLocaleString("en-IN")}`}
          description="Total sales today"
          icon="payments"
          href="/admin/orders"
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />
      </div>

      {/* 2. Quick Actions */}
      <QuickActions />

      {/* 3. Category Ecosystem Overview */}
      <CategorySummary metrics={categoryMetrics} />

      {/* 4. Recent Orders & Low Stock Alert Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
        <div className="lg:col-span-2">
          <RecentOrders orders={recentOrders} />
        </div>
        <div className="lg:col-span-1">
          <LowStockProducts products={lowStockProducts} />
        </div>
      </div>

      {/* 4. Recent Products & Activity Feed Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
        <div className="lg:col-span-2">
          <RecentProducts products={recentProducts} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivityFeed activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}
