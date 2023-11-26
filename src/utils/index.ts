// general
const proper = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
};

const getUnit = (text: string) => {
  if (text.toLowerCase() == "calories") {
    return "kcal";
  }
  return "g";
};

// history card
const getSource = (i: number) => {
  switch (i) {
    case 0:
      return "User Input";
    case 1:
      return "Barcode Scanning";
    case 2:
      return "Camera Input";
  }
};

// objectives
// REMINDER: DO NOT CHANGE IT; if change, amend the calculation
const objectives = [
  { label: "Keep Fit", value: "Keep Fit" },
  { label: "Semi-Bulk", value: "Semi-Bulk" },
  { label: "Bulk", value: "Bulk" },
  { label: "On Diet", value: "On Diet" },
];

// exercise frequency
// REMINDER: DO NOT CHANGE IT; if change, amend the calculation
const exerFrequencyWeeks = [
  { label: "Sedentary", value: "Sedentary"},
  { label: "1-3 times", value: "1-3 times" },
  { label: "4-5 times", value: "4-5 times" },
  { label: "Daily", value: "Daily" },
]

//dietstyle
// REMINDER: DO NOT CHANGE IT; if change, amend the calculation
const dietstyles = [
  {label: "Causal", value: "Causal"},
  {label: "Low Carbs", value: "Low Carbs"},
  {label: "High Carbs", value: "High Carbs"},
]

// genders
// REMINDER: DO NOT CHANGE IT; if change, amend the calculation
const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "I prefer not to say", value: "Others" },
];

export { proper, getUnit, getSource, objectives, dietstyles, exerFrequencyWeeks, genders };
