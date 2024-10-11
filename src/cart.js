import { getItemBySku } from "@/items";

let cartItems = [];
const delay = () => new Promise((res) => setTimeout(() => res(), 2000));

export async function getCartItems() {
  console.log('getCartItems')
  // DEMO
  // await delay();
  return cartItems;
}

export async function clearCart() {
  console.log('clearCart')
  await delay();
  cartItems = [];
  return cartItems;
}

export async function addCartItem(sku) {
  console.log('addCartItem')
  await delay();
  const item = getItemBySku(sku);
  // throw new Error("Item not found!");
  if (!item) throw new Error("Item not found!");
  const newItem = { ...item, id: Date.now(), thumbnail: `/images/${sku}.png` };
  cartItems = [...cartItems, newItem];
  return cartItems;
}