export interface Part {
  id: number;
  name: string;
  supplierIds: number[]; // Array of supplier IDs (1-3 suppliers per part)
}

export const mockParts: Part[] = [
  {
    id: 1,
    name: "Engine Oil Filter",
    supplierIds: [1, 4] // TechFlow Solutions, Premium Materials Ltd
  },
  {
    id: 2,
    name: "Brake Pads - Front",
    supplierIds: [2, 4, 6] // Global Manufacturing Co., Premium Materials Ltd, Reliable Services Corp
  },
  {
    id: 3,
    name: "LED Display Panel",
    supplierIds: [1, 5] // TechFlow Solutions, Digital Innovations Inc
  },
  {
    id: 4,
    name: "Hydraulic Pump",
    supplierIds: [2] // Global Manufacturing Co.
  },
  {
    id: 5,
    name: "Circuit Board Assembly",
    supplierIds: [1, 4, 5] // TechFlow Solutions, Premium Materials Ltd, Digital Innovations Inc
  },
  {
    id: 6,
    name: "Steel Reinforcement Bars",
    supplierIds: [4] // Premium Materials Ltd
  },
  {
    id: 7,
    name: "Packaging Materials",
    supplierIds: [3, 6] // EcoSupply Partners, Reliable Services Corp
  },
  {
    id: 8,
    name: "Software License",
    supplierIds: [1, 5] // TechFlow Solutions, Digital Innovations Inc
  },
  {
    id: 9,
    name: "Power Supply Unit",
    supplierIds: [6] // Reliable Services Corp
  },
  {
    id: 10,
    name: "Transmission Fluid",
    supplierIds: [2, 3] // Global Manufacturing Co., EcoSupply Partners
  }
];