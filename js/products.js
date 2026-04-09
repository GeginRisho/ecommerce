// Mock Data for 30 Products
// Categories: Watch, Shirt, Shoe, Perfume

const products = [
  // Watches
  { id: 1, name: "Luxury Gold Watch", price: 4500, category: "Watch", image: "images/w1.png", rating: 4.8, reviews: 142, description: "A stunning piece of craftsmanship featuring a solid gold band and precision mechanical movement. A true statement of elegance." },
  { id: 2, name: "Smart Fitness Watch", price: 2999, category: "Watch", image: "images/w2.png", rating: 4.5, reviews: 310, description: "Stay connected and track your fitness goals effortlessly. This smartwatch offers deep analytics with an ultra-bright AMOLED display." },
  { id: 3, name: "Classic Leather Timepiece", price: 3500, category: "Watch", image: "images/w3.png", rating: 4.6, reviews: 88, description: "Minimalist design meets timeless sophistication. Hand-stitched premium leather meets reliable quartz movement." },
  { id: 4, name: "Minimalist Black Dial", price: 2100, category: "Watch", image: "images/w1.png", rating: 4.3, reviews: 55, description: "A sleek, all-black aesthetic. Matte finish, lightweight casing, and stealthy elegance." },
  { id: 5, name: "Diving Chronograph", price: 5500, category: "Watch", image: "images/w2.png", rating: 4.9, reviews: 201, description: "Water-resistant up to 200m. Built for absolute durability and high underwater visibility." },
  { id: 6, name: "Blue Metallic Watch", price: 3800, category: "Watch", image: "images/w3.png", rating: 4.4, reviews: 94, description: "Unique metallic blue finish that changes hue under lighting. Made with aerospace-grade aluminum." },
  { id: 7, name: "Rose Gold Elegance", price: 4200, category: "Watch", image: "images/w1.png", rating: 4.7, reviews: 156, description: "Encrusted with subtle crystal detailing. The rose gold accent adds a layer of feminine charm and luxury." },
  
  // Shirts
  { id: 8, name: "Blue Oxford Shirt", price: 1200, category: "Shirt", image: "images/sh1.png", rating: 4.5, reviews: 402, description: "100% fine cotton. Perfect for the boardroom or a casual weekend out." },
  { id: 9, name: "Black Casual Tee", price: 699, category: "Shirt", image: "images/sh2.png", rating: 4.8, reviews: 905, description: "Breathable and incredibly soft. Engineered to retain its shape after endless washes." },
  { id: 10, name: "Formal White Shirt", price: 1500, category: "Shirt", image: "images/sh3.png", rating: 4.6, reviews: 211, description: "A staple in any luxury wardrobe. Wrinkle-resistant with a sharp, tailored fit." },
  { id: 11, name: "Navy Blue Polo", price: 899, category: "Shirt", image: "images/sh1.png", rating: 4.2, reviews: 178, description: "A classic polo with ribbed collars and a premium pique cotton base." },
  { id: 12, name: "Gold Patterned Shirt", price: 1750, category: "Shirt", image: "images/sh2.png", rating: 4.7, reviews: 63, description: "Make a statement. The subtle gold patterns catch the light beautifully for evening wear." },
  { id: 13, name: "Plaid Flannel", price: 1100, category: "Shirt", image: "images/sh3.png", rating: 4.3, reviews: 112, description: "Warm, rugged, and reliable. Essential for the colder months." },
  { id: 14, name: "Denim Blue Shirt", price: 1450, category: "Shirt", image: "images/sh1.png", rating: 4.6, reviews: 290, description: "Heavyweight denim layered with a sophisticated wash. Works perfectly as a standalone or overshirt." },
  { id: 15, name: "Silk Blend Gold Tee", price: 2100, category: "Shirt", image: "images/sh2.png", rating: 4.9, reviews: 45, description: "Luxurious silk-cotton blend. The drape and shine give it a highly premium feel." },

  // Shoes
  { id: 16, name: "Gold Accented Sneakers", price: 3500, category: "Shoe", image: "images/s1.png", rating: 4.7, reviews: 301, description: "Urban streetwear meets luxury. High-comfort midsole with flashy gold detailing." },
  { id: 17, name: "Classic Black Loafers", price: 2800, category: "Shoe", image: "images/s2.png", rating: 4.5, reviews: 145, description: "Genuine Italian leather with a clean cut, designed for maximum comfort and style in professional settings." },
  { id: 18, name: "Blue Running Shoes", price: 4100, category: "Shoe", image: "images/s3.png", rating: 4.8, reviews: 88, description: "Featherlight design with energy-return cushioning. Built for those who demand performance." },
  { id: 19, name: "Brown Leather Boots", price: 5200, category: "Shoe", image: "images/s1.png", rating: 4.9, reviews: 212, description: "Handcrafted boots with Goodyear welted construction. Will outlast trends and seasons." },
  { id: 20, name: "Minimalist White Kicks", price: 2200, category: "Shoe", image: "images/s2.png", rating: 4.4, reviews: 654, description: "The everyday staple. Crisp white vegan leather paired with an ortholite insole." },
  { id: 21, name: "Electric Blue High-Tops", price: 3600, category: "Shoe", image: "images/s3.png", rating: 4.6, reviews: 109, description: "Retro-inspired style designed for modern concrete jungles. Extreme ankle support." },
  { id: 22, name: "Suede Black Derbies", price: 4800, category: "Shoe", image: "images/s1.png", rating: 4.8, reviews: 75, description: "Premium calfskin suede mounted on a durable rubber sole. The apex of smart-casual." },

  // Perfume
  { id: 23, name: "Ocean Blue Cologne", price: 2500, category: "Perfume", image: "images/p1.png", rating: 4.7, reviews: 310, description: "Crisp aquatic notes blended with bergamot and cedar. A very fresh, summery scent." },
  { id: 24, name: "Golden Oud Essence", price: 5900, category: "Perfume", image: "images/p2.png", rating: 4.9, reviews: 198, description: "A rich, extremely dense profile of pure Oud with saffron and vanilla undertones." },
  { id: 25, name: "Midnight Noir", price: 3200, category: "Perfume", image: "images/p3.png", rating: 4.5, reviews: 165, description: "Mysterious and powerful. Intense notes of black pepper, leather, and smoked vetiver." },
  { id: 26, name: "Citrus Breeze", price: 1800, category: "Perfume", image: "images/p1.png", rating: 4.2, reviews: 89, description: "Lively bursts of lemon and mandarin orange supported by a soft musky base." },
  { id: 27, name: "Royal Musk", price: 4500, category: "Perfume", image: "images/p2.png", rating: 4.8, reviews: 204, description: "Luxurious white musk with velvety floral facets. Exceptionally long-lasting performance on skin." },
  { id: 28, name: "Sapphire Mist", price: 2900, category: "Perfume", image: "images/p3.png", rating: 4.6, reviews: 133, description: "A cooling scent featuring mint, blue sage, and lavender. An excellent everyday driver." },
  { id: 29, name: "Aura Gold Eau de Parfum", price: 6500, category: "Perfume", image: "images/p1.png", rating: 5.0, reviews: 412, description: "The signature fragrance of our brand. Amber, rich woods, and delicate spices blended to absolute perfection." },
  { id: 30, name: "Obsidian Elite Splash", price: 3900, category: "Perfume", image: "images/p2.png", rating: 4.4, reviews: 76, description: "Dark, robust woody accords paired with sweet pipe tobacco and tonka bean." }
];
