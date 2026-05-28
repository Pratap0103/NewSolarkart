import React, { useState } from 'react';
import { Eye, Download, Share2, ShieldCheck, FileText, Search, Upload, X, CheckCircle, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable';

const initialDocs = [
  { id: 'DOC-001', customer: 'Rajesh Kumar', filename: 'Solar_Installation_Contract.pdf', type: 'Contract', size: '2.4 MB', date: '2024-11-12' },
  { id: 'DOC-002', customer: 'Priya Sharma', filename: 'AMC_Agreement_2026.pdf', type: 'AMC', size: '1.1 MB', date: '2026-01-15' },
  { id: 'DOC-003', customer: 'Amit Patel', filename: 'Grid_Interconnection_Approval.pdf', type: 'Approval', size: '3.5 MB', date: '2023-08-22' },
  { id: 'DOC-004', customer: 'Sneha Gupta', filename: 'Warranty_Certificate_Inverter.pdf', type: 'Warranty', size: '800 KB', date: '2025-04-10' },
  { id: 'DOC-005', customer: 'Vikram Singh', filename: 'System_Design_Blueprint.pdf', type: 'Blueprint', size: '8.2 MB', date: '2024-02-28' },
  { id: 'DOC-006', customer: 'Ananya Reddy', filename: 'NOC_Electricity_Board.pdf', type: 'Approval', size: '1.8 MB', date: '2025-06-14' },
  { id: 'DOC-007', customer: 'Rohan Desai', filename: 'Maintenance_Log_2025.pdf', type: 'AMC', size: '1.2 MB', date: '2025-12-31' },
  { id: 'DOC-008', customer: 'Kavita Menon', filename: 'Panel_Warranty_Cards.pdf', type: 'Warranty', size: '4.5 MB', date: '2023-11-05' },
  { id: 'DOC-009', customer: 'Manoj Tiwari', filename: 'Original_Purchase_Invoice.pdf', type: 'Invoice', size: '2.1 MB', date: '2024-09-18' },
  { id: 'DOC-010', customer: 'Deepak Verma', filename: 'Upgraded_System_Layout.pdf', type: 'Blueprint', size: '12.4 MB', date: '2026-02-10' },
];

export default function AdminDocumentCenter() {
  const [docs, setDocs] = useState(initialDocs);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadCustomer, setUploadCustomer] = useState('');
  const [uploadType, setUploadType] = useState('Contract');
  const [uploadFile, setUploadFile] = useState(null);

  const filteredDocs = docs.filter(doc => 
    doc.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const paginatedData = filteredDocs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadCustomer || !uploadFile) return;

    const newDoc = {
      id: `DOC-00${docs.length + 1}`,
      customer: uploadCustomer,
      filename: uploadFile.name,
      type: uploadType,
      size: (uploadFile.size / 1024 / 1024).toFixed(1) + ' MB',
      date: new Date().toISOString().split('T')[0]
    };

    setDocs([newDoc, ...docs]);
    setIsUploadOpen(false);
    toast.success('Document uploaded successfully!');
    
    // Reset
    setUploadCustomer('');
    setUploadType('Contract');
    setUploadFile(null);
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-brand-navy" /> Fleet Document Vault (Admin)
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search by customer or file..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 bg-brand-orange hover:bg-brand-orange/90 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all shadow-sm whitespace-nowrap h-[32px] md:h-[38px]"
            >
              <Upload size={14} />
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["File Name", "Customer", "Type", "Upload Date", "Size", "Action"]}
          data={paginatedData}
          minWidth="1000px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredDocs.length}
          itemsPerPageOptions={[10, 20, 50]}
          renderRow={(doc, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{doc.filename}</td>
              <td className="px-4 py-3 text-sm font-bold text-brand-navy text-center">{doc.customer}</td>
              <td className="px-4 py-3 text-sm text-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider border border-gray-200">
                  {doc.type}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{doc.date}</td>
              <td className="px-4 py-3 text-sm text-gray-500 text-center">{doc.size}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-600 hover:text-brand-navy rounded-lg transition-colors border border-gray-200" title="Download">
                    <Download size={14} />
                  </button>
                  <button className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-600 hover:text-brand-navy rounded-lg transition-colors border border-gray-200" title="Options">
                    <MoreVertical size={14} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          renderCard={(doc, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{doc.filename}</span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">
                    {doc.type}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Customer</span>
                    <span className="font-semibold text-gray-700">{doc.customer}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Size & Date</span>
                    <span className="font-semibold text-gray-700">
                      {doc.size} • {doc.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* --- UPLOAD MODAL --- */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Upload className="text-brand-orange" />
                Upload New Document
              </h3>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Customer Name</label>
                <input 
                  type="text"
                  required
                  value={uploadCustomer}
                  onChange={(e) => setUploadCustomer(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Document Type</label>
                <select 
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                >
                  <option value="Contract">Contract</option>
                  <option value="Warranty">Warranty</option>
                  <option value="Blueprint">Blueprint</option>
                  <option value="AMC">AMC Agreement</option>
                  <option value="Approval">Grid Approval</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Select File</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    required
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  {!uploadFile ? (
                    <div className="flex flex-col items-center text-gray-500">
                      <Upload size={24} className="mb-2 text-gray-400" />
                      <span className="text-sm font-semibold">Click or drag file to upload</span>
                      <span className="text-xs mt-1">PDF, DOCX, JPG up to 10MB</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-green-600">
                      <CheckCircle size={24} className="mb-2" />
                      <span className="text-sm font-bold">{uploadFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!uploadCustomer || !uploadFile}
                  className="flex-1 px-4 py-2.5 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy/90 transition-colors disabled:opacity-50"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
