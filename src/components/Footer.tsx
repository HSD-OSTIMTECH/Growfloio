import { TrendingUp } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export function Footer({ darkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-top mt-auto ${darkMode ? 'bg-dark border-secondary' : 'bg-white border'}`}>
      <div className="container container-xl py-4 px-3 px-sm-4">
        <div className="d-flex flex-column align-items-center text-center gap-3">
          {/* Logo + marka */}
          <div className="d-flex flex-column align-items-center gap-2">
            <div className="bg-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h3 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>Growfolio</h3>
              <p className={`small mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`}>Gelişim yolculuğun burada başlıyor</p>
            </div>
          </div>

          {/* Motivasyon metni */}
          <p className={`small mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`}>
            Gelişim sürecinizi paylaşın, başkalarından ilham alın ve birlikte büyüyün.
          </p>

          {/* Tüm hakları saklıdır + made with HSD-OSTIMTECH */}
          <div className={`d-flex flex-column flex-sm-row align-items-center justify-content-center gap-1 gap-sm-2 small flex-wrap ${darkMode ? 'text-secondary' : 'text-muted'}`}>
            <span>Tüm hakları saklıdır.</span>
            <span className="d-none d-sm-inline">•</span>
            <span>made with HSD-OSTIMTECH</span>
          </div>

          {/* En altta: © 2026 Growfolio (çizgisiz) */}
          <div className="pt-3 mt-2 w-100">
            <p className={`small mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`}>
              © {currentYear} Growfolio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
