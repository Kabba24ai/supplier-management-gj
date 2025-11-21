import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Building2, Users, DollarSign, Star, Eye, Edit, Trash2, Phone, Mail, Tag, Folder, Wrench, Package, Factory, Truck, CreditCard, Monitor, Zap, User } from 'lucide-react';
import SupplierModal from './components/SupplierModal';
import TagsManagement from './components/TagsManagement';
import CategoriesManagement from './components/CategoriesManagement';
import SupplierDetails from './components/SupplierDetails';
import { Supplier } from './types/supplier';
import { mockSuppliers } from './data/mockData';
import { mockParts, Part } from './data/mockPartsData';

// Category icon mapping
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Parts':
      return <Wrench className="w-5 h-5 text-white" />;
    case 'Supplies - General':
      return <Package className="w-5 h-5 text-white" />;
    case 'Equipment Mfg.':
      return <Factory className="w-5 h-5 text-white" />;
    case 'Equipment Dealer':
      return <Truck className="w-5 h-5 text-white" />;
    case 'Financing':
      return <CreditCard className="w-5 h-5 text-white" />;
    case 'Software / IT':
      return <Monitor className="w-5 h-5 text-white" />;
    case 'Utilities':
      return <Zap className="w-5 h-5 text-white" />;
    default:
      return <Building2 className="w-5 h-5 text-white" />;
  }
};

// Category color mapping
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Parts':
      return 'from-orange-500 to-red-600';
    case 'Supplies - General':
      return 'from-green-500 to-emerald-600';
    case 'Equipment Mfg.':
      return 'from-gray-500 to-slate-600';
    case 'Equipment Dealer':
      return 'from-blue-500 to-indigo-600';
    case 'Financing':
      return 'from-yellow-500 to-amber-600';
    case 'Software / IT':
      return 'from-purple-500 to-violet-600';
    case 'Utilities':
      return 'from-cyan-500 to-teal-600';
    default:
      return 'from-blue-500 to-purple-600';
  }
};

function App() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [parts] = useState<Part[]>(mockParts);
  const [nameEmailSearch, setNameEmailSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [partSearch, setPartSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showTagsManagement, setShowTagsManagement] = useState(false);
  const [showCategoriesManagement, setShowCategoriesManagement] = useState(false);
  const [showSupplierDetails, setShowSupplierDetails] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);

  // Sort suppliers alphabetically by name
  const sortedSuppliers = [...suppliers].sort((a, b) => a.name.localeCompare(b.name));

  const categories = Array.from(new Set(suppliers.map(s => s.category)));

  useEffect(() => {
    let filtered = sortedSuppliers;

    // Search by name/email (contact person)
    if (nameEmailSearch) {
      filtered = filtered.filter(supplier =>
        supplier.email.toLowerCase().includes(nameEmailSearch.toLowerCase()) ||
        supplier.primaryContact.toLowerCase().includes(nameEmailSearch.toLowerCase())
      );
    }

    // Search by company name
    if (companySearch) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(companySearch.toLowerCase())
      );
    }

    // Search by tags
    if (tagSearch) {
      filtered = filtered.filter(supplier =>
        supplier.tags.some(tag => 
          tag.toLowerCase().includes(tagSearch.toLowerCase())
        )
      );
    }

    // Search by part
    if (partSearch) {
      const matchingParts = parts.filter(part =>
        part.name.toLowerCase().includes(partSearch.toLowerCase())
      );
      const supplierIdsWithParts = new Set(
        matchingParts.flatMap(part => part.supplierIds)
      );
      filtered = filtered.filter(supplier => 
        supplierIdsWithParts.has(supplier.id)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(supplier => supplier.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(supplier => supplier.category === categoryFilter);
    }

    setFilteredSuppliers(filtered);
  }, [nameEmailSearch, companySearch, tagSearch, partSearch, statusFilter, categoryFilter, sortedSuppliers, parts]);

  const handleAddSupplier = (supplierData: Omit<Supplier, 'id' | 'lastOrder' | 'joinDate'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: Math.max(...suppliers.map(s => s.id)) + 1,
      lastOrder: null,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setSuppliers([...suppliers, newSupplier]);
    setShowModal(false);
  };

  const handleEditSupplier = (supplierData: Omit<Supplier, 'id' | 'lastOrder' | 'joinDate'>) => {
    if (!editingSupplier) return;
    
    const updatedSupplier: Supplier = {
      ...editingSupplier,
      ...supplierData
    };
    
    setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? updatedSupplier : s));
    setEditingSupplier(null);
    setShowModal(false);
  };

  const handleDeleteSupplier = (id: number) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  const openEditModal = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowModal(true);
  };

  const openSupplierDetails = (supplier: Supplier) => {
    setViewingSupplier(supplier);
    setShowSupplierDetails(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSupplier(null);
  };

  const closeSupplierDetails = () => {
    setShowSupplierDetails(false);
    setViewingSupplier(null);
  };

  const clearFilters = () => {
    setNameEmailSearch('');
    setCompanySearch('');
    setTagSearch('');
    setPartSearch('');
    setStatusFilter('active');
    setCategoryFilter('all');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
                <p className="text-gray-600">Manage your supplier relationships and partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Suppliers</h2>
            <p className="text-gray-600 mt-1">Manage your supplier database</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCategoriesManagement(true)}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <Folder className="w-5 h-5 mr-2" />
              Manage Categories
            </button>
            <button
              onClick={() => setShowTagsManagement(true)}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
            >
              <Tag className="w-5 h-5 mr-2" />
              Manage Tags
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Supplier
            </button>
          </div>
        </div>

      </main>

      {/* Search and Filters - Full Width */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {/* Name/Email Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name / Email</label>
              <input
                type="text"
                value={nameEmailSearch}
                onChange={(e) => setNameEmailSearch(e.target.value)}
                placeholder="Search by contact person or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Company Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Search</label>
              <input
                type="text"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                placeholder="Search by company name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Parts Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search by Part</label>
              <input
                type="text"
                value={partSearch}
                onChange={(e) => setPartSearch(e.target.value)}
                placeholder="Search by part name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Tags Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                placeholder="Search by tags..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="px-6 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Suppliers Table */}
      <div className="w-full bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Suppliers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '420px'}}>Parts</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '420px'}}>Tags</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No suppliers found</h3>
                      <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className={`transition-colors ${
                      supplier.status === 'pending' 
                        ? 'bg-yellow-50 hover:bg-yellow-100' 
                        : supplier.status === 'inactive'
                        ? 'bg-red-50 hover:bg-red-100'
                        : 'hover:bg-gray-50'
                    }`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">{supplier.primaryContact || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {supplier.phone || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {supplier.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900" style={{width: '420px'}}>
                        <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden" style={{maxWidth: '420px'}}>
                          {parts.filter(part => part.supplierIds.includes(supplier.id)).slice(0, 4).map((part, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-700 whitespace-nowrap">
                              {part.name}
                            </span>
                          ))}
                          {parts.filter(part => part.supplierIds.includes(supplier.id)).length > 4 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-200 text-orange-800 whitespace-nowrap">
                              +{parts.filter(part => part.supplierIds.includes(supplier.id)).length - 4} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900" style={{width: '420px'}}>
                        <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden" style={{maxWidth: '420px'}}>
                          {supplier.tags.slice(0, 6).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 whitespace-nowrap">
                              #{tag}
                            </span>
                          ))}
                          {supplier.tags.length > 6 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 whitespace-nowrap">
                              +{supplier.tags.length - 6} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openSupplierDetails(supplier)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(supplier)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSupplier(supplier.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>

      {/* Supplier Modal */}
      {showModal && (
        <SupplierModal
          supplier={editingSupplier}
          onSave={editingSupplier ? handleEditSupplier : handleAddSupplier}
          onClose={closeModal}
          existingTags={Array.from(new Set(suppliers.flatMap(s => s.tags)))}
        />
      )}

      {/* Tags Management Modal */}
      {showTagsManagement && (
        <TagsManagement
          suppliers={suppliers}
          onUpdateSuppliers={setSuppliers}
          onClose={() => setShowTagsManagement(false)}
        />
      )}

      {/* Categories Management Modal */}
      {showCategoriesManagement && (
        <CategoriesManagement
          suppliers={suppliers}
          onUpdateSuppliers={setSuppliers}
          onClose={() => setShowCategoriesManagement(false)}
        />
      )}

      {/* Supplier Details Modal */}
      {showSupplierDetails && viewingSupplier && (
        <SupplierDetails
          supplier={viewingSupplier}
          onClose={closeSupplierDetails}
        />
      )}
    </div>
  );
}

export default App;