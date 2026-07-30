"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartSummary from "@/components/checkout/CartSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { createOrderAction } from "@/app/admin/(protected)/orders/actions";
import { getProducts } from "@/services/productService";

export default function CheckoutPage() {
  const { items, getSubtotal, getGrandTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // If cart is empty on mount, redirect to cart page
    if (useCartStore.getState().items.length === 0) {
      router.push("/cart");
    }
  }, [router]);

  if (!mounted || items.length === 0) return null;

  const handleSubmitOrder = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate cart items against latest product data
      const latestProducts = await getProducts();
      
      for (const item of items) {
        const latestProduct = latestProducts.find(p => p.slug === item.productId);
        
        if (!latestProduct) {
          setError(`Product "${item.name}" is no longer available. Please remove it from your cart.`);
          setIsSubmitting(false);
          return;
        }

        // Compare price (ignoring currency symbol)
        const numericPrice = parseFloat(latestProduct.price.replace(/[^\d.]/g, '')) || 0;
        if (numericPrice !== item.price) {
          setError(`The price of "${item.name}" has changed. Please review your cart.`);
          setIsSubmitting(false);
          return;
        }
      }

      const orderItems = items.map(item => ({
        product_id: item.dbId || 0, // Fallback to 0 if dbId is missing (e.g. for static products not in DB yet)
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        line_total: item.price * item.quantity,
      }));

      const subtotal = getSubtotal();
      const total_amount = getGrandTotal(0, 0);

      const orderInput = {
        ...formData,
        subtotal,
        total_amount,
        delivery_charge: 0,
        discount_amount: 0,
        items: orderItems,
      };

      const result = await createOrderAction(orderInput);

      if (result.success) {
        // Clear cart only on success
        clearCart();
        // Use router to redirect to success page
        router.push(`/order-success?orderNumber=${result.data?.order_number}`);
      } else {
        setError(result.error || "Failed to create order. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8f1] flex flex-col">
      <div className="flex-1 pt-[120px] pb-24 px-6 max-w-5xl mx-auto w-full">
        <h1 
          className="text-center mb-10"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 600, color: "#434b01" }}
        >
          Checkout
        </h1>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8">
            <CheckoutForm onSubmit={handleSubmitOrder} isSubmitting={isSubmitting} />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
