export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  lastOrder: string | null;
  primaryContact: string;
  technicalContact?: string;
  technicalEmail?: string;
  technicalPhone?: string;
  partsContact?: string;
  partsEmail?: string;
  partsPhone?: string;
  billingContact?: string;
  billingEmail?: string;
  billingPhone?: string;
  website?: string;
  taxId?: string;
  paymentTerms: string;
  joinDate: string;
  tags: string[];
}