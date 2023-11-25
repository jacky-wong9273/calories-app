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
const objectives = [
  { label: "Keep Fit", value: "Keep Fit" },
  { label: "Semi-Bulk", value: "Semi-Bulk" },
  { label: "Bulk", value: "Bulk" },
  { label: "On Diet", value: "On Diet" },
];

// genders
const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "I prefer not to say", value: "Others" },
];

export { proper, getUnit, getSource, objectives, genders };
