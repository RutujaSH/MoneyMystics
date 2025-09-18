import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const grouped = data.reduce((acc, item) => {
    const dateKey = moment(item?.date).format("Do MMM");

    if (!acc[dateKey]) {
      acc[dateKey] = { total: 0, details: [] };
    }

    acc[dateKey].total += item?.amount || 0;
    acc[dateKey].details.push({
      source: item?.source,
      amount: item?.amount,
    });

    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(
    ([date, { total, details }]) => ({
      date,
      amount: total,
      details, // keep source breakdown
    })
  );

  // sort chronologically
  return chartData.sort(
    (a, b) =>
      moment(a.date, "Do MMM").toDate() - moment(b.date, "Do MMM").toDate()
  );
};

export const prepareExpenseLineChartData = (data = []) => {
  const grouped = {};

  data.forEach((item) => {
    const dateKey = moment(item?.date).format("Do MMM"); // e.g., "16th Sep"

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        amount: 0,
        categories: [], // keep list of categories for tooltip
      };
    }
    grouped[dateKey].amount += item?.amount || 0;
    grouped[dateKey].categories.push({
      category: item?.category,
      amount: item?.amount,
    });
  });

  // convert grouped object → sorted array
  return Object.values(grouped).sort(
    (a, b) =>
      new Date(moment(a.date, "Do MMM")) - new Date(moment(b.date, "Do MMM"))
  );
};
