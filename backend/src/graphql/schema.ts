import { gql } from "graphql-tag";

const typeDefs =  gql`
    type FinancialReport {
        totalRevenue: Float
        finalProfit: Float
        taxAmount: Float
        averageRevenue: Float
    }
    
    type Query {
        getFinancialReport : FinancialReport
    }
`;

export default typeDefs;