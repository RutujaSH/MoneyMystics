import React, { useEffect, useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense, existingExpenseData }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [categories, setCategories] = useState([]);

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  // Extract unique categories from existing data
  useEffect(() => {
    const uniqueSources = [
      ...new Set(existingExpenseData.map((item) => item.category)),
    ];
    setCategories(uniqueSources);
  }, [existingExpenseData]);

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Source"
        placeholder="Food, Rent, etc."
        type="text"
      />

      {/* Dynamic buttons from existing data */}
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`px-3 py-1 rounded-md border ${
              income.category === category
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
            onClick={() => handleChange("category", category)}
          >
            {category}
          </button>
        ))}
      </div>

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(income)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
