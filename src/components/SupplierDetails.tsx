import React from 'react';
import { X, Building2, User, Users, Mail, Phone, Globe, MapPin, Tag } from 'lucide-react';
import { Supplier } from '../types/supplier';
import { mockParts, Part } from '../data/mockPartsData';

interface SupplierDetailsProps {
  supplier: Supplier;
  onClose: () => void;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({ supplier, onClose }) => {
  const parts = mockParts.filter(part => part.supplierIds.includes(supplier.id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mr-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{supplier.name}</h2>
              <div className="flex items-center mt-2 space-x-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(supplier.status)}`}>
                  <span className="capitalize">{supplier.status}</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {supplier.category}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-blue-600 p-2 rounded-lg mr-3">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                Company Information
              </h3>
              
              <div className="space-y-3">
                <div className="text-lg font-semibold text-gray-900">{supplier.name}</div>
                
                <div className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <a href={`tel:${supplier.phone}`} className="text-blue-600 hover:text-blue-800">
                    {supplier.phone || 'N/A'}
                  </a>
                </div>

                <div className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:text-blue-800">
                    {supplier.email || 'N/A'}
                  </a>
                </div>

                <div className="flex items-center text-gray-700">
                  <Globe className="w-4 h-4 text-gray-400 mr-3" />
                  {supplier.website ? (
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {supplier.website}
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                <div className="flex items-start text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                  <div>
                    <div>{supplier.address || 'N/A'}</div>
                    <div>
                      {supplier.city && supplier.state && supplier.zip 
                        ? `${supplier.city}, ${supplier.state} ${supplier.zip}`
                        : supplier.city || 'N/A'
                      }
                    </div>
                    <div>{supplier.country}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="text-sm text-gray-600">Tax ID</div>
                    <div className="font-medium">{supplier.taxId || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Payment Terms</div>
                    <div className="font-medium">{supplier.paymentTerms}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Parts Supplied */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gray-600 p-2 rounded-lg mr-3">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                Parts Supplied ({parts.length})
              </h3>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {parts.length > 0 ? (
                  parts.map((part, index) => (
                    <div key={index} className="text-gray-900">
                      {part.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No parts assigned</p>
                )}
              </div>
            </div>

            {/* Placeholder for balance */}
            <div></div>
          </div>

          {/* Tags Section */}
          <div className="mt-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-purple-600 p-2 rounded-lg mr-3">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                Tags
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {supplier.tags.length > 0 ? (
                  supplier.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No tags assigned</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;