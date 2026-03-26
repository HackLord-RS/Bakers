import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, X, Plus } from 'lucide-react';
import { MenuItem } from '../types';

export const categories = ["Signature Cakes", "Premium Creations", "Celebration Cakes", "Special Creations", "Fast Food Items", "Shakes & Combos"];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Truffle Cake",
    description: "Simply loaded with layers of rich Belgian chocolate and velvety ganache.",
    price: 500,
    prices: {
      '1 Pound': 500,
      '2 Pound': 1000,
      '3 Pound': 1500,
      'Pastry': 100
    },
    image: "https://images.unsplash.com/photo-1694168949272-cd0f0209c5b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRydWZmbGUlMjBjaG9jb2xhdGUlMjBjYWtlfGVufDB8fDB8fHww",
    category: "Premium Creations",
    isBestseller: true,
    tags: ["Chocolate"]
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    description: "Crimson elegance with cream cheese frosting that melts in your mouth.",
    price: 450,
    prices: {
      '1 Pound': 450,
      '2 Pound': 900,
      '3 Pound': 1350,
      'Pastry': 90
    },
    image: "https://plus.unsplash.com/premium_photo-1713920189785-48ef41e01824?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Signature Cakes",
    tags: ["Premium", "Cream Cheese"]
  },
  {
    id: 3,
    name: "Choco-Chip Cake",
    description: "Chocolate Chip Flavored Cake with Cream.",
    price: 400,
    prices: {
      '1 Pound': 400,
      '2 Pound': 800,
      '3 Pound': 1200,
      'Pastry': 80
    },
    image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Signature Cakes",
    tags: ["Chocolate", "Oreo"]
  },
  {
    id: 4,
    name: "Black Forest",
    description: "Layers of chocolate sponge, toppings, and fresh whipped cream.",
    price: 350,
    prices: {
      '1 Pound': 350,
      '2 Pound': 700,
      '3 Pound': 1050,
      'Pastry': 70
    },
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=2003&auto=format&fit=crop",
    category: "Signature Cakes",
    isNew: true,
    tags: ["Classic", "Toppings"]
  },
  {
    id: 5,
    name: "Butterscotch",
    description: "Golden caramel bliss with crunchy butterscotch chips.",
    price: 350,
    prices: {
      '1 Pound': 350,
      '2 Pound': 700,
      '3 Pound': 1050,
      'Pastry': 70
    },
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=2792&auto=format&fit=crop",
    category: "Signature Cakes",
    tags: ["Caramel", "Crunchy"]
  },
  {
    id: 6,
    name: "Royal Strawberry Cake",
    description: "Fresh strawberries nested in light vanilla cream.",
    price: 350,
    prices: {
      '1 Pound': 350,
      '2 Pound': 700,
      '3 Pound': 1050,
      'Pastry': 60
    },
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2865&auto=format&fit=crop",
    category: "Signature Cakes",
    tags: ["Fruity", "Fresh"]
  },
  {
    id: 7,
    name: "Casata Cake",
    description: "Fresh vanilla cake with cream rich decoration.",
    price: 300,
    prices: {
      '1 Pound': 300,
      '2 Pound': 600,
      '3 Pound': 900,
      'Pastry': 50
    },
    image: "https://images.unsplash.com/photo-1568051243857-068aa3ea934d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Signature Cakes",
    tags: ["Fruity", "Fresh"]
  },
  {
    id: 8,
    name: "Royal Pineapple Cake",
    description: "Fresh pineapple flavour in the face of cake.",
    price: 350,
    prices: {
      '1 Pound': 350,
      '2 Pound': 700,
      '3 Pound': 1050,
      'Pastry': 60
    },
    image: "https://images.unsplash.com/photo-1706463996571-7a2d9bb5e5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHBpbmVhcHBsZSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
    category: "Signature Cakes",
    tags: ["Fruity", "Fresh"]
  },
  {
    id: 9,
    name: "Blueberry Cake",
    description: "Fresh blueberry surface level fill with cream.",
    price: 350,
    prices: {
      '1 Pound': 350,
      '2 Pound': 700,
      '3 Pound': 1050,
      'Pastry': 70
    },
    image: "https://media.istockphoto.com/id/1330914496/photo/blueberry-layered-cheesecake-with-blueberries.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZdEF7WytGlihmM-WzVfVicYXnZdiyi3XHo7AVyIugEU=",
    category: "Signature Cakes",
    tags: ["Fruity", "Fresh"]
  },
  {
    id: 10,
    name: "Rasmalai Cake",
    description: "Premium Rasmalai Flavour in the face of cake.",
    price: 550,
    prices: {
      '1 Pound': 550,
      '2 Pound': 1100,
      '3 Pound': 1650,
      'Pastry': 100
    },
    image: "https://images.unsplash.com/photo-1683989416377-95907bd36efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UmFzbWFsYWklMjBjYWtlfGVufDB8fDB8fHww",
    category: "Premium Creations",
    tags: ["Premium", "Multiflavor"]
  },
  {
    id: 11,
    name: "Belgian Biscoff Cake",
    description: "Belgian royalty in your mouth.",
    price: 650,
    prices: {
      '1 Pound': 650,
      '2 Pound': 1300,
      '3 Pound': 1950,
      'Pastry': 120
    },
    image: "https://images.unsplash.com/photo-1759128019642-b6bd7de582ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Premium Creations",
    tags: ["Premium", "International"]
  },
  {
    id: 12,
    name: "Cheese Cake",
    description: "Cheesy creamy delight at your service. A cheesy cake with a biscuit base and a creamy filling.",
    price: 150,
    prices: { 'Standard': 150 },
    image: "https://images.unsplash.com/photo-1708175313814-679cb8e90d2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNoZWVzZSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
    category: "Special Creations",
    tags: ["Special", "Creamy"]
  },
  {
    id: 13,
    name: "Cup Cake",
    description: "Creamy Cake in shape of Cups. Cup Cake introducing in your hometown for the first ever time.",
    price: 50,
    prices: { 'Standard': 50 },
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Special Creations",
    tags: ["Special", "Fresh"]
  },
  {
    id: 14,
    name: "Chocolate Donut",
    description: "Fluffy Donut with chocolate syrup. Chocolate Donut is now not a foreign term, its in your access.",
    price: 90,
    prices: { 'Standard': 90 },
    image: "https://plus.unsplash.com/premium_photo-1672846027103-a50797886f99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hvY29sYXRlJTIwZG9udXR8ZW58MHx8MHx8fDA%3D",
    category: "Special Creations",
    tags: ["Special", "Fresh"]
  },
  {
    id: 15,
    name: "Hot Chocolate Brownie",
    description: "Hot Chocolate Brownie in your town. Chocolate Brownie is a chocolate baked confection that is rich in chocolate and has a dense, fudgy texture.",
    price: 100,
    prices: { 'Standard': 100 },
    image: "https://images.unsplash.com/photo-1663100143193-bca3e76f81b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN5cnVwZWQlMjBjaG9jb2xhdGUlMjBicm93bmllfGVufDB8fDB8fHww",
    category: "Special Creations",
    tags: ["Special", "Fresh"]
  },
  {
    id: 16,
    name: "Birthday Cake - For Boys",
    description: "Special & Beautiful Birthday Cake for Boys.",
    price: 250,
    prices: {
      '1 Pound': 250,
      '2 Pound': 425,
      '3 Pound': 600,
    },
    image: "https://i.pinimg.com/1200x/85/b5/8e/85b58e0f68ec50116c1fb4726f244696.jpg",
    category: "Celebration Cakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 17,
    name: "Birthday Cake - For Girls",
    description: "Special & Beautiful Birthday Cake for Girls.",
    price: 250,
    prices: {
      '1 Pound': 250,
      '2 Pound': 425,
      '3 Pound': 600,
    },
    image: "https://i.pinimg.com/736x/09/80/e6/0980e68f19f1873889a5efe0a8dbbe92.jpg",
    category: "Celebration Cakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 18,
    name: "Anniversary Cakes",
    description: "Anniversary Cakes for your special days.",
    price: 250,
    prices: {
      '1 Pound': 250,
      '2 Pound': 425,
      '3 Pound': 600,
    },
    image: "https://i.pinimg.com/1200x/2a/98/28/2a9828f494a6c618142aef8e22de5ce6.jpg",
    category: "Celebration Cakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 19,
    name: "Wedding Cakes",
    description: "Wedding Cakes for your most important day.",
    price: 250,
    prices: {
      '1 Pound': 250,
      '2 Pound': 425,
      '3 Pound': 600,
    },
    image: "https://i.pinimg.com/736x/1e/24/eb/1e24ebe70643473d124f9143918c2a5d.jpg",
    category: "Celebration Cakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 20,
    name: "Retirement Cakes",
    description: "Cakes for your retirement day celebration.",
    price: 250,
    prices: {
      '1 Pound': 250,
      '2 Pound': 425,
      '3 Pound': 600,
    },
    image: "https://i.pinimg.com/1200x/62/01/6e/62016e285ed658339dbdbe03e1998ade.jpg",
    category: "Celebration Cakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 21,
    name: "Child's Birthday Cakes",
    description: "Cakes for your child's birthday celebration.",
    price: 250,
    prices: {
      '1 Pound': 250,
      '2 Pound': 425,
      '3 Pound': 600,
    },
    image: "https://i.pinimg.com/1200x/ba/2b/c8/ba2bc8fe66b4f56b01e2b576a035657c.jpg",
    category: "Celebration Cakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 101,
    name: "Aloo Tikki Burger",
    description: "Crispy Aloo Tikki with fresh lettuce, tomatoes, and our secret sauce.",
    price: 50,
    prices: { 'Standard': 50 },
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop",
    category: "Fast Food Items",
    subCategory: "Burgers",
    tags: ["Veg", "Classic"]
  },
  {
    id: 102,
    name: "Paneer Burger",
    description: "Veg Burger including a great paneer bite.",
    price: 60,
    prices: { 'Standard': 60 },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
    category: "Fast Food Items",
    subCategory: "Burgers",
    isBestseller: true,
    tags: ["Paneer", "Bestseller"]
  },
  {
    id: 103,
    name: "Cheese Burger",
    description: "Classic Veg Burgers with cheesy bites.",
    price: 80,
    prices: { 'Standard': 80 },
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2hlZXNlJTIwQnVyZ2VyfGVufDB8fDB8fHww",
    category: "Fast Food Items",
    subCategory: "Burgers",
    tags: ["Fresh", "Cheesy"]
  },
  {
    id: 104,
    name: "Special Burger",
    description: "The best burger you can get with all possible fresh ingredients.",
    price: 100,
    prices: { 'Standard': 100 },
    image: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2hlZXNlJTIwQnVyZ2VyfGVufDB8fDB8fHww",
    category: "Fast Food Items",
    subCategory: "Burgers",
    tags: ["Premium", "Special"]
  },
  {
    id: 105,
    name: "Margherita Pizza",
    description: "Cheese filled bite of pizza in your mouth.",
    price: 140,
    prices: { 'Small': 140, 'Medium': 220, 'Large': 300 },
    image: "https://images.unsplash.com/photo-1712652080841-9e480a2c43ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hcmdoZXJpdGElMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Fast Food Items",
    subCategory: "Pizza",
    tags: ["Fresh", "Chessy"]
  },
  {
    id: 106,
    name: "Farmhouse Pizza",
    description: "Freshly baked crust topped with onions, tomatoes, and bell peppers.",
    price: 160,
    prices: { 'Small': 160, 'Medium': 240, 'Large': 340 },
    image: "https://images.unsplash.com/photo-1669895616443-5d21d5acc6e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VmVnJTIwcGl6emF8ZW58MHx8MHx8fDA%3D",
    category: "Fast Food Items",
    subCategory: "Pizza",
    tags: ["Fresh", "Veggie"]
  },
  {
    id: 107,
    name: "Golden Delight Pizza",
    description: "Freshly baked crust topped with fresh sweet corn and fresh cheese.",
    price: 170,
    prices: { 'Small': 170, 'Medium': 320, 'Large': 460 },
    image: "https://images.unsplash.com/photo-1620894599483-aefd71cb525f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvcm4lMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Fast Food Items",
    subCategory: "Pizza",
    tags: ["Fresh", "Corn", "Cheesy"]
  },
  {
    id: 108,
    name: "Panner Lababdar Pizza",
    description: "A panner stuffed pizza with fresh cheese and fresh tomatoes.",
    price: 220,
    prices: { 'Small': 220, 'Medium': 380, 'Large': 500 },
    image: "https://images.unsplash.com/photo-1665033628673-7de125eb6b12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyJTIwcGl6emF8ZW58MHx8MHx8fDA%3D",
    category: "Fast Food Items",
    subCategory: "Pizza",
    tags: ["Panner", "Veggie", "Cheesy"]
  },
  {
    id: 109,
    name: "Veggie Overloaded Pizza",
    description: "Freshly baked crust topped with an army of veggies.",
    price: 300,
    prices: { 'Small': 300, 'Medium': 550, 'Large': 700 },
    image: "https://images.unsplash.com/photo-1617470702892-e01504297e84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZlZ2dpZSUyMG92ZXJsb2FkJTIwcGl6emF8ZW58MHx8MHx8fDA%3D",
    category: "Fast Food Items",
    subCategory: "Pizza",
    tags: ["Fresh", "Veggie", "Cheesy"]
  },
  {
    id: 110,
    name: "Cold Sandwich",
    description: "Grilled veg sandwich but not cooked.",
    price: 50,
    prices: { 'Standard': 50 },
    image: "https://images.unsplash.com/photo-1746333372832-58df1cda4960?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sZCUyMHNhbmR3aWNofGVufDB8fDB8fHww",
    category: "Fast Food Items",
    subCategory: "Sandwiches",
    tags: ["Cold", "Grilled"]
  },
  {
    id: 111,
    name: "Veg Sandwich",
    description: "Grilled veg sandwich perfectly cooked.",
    price: 60,
    prices: { 'Standard': 60 },
    image: "https://plus.unsplash.com/premium_photo-1738802845911-809a01acfa50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnJTIwc2FuZHdpY2h8ZW58MHx8MHx8fDA%3D",
    category: "Fast Food Items",
    subCategory: "Sandwiches",
    tags: ["Baked", "Grilled"]
  },
  {
    id: 112,
    name: "Cheese Corn Sandwich",
    description: "Grilled veg sandwich cooked with cheese and corn stuffings.",
    price: 90,
    prices: { 'Standard': 90 },
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2073&auto=format&fit=crop",
    category: "Fast Food Items",
    subCategory: "Sandwiches",
    tags: ["Cheesy", "Grilled"]
  },
  {
    id: 113,
    name: "Special Sandwich",
    description: "Grilled veg sandwich cooked with best possible stuffings.",
    price: 150,
    prices: { 'Standard': 150 },
    image: "https://plus.unsplash.com/premium_photo-1739906393226-9978e7943b00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hlZXNlJTIwY29ybiUyMHNhbmR3aWNofGVufDB8fDB8fHww",
    category: "Fast Food Items",
    subCategory: "Sandwiches",
    tags: ["Best", "Grilled"]
  },
  {
    id: 114,
    name: "White Sauce Pasta",
    description: "Creamy penne pasta tossed in rich alfredo sauce with exotic veggies.",
    price: 80,
    prices: { 'Half': 80, 'Full': 140 },
    image: "https://images.unsplash.com/photo-1570549986390-6bd150ac3515?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBzYXVjZSUyMHBhc3RhfGVufDB8fDB8fHww",
    category: "Fast Food Items",
    subCategory: "Pasta",
    tags: ["Creamy", "Italian"]
  },
  {
    id: 115,
    name: "Red Sauce Pasta",
    description: "Penne pasta tossed in rich red sauce with exotic veggies.",
    price: 80,
    prices: { 'Half': 80, 'Full': 140 },
    image: "https://plus.unsplash.com/premium_photo-1664478288635-b9703a502393?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwc2F1Y2UlMjBwYXN0YXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Fast Food Items",
    subCategory: "Pasta",
    tags: ["Creamy", "Italian"]
  },
  {
    id: 116,
    name: "Special Pasta",
    description: "Creamy penne pasta tossed in rich red & white sauce with exotic veggies.",
    price: 120,
    prices: { 'Half': 120, 'Full': 200 },
    image: "https://images.unsplash.com/photo-1576402738587-4f748fff5ba1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNwZWNpYWwlMjBwYXN0YXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Fast Food Items",
    subCategory: "Pasta",
    tags: ["Best", "Italian"]
  },
  {
    id: 117,
    name: "Crunchy Puff",
    description: "A delightful version of pizza in puff's face.",
    price: 120,
    prices: { 'Standard': 120 },
    image: "https://i.pinimg.com/736x/86/97/bd/8697bd81360d9f002d00a1d3eddc7159.jpg",
    category: "Fast Food Items",
    subCategory: "Something Special",
    isNew: true,
    tags: ["Special", "Sharing"]
  },
  {
    id: 201,
    name: "Cold Coffee",
    description: "A refreshing cold coffee for a hot day.",
    price: 80,
    prices: { 'Standard': 80 },
    image: "https://plus.unsplash.com/premium_photo-1726866175183-7fe0f6f9746f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbGQlMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D",
    category: "Shakes & Combos",
    subCategory: "Shakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 202,
    name: "Strawberry Shake",
    description: "A refreshing strawberry shake for a hot day.",
    price: 80,
    prices: { 'Standard': 80 },
    image: "https://images.unsplash.com/photo-1648178628415-b410fc1d58bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RyYXdiZXJyeSUyMHNoYWtlfGVufDB8fDB8fHww",
    category: "Shakes & Combos",
    subCategory: "Shakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 203,
    name: "Pineapple Shake",
    description: "A refreshing pineapple shake for a hot day.",
    price: 80,
    prices: { 'Standard': 80 },
    image: "https://images.unsplash.com/photo-1666181767084-91e0cd358adf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBpbmVhcHBsZSUyMHNoYWtlfGVufDB8fDB8fHww",
    category: "Shakes & Combos",
    subCategory: "Shakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 204,
    name: "Butterscotch Shake",
    description: "A refreshing butterscotch shake for a hot day.",
    price: 90,
    prices: { 'Standard': 90 },
    image: "https://i.pinimg.com/736x/28/90/3f/28903fa9949d795384fe0d9964f7d7a9.jpg",
    category: "Shakes & Combos",
    subCategory: "Shakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 205,
    name: "Chocolate Shake",
    description: "A refreshing chocolate shake for a hot day.",
    price: 100,
    prices: { 'Standard': 100 },
    image: "https://i.pinimg.com/736x/87/17/4a/87174a7f303abed8af3f85a138dc4176.jpg",
    category: "Shakes & Combos",
    subCategory: "Shakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 206,
    name: "Oreo Shake",
    description: "A refreshing oreo shake for a hot day.",
    price: 120,
    prices: { 'Standard': 120 },
    image: "https://i.pinimg.com/736x/d6/e0/03/d6e0031bd946fc0892adddc2e23a4518.jpg",
    category: "Shakes & Combos",
    subCategory: "Shakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 207,
    name: "Kit-Kat Shake",
    description: "A refreshing kit-kat shake for a hot day.",
    price: 120,
    prices: { 'Standard': 120 },
    image: "https://i.pinimg.com/736x/f9/20/65/f92065355cf7bdc8d051e43f435aa140.jpg",
    category: "Shakes & Combos",
    subCategory: "Shakes",
    tags: ["Special", "Fresh"]
  },
  {
    id: 208,
    name: "Buddy Combo",
    description: "A perfect combo for two. Includes 2 Burgers + 2 glass of coldrinks.",
    price: 129,
    prices: { 'Standard': 129 },
    image: "https://images.unsplash.com/photo-1641848604876-5ba907ba2b0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyJTIwY29sZHJpbmslMjBjb21ib3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Shakes & Combos",
    subCategory: "Combos",
    tags: ["Special", "Fresh"]
  },
  {
    id: 209,
    name: "Family Combo",
    description: "A perfect combo for family. Includes 2 Burgers + 2 glass of coldrinks.",
    price: 249,
    prices: { 'Standard': 249 },
    image: "https://images.unsplash.com/photo-1641848604876-5ba907ba2b0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyJTIwY29sZHJpbmslMjBjb21ib3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Shakes & Combos",
    subCategory: "Combos",
    tags: ["Special", "Fresh"]
  },
  {
    id: 210,
    name: "Family Combo",
    description: "A perfect combo for family. Includes 2 Burgers + 2 glass of coldrinks.",
    price: 649,
    prices: { 'Standard': 649 },
    image: "https://images.unsplash.com/photo-1641848604876-5ba907ba2b0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyJTIwY29sZHJpbmslMjBjb21ib3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Shakes & Combos",
    subCategory: "Combos",
    tags: ["Special", "Fresh"]
  },
];

export const fastFoodSubCategories = ["Burgers", "Pizza", "Sandwiches", "Pasta", "Something Special"];
export const shakesAndCombosSubCategories = ["Shakes", "Combos"];


interface MenuProps {
  addToCart: (item: MenuItem, quantity?: number, weight?: string) => void;
  onViewFull?: () => void;
  onCustomOrder?: () => void;
}

const Menu = ({ addToCart, onViewFull, onCustomOrder }: MenuProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // State for each item's weight and quantity
  const [itemStates, setItemStates] = useState<Record<number, { weight: string; quantity: number }>>({});

  // Get or initialize state for an item
  const getItemState = (itemId: number) => {
    if (itemStates[itemId]) return itemStates[itemId];
    const item = menuItems.find(i => i.id === itemId);
    const defaultWeight = item ? Object.keys(item.prices)[0] : '1 Pound';
    return { weight: defaultWeight, quantity: 1 };
  };

  // Update weight for an item
  const setItemWeight = (itemId: number, weight: string) => {
    setItemStates(prev => ({
      ...prev,
      [itemId]: { ...getItemState(itemId), weight }
    }));
  };

  // Update quantity for an item
  const setItemQuantity = (itemId: number, delta: number) => {
    const currentState = getItemState(itemId);
    const newQuantity = Math.max(1, currentState.quantity + delta);
    setItemStates(prev => ({
      ...prev,
      [itemId]: { ...currentState, quantity: newQuantity }
    }));
  };

  const filteredItems = menuItems.filter(item => item.category === activeCategory).slice(0, 3);


  return (
    <section id="menu" className="bg-dark-800 py-24 scroll-mt-28">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 font-sans tracking-[0.2em] text-xs uppercase block mb-4">Our Creations</span>
          <h2 className="text-5xl font-serif text-white mb-6">The Menu</h2>
          <p className="text-gray-400 font-light italic">"Handcrafted with the finest ingredients, each cake tells a story of passion and artistry."</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-sm font-sans tracking-widest uppercase transition-all duration-300 border ${activeCategory === cat
                ? 'bg-gold-500 border-gold-500 text-black font-bold'
                : 'bg-transparent border-white/10 text-gray-400 hover:border-gold-400 hover:text-gold-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-900 rounded-lg overflow-hidden border border-white/5 hover:border-gold-400/30 group"
              >
                {/* Card Image */}
                <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.isBestseller && (
                    <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                      Bestseller
                    </div>
                  )}
                  {item.isNew && (
                    <div className="absolute top-4 left-4 bg-gold-500 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-2 rounded-sm font-bold tracking-widest hover:bg-gold-400 transition-colors">
                      QUICK VIEW
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    {item.tags?.map(tag => (
                      <span key={tag} className="text-[10px] text-gold-400 uppercase tracking-wider border border-gold-400/20 px-2 py-0.5 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="text-2xl font-serif text-white mb-2 cursor-pointer hover:text-gold-400 transition-colors"
                    onClick={() => setSelectedItem(item)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                  {/* Options */}
                  <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
                    {Object.keys(item.prices).length > 1 && Object.keys(item.prices).map((pKey) => (
                      <button
                        key={pKey}
                        onClick={() => setItemWeight(item.id, pKey)}
                        className={`text-xs font-bold px-3 py-1 rounded-sm transition-colors ${getItemState(item.id).weight === pKey
                          ? 'bg-gold-500 text-black'
                          : 'bg-dark-700 text-gray-400 border border-white/10 hover:border-white/30'
                          }`}
                      >
                        {pKey}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="text-xl font-serif text-gold-400">₹{item.prices[getItemState(item.id).weight].toLocaleString()}</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-dark-700 rounded-sm border border-white/10">
                        <button
                          onClick={() => setItemQuantity(item.id, -1)}
                          className="px-3 py-1 text-gray-400 hover:text-white disabled:opacity-30"
                          disabled={getItemState(item.id).quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm text-white px-1 min-w-[20px] text-center">{getItemState(item.id).quantity}</span>
                        <button
                          onClick={() => setItemQuantity(item.id, 1)}
                          className="px-3 py-1 text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          const state = getItemState(item.id);
                          addToCart(item, state.quantity, state.weight);
                        }}
                        className="bg-gold-500 p-2 rounded-sm text-black hover:bg-gold-400 transition-colors hover:scale-105 active:scale-95"
                      >
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-16 flex flex-col items-center gap-4">
          <button
            onClick={onViewFull}
            className="group inline-flex items-center gap-2 border border-gold-400 text-gold-400 px-8 py-3 rounded-sm font-bold tracking-widest hover:bg-gold-400 hover:text-black transition-all duration-300"
          >
            VIEW FULL MENU
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onCustomOrder}
            className="group inline-flex items-center gap-2 border border-white/20 text-gray-300 px-8 py-3 rounded-sm font-bold tracking-widest hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
          >
            ✦ CUSTOMIZE YOUR CAKE
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="bg-dark-900 w-full max-w-4xl rounded-lg overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full hover:bg-gold-500 hover:text-black transition-colors"
                  onClick={() => setSelectedItem(null)}
                >
                  <X size={20} />
                </button>

                {/* Modal Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedItem.isBestseller && (
                    <div className="absolute bottom-4 left-4 bg-gold-500 text-black text-xs font-bold px-4 py-2 uppercase tracking-wider shadow-lg">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Modal Details */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex gap-2 mb-4">
                    {selectedItem.tags?.map(tag => (
                      <span key={tag} className="text-xs text-gold-400 uppercase tracking-wider border border-gold-400/20 px-3 py-1 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-4xl font-serif text-white mb-4">{selectedItem.name}</h2>
                  <p className="text-gray-300 leading-relaxed mb-6 font-light">{selectedItem.description}</p>

                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-serif text-gold-400">₹{selectedItem.prices[getItemState(selectedItem.id).weight].toLocaleString()}</span>
                    <span className="text-gray-500 text-sm line-through">₹{(selectedItem.prices[getItemState(selectedItem.id).weight] * 1.2).toFixed(0)}</span>
                  </div>

                  <div className="space-y-6">
                    {Object.keys(selectedItem.prices).length > 1 && (
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">
                          {selectedItem.category === "Fast Food Items" ? "Size" : "Weight"}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {Object.keys(selectedItem.prices).map((pKey) => (
                            <button
                              key={pKey}
                              onClick={() => setItemWeight(selectedItem.id, pKey)}
                              className={`text-sm font-bold px-6 py-2 rounded-sm border transition-colors ${getItemState(selectedItem.id).weight === pKey
                                ? 'bg-gold-500 text-black border-gold-500'
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-gold-400 hover:text-gold-400'
                                }`}
                            >
                              {pKey}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Quantity</label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-dark-800 rounded-sm border border-white/10">
                          <button
                            onClick={() => setItemQuantity(selectedItem.id, -1)}
                            className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-30"
                            disabled={getItemState(selectedItem.id).quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-lg text-white px-4 min-w-[40px] text-center font-bold">{getItemState(selectedItem.id).quantity}</span>
                          <button
                            onClick={() => setItemQuantity(selectedItem.id, 1)}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const state = getItemState(selectedItem.id);
                        addToCart(selectedItem, state.quantity, state.weight);
                        setSelectedItem(null);
                      }}
                      className="w-full bg-white hover:bg-gold-400 text-black py-4 rounded-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Plus size={18} />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Menu;