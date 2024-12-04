import React from "react";
import { DollarSign } from "lucide-react";

const CashoutButton = () => {
  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
      Cashout
      <DollarSign size={20} />
    </button>
  );
};

export default CashoutButton;
