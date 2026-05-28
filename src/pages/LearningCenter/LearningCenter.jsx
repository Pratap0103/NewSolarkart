import React, { useState } from 'react';
import { Play, BookOpen, ChevronRight, ChevronDown, Video, HelpCircle, FileText, Lightbulb } from 'lucide-react';

export default function LearningCenter() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const dummyLearningCards = [
    { title: 'How to Clean Solar Panels safely', category: 'Maintenance', description: 'Step-by-step video guide on washing panels without scratching them.', duration: '4:20' },
    { title: 'Understanding Inverter Errors', category: 'Troubleshooting', description: 'Learn what the red lights and error codes mean on your smart inverter.', duration: '6:15' },
    { title: 'Maximizing Peak Hour Yield', category: 'Optimization', description: 'Tips on scheduling heavy appliances during peak solar generation hours.', duration: '3:45' },
    { title: 'Battery Storage Best Practices', category: 'Storage', description: 'How to prolong the life of your lithium-ion solar batteries.', duration: '5:30' },
    { title: 'Reading Your Electricity Bill', category: 'Finance', description: 'A complete breakdown of net metering and grid export credits.', duration: '8:10' },
    { title: 'Preparing for Monsoon Season', category: 'Maintenance', description: 'Essential checks to perform before heavy rains hit your region.', duration: '4:55' },
    { title: 'Connecting to Wi-Fi Gateway', category: 'Setup', description: 'How to reconnect your smart inverter to your home Wi-Fi network.', duration: '2:30' },
    { title: 'Solar Warranty Terms Explained', category: 'Legal', description: 'Understand what is and isn\'t covered under your 25-year warranty.', duration: '7:20' },
  ];

  const initialFAQs = [
    {
      title: 'What should I do during a power grid failure?',
      category: 'Operations',
      description: 'Your hybrid inverter will automatically switch to battery backup within 20 milliseconds. If you have an on-grid system without batteries, the system will shut down for safety to prevent backfeeding into the grid.',
      steps: ['Check inverter screen for Islanding mode', 'Reduce heavy loads like ACs', 'Wait for grid restoration'],
      tips: ['Keep essential load circuits separated in your DB box.']
    },
    {
      title: 'Why is my generation lower today than yesterday?',
      category: 'Performance',
      description: 'Solar generation depends heavily on weather, temperature, and seasonal sun angles. Even slight cloud cover, dust accumulation, or high ambient temperatures (above 40°C) can temporarily reduce panel efficiency by 10-15%.',
      steps: ['Check weather app for UV index', 'Inspect panels for heavy dust/bird droppings', 'Check inverter for any active warning lights'],
      tips: ['Clean your panels early morning before they get hot.']
    },
    {
      title: 'How do I claim my referral bonus?',
      category: 'Rewards',
      description: 'Once your referred friend completes their installation and pays the final invoice, your referral bonus is automatically credited to your linked bank account within 7 working days.',
      steps: ['Go to Referral System page', 'Track lead status', 'Ensure your bank details are updated in Profile'],
      tips: ['Share your unique link via WhatsApp for faster tracking.']
    },
    {
      title: 'Can I add more panels later?',
      category: 'Upgrades',
      description: 'Yes, but it depends on your current inverter capacity and available roof space. If your inverter is already maxed out, you may need a string inverter upgrade or microinverters for the new panels.',
      steps: ['Check current inverter rated capacity', 'Measure available shadow-free roof area', 'Contact SolarKart for an upgrade assessment'],
      tips: ['Installing panels of the exact same wattage and brand ensures optimal string performance.']
    }
  ];

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-4 md:space-y-6 flex flex-col h-full min-h-0 overflow-y-auto">
      

      {/* Video Guides Grid */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 shrink-0">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Video size={18} className="text-brand-navy/80" /> Video Guides & Tutorials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dummyLearningCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenDetail(card)}
              className="group cursor-pointer bg-slate-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-brand-navy/30 transition-all flex flex-col"
            >
              <div className="h-32 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&w=400&q=80`} alt="Solar" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform z-10 border border-white/40">
                  <Play size={24} className="text-white ml-1" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
                  {card.duration}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="inline-block px-2 py-0.5 bg-brand-navy/10 text-brand-navy text-[10px] font-bold rounded uppercase tracking-wider mb-2 self-start">
                  {card.category}
                </span>
                <h4 className="text-sm font-bold text-gray-900 mb-1 leading-tight group-hover:text-brand-navy transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2 mt-auto">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 shrink-0 mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle size={18} className="text-brand-navy/80" /> Frequently Asked Questions
        </h3>
        <div className="flex flex-col gap-3">
          {initialFAQs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition-all ${isOpen ? 'border-brand-navy/30 bg-brand-navy/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <button 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                >
                  <span className="font-bold text-sm text-gray-900">{faq.title}</span>
                  <div className={`p-1 rounded-full transition-transform ${isOpen ? 'bg-brand-navy/10 text-brand-navy rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{faq.description}</p>
                    
                    {faq.steps && (
                      <div className="mb-3">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Action Steps</span>
                        <ul className="space-y-1">
                          {faq.steps.map((step, sIdx) => (
                            <li key={sIdx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/80 mt-1.5 shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {faq.tips && (
                      <div className="bg-brand-orange/10 border border-brand-orange/10 rounded-lg p-3 mt-3 flex items-start gap-2">
                        <Lightbulb size={16} className="text-brand-orange shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-brand-orange block mb-0.5">Pro Tip</span>
                          {faq.tips.map((tip, tIdx) => (
                            <p key={tIdx} className="text-xs text-brand-orange">{tip}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => handleOpenDetail(faq)}
                      className="mt-4 text-xs font-bold text-brand-navy hover:text-brand-navy flex items-center gap-1"
                    >
                      Read full article <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {showDetail && selectedItem && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="text-brand-navy" /> Guide Detail
              </h3>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <span className="inline-block px-2.5 py-1 bg-brand-navy/10 text-brand-navy text-[10px] font-bold rounded uppercase tracking-wider mb-3">
                {selectedItem.category}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-3">{selectedItem.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{selectedItem.description}</p>

              {/* Mock Video Stream */}
              {selectedItem.duration && (
                <div className="w-full aspect-video bg-slate-900 rounded-xl relative overflow-hidden group cursor-pointer mb-6 border border-slate-800 shadow-inner">
                  <img src={`https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&w=800&q=80`} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-brand-navy/90 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-900/50">
                      <Play size={32} className="text-white ml-2" />
                    </div>
                    <span className="mt-4 text-xs font-bold text-white tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">Watch Guide ({selectedItem.duration})</span>
                  </div>
                </div>
              )}

              {selectedItem.steps && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Recommended Action Steps</h4>
                  <ul className="space-y-2">
                    {selectedItem.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-navy/10 text-brand-navy flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                        <span className="mt-0.5">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.tips && (
                <div className="bg-brand-orange/10 border border-brand-orange/10 rounded-xl p-4 flex gap-3">
                  <Lightbulb size={24} className="text-brand-orange shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-brand-orange mb-1">Pro Tips & Advice</h4>
                    <ul className="space-y-1">
                      {selectedItem.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-brand-orange flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange/80 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
              <button 
                onClick={() => setShowDetail(false)}
                className="px-5 py-2 bg-brand-navy hover:bg-brand-navy text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
