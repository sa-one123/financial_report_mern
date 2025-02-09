import { Request, Response } from "express";
import { IProduct, Product } from "../models/productModel";
import { calculateFinancialReport } from "../service/financialService";

const getFinancialReport = async (req: Request, res: Response)=>{
    try {
        const products: IProduct[] = await Product.find({});
        const report  = calculateFinancialReport(products);
        res.status(200).json({ message : "Financial Report Get Successfully",data:report  })
    } catch (error) {
        res.status(500).json({ message : `${error} : Error fetching products from mongodb`,data:{}  });
    }
}

export {
    getFinancialReport
};