import { useEffect, useState, useCallback } from "react";
import { getAccounts } from "../../services/accountService";
function Account() {
  // Dữ liệu mẫu thay vì fetch từ database
  const accounts = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Editor" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Accounts Management</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-100">
                <td className="border p-3">{account.id}</td>
                <td className="border p-3">{account.name}</td>
                <td className="border p-3">{account.email}</td>
                <td className="border p-3">{account.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Account;


