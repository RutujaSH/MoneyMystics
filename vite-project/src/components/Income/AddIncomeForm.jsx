import React, { useEffect, useState } from "react";
import { FaHandFist } from "react-icons/fa6";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome, existingIncomeData }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const [sources, setSources] = useState([]);
  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  // Extract unique sources from existing data
  useEffect(() => {
    const uniqueSources = [
      ...new Set(existingIncomeData.map((item) => item.source)),
    ];
    setSources(uniqueSources);
  }, [existingIncomeData]);

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Type or select a source"
        type="text"
      />

      {/* Dynamic buttons from existing data */}
      <div className="flex flex-wrap gap-2 mt-2">
        {sources.map((source) => (
          <button
            key={source}
            type="button"
            className={`px-3 py-1 rounded-md border ${
              income.source === source
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
            onClick={() => handleChange("source", source)}
          >
            {source}
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
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
