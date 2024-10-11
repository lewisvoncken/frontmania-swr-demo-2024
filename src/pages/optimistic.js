import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import Image from "next/image";
import { getCartItems, addCartItem, clearCart } from "@/cart";
import MiniCart from "@/components/MiniCart";
import { AppBar } from "@/components/AppBar";

export default function App() {
  const [sku, setSku] = useState("");
  const { data: cartItems = [], mutate } = useSWR("/api/cart", getCartItems);

  const handleAddItem = async () => {
    // setSku("");
    try {
      await mutate(addCartItem(sku), {
        optimisticData: [...cartItems, { id: Date.now(), sku }],
        rollbackOnError: false,
        populateCache: true,
        // revalidate: false,
      });
      toast.success("Successfully added the new item.");
    } catch (e) {
      toast.error("Failed to add the new item.");
    }
  };

  const handleClearCart = async () => {
    try {
      await mutate(clearCart(), {
        optimisticData: [],
        rollbackOnError: false,
        populateCache: true,
        // revalidate: false,
      });
      toast.success("Successfully cleared the cart.");
    } catch (e) {
      toast.error("Failed to clear the cart.");
    }
  };

  return (
    <div className="p-8">
      <Toaster toastOptions={{ position: "bottom-center" }} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <MiniCart />
      </div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleAddItem();
        }}
      >
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Enter SKU"
          className="border p-2 mr-2 text-black bg-white"
          autoFocus
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mr-2">
          Add
        </button>
        <button type="button" onClick={handleClearCart} className="bg-red-500 text-white p-2">
          Clear Cart
        </button>
      </form>
      <ul className="mt-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center border-b p-2">
            <div className="w-24 h-24 bg-white flex items-center justify-center mr-4">
              <Image src={item.thumbnail} alt={item.name} className="object-contain" width={100} height={100} />
            </div>            <div>
              <div className="font-bold">{item.name}</div>
              <div>{item.sku} {item.price ? `(€${item.price})` : ""}</div>
            </div>
          </li>
        ))}
      </ul>
      <AppBar />
    </div>
  );
}