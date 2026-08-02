"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateOrderSchema } from "@/types/order";

// Create a schema specifically for the form inputs
const CheckoutFormSchema = CreateOrderSchema.pick({
  customer_name: true,
  customer_phone: true,
  customer_email: true,
  customer_address: true,
  customer_landmark: true,
  customer_city: true,
  customer_state: true,
  customer_pincode: true,
  notes: true,
});

type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isSubmitting: boolean;
}

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      customer_address: "",
      customer_landmark: "",
      customer_city: "",
      customer_state: "",
      customer_pincode: "",
      notes: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "#1A1A1A", marginBottom: "24px" }}>
        Delivery Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Full Name *
          </label>
          <input
            {...register("customer_name")}
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_name ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01]`}
            placeholder="Dr. Farheen"
          />
          {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Phone Number *
          </label>
          <input
            {...register("customer_phone")}
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_phone ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01]`}
            placeholder="+91 9876543210"
          />
          {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{errors.customer_phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Email Address (Optional)
          </label>
          <input
            {...register("customer_email")}
            type="email"
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_email ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01]`}
            placeholder="you@example.com"
          />
          {errors.customer_email && <p className="text-red-500 text-xs mt-1">{errors.customer_email.message}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Complete Address *
          </label>
          <textarea
            {...register("customer_address")}
            rows={3}
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_address ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01] resize-none`}
            placeholder="House/Flat No, Building Name, Street"
          />
          {errors.customer_address && <p className="text-red-500 text-xs mt-1">{errors.customer_address.message}</p>}
        </div>

        {/* Landmark */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Landmark (Optional)
          </label>
          <input
            {...register("customer_landmark")}
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_landmark ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01]`}
            placeholder="Near Apollo Hospital"
          />
          {errors.customer_landmark && <p className="text-red-500 text-xs mt-1">{errors.customer_landmark.message}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            City *
          </label>
          <input
            {...register("customer_city")}
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_city ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01]`}
            placeholder="Mumbai"
          />
          {errors.customer_city && <p className="text-red-500 text-xs mt-1">{errors.customer_city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            State *
          </label>
          <input
            {...register("customer_state")}
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_state ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01]`}
            placeholder="Maharashtra"
          />
          {errors.customer_state && <p className="text-red-500 text-xs mt-1">{errors.customer_state.message}</p>}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Pincode *
          </label>
          <input
            {...register("customer_pincode")}
            className={`w-full px-4 py-3 rounded-lg border ${errors.customer_pincode ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01]`}
            placeholder="400001"
          />
          {errors.customer_pincode && <p className="text-red-500 text-xs mt-1">{errors.customer_pincode.message}</p>}
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#47483a] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Order Notes (Optional)
          </label>
          <textarea
            {...register("notes")}
            rows={2}
            className={`w-full px-4 py-3 rounded-lg border ${errors.notes ? "border-red-500" : "border-[#EAE2D1]"} bg-[#fff8f1] focus:outline-none focus:border-[#434b01] resize-none`}
            placeholder="Any special instructions for delivery"
          />
          {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "15px", letterSpacing: "0.1em" }}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              PROCESSING ORDER...
            </span>
          ) : (
            <>
              PLACE ORDER
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>check_circle</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
