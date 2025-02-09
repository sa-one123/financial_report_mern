import { Product } from "../models/productModel"

const products = [
    { name: 'Laptop', unitsSold: 120, pricePerUnit: 800.50 },
    { name: 'Smartphone', unitsSold: 250, pricePerUnit: 599.99 },
    { name: 'Headphones', unitsSold: 400, pricePerUnit: 99.49 }
];
const ProductSeeder = async () => {
    try {
      await Product.deleteMany(); // Optional: Clears old data
      await Product.insertMany(products);
    console.log(await Product.find({}))

      console.log("Products seeded successfully!");
    } catch (error) {
      console.error("Seeding error:", error);
    }
};
  
export default ProductSeeder ;
  