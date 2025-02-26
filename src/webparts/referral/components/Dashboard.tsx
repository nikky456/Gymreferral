import React from "react";
import './Style.css'
const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placeholder for Graph */}
        <div className="bg-white p-4 rounded-lg shadow-md h-80 flex items-center justify-center">
          <span className="text-gray-400">Graph Placeholder</span>
        </div>

        {/* Daily Diet Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Daily Diet</h2>
          <div className="space-y-2">
            {["2025-01-01", "2025-01-02", "2025-01-03"].map((date, index) => (
              <div key={index} className="p-3 bg-gray-200 rounded-md">
                <strong>{date}:</strong> Breakfast: Oats, Lunch: Chicken, Dinner: Rice
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral List */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Referral List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Referred By</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2 border">john.smith@example.com</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">25</td>
              <td className="p-2 border">2025-01-01</td>
              <td className="p-2 border">Mike Johnson</td>
              <td className="p-2 border">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
