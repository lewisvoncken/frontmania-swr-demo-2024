import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { getCartItems } from "@/cart";

export default function MiniCart() {
  const { data: cartItems = [] } = useSWR("/api/cart", getCartItems, {
    // DEMO
    // dedupingInterval: 0,
  });
  const [prevCount, setPrevCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cartItems.length > prevCount) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500); // Reset animation state after 500ms
    }
    setPrevCount(cartItems.length);
  }, [cartItems.length, prevCount]);

  return (
    <div className="relative">
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21h6M9 21a2 2 0 11-4 0M15 21a2 2 0 104 0"
        ></path>
      </svg>
      <AnimatePresence>
          <motion.span
            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
            initial={{ scale: 0, backgroundColor: "#dc2626" }}
            animate={{
              scale: animate ? 1.5 : 1,
              backgroundColor: animate ? "#16a34a" : "#dc2626",
            }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cartItems.length}
          </motion.span>
      </AnimatePresence>
    </div>
  );
}