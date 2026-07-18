/**
 * dashboardService.ts
 * -------------------
 * Server-only orchestration layer for the Admin Dashboard (/admin).
 * Delegates domain logic to orderService and adminProductService.
 * Wraps individual service calls in safe error boundaries so a failure in
 * one widget never crashes the dashboard.
 */

import { getOrderStats, getRecentOrders as getOrdersRecent } from "@/services/orderService";
import {
  getProductStats,
  getLowStockProducts as getProductsLowStock,
  getRecentProducts as getProductsRecent,
  type DbProduct,
} from "@/services/adminProductService";
import {
  getCategoryDashboardMetrics as getCategoriesDashboardMetrics,
  getCategoryStatistics as getCategoriesStatistics,
} from "@/services/adminCategoryService";
import type { Order } from "@/types/order";
import type { CategoryDashboardMetrics, CategoryWithStats } from "@/types/category";

export interface DashboardStats {
  totalProducts: number;
  pendingOrders: number;
  completedOrders: number;
  todaysOrders: number;
  revenueToday: number;
}

export interface ActivityItem {
  id: string;
  type: "order_new" | "order_completed" | "product_added" | "product_updated";
  title: string;
  description: string;
  timestamp: string;
  href: string;
}

/**
 * Aggregates dashboard statistics safely.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [productStats, orderStats] = await Promise.all([
      getProductStats().catch((err) => {
        console.error("Dashboard orchestration: getProductStats failed:", err?.message || err);
        return { totalProducts: 0 };
      }),
      getOrderStats().catch((err) => {
        console.error("Dashboard orchestration: getOrderStats failed:", err?.message || err);
        return {
          pendingOrders: 0,
          completedOrders: 0,
          todaysOrders: 0,
          revenueToday: 0,
        };
      }),
    ]);

    return {
      totalProducts: productStats.totalProducts,
      pendingOrders: orderStats.pendingOrders,
      completedOrders: orderStats.completedOrders,
      todaysOrders: orderStats.todaysOrders,
      revenueToday: orderStats.revenueToday,
    };
  } catch (error) {
    console.error("Fatal error aggregating dashboard stats:", error);
    return {
      totalProducts: 0,
      pendingOrders: 0,
      completedOrders: 0,
      todaysOrders: 0,
      revenueToday: 0,
    };
  }
}

/**
 * Fetches recent products via adminProductService.
 */
export async function getRecentProducts(limit = 5): Promise<DbProduct[]> {
  try {
    return await getProductsRecent(limit);
  } catch (error) {
    console.error("Dashboard orchestration: getRecentProducts failed:", error);
    return [];
  }
}

/**
 * Fetches recent orders via orderService.
 */
export async function getRecentOrders(limit = 5): Promise<Order[]> {
  try {
    return await getOrdersRecent(limit);
  } catch (error) {
    console.error("Dashboard orchestration: getRecentOrders failed:", error);
    return [];
  }
}

/**
 * Fetches low stock products via adminProductService.
 */
export async function getLowStockProducts(limit = 5): Promise<DbProduct[]> {
  try {
    return await getProductsLowStock(limit);
  } catch (error) {
    console.error("Dashboard orchestration: getLowStockProducts failed:", error);
    return [];
  }
}

/**
 * Synthesizes recent activities chronologically (newest first).
 */
export async function getRecentActivity(limit = 6): Promise<ActivityItem[]> {
  try {
    const [orders, products] = await Promise.all([
      getOrdersRecent(12).catch(() => [] as Order[]),
      getProductsRecent(12).catch(() => [] as DbProduct[]),
    ]);

    const activities: ActivityItem[] = [];

    for (const order of orders) {
      // New Order Received
      activities.push({
        id: `order_new_${order.id}`,
        type: "order_new",
        title: "New Order Received",
        description: `Order #${order.order_number || order.id} from ${order.customer_name} (₹${Number(order.total_amount || 0).toLocaleString("en-IN")})`,
        timestamp: order.created_at,
        href: `/admin/orders/${order.id}`,
      });

      // Order Completed
      if (order.status === "Completed" && order.completed_at) {
        activities.push({
          id: `order_completed_${order.id}`,
          type: "order_completed",
          title: "Order Completed",
          description: `Order #${order.order_number || order.id} marked as Completed`,
          timestamp: order.completed_at,
          href: `/admin/orders/${order.id}`,
        });
      }
    }

    for (const product of products) {
      activities.push({
        id: `product_added_${product.id}`,
        type: "product_added",
        title: "Product Added",
        description: `${product.name} (${product.category})`,
        timestamp: product.created_at,
        href: `/admin/products/${product.id}/edit`,
      });

      // Product updated significantly after creation (> 60 seconds)
      if (
        product.updated_at &&
        product.created_at &&
        new Date(product.updated_at).getTime() - new Date(product.created_at).getTime() > 60000
      ) {
        activities.push({
          id: `product_updated_${product.id}`,
          type: "product_updated",
          title: "Product Updated",
          description: `${product.name} formulation or inventory updated`,
          timestamp: product.updated_at,
          href: `/admin/products/${product.id}/edit`,
        });
      }
    }

    // Sort strictly newest first
    activities.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return activities.slice(0, limit);
  } catch (error) {
    console.error("Dashboard orchestration: getRecentActivity failed:", error);
    return [];
  }
}

/**
 * Fetches system-wide category metrics safely.
 */
export async function getCategoryDashboardMetrics(): Promise<CategoryDashboardMetrics> {
  try {
    return await getCategoriesDashboardMetrics();
  } catch (error) {
    console.error("Dashboard orchestration: getCategoryDashboardMetrics failed:", error);
    return {
      totalCategories: 0,
      visibleCategories: 0,
      hiddenCategories: 0,
      featuredCategories: 0,
      emptyCategories: 0,
      largestCategory: null,
      newestCategory: null,
    };
  }
}

/**
 * Fetches statistics for a specific category safely.
 */
export async function getCategoryStatistics(categoryId: string): Promise<CategoryWithStats | null> {
  try {
    return await getCategoriesStatistics(categoryId);
  } catch (error) {
    console.error(`Dashboard orchestration: getCategoryStatistics(${categoryId}) failed:`, error);
    return null;
  }
}
