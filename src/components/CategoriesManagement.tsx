import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Folder, X, Check } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  usageCount: number;
  isDefault?: boolean;
}

interface CategoriesManagementProps {
  suppliers: any[];
  onUpdateSuppliers: (suppliers: any[]) => void;
  onClose: () => void;
}

// Default categories that cannot be edited or deleted
const DEFAULT_CATEGORIES = [
  'Parts',
  'Supplies - General', 
  'Equipment Mfg.',
  'Equipment Dealer',
  'Financing',
  'Software / IT',
  'Utilities'
];
const CategoriesManagement: React.FC<CategoriesManagementProps> = ({ suppliers, onUpdateSuppliers, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all unique categories from suppliers and calculate usage count
  useEffect(() => {
    const categoryCounts: { [key: string]: number } = {};
    
    suppliers.forEach(supplier => {
      categoryCounts[supplier.category] = (categoryCounts[supplier.category] || 0) + 1;
    });

    // Include all default categories even if not used
    DEFAULT_CATEGORIES.forEach(defaultCategory => {
      if (!(defaultCategory in categoryCounts)) {
        categoryCounts[defaultCategory] = 0;
      }
    });
    const uniqueCategories: Category[] = Object.entries(categoryCounts).map(([name, count], index) => ({
      id: index + 1,
      name,
      usageCount: count
      isDefault: DEFAULT_CATEGORIES.includes(name)
    }));

    setCategories(uniqueCategories.sort((a, b) => a.name.localeCompare(b.name)));
  }, [suppliers]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const categoryExists = categories.some(category => category.name.toLowerCase() === newCategoryName.toLowerCase());
    if (categoryExists) {
      alert('Category already exists!');
      return;
    }

    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name: newCategoryName.trim(),
      usageCount: 0
      isDefault: false
    };

    setCategories([...categories, newCategory].sort((a, b) => a.name.localeCompare(b.name)));
    setNewCategoryName('');
  };

  const handleEditCategory = (category: Category) => {
    if (category.isDefault) {
      alert('Default categories cannot be edited.');
      return;
    }
    setEditingCategory(category);
    setEditCategoryName(category.name);
  };

  const handleSaveEdit = () => {
    if (!editCategoryName.trim() || !editingCategory) return;

    const categoryExists = categories.some(category => 
      category.id !== editingCategory.id && category.name.toLowerCase() === editCategoryName.toLowerCase()
    );
    if (categoryExists) {
      alert('Category already exists!');
      return;
    }

    // Update category in categories list
    const updatedCategories = categories.map(category =>
      category.id === editingCategory.id ? { ...category, name: editCategoryName.trim() } : category
    );

    // Update category in all suppliers
    const updatedSuppliers = suppliers.map(supplier => ({
      ...supplier,
      category: supplier.category === editingCategory.name ? editCategoryName.trim() : supplier.category
    }));

    setCategories(updatedCategories.sort((a, b) => a.name.localeCompare(b.name)));
    onUpdateSuppliers(updatedSuppliers);
    setEditingCategory(null);
    setEditCategoryName('');
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName('');
  };

  const handleDeleteCategory = (categoryToDelete: Category) => {
    if (categoryToDelete.isDefault) {
      alert('Default categories cannot be deleted.');
      return;
    }

    if (categoryToDelete.usageCount > 0) {
      const confirmDelete = window.confirm(
        `This category is used by ${categoryToDelete.usageCount} supplier(s). Deleting it will set their category to "Uncategorized". Are you sure?`
      );
      if (!confirmDelete) return;
    }

    // Update suppliers with deleted category to "Uncategorized"
    const updatedSuppliers = suppliers.map(supplier => ({
      ...supplier,
      category: supplier.category === categoryToDelete.name ? 'Uncategorized' : supplier.category
    }));

    // Remove category from categories list
    const updatedCategories = categories.filter(category => category.id !== categoryToDelete.id);

    setCategories(updatedCategories);
    onUpdateSuppliers(updatedSuppliers);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'add' | 'edit') => {
    if (e.key === 'Enter') {
      if (action === 'add') {
        handleAddCategory();
      } else {
        handleSaveEdit();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-2 rounded-lg mr-3">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Categories Management</h2>
              <p className="text-gray-600">Manage your supplier categories and classifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Add New Category */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Add New Category</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'add')}
                placeholder="Enter new category name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </button>
            </div>
          </div>

          {/* Search Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Search Categories</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search existing categories..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Categories List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                All Categories ({filteredCategories.length})
              </h3>
              <div className="text-sm text-gray-500">
                Total unique categories: {categories.length}
              </div>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="text-center py-8">
                <Folder className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Try adjusting your search term.' : 'Start by adding your first category.'}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center flex-1">
                        {editingCategory?.id === category.id ? (
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="text"
                              value={editCategoryName}
                              onChange={(e) => setEditCategoryName(e.target.value)}
                              onKeyPress={(e) => handleKeyPress(e, 'edit')}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              autoFocus
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                              title="Save"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mr-3 ${
                              category.isDefault 
                                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {category.name}
                              {category.isDefault && <span className="ml-1 text-xs">(Default)</span>}
                            </span>
                            <span className="text-sm text-gray-500">
                              Used by {category.usageCount} supplier{category.usageCount !== 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                      </div>

                      {editingCategory?.id !== category.id && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className={`p-1 rounded transition-colors ${
                              category.isDefault
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                            }`}
                            title="Edit Category"
                            disabled={category.isDefault}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category)}
                            className={`p-1 rounded transition-colors ${
                              category.isDefault
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                            }`}
                            title="Delete Category"
                            disabled={category.isDefault}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
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

export default CategoriesManagement;