import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookies-accepted');
    if (!hasAcceptedCookies) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 bg-[#1A1A1A]/95 backdrop-blur-md border-t border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-sm text-white text-center md:text-left leading-relaxed">
          <p className="mb-2 md:mb-0">
            Utilizamos cookies para melhorar a sua experiência no nosso site. Ao continuar a navegar, concorda com a nossa{' '}
            <Link to="/politica-privacidade" className="text-[#B4D600] hover:underline underline-offset-4 font-bold transition-colors">
              Política de Privacidade
            </Link>.
          </p>
        </div>
        <div className="flex flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <Button 
            onClick={acceptCookies} 
            className="flex-1 sm:flex-none rounded-full px-8 py-6 font-bold bg-[#B4D600] text-black hover:bg-[#B4D600]/90 active:scale-95 transition-all text-base"
          >
            Aceitar
          </Button>
          <button 
            onClick={() => setShowBanner(false)}
            className="p-3 text-white/70 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;