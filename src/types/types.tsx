import type {ComponentType} from "react";

export type {TUser, TPayment, TParcel};
export type TRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

type TUser = {
  _id: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isActive: string;
  isVerified: boolean;
  createdAt: string;
};

type TPayment = {
  amount: number;
  createdAt: string;
  updatedAt: string;
  invoiceUrl: string;
  parcel: string;
  status: string;
  transactionId: string;
};

type TParcel = {
  _id: string;
  trackingId: string;
  title: string;
  type: string;
  weight: number;
  division: string;
  city: string;
  area: string;
  receiverNumber: string;
  senderEmail: string;
  status: string;
  payment: string;
  createdAt: string;
  statusLog: object[];
};

export interface StatusLogEntry {
  status: "APPROVED" | "DISPATCHED" | "IN-TRANSIT" | "DELIVERED";
  updatedBy: string;
  location: string;
  note: string;
  timestamp: string; // ISO date string
}

export interface GetParcel {
  _id: string;
  senderId: {name: string; phone: string; email: string; address: string};
  receiverNumber: string;
  receiverEmail: string;
  title: string;
  type: string;
  weight: number;
  trackingId: string;
  division: string;
  city: string;
  area: string;
  status: string;
  payment: string;
  statusLog: StatusLogEntry[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Payment {
  _id: string;
  transactionId: string;
  parcel: string; // Parcel ID
  amount: number;
  status: string;
  invoiceUrl: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
