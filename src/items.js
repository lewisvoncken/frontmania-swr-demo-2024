// src/items.js

export const items = [
    { sku: "001", name: "Stevens Gavere 2021", price: 10 },
    { sku: "002", name: "iPhone", price: 20 },
    { sku: "003", name: "MacBook", price: 30 },
    { sku: "004", name: "Item 4", price: 43 },
    { sku: "005", name: "Item 5", price: 55 },
    { sku: "006", name: "Item 6", price: 69 },
    { sku: "007", name: "James Bond", price: 17 },
  ];
  
  export function getItemBySku(sku) {
    return items.find(item => item.sku === sku);
  }