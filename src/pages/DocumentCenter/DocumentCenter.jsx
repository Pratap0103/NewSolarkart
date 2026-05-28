import React, { useState } from 'react';
import { Eye, Download, Share2, ShieldCheck, FileText, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable';

export default function DocumentCenter() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [documents] = useState(Array.from({ length: 40 }).map((_, i) => {
    const types = ['Contract', 'Certificate', 'Warranty', 'Technical'];
    const names = ['AMC Agreement', 'Installation Certificate', 'Solar Panels Warranty Card', 'Smart Inverter Schematic', 'Grid Connection Approval'];
    return {
      documentId: `DOC-${10000 + i * 17}`,
      documentName: names[i % names.length] + ` - ${2024 - (i % 3)}`,
      documentType: types[i % types.length],
      uploadDate: `12 Nov 202${4 - (i % 3)}`,
      fileSize: `${(1.2 + (i % 5) * 0.4).toFixed(1)} MB`,
      status: 'Verified'
    };
  }));

  const filteredDocs = documents.filter(doc => 
    doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.documentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const paginatedData = filteredDocs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePreview = (doc) => {
    setSelectedDoc(doc);
    setShowPreview(true);
  };

  const handleDownload = (docName) => {
    toast.success(`Downloading file: ${docName}.pdf`);
  };

  const handleShare = (docName) => {
    toast.success(`Shared secure document link: ${docName}`);
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-brand-navy" /> Secure Document Vault
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search documents by ID or name..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["Document ID", "Document Name", "Type", "Upload Date", "Size", "Status", "Action"]}
          data={paginatedData}
          minWidth="1000px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredDocs.length}
          itemsPerPageOptions={[50, 100, 200]}
          renderRow={(doc, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/30 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{doc.documentId}</td>
              <td className="px-4 py-3 text-sm font-bold text-brand-navy text-center">{doc.documentName}</td>
              <td className="px-4 py-3 text-sm text-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">
                  {doc.documentType}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{doc.uploadDate}</td>
              <td className="px-4 py-3 text-sm text-gray-500 text-center">{doc.fileSize}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-full">
                  <ShieldCheck size={12} /> {doc.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button onClick={() => handlePreview(doc)} className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-600 hover:text-brand-navy rounded-lg transition-colors border border-gray-200" title="Preview">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => handleDownload(doc.documentName)} className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-600 hover:text-brand-navy rounded-lg transition-colors border border-gray-200" title="Download">
                    <Download size={14} />
                  </button>
                  <button onClick={() => handleShare(doc.documentName)} className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-600 hover:text-brand-navy rounded-lg transition-colors border border-gray-200" title="Share">
                    <Share2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          renderCard={(doc, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-brand-navy/10 shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-brand-navy/10">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{doc.documentName}</span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">
                    {doc.documentType}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Upload Date</span>
                    <span className="font-semibold text-gray-700">{doc.uploadDate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Size & Status</span>
                    <span className="font-semibold text-brand-orange flex items-center gap-1">
                      {doc.fileSize} <ShieldCheck size={10} />
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-100 mt-1">
                  <button onClick={() => handlePreview(doc)} className="flex-1 flex justify-center items-center gap-1.5 py-1.5 bg-brand-navy/10 text-brand-navy rounded-lg text-xs font-bold">
                    <Eye size={12} /> View
                  </button>
                  <button onClick={() => handleDownload(doc.documentName)} className="flex-1 flex justify-center items-center gap-1.5 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-bold border border-gray-200">
                    <Download size={12} /> Save
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && selectedDoc && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="text-brand-orange/80" /> Secure Preview
              </h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>
            
            <div className="p-4 md:p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Document Name</div>
                  <div className="font-bold text-brand-navy">{selectedDoc.documentName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Document Type</div>
                  <div className="font-semibold text-gray-800">{selectedDoc.documentType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Upload Date</div>
                  <div className="font-semibold text-gray-800">{selectedDoc.uploadDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">File Size</div>
                  <div className="font-semibold text-gray-800">{selectedDoc.fileSize}</div>
                </div>
              </div>

              {/* Mock PDF Content Viewer */}
              <div className="bg-slate-900 rounded-xl p-5 md:p-6 text-slate-100 font-mono text-xs border-l-4 border-l-emerald-500 shadow-inner relative overflow-hidden mt-2">
                <div className="absolute top-0 right-0 bg-brand-orange/80 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                  Verified Signature
                </div>
                
                <div className="flex justify-between items-end border-b border-slate-700 pb-3 mb-4">
                  <span className="font-black text-brand-orange/80 text-sm tracking-widest">SOLARKART ENERGY PVT LTD</span>
                </div>
                
                <div className="flex items-center gap-2 text-brand-orange/30 font-bold mb-4">
                  <ShieldCheck size={16} /> Cryptographic Hash Matched
                </div>
                
                <div className="space-y-2 text-slate-300 opacity-90">
                  <p>Ref ID: {selectedDoc.documentId}</p>
                  <p>Signee: SolarKart Customer Portal</p>
                  <p>Status: {selectedDoc.status}</p>
                  <p className="mt-4 text-[10px] text-slate-500 italic">
                    * This document is cryptographically signed and securely stored. Unauthorized reproduction is prohibited.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2 mt-2">
                <button onClick={() => handleShare(selectedDoc.documentName)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-2">
                  <Share2 size={16} /> Share
                </button>
                <button onClick={() => handleDownload(selectedDoc.documentName)} className="flex-1 px-4 py-2 bg-brand-navy hover:bg-brand-navy text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all flex justify-center items-center gap-2">
                  <Download size={16} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
