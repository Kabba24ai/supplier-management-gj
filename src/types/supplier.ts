export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  totalOrders: number;
  totalValue: number;
  lastOrder: string | null;
  contactPerson: string;
  website?: string;
  taxId?: string;
  paymentTerms: string;
  joinDate: string;
}