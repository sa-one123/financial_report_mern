import React, { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_FINANCIAL_REPORT = gql`
  query {
    getFinancialReport {
      totalRevenue
      finalProfit
      taxAmount
      averageRevenue
    }
  }
`;

const FinancialReport: React.FC = () => {
  const { loading, error, data } = useQuery(GET_FINANCIAL_REPORT, {
    fetchPolicy: "cache-and-network", // Uses cache first, then network
  });
  
  const report = useMemo(()=>data?.getFinancialReport,[data]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-12">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-xl font-semibold mt-4 text-gray-700">Generating Report...</p>
        </div>
      ) : (
        <div className="w-full max-w-7xl bg-white shadow-2xl rounded-xl p-12 border border-gray-300 flex flex-col items-center">
          <h1 className="text-6xl font-bold mb-10 text-gray-900 text-center">Financial Report</h1>
          
          {error && (
            <p className="text-red-500 text-center text-2xl mb-6">Error: {error?.message}</p>
          )}
          
          {report && (
            <div className="w-full p-10 bg-gray-50 shadow-lg rounded-lg">
              <table className="w-full text-left border-collapse text-2xl">
                <thead>
                  <tr className="bg-gray-200 text-gray-800">
                    <th className="p-6">Metric</th>
                    <th className="p-6">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="p-6 font-semibold">Total Revenue</td>
                    <td className="p-6">${report?.totalRevenue}</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-6 font-semibold">Tax Amount</td>
                    <td className="p-6">${report?.taxAmount}</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-6 font-semibold">Final Report</td>
                    <td className="p-6">${report?.finalProfit}</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-6 font-semibold">Avg Revenue/Product</td>
                    <td className="p-6">${report?.averageRevenue}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
