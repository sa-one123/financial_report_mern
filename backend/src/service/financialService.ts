import { IProduct } from "../models/productModel";

const calculateFinancialReport = (products : IProduct[]) =>{
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
        totalRevenue, 
        taxAmount, 
        finalProfit, 
        averageRevenue
    }
}

export {
    calculateFinancialReport
}