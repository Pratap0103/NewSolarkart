import { create } from 'zustand';

const useDataStore = create((set) => ({
  indents: [],
  
  addIndent: (indentData) => {
    set((state) => ({
      indents: [...state.indents, indentData]
    }));
  },
  
  removeIndent: (indentId) => {
    set((state) => ({
      indents: state.indents.filter((indent) => indent.id !== indentId)
    }));
  },
  
  updateIndent: (indentId, updatedData) => {
    set((state) => ({
      indents: state.indents.map((indent) =>
        indent.id === indentId ? { ...indent, ...updatedData } : indent
      )
    }));
  },
  
  getIndents: () => {
    // This will be accessed via state selector
    return [];
  }
}));

// ==========================================
// LocalStorage Operations (Consolidated)
// ==========================================

export const STORAGE_KEYS = {
  USERS: 'pcb_users',
  SETTINGS: 'pcb_settings',
};

const DEFAULT_USERS = [
  { id: 'admin', name: 'Admin User', password: 'admin123', role: 'ADMIN', accessPages: [] },
  { id: 'user', name: 'Employee 1', password: 'user123', role: 'USER', accessPages: [] },
  { id: 'user2', name: 'Employee 2', password: 'user123', role: 'USER', accessPages: [] }
];

const DEFAULT_SETTINGS = {
  groupHeads: ['IT', 'HR', 'Finance', 'Operations', 'Marketing'],
  paymentModes: ['Cash', 'Cheque', 'Bank Transfer', 'Online Payment'],
  lastSerialNumber: 0
};

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  }
};

export const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getUsers = () => {
  const users = getFromStorage(STORAGE_KEYS.USERS);
  if (!users || !users.some(u => u.id === 'admin')) {
    saveToStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    return DEFAULT_USERS;
  }
  return users;
};

export const saveUsers = (users) => saveToStorage(STORAGE_KEYS.USERS, users);

// ==========================================
// Default Seed Data (Consolidated)
// ==========================================

export const SEEDED_ITEMS = [
  { code: 'IT-001', name: 'Screwdriver Set 12pcs', brand: 'Bosch', category: 'Hardware & Tools', price: 850 },
  { code: 'IT-002', name: 'Circuit Breaker 16A', brand: 'Schneider', category: 'Electrical Supplies', price: 320 },
  { code: 'IT-003', name: 'A4 Copier Paper (Rim)', brand: 'HP', category: 'Office Stationery', price: 280 },
  { code: 'IT-004', name: 'N95 Safety Mask', brand: '3M', category: 'Safety Gear', price: 45 },
  { code: 'IT-005', name: 'TMT Steel Rod 12mm', brand: 'Tata Steel', category: 'Raw Materials', price: 550 },
  { code: 'IT-006', name: 'LED Tube Light 20W', brand: 'Philips', category: 'Electrical Supplies', price: 180 },
  { code: 'IT-007', name: 'PVC Conduit Pipe 25mm', brand: 'Supreme', category: 'Plumbing Parts', price: 75 },
  { code: 'IT-008', name: 'Ball Valve 1 Inch', brand: 'Supreme', category: 'Plumbing Parts', price: 240 },
  { code: 'IT-009', name: 'Safety Goggles Clear', brand: '3M', category: 'Safety Gear', price: 120 },
  { code: 'IT-010', name: 'Electrical Tape Black', brand: 'Anchor', category: 'Electrical Supplies', price: 25 },
  { code: 'IT-011', name: 'Angle Grinder 4-Inch', brand: 'Bosch', category: 'Hardware & Tools', price: 2450 },
  { code: 'IT-012', name: 'Impact Drill 13mm', brand: 'Bosch', category: 'Hardware & Tools', price: 3800 },
  { code: 'IT-013', name: 'Digital Multimeter', brand: 'Schneider', category: 'Electrical Supplies', price: 1200 },
  { code: 'IT-014', name: 'Permanent Markers (Black)', brand: 'HP', category: 'Office Stationery', price: 90 },
  { code: 'IT-015', name: 'High-Visibility Safety Vest', brand: '3M', category: 'Safety Gear', price: 150 },
  { code: 'IT-016', name: 'Galvanized Iron Wire 2mm', brand: 'Tata Steel', category: 'Raw Materials', price: 110 },
  { code: 'IT-017', name: 'LED Bulb 9W E27', brand: 'Philips', category: 'Electrical Supplies', price: 95 },
  { code: 'IT-018', name: 'Teflon Pipe Sealant Tape', brand: 'Supreme', category: 'Plumbing Parts', price: 15 },
  { code: 'IT-019', name: 'Hammer Drill Bit Set', brand: 'Bosch', category: 'Hardware & Tools', price: 950 },
  { code: 'IT-020', name: 'Switch Socket Combo 16A', brand: 'Anchor', category: 'Electrical Supplies', price: 140 },
  { code: 'IT-021', name: 'Steel Measuring Tape 5m', brand: 'Bosch', category: 'Hardware & Tools', price: 290 },
  { code: 'IT-022', name: 'Distribution Board 8-Way', brand: 'Schneider', category: 'Electrical Supplies', price: 1150 },
  { code: 'IT-023', name: 'Wireless Mouse', brand: 'HP', category: 'Office Stationery', price: 650 },
  { code: 'IT-024', name: 'Leather Safety Gloves', brand: '3M', category: 'Safety Gear', price: 350 },
  { code: 'IT-025', name: 'Binding Wire 18 Gauge', brand: 'Tata Steel', category: 'Raw Materials', price: 98 },
  { code: 'IT-026', name: 'LED Floodlight 50W', brand: 'Philips', category: 'Electrical Supplies', price: 1450 },
  { code: 'IT-027', name: 'CPVC Solvent Cement 250ml', brand: 'Supreme', category: 'Plumbing Parts', price: 190 },
  { code: 'IT-028', name: 'Gate Valve Brass 1.5"', brand: 'Supreme', category: 'Plumbing Parts', price: 580 },
  { code: 'IT-029', name: 'Ear Plugs Polyurethane', brand: '3M', category: 'Safety Gear', price: 12 },
  { code: 'IT-030', name: 'Modular Switch 6A Pack of 10', brand: 'Anchor', category: 'Electrical Supplies', price: 220 },
  { code: 'IT-031', name: 'Hand Hacksaw Frame 12"', brand: 'Bosch', category: 'Hardware & Tools', price: 420 },
  { code: 'IT-032', name: 'Copper Wire Reel 1.5 sqmm', brand: 'Anchor', category: 'Electrical Supplies', price: 1850 },
  { code: 'IT-033', name: 'Scientific Calculator', brand: 'HP', category: 'Office Stationery', price: 1100 },
  { code: 'IT-034', name: 'Heavy Duty Safety Helmet', brand: '3M', category: 'Safety Gear', price: 480 },
  { code: 'IT-035', name: 'Structural Steel I-Beam', brand: 'Tata Steel', category: 'Raw Materials', price: 8200 },
  { code: 'IT-036', name: 'Smart Smart LED Panel 15W', brand: 'Philips', category: 'Electrical Supplies', price: 380 },
  { code: 'IT-037', name: 'PVC Pipe Elbow 90 Deg 1"', brand: 'Supreme', category: 'Plumbing Parts', price: 22 },
  { code: 'IT-038', name: 'Flexible Hose Pipe 10m', brand: 'Supreme', category: 'Plumbing Parts', price: 450 },
  { code: 'IT-039', name: 'Combination Spanner Set', brand: 'Bosch', category: 'Hardware & Tools', price: 1650 },
  { code: 'IT-040', name: 'Copper Lug 35 sqmm Pack of 20', brand: 'Anchor', category: 'Electrical Supplies', price: 340 },
  { code: 'IT-041', name: 'Cordless Screwdriver 3.6V', brand: 'Bosch', category: 'Hardware & Tools', price: 2100 },
  { code: 'IT-042', name: 'Overload Relay 9-13A', brand: 'Schneider', category: 'Electrical Supplies', price: 780 },
  { code: 'IT-043', name: 'Highlighter Pen Set of 5', brand: 'HP', category: 'Office Stationery', price: 150 },
  { code: 'IT-044', name: 'First Aid Kit Wall Mount', brand: '3M', category: 'Safety Gear', price: 1400 },
  { code: 'IT-045', name: 'Steel Plate 6mm Thick', brand: 'Tata Steel', category: 'Raw Materials', price: 4500 },
  { code: 'IT-046', name: 'LED Street Light 100W', brand: 'Philips', category: 'Electrical Supplies', price: 3800 },
  { code: 'IT-047', name: 'PVC Pipe Tee 1 Inch', brand: 'Supreme', category: 'Plumbing Parts', price: 28 },
  { code: 'IT-048', name: 'Brass Bib Cock Tap', brand: 'Supreme', category: 'Plumbing Parts', price: 320 },
  { code: 'IT-049', name: 'Safety Harness Double Lanyard', brand: '3M', category: 'Safety Gear', price: 2200 },
  { code: 'IT-050', name: 'Exhaust Fan 12-Inch', brand: 'Philips', category: 'Electrical Supplies', price: 1750 },
  { code: 'IT-051', name: 'Claw Hammer 16oz', brand: 'Bosch', category: 'Hardware & Tools', price: 490 },
  { code: 'IT-052', name: 'Contactor 3-Pole 25A', brand: 'Schneider', category: 'Electrical Supplies', price: 1250 },
  { code: 'IT-053', name: 'Keyboard USB Wired', brand: 'HP', category: 'Office Stationery', price: 450 },
  { code: 'IT-054', name: 'Hand Sanitizer Gel 5L', brand: '3M', category: 'Safety Gear', price: 750 },
  { code: 'IT-055', name: 'Welding Electrode Box 2.5mm', brand: 'Tata Steel', category: 'Raw Materials', price: 620 },
  { code: 'IT-056', name: 'LED Downlight 7W', brand: 'Philips', category: 'Electrical Supplies', price: 220 },
  { code: 'IT-057', name: 'CPVC Union 1 Inch', brand: 'Supreme', category: 'Plumbing Parts', price: 110 },
  { code: 'IT-058', name: 'Waste Coupling Brass', brand: 'Supreme', category: 'Plumbing Parts', price: 180 },
  { code: 'IT-059', name: 'Adjustable Wrench 10"', brand: 'Bosch', category: 'Hardware & Tools', price: 650 },
  { code: 'IT-060', name: '3-Pin Power Plug 16A Pack of 5', brand: 'Anchor', category: 'Electrical Supplies', price: 190 },
  { code: 'IT-061', name: 'Hot Air Gun 1800W', brand: 'Bosch', category: 'Hardware & Tools', price: 2950 },
  { code: 'IT-062', name: 'Miniature Relay 24V DC', brand: 'Schneider', category: 'Electrical Supplies', price: 160 },
  { code: 'IT-063', name: 'A3 Drawing Sheets Pack of 100', brand: 'HP', category: 'Office Stationery', price: 380 },
  { code: 'IT-064', name: 'Safety Shoes Steel Toe', brand: '3M', category: 'Safety Gear', price: 1850 },
  { code: 'IT-065', name: 'MS Angle Bar 50x50x5mm', brand: 'Tata Steel', category: 'Raw Materials', price: 1450 },
  { code: 'IT-066', name: 'LED Bulkhead Fitting 10W', brand: 'Philips', category: 'Electrical Supplies', price: 480 },
  { code: 'IT-067', name: 'PVC End Cap 1 Inch', brand: 'Supreme', category: 'Plumbing Parts', price: 12 },
  { code: 'IT-068', name: 'PTMT Plastic Faucet Tap', brand: 'Supreme', category: 'Plumbing Parts', price: 140 },
  { code: 'IT-069', name: 'Welding Hand Shield Helmet', brand: '3M', category: 'Safety Gear', price: 850 },
  { code: 'IT-070', name: 'Extension Spike Guard 4-Socket', brand: 'Anchor', category: 'Electrical Supplies', price: 480 },
  { code: 'IT-071', name: 'Spirit Level 30cm', brand: 'Bosch', category: 'Hardware & Tools', price: 540 },
  { code: 'IT-072', name: 'Current Transformer 100/5A', brand: 'Schneider', category: 'Electrical Supplies', price: 380 },
  { code: 'IT-073', name: 'Sticky Notes Pad Pack of 6', brand: 'HP', category: 'Office Stationery', price: 180 },
  { code: 'IT-074', name: 'Face Shield Clear Acrylic', brand: '3M', category: 'Safety Gear', price: 250 },
  { code: 'IT-075', name: 'Mild Steel Flat Bar 25x3mm', brand: 'Tata Steel', category: 'Raw Materials', price: 340 },
  { code: 'IT-076', name: 'T5 LED Batten 18W', brand: 'Philips', category: 'Electrical Supplies', price: 210 },
  { code: 'IT-077', name: 'PVC Pipe Nipple 6 Inch', brand: 'Supreme', category: 'Plumbing Parts', price: 35 },
  { code: 'IT-078', name: 'CPVC Ball Valve 1"', brand: 'Supreme', category: 'Plumbing Parts', price: 160 },
  { code: 'IT-079', name: 'Heavy Duty Pipe Wrench 12"', brand: 'Bosch', category: 'Hardware & Tools', price: 1100 },
  { code: 'IT-080', name: 'Ceiling Fan 1200mm Super Speed', brand: 'Philips', category: 'Electrical Supplies', price: 2400 },
  { code: 'IT-081', name: 'Hex Allen Key Set 9pcs', brand: 'Bosch', category: 'Hardware & Tools', price: 380 },
  { code: 'IT-082', name: 'Push Button Green (NO)', brand: 'Schneider', category: 'Electrical Supplies', price: 120 },
  { code: 'IT-083', name: 'Gel Ink Pens Box of 10', brand: 'HP', category: 'Office Stationery', price: 120 },
  { code: 'IT-084', name: 'Fire Extinguisher ABC Pow. 2kg', brand: '3M', category: 'Safety Gear', price: 1650 },
  { code: 'IT-085', name: 'Structural Steel C-Channel', brand: 'Tata Steel', category: 'Raw Materials', price: 3900 },
  { code: 'IT-086', name: 'Halogen Bulb 500W', brand: 'Philips', category: 'Electrical Supplies', price: 120 },
  { code: 'IT-087', name: 'PVC Pipe Collar 1 Inch', brand: 'Supreme', category: 'Plumbing Parts', price: 18 },
  { code: 'IT-088', name: 'Towel Ring Chrome Plated', brand: 'Supreme', category: 'Plumbing Parts', price: 420 },
  { code: 'IT-089', name: 'Cold Chisel 8-Inch', brand: 'Bosch', category: 'Hardware & Tools', price: 210 },
  { code: 'IT-090', name: 'Limit Switch Roller Lever', brand: 'Schneider', category: 'Electrical Supplies', price: 650 },
  { code: 'IT-091', name: 'Jigsaw 450W Professional', brand: 'Bosch', category: 'Hardware & Tools', price: 3400 },
  { code: 'IT-092', name: 'Buzzer 230V AC Panel Mount', brand: 'Schneider', category: 'Electrical Supplies', price: 240 },
  { code: 'IT-093', name: 'Whiteboard Eraser Magnetic', brand: 'HP', category: 'Office Stationery', price: 80 },
  { code: 'IT-094', name: 'Anti-Slip Safety Tape 5m', brand: '3M', category: 'Safety Gear', price: 320 },
  { code: 'IT-095', name: 'MS Square Pipe 25x25mm', brand: 'Tata Steel', category: 'Raw Materials', price: 1100 },
  { code: 'IT-096', name: 'LED Spot Light 3W', brand: 'Philips', category: 'Electrical Supplies', price: 160 },
  { code: 'IT-097', name: 'Brass Union Pipe Joint 1"', brand: 'Supreme', category: 'Plumbing Parts', price: 340 },
  { code: 'IT-098', name: 'Paper Shredder Machine', brand: 'HP', category: 'Office Stationery', price: 5400 },
  { code: 'IT-099', name: 'Steel Toe Gumboots Waterproof', brand: '3M', category: 'Safety Gear', price: 980 },
  { code: 'IT-100', name: 'Rotary Hammer Drill 800W', brand: 'Bosch', category: 'Hardware & Tools', price: 6200 }
];

export const SEEDED_TRANSACTIONS = [
  { id: 'tx-001', serialNo: 'TX-001', date: '2026-05-01', type: 'Purchase', itemCode: 'IT-001', itemName: 'Screwdriver Set 12pcs', category: 'Hardware & Tools', brand: 'Bosch', price: 850, qty: 15, totalPrice: 12750, remarks: 'Restocking safety tools inventory' },
  { id: 'tx-002', serialNo: 'TX-002', date: '2026-05-02', type: 'Sales', itemCode: 'IT-003', itemName: 'A4 Copier Paper (Rim)', category: 'Office Stationery', brand: 'HP', price: 280, qty: 10, totalPrice: 2800, remarks: 'Issued to finance department' },
  { id: 'tx-003', serialNo: 'TX-003', date: '2026-05-03', type: 'Purchase', itemCode: 'IT-002', itemName: 'Circuit Breaker 16A', category: 'Electrical Supplies', brand: 'Schneider', price: 320, qty: 50, totalPrice: 16000, remarks: 'Procurement for block A expansion' },
  { id: 'tx-004', serialNo: 'TX-004', date: '2026-05-05', type: 'Sales', itemCode: 'IT-004', itemName: 'N95 Safety Mask', category: 'Safety Gear', brand: '3M', price: 45, qty: 200, totalPrice: 9000, remarks: 'Distribution for workshop floor' },
  { id: 'tx-005', serialNo: 'TX-005', date: '2026-05-06', type: 'Purchase Return', itemCode: 'IT-007', itemName: 'PVC Conduit Pipe 25mm', category: 'Plumbing Parts', brand: 'Supreme', price: 75, qty: 10, totalPrice: 750, remarks: 'Returned damaged conduit pipes' },
  { id: 'tx-006', serialNo: 'TX-006', date: '2026-05-07', type: 'Sales Return', itemCode: 'IT-003', itemName: 'A4 Copier Paper (Rim)', category: 'Office Stationery', brand: 'HP', price: 280, qty: 2, totalPrice: 560, remarks: 'Excess stationery returned' },
  { id: 'tx-007', serialNo: 'TX-007', date: '2026-05-08', type: 'Purchase', itemCode: 'IT-005', itemName: 'TMT Steel Rod 12mm', category: 'Raw Materials', brand: 'Tata Steel', price: 550, qty: 40, totalPrice: 22000, remarks: 'Consignments for warehouse foundation' },
  { id: 'tx-008', serialNo: 'TX-008', date: '2026-05-10', type: 'Sales', itemCode: 'IT-006', itemName: 'LED Tube Light 20W', category: 'Electrical Supplies', brand: 'Philips', price: 180, qty: 12, totalPrice: 2160, remarks: 'Replacement in corridor 3' },
  { id: 'tx-009', serialNo: 'TX-009', date: '2026-05-11', type: 'Purchase', itemCode: 'IT-009', itemName: 'Safety Goggles Clear', category: 'Safety Gear', brand: '3M', price: 120, qty: 30, totalPrice: 3600, remarks: 'Annual safety gear upgrade batch' },
  { id: 'tx-010', serialNo: 'TX-010', date: '2026-05-12', type: 'Sales', itemCode: 'IT-010', itemName: 'Electrical Tape Black', category: 'Electrical Supplies', brand: 'Anchor', price: 25, qty: 15, totalPrice: 375, remarks: 'Issued for general maintenance' },
  { id: 'tx-011', serialNo: 'TX-011', date: '2026-05-13', type: 'Purchase', itemCode: 'IT-012', itemName: 'Impact Drill 13mm', category: 'Hardware & Tools', brand: 'Bosch', price: 3800, qty: 3, totalPrice: 11400, remarks: 'Workshop heavy equipment' },
  { id: 'tx-012', serialNo: 'TX-012', date: '2026-05-14', type: 'Sales', itemCode: 'IT-015', itemName: 'High-Visibility Safety Vest', category: 'Safety Gear', brand: '3M', price: 150, qty: 25, totalPrice: 3750, remarks: 'Issued to logistics loading team' },
  { id: 'tx-013', serialNo: 'TX-013', date: '2026-05-15', type: 'Purchase Return', itemCode: 'IT-005', itemName: 'TMT Steel Rod 12mm', category: 'Raw Materials', brand: 'Tata Steel', price: 550, qty: 5, totalPrice: 2750, remarks: 'Incorrect gauge delivered' },
  { id: 'tx-014', serialNo: 'TX-014', date: '2026-05-16', type: 'Purchase', itemCode: 'IT-017', itemName: 'LED Bulb 9W E27', category: 'Electrical Supplies', brand: 'Philips', price: 95, qty: 100, totalPrice: 9500, remarks: 'Bulk purchasing lighting stock' },
  { id: 'tx-015', serialNo: 'TX-015', date: '2026-05-17', type: 'Sales', itemCode: 'IT-020', itemName: 'Switch Socket Combo 16A', category: 'Electrical Supplies', brand: 'Anchor', price: 140, qty: 8, totalPrice: 1120, remarks: 'Fitted in cafeteria extension' },
  { id: 'tx-016', serialNo: 'TX-016', date: '2026-05-18', type: 'Sales', itemCode: 'IT-023', itemName: 'Wireless Mouse', category: 'Office Stationery', brand: 'HP', price: 650, qty: 5, totalPrice: 3250, remarks: 'Issued to new accounts department hires' },
  { id: 'tx-017', serialNo: 'TX-017', date: '2026-05-19', type: 'Purchase', itemCode: 'IT-027', itemName: 'CPVC Solvent Cement 250ml', category: 'Plumbing Parts', brand: 'Supreme', price: 190, qty: 20, totalPrice: 3800, remarks: 'Stock replacement' },
  { id: 'tx-018', serialNo: 'TX-018', date: '2026-05-20', type: 'Sales', itemCode: 'IT-021', itemName: 'Steel Measuring Tape 5m', category: 'Hardware & Tools', brand: 'Bosch', price: 290, qty: 6, totalPrice: 1740, remarks: 'Carpentry unit supplies' },
  { id: 'tx-019', serialNo: 'TX-019', date: '2026-05-21', type: 'Purchase', itemCode: 'IT-034', itemName: 'Heavy Duty Safety Helmet', category: 'Safety Gear', brand: '3M', price: 480, qty: 50, totalPrice: 24000, remarks: 'Construction division safety helmets batch' },
  { id: 'tx-020', serialNo: 'TX-020', date: '2026-05-22', type: 'Sales Return', itemCode: 'IT-015', itemName: 'High-Visibility Safety Vest', category: 'Safety Gear', brand: '3M', price: 150, qty: 3, totalPrice: 450, remarks: 'Returned unused' },
  { id: 'tx-021', serialNo: 'TX-021', date: '2026-05-23', type: 'Sales', itemCode: 'IT-032', itemName: 'Copper Wire Reel 1.5 sqmm', category: 'Electrical Supplies', brand: 'Anchor', price: 1850, qty: 2, totalPrice: 3700, remarks: 'Server room wiring project' },
  { id: 'tx-022', serialNo: 'TX-022', date: '2026-05-24', type: 'Purchase', itemCode: 'IT-039', itemName: 'Combination Spanner Set', category: 'Hardware & Tools', brand: 'Bosch', price: 1650, qty: 5, totalPrice: 8250, remarks: 'Mechanic section expansion kits' },
  { id: 'tx-023', serialNo: 'tx-023', date: '2026-05-25', type: 'Sales', itemCode: 'IT-043', itemName: 'Highlighter Pen Set of 5', category: 'Office Stationery', brand: 'HP', price: 150, qty: 10, totalPrice: 1500, remarks: 'Supplied to marketing division' },
  { id: 'tx-024', serialNo: 'TX-024', date: '2026-05-25', type: 'Sales', itemCode: 'IT-046', itemName: 'LED Street Light 100W', category: 'Electrical Supplies', brand: 'Philips', price: 3800, qty: 4, totalPrice: 15200, remarks: 'Fitted at gate entrance' },
  { id: 'tx-025', serialNo: 'TX-025', date: '2026-05-26', type: 'Purchase', itemCode: 'IT-054', itemName: 'Hand Sanitizer Gel 5L', category: 'Safety Gear', brand: '3M', price: 750, qty: 8, totalPrice: 6000, remarks: 'Procurement of hygiene items' }
];

export default useDataStore;
