import React from 'react';
import { Zap, Home, Grid } from 'lucide-react';

export default function Usage({ usage, profile }) {
  return (
    <div className="card" style={{ padding: '20px', borderRadius: '16px', background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1E293B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Home size={18} color="#4f46e5" /> My Home Power
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <Zap size={20} color="#10B981" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase' }}>Produced</div>
          <div style={{ fontSize: '15px', fontWeight: '900', color: '#10B981' }}>24.5 <span style={{fontSize: '10px'}}>kWh</span></div>
        </div>
        
        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <Home size={20} color="#F59E0B" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase' }}>Consumed</div>
          <div style={{ fontSize: '15px', fontWeight: '900', color: '#F59E0B' }}>16.2 <span style={{fontSize: '10px'}}>kWh</span></div>
        </div>
        
        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <Grid size={20} color="#3B82F6" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase' }}>To Grid</div>
          <div style={{ fontSize: '15px', fontWeight: '900', color: '#3B82F6' }}>8.3 <span style={{fontSize: '10px'}}>kWh</span></div>
        </div>
      </div>
    </div>
  );
}
