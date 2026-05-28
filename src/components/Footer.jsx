import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-3 md:py-2 border-t border-brand-navy/30 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-[13px] md:text-sm font-bold md:font-medium text-brand-navy">
          Powered By <a
            href="https://www.botivate.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-navy md:text-brand-navy hover:text-brand-navy font-black md:font-bold hover:underline transition-all"
          >
            Botivate
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;