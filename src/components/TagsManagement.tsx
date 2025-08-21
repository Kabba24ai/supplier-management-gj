import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag, X, Check } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
  usageCount: number;
}

interface TagsManagementProps {
  suppliers: any[];
  onUpdateSuppliers: (suppliers: any[]) => void;
  onClose: () => void;
}

const TagsManagement: React.FC<TagsManagementProps> = ({ suppliers, onUpdateSuppliers, onClose }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [editTagName, setEditTagName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all unique tags from suppliers and calculate usage count
  useEffect(() => {
    const tagCounts: { [key: string]: number } = {};
    
    suppliers.forEach(supplier => {
      supplier.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const uniqueTags: Tag[] = Object.entries(tagCounts).map(([name, count], index) => ({
      id: index + 1,
      name,
      usageCount: count
    }));

    setTags(uniqueTags.sort((a, b) => a.name.localeCompare(b.name)));
  }, [suppliers]);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    
    const tagExists = tags.some(tag => tag.name.toLowerCase() === newTagName.toLowerCase());
    if (tagExists) {
      alert('Tag already exists!');
      return;
    }

    const newTag: Tag = {
      id: Math.max(...tags.map(t => t.id), 0) + 1,
      name: newTagName.trim(),
      usageCount: 0
    };

    setTags([...tags, newTag].sort((a, b) => a.name.localeCompare(b.name)));
    setNewTagName('');
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setEditTagName(tag.name);
  };

  const handleSaveEdit = () => {
    if (!editTagName.trim() || !editingTag) return;

    const tagExists = tags.some(tag => 
      tag.id !== editingTag.id && tag.name.toLowerCase() === editTagName.toLowerCase()
    );
    if (tagExists) {
      alert('Tag already exists!');
      return;
    }

    // Update tag in tags list
    const updatedTags = tags.map(tag =>
      tag.id === editingTag.id ? { ...tag, name: editTagName.trim() } : tag
    );

    // Update tag in all suppliers
    const updatedSuppliers = suppliers.map(supplier => ({
      ...supplier,
      tags: supplier.tags.map((tag: string) =>
        tag === editingTag.name ? editTagName.trim() : tag
      )
    }));

    setTags(updatedTags.sort((a, b) => a.name.localeCompare(b.name)));
    onUpdateSuppliers(updatedSuppliers);
    setEditingTag(null);
    setEditTagName('');
  };

  const handleCancelEdit = () => {
    setEditingTag(null);
    setEditTagName('');
  };

  const handleDeleteTag = (tagToDelete: Tag) => {
    if (tagToDelete.usageCount > 0) {
      const confirmDelete = window.confirm(
        `This tag is used by ${tagToDelete.usageCount} supplier(s). Deleting it will remove it from all suppliers. Are you sure?`
      );
      if (!confirmDelete) return;
    }

    // Remove tag from all suppliers
    const updatedSuppliers = suppliers.map(supplier => ({
      ...supplier,
      tags: supplier.tags.filter((tag: string) => tag !== tagToDelete.name)
    }));

    // Remove tag from tags list
    const updatedTags = tags.filter(tag => tag.id !== tagToDelete.id);

    setTags(updatedTags);
    onUpdateSuppliers(updatedSuppliers);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'add' | 'edit') => {
    if (e.key === 'Enter') {
      if (action === 'add') {
        handleAddTag();
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
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg mr-3">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tags Management</h2>
              <p className="text-gray-600">Manage your supplier tags and categories</p>
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
          {/* Add New Tag */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Add New Tag</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'add')}
                placeholder="Enter new tag name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddTag}
                disabled={!newTagName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tag
              </button>
            </div>
          </div>

          {/* Search Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Search Tags</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search existing tags..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Tags List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                All Tags ({filteredTags.length})
              </h3>
              <div className="text-sm text-gray-500">
                Total unique tags: {tags.length}
              </div>
            </div>

            {filteredTags.length === 0 ? (
              <div className="text-center py-8">
                <Tag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tags found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Try adjusting your search term.' : 'Start by adding your first tag.'}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {filteredTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center flex-1">
                        {editingTag?.id === tag.id ? (
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="text"
                              value={editTagName}
                              onChange={(e) => setEditTagName(e.target.value)}
                              onKeyPress={(e) => handleKeyPress(e, 'edit')}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                              #{tag.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              Used by {tag.usageCount} supplier{tag.usageCount !== 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                      </div>

                      {editingTag?.id !== tag.id && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditTag(tag)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                            title="Edit Tag"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTag(tag)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            title="Delete Tag"
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

export default TagsManagement;