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
  secondaryContact?: string;
  secondaryEmail?: string;
  secondaryPhone?: string;
  website?: string;
  taxId?: string;
  paymentTerms: string;
  joinDate: string;
  tags: string[];
}