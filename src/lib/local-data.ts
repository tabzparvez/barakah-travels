import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type PermissionSet = {
  packages: boolean;
  inquiries: boolean;
  quotations: boolean;
  invoices: boolean;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Employee";
  password: string;
  permissions: PermissionSet;
};

export type PackageItem = {
  id: string;
  title: string;
  images: string[];
  price: number;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: string;
  status: "Active" | "Draft";
};

export type Inquiry = {
  id: string;
  type: "Umrah" | "Tour";
  name: string;
  phone: string;
  email: string;
  city: string;
  persons: string;
  destination: string;
  travelMonth: string;
  message: string;
  createdAt: string;
};

export type Quotation = {
  id: string;
  inquiryId?: string;
  client: {
    name: string;
    phone: string;
    persons: string;
  };
  flightGoing: {
    date: string;
    departure: string;
    arrival: string;
    airline: string;
    flightNumber: string;
    type: string;
  };
  flightReturn: {
    date: string;
    departure: string;
    arrival: string;
    airline: string;
    flightNumber: string;
    type: string;
  };
  makkahHotel: {
    name: string;
    distance: string;
    roomType: string;
    nights: string;
  };
  madinahHotel: {
    name: string;
    distance: string;
    roomType: string;
    nights: string;
  };
  transport: {
    mode: string;
    airportToMakkah: string;
    makkahToMadinah: string;
    madinahToAirport: string;
  };
  package: {
    price: string;
    inclusions: string;
    exclusions: string;
    notes: string;
  };
  createdAt: string;
};

export type Invoice = {
  id: string;
  quotationId?: string;
  invoiceNumber: string;
  client: {
    name: string;
    phone: string;
  };
  packageTitle: string;
  amount: string;
  status: "Paid" | "Unpaid";
  createdAt: string;
};

export type AdminData = {
  users: AdminUser[];
  packages: {
    umrah: PackageItem[];
    tours: PackageItem[];
  };
  inquiries: Inquiry[];
  quotations: Quotation[];
  invoices: Invoice[];
};

const dataPath = path.join(process.cwd(), "src", "data", "admin-data.json");

async function ensureDataFile() {
  try {
    await fs.access(dataPath);
  } catch {
    const defaultData: AdminData = {
      users: [],
      packages: { umrah: [], tours: [] },
      inquiries: [],
      quotations: [],
      invoices: [],
    };
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(defaultData, null, 2));
  }
}

export async function readAdminData(): Promise<AdminData> {
  await ensureDataFile();
  const raw = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(raw) as AdminData;
}

export async function writeAdminData(data: AdminData) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

export function createId(prefix: string) {
  return `${prefix}-${randomUUID()}`;
}

export function sanitizeUser(user: AdminUser) {
  const { password: _password, ...rest } = user;
  return rest;
}
