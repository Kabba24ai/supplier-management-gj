import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  User, 
  FileText, 
  CheckCircle, 
  XCircle,
  Package,
  Calendar,
  DollarSign,
  Truck,
  Hash,
  Home,
  Shield
} from 'lucide-react';

// Mock data for suppliers
const mockSuppliers = [
  {
    id: 'supplier-001',
    name: 'TechParts Industries',
    street_address: '1245 Industrial Blvd, Suite 200',
    city: 'Austin',
    state: 'TX',
    zip_code: '78744',
    main_phone: '(512) 555-0123',
    main_email: 'contact@techparts.com',
    website: 'https://www.techparts.com',
    payment_terms: 'Net 30',
    shipping_terms: 'FOB Origin',
    account_number: 'TP-2024-001',
    tax_id: '74-1234567',
    status: 'Active',
    notes: 'Preferred supplier for electronic components. Excellent quality and fast delivery.',
    created_at: '2024-01-15',
    updated_at: '2024-05-20',
    parts_count: 156,
    product_categories: ['Electronics', 'Sensors', 'Circuit Boards', 'Wiring Harnesses'],
    sales_name: 'John Smith',
    sales_phone: '(512) 555-0124',
    sales_cell: '(512) 555-0125',
    sales_email: 'john.smith@techparts.com',
    inside_sales_name: 'Jane Doe',
    inside_sales_phone: '(512) 555-0126',
    inside_sales_cell: '(512) 555-0127',
    inside_sales_email: 'jane.doe@techparts.com',
    technical_name: 'Bob Wilson',
    technical_phone: '(512) 555-0128',
    technical_cell: '(512) 555-0129',
    technical_email: 'bob.wilson@techparts.com',
    parts_name: 'Mike Johnson',
    parts_phone: '(512) 555-0130',
    parts_cell: '(512) 555-0131',
    parts_email: 'mike.johnson@techparts.com'
  },
  {
    id: 'supplier-002',
    name: 'Heavy Equipment Parts Co',
    street_address: '8900 Commerce Way',
    city: 'Los Angeles',
    state: 'CA',
    zip_code: '90045',
    main_phone: '(310) 555-0456',
    main_email: 'contact@heavyequipment.com',
    website: 'https://www.heavyequipmentparts.com',
    payment_terms: 'Net 60',
    shipping_terms: 'FOB Destination',
    account_number: 'HEP-789',
    tax_id: '95-9876543',
    status: 'Active',
    notes: 'Specializes in excavator and bulldozer parts.',
    created_at: '2024-02-03',
    updated_at: '2024-06-01',
    parts_count: 89,
    product_categories: ['Bucket Teeth', 'Hydraulic Cylinders', 'Track Chains', 'Engine Parts'],
    sales_name: 'Michael Chen',
    sales_phone: '(310) 555-0457',
    sales_cell: '(310) 555-0458',
    sales_email: 'michael.chen@heavyequipment.com',
    inside_sales_name: '',
    inside_sales_phone: '',
    inside_sales_cell: '',
    inside_sales_email: '',
    technical_name: 'Sarah Kim',
    technical_phone: '(310) 555-0459',
    technical_cell: '(310) 555-0460',
    technical_email: 'sarah.kim@heavyequipment.com',
    parts_name: 'David Lee',
    parts_phone: '(310) 555-0461',
    parts_cell: '(310) 555-0462',
    parts_email: 'david.lee@heavyequipment.com'
  },
  {
    id: 'supplier-003',
    name: 'Filtration Solutions Ltd',
    street_address: '456 Innovation Drive',
    city: 'Seattle',
    state: 'WA',
    zip_code: '98101',
    main_phone: '(206) 555-0789',
    main_email: 'contact@filtrationsolutions.com',
    website: 'https://www.filtrationsolutions.com',
    payment_terms: 'COD',
    shipping_terms: 'FOB Origin',
    account_number: 'FS-456-2024',
    tax_id: '91-5555555',
    status: 'Active',
    notes: 'Complete filtration systems and replacement filters.',
    created_at: '2024-03-12',
    updated_at: '2024-05-28',
    parts_count: 67,
    product_categories: ['Air Filters', 'Oil Filters', 'Fuel Filters', 'Hydraulic Filters'],
    sales_name: 'Emily Rodriguez',
    sales_phone: '(206) 555-0790',
    sales_cell: '(206) 555-0791',
    sales_email: 'emily.rodriguez@filtrationsolutions.com',
    inside_sales_name: 'Tom Brown',
    inside_sales_phone: '(206) 555-0792',
    inside_sales_cell: '(206) 555-0793',
    inside_sales_email: 'tom.brown@filtrationsolutions.com',
    technical_name: '',
    technical_phone: '',
    technical_cell: '',
    technical_email: '',
    parts_name: 'Lisa Wang',
    parts_phone: '(206) 555-0794',
    parts_cell: '(206) 555-0795',
    parts_email: 'lisa.wang@filtrationsolutions.com'
  }
];

// Mock parts data
const mockParts = [
  { id: 1, name: 'Bucket Teeth - Cat 320', unit_price: '$45.99' },
  { id: 2, name: 'Air Filter - Donaldson P821575', unit_price: '$89.50' },
  { id: 3, name: 'Hydraulic Cylinder Seal Kit', unit_price: '$167.25' },
  { id: 4, name: 'Drive Belt - Gates 6PK1753', unit_price: '$34.99' },
  { id: 5, name: 'Oil Filter - Fleetguard LF3000', unit_price: '$28.75' }
];

// US States
const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const SupplierManagementSystem = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [productFilter, setProductFilter] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    main_phone: '',
    main_email: '',
    website: '',
    payment_terms: 'Net 30',
    shipping_terms: 'FOB Origin',
    account_number: '',
    tax_id: '',
    status: 'Active',
    notes: '',
    sales_name: '',
    sales_phone: '',
    sales_cell: '',
    sales_email: '',
    inside_sales_name: '',
    inside_sales_phone: '',
    inside_sales_cell: '',
    inside_sales_email: '',
    technical_name: '',
    technical_phone: '',
    technical_cell: '',
    technical_email: '',
    parts_name: '',
    parts_phone: '',
    parts_cell: '',
    parts_email: ''
  });

  const filteredSuppliers = useMemo(() => {
    return mockSuppliers.filter(supplier => {
      const matchesSupplierSearch = searchTerm === '' || (
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.main_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.sales_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const matchesProductSearch = productFilter === '' || 
        supplier.product_categories.some(cat => 
          cat.toLowerCase().includes(productFilter.toLowerCase())
        );
      
      return matchesSupplierSearch && matchesProductSearch;
    });
  }, [searchTerm, productFilter]);

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('phone') || name.includes('cell') || name === 'main_phone') {
      const digits = value.replace(/\D/g, '');
      let formatted = '';
      if (digits.length > 0) {
        if (digits.length <= 3) {
          formatted = `(${digits}`;
        } else if (digits.length <= 6) {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        } else {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        }
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setCurrentView('list');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      main_phone: '',
      main_email: '',
      website: '',
      payment_terms: 'Net 30',
      shipping_terms: 'FOB Origin',
      account_number: '',
      tax_id: '',
      status: 'Active',
      notes: '',
      sales_name: '',
      sales_phone: '',
      sales_cell: '',
      sales_email: '',
      inside_sales_name: '',
      inside_sales_phone: '',
      inside_sales_cell: '',
      inside_sales_email: '',
      technical_name: '',
      technical_phone: '',
      technical_cell: '',
      technical_email: '',
      parts_name: '',
      parts_phone: '',
      parts_cell: '',
      parts_email: ''
    });
  };

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-7 w-7 text-purple-600" />
                  Supplier Management
                </h1>
                <p className="text-gray-600 mt-1">Manage your supplier database and relationships</p>
              </div>
              <button
                onClick={() => { resetForm(); setCurrentView('create'); }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Supplier
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Suppliers</label>
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, contact, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <div className="relative w-[300px]">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by product type (e.g., bucket teeth)..."
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{filteredSuppliers.length}</div>
              <div className="text-sm text-purple-600">Total Suppliers</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredSuppliers.filter(s => s.status === 'Active').length}
              </div>
              <div className="text-sm text-green-600">Active Suppliers</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(filteredSuppliers.flatMap(s => s.product_categories)).size}
              </div>
              <div className="text-sm text-blue-600">Product Types</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {filteredSuppliers.reduce((sum, s) => sum + s.parts_count, 0)}
              </div>
              <div className="text-sm text-orange-600">Total Parts</div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {supplier.city}, {supplier.state}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {supplier.sales_name || 'No contact'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {supplier.main_email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {supplier.main_phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {supplier.product_categories.map((category, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-50 text-purple-600">
                              {category}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {supplier.parts_count}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedSupplier(supplier); setCurrentView('detail'); }}
                            className="text-purple-600 hover:text-purple-900 p-1"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => { 
                              setFormData({...supplier}); 
                              setSelectedSupplier(supplier); 
                              setCurrentView('edit'); 
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'detail' && selectedSupplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('list')}
                  className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg"
                >
                  ←
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="h-7 w-7 text-purple-600" />
                    {selectedSupplier.name}
                  </h1>
                  <p className="text-gray-600 mt-1">Supplier Details & Associated Parts</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { 
                    setFormData({...selectedSupplier}); 
                    setCurrentView('edit'); 
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Supplier
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Information - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{selectedSupplier.name}</div>
                        <div className="text-sm text-gray-600">Company Name</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {selectedSupplier.street_address}<br/>
                          {selectedSupplier.city}, {selectedSupplier.state} {selectedSupplier.zip_code}
                        </div>
                        <div className="text-sm text-gray-600">Address</div>
                      </div>
                    </div>
                    
                    {selectedSupplier.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <div>
                          <a href={selectedSupplier.website} className="text-sm text-purple-600 hover:text-purple-800">
                            {selectedSupplier.website}
                          </a>
                          <div className="text-sm text-gray-600">Website</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">{selectedSupplier.main_phone}</div>
                        <div className="text-sm text-gray-600">Phone Number</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">{selectedSupplier.main_email}</div>
                        <div className="text-sm text-gray-600">Email Address</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">{selectedSupplier.account_number}</div>
                        <div className="text-sm text-gray-600">Account Number</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status & Terms - 1 column, 3 rows x 2 columns */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Status & Terms</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Row 1 */}
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedSupplier.status)}`}>
                      {selectedSupplier.status === 'Active' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {selectedSupplier.status}
                    </span>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Parts Count</div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-lg font-semibold text-gray-900">{selectedSupplier.parts_count}</span>
                    </div>
                  </div>
                  
                  {/* Row 2 */}
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Payment Terms</div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <div className="text-sm text-gray-900">{selectedSupplier.payment_terms}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Shipping Terms</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-400" />
                      <div className="text-sm text-gray-900">{selectedSupplier.shipping_terms}</div>
                    </div>
                  </div>
                  
                  {/* Row 3 */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-600 mb-1">Tax ID</div>
                    <div className="text-sm text-gray-900">{selectedSupplier.tax_id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section - Full width, single row */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h2>
              <div className="flex flex-wrap gap-2">
                {selectedSupplier.product_categories.map((category, index) => (
                  <span key={index} className="inline-flex px-3 py-2 text-sm font-semibold rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Sales</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-900">{selectedSupplier.sales_name || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.sales_phone || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.sales_cell || 'Not provided'}</div>
                    <div className="text-sm text-purple-600">{selectedSupplier.sales_email || 'Not provided'}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Inside Sales</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-900">{selectedSupplier.inside_sales_name || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.inside_sales_phone || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.inside_sales_cell || 'Not provided'}</div>
                    <div className="text-sm text-purple-600">{selectedSupplier.inside_sales_email || 'Not provided'}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Technical Support</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-900">{selectedSupplier.technical_name || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.technical_phone || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.technical_cell || 'Not provided'}</div>
                    <div className="text-sm text-purple-600">{selectedSupplier.technical_email || 'Not provided'}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Parts</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-900">{selectedSupplier.parts_name || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.parts_phone || 'Not provided'}</div>
                    <div className="text-sm text-gray-600">{selectedSupplier.parts_cell || 'Not provided'}</div>
                    <div className="text-sm text-purple-600">{selectedSupplier.parts_email || 'Not provided'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Associated Parts</h2>
                <p className="text-gray-600 mt-1">Parts supplied by {selectedSupplier.name}</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Part Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockParts.map((part) => (
                      <tr key={part.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{part.name}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {part.unit_price}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-900 text-sm">
                            View Part
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {selectedSupplier.notes && (
            <div className="mt-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
                <p className="text-sm text-gray-900">{selectedSupplier.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('list')}
                className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg"
              >
                ←
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-7 w-7 text-purple-600" />
                  {currentView === 'create' ? 'Add New Supplier' : 'Edit Supplier'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {currentView === 'create' 
                    ? 'Enter supplier information to add them to your database' 
                    : 'Update supplier information and settings'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Supplier Information</h2>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Basic Information */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-600 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900">Basic Information</h3>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="h-4 w-4 text-purple-600" />
                        Supplier Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter supplier name"
                      />
                    </div>
                    
                    <div className="col-span-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Hash className="h-4 w-4 text-purple-600" />
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="account_number"
                        value={formData.account_number}
                        onChange={handleInputChange}
                        maxLength={20}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Vendor ID"
                      />
                    </div>
                    
                    <div className="col-span-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Company Address */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Home className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900">Company Address</h3>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street_address"
                        value={formData.street_address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="123 Main Street"
                      />
                    </div>
                    
                    <div className="col-span-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="City"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select State</option>
                        {usStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleInputChange}
                        maxLength={10}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="12345"
                      />
                    </div>
                    
                    <div className="col-span-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        Tax ID
                      </label>
                      <input
                        type="text"
                        name="tax_id"
                        value={formData.tax_id}
                        onChange={handleInputChange}
                        maxLength={15}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Tax ID"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Contact */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-900">Business Contact</h3>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="main_phone"
                        value={formData.main_phone}
                        onChange={handleInputChange}
                        maxLength={14}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div className="col-span-5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4 text-green-600" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="main_email"
                        value={formData.main_email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="contact@supplier.com"
                      />
                    </div>
                    
                    <div className="col-span-4">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Globe className="h-4 w-4 text-green-600" />
                        Website URL
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="https://www.example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Sales */}
                  <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
                    <h3 className="text-base font-semibold text-blue-900 mb-4 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Sales
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="sales_name"
                          value={formData.sales_name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="sales_phone"
                          value={formData.sales_phone}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
                        <input
                          type="tel"
                          name="sales_cell"
                          value={formData.sales_cell}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="sales_email"
                          value={formData.sales_email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="sales@supplier.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Inside Sales */}
                  <div className="border border-green-200 rounded-xl p-4 bg-green-50">
                    <h3 className="text-base font-semibold text-green-900 mb-4 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Inside Sales
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="inside_sales_name"
                          value={formData.inside_sales_name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="inside_sales_phone"
                          value={formData.inside_sales_phone}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
                        <input
                          type="tel"
                          name="inside_sales_cell"
                          value={formData.inside_sales_cell}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="inside_sales_email"
                          value={formData.inside_sales_email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="inside@supplier.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technical Support */}
                  <div className="border border-orange-200 rounded-xl p-4 bg-orange-50">
                    <h3 className="text-base font-semibold text-orange-900 mb-4 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Technical Support
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="technical_name"
                          value={formData.technical_name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="technical_phone"
                          value={formData.technical_phone}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
                        <input
                          type="tel"
                          name="technical_cell"
                          value={formData.technical_cell}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="technical_email"
                          value={formData.technical_email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="tech@supplier.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parts */}
                  <div className="border border-purple-200 rounded-xl p-4 bg-purple-50">
                    <h3 className="text-base font-semibold text-purple-900 mb-4 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Parts
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="parts_name"
                          value={formData.parts_name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="parts_phone"
                          value={formData.parts_phone}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
                        <input
                          type="tel"
                          name="parts_cell"
                          value={formData.parts_cell}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="parts_email"
                          value={formData.parts_email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="parts@supplier.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Business Terms</h3>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Terms
                      </label>
                      <select
                        name="payment_terms"
                        value={formData.payment_terms}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="Net 30">Net 30</option>
                        <option value="Net 60">Net 60</option>
                        <option value="COD">COD</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Wire Transfer">Wire Transfer</option>
                      </select>
                    </div>
                    
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Terms
                      </label>
                      <select
                        name="shipping_terms"
                        value={formData.shipping_terms}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="FOB Origin">FOB Origin</option>
                        <option value="FOB Destination">FOB Destination</option>
                        <option value="Expedited">Expedited</option>
                        <option value="Standard">Standard</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Notes</h3>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Additional notes about this supplier..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentView('list')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {currentView === 'create' ? 'Create Supplier' : 'Update Supplier'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default SupplierManagementSystem;