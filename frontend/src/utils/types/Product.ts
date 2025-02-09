export interface Product {
    products : {
        name : string;
        unitsSold : number;
        pricePerUnit : number;
    }[];
}

export interface FinancialReportResponse {
    totalRevenue: number;
    taxAmount: number;
    finalProfit: number;
    averageRevenue: number;
}