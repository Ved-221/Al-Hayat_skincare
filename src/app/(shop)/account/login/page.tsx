"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function CustomerAuthPage() {
  const supabase = createClient();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    router.replace("/account");
    router.refresh();
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6 py-20 bg-[#fff8f1]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white border border-[#c8c7b5]/30 p-8 shadow-xs"
      >
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-[#787868]">
            {isLogin
              ? "Sign in to access your orders and wishlist."
              : "Sign up to track orders and save your favorite products."}
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#434b01] uppercase tracking-wider">
            Email Address
          </label>
          <input
            className="rounded-xl border border-[#c8c7b5]/60 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#434b01]/20 transition-all bg-[#faf3ea]/30"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#434b01] uppercase tracking-wider">
            Password
          </label>
          <input
            className="rounded-xl border border-[#c8c7b5]/60 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#434b01]/20 transition-all bg-[#faf3ea]/30"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-[#434b01] py-3 text-sm font-bold text-white shadow-xs hover:bg-[#5a6401] transition-colors disabled:opacity-70 tracking-wide"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
        </button>

        <div className="mt-4 text-center text-sm text-[#787868]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
            }}
            className="font-semibold text-[#b22a2b] hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
