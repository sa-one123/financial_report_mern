import { IProduct, Product } from "../models/productModel";
import { calculateFinancialReport } from "../service/financialService";

const resolvers = {
    Query : {
        getFinancialReport: async ()=>{
            try {
                const products = await Product.find({});
                const report = calculateFinancialReport(products);

                let totalRevenue = products?.reduce(
                    (sum: number, product: IProduct) => sum + product?.unitsSold * product?.pricePerUnit, 
                    0
                );
                let taxRate = 0.18;
                let taxAmount = totalRevenue * taxRate;
                let finalProfit = totalRevenue - taxAmount;
                
                totalRevenue = Number(totalRevenue?.toFixed(2));
                taxAmount = Number(taxAmount?.toFixed(2));
                finalProfit = Number(finalProfit?.toFixed(2));
                
                let averageRevenue = totalRevenue / products?.length;
                    
                return {
                    totalRevenue : totalRevenue, 
                    taxAmount: taxAmount, 
                    finalProfit: finalProfit, 
                    averageRevenue: averageRevenue
                }
            } catch (error) {
                throw new Error(`Error fetching products: ${error}`)
            }
        }
    }
}

export default resolvers;