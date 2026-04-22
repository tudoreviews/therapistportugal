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
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground text-center md:text-left leading-relaxed">
          <p>
            Utilizamos cookies para melhorar a sua experiência no nosso site. Ao continuar a navegar, concorda com a nossa{' '}
            <Link to="/politica-privacidade" className="text-primary hover:underline underline-offset-4 font-medium transition-colors">
              Política de Privacidade
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button onClick={acceptCookies} className="rounded-full px-8 font-bold hover:scale-105 active:scale-95 transition-all">
            Aceitar
          </Button>
          <button 
            onClick={() => setShowBanner(false)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;