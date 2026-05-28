import React, { useState } from 'react';
import { BookOpen, Video, Plus, PlayCircle, Trash2, Edit, X, Search } from 'lucide-react';
import DataTable from '../../components/DataTable';

const initialVideos = [
  { id: 'VID-001', title: 'Understanding Your Inverter Display', category: 'Basics', views: 1245, date: '2026-01-10' },
  { id: 'VID-002', title: 'How to Read Your Electricity Bill', category: 'Financial', views: 3420, date: '2026-02-15' },
  { id: 'VID-003', title: 'Panel Cleaning Best Practices', category: 'Maintenance', views: 890, date: '2026-04-05' },
  { id: 'VID-004', title: 'Connecting the Wi-Fi Dongle', category: 'Technical', views: 2150, date: '2025-11-20' },
  { id: 'VID-005', title: 'Claiming Your Warranty Benefits', category: 'Financial', views: 1560, date: '2025-08-30' },
  { id: 'VID-006', title: 'Safety Precautions During Rain', category: 'Basics', views: 4320, date: '2025-06-10' },
  { id: 'VID-007', title: 'Understanding Net Metering', category: 'Financial', views: 5600, date: '2024-12-05' },
  { id: 'VID-008', title: 'Troubleshooting Low Generation', category: 'Technical', views: 3100, date: '2026-03-22' },
];

export default function AdminLearningCenter() {
  const [videos, setVideos] = useState(initialVideos);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Basics');

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const paginatedData = filteredVideos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newVid = {
      id: `VID-00${videos.length + 1}`,
      title: newTitle,
      category: newCategory,
      views: 0,
      date: new Date().toISOString().split('T')[0]
    };

    setVideos([newVid, ...videos]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewCategory('Basics');
  };

  const removeVideo = (id) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="text-brand-navy" /> Learning Content Manager
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-brand-orange hover:bg-brand-orange/90 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all shadow-sm whitespace-nowrap h-[32px] md:h-[38px]"
            >
              <Plus size={14} />
              Add Video
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["Video Title", "Category", "Total Views", "Upload Date", "Actions"]}
          data={paginatedData}
          minWidth="800px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredVideos.length}
          itemsPerPageOptions={[10, 20, 50]}
          renderRow={(vid, idx) => (
            <tr key={vid.id} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                    <PlayCircle size={14} />
                  </div>
                  <span className="font-bold text-gray-900 text-sm">{vid.title}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider border border-gray-200">
                  {vid.category}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-bold text-brand-navy text-center">{vid.views.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{vid.date}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-600 hover:text-brand-navy rounded-lg transition-colors border border-gray-200" title="Edit">
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => removeVideo(vid.id)}
                    className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-lg transition-colors border border-gray-200" 
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          renderCard={(vid, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={vid.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-start pb-2 border-b border-slate-50">
                  <div className="flex gap-3">
                     <div className="w-10 h-7 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 flex-shrink-0">
                      <PlayCircle size={14} />
                    </div>
                    <span className="text-sm font-black text-brand-navy line-clamp-2">{vid.title}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Category</span>
                    <span className="font-semibold text-gray-700">{vid.category}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Views & Date</span>
                    <span className="font-semibold text-gray-700">{vid.views.toLocaleString()} • {vid.date}</span>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* --- ADD VIDEO MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Video className="text-brand-orange" />
                Add New Training Video
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Video Title</label>
                <input 
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Troubleshooting WiFi..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                >
                  <option value="Basics">Basics</option>
                  <option value="Financial">Financial</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Advanced">Advanced Setup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">YouTube or Vimeo URL</label>
                <input 
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
                <p className="text-xs text-gray-500 mt-1">Video will be embedded automatically.</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="flex-1 px-4 py-2.5 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy/90 transition-colors disabled:opacity-50"
                >
                  Publish Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
