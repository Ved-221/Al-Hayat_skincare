"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import WhatsAppButton from "@/components/checkout/WhatsAppButton";
import { getOrderForWhatsAppAction } from "./actions";
import { WhatsAppOrderPayload } from "@/types/order";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  
  const [payload, setPayload] = useState<WhatsAppOrderPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      const result = await getOrderForWhatsAppAction(orderNumber!);
      if (result.success) {
        setPayload(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [orderNumber]);
  
  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center max-w-2xl mx-auto w-full">
      <span className="material-symbols-outlined text-[#434b01] mb-6" style={{ fontSize: "80px" }}>check_circle</span>
      
      <h1 
        className="mb-4"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,36px)", fontWeight: 600, color: "#1A1A1A" }}
      >
        Order Confirmed!
      </h1>
      
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#47483a", lineHeight: 1.6, marginBottom: "32px" }}>
        Thank you for shopping with Al-Hayat Skincare. Your order has been successfully placed and is now being processed.
      </p>

      {orderNumber && (
        <div className="bg-[#fff8f1] border border-[#EAE2D1] rounded-xl p-6 mb-8 inline-block text-left w-full sm:w-auto min-w-[250px]">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#787868", marginBottom: "4px" }}>Order Reference Number</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#434b01", wordBreak: "break-all" }}>
            {orderNumber}
          </p>
        </div>
      )}

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#787868", marginBottom: "32px" }}>
        We'll contact you shortly regarding the delivery details. Please send your order via WhatsApp for faster processing!
      </p>

      {loading ? (
        <div className="mb-8">Loading order details...</div>
      ) : error ? (
        <div className="text-red-500 mb-8 p-3 bg-red-50 rounded-lg">{error}</div>
      ) : payload ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <WhatsAppButton payload={payload} />
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : null}
      
      {!payload && !loading && (
        <Link 
          href="/products" 
          className="inline-flex px-8 py-4 rounded-lg text-white hover:opacity-90 transition-opacity"
          style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
        >
          CONTINUE SHOPPING
        </Link>
      )}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#fff8f1] flex flex-col">
      <div className="flex-1 pt-[140px] pb-24 px-6 w-full flex items-center justify-center">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </div>
    </main>
  );
}
