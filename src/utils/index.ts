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

export { proper, getUnit, getSource };
