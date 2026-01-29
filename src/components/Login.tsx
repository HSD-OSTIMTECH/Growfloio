import { useState } from 'react';
import { TrendingUp, Mail, Lock, UserPlus, Moon, Sun } from 'lucide-react';

interface LoginProps {
  onLogin: (userName: string, userId: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Login({ onLogin, darkMode, setDarkMode }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      const userId = 'user_' + Date.now();
      const userName = name || email.split('@')[0];
      onLogin(userName, userId);
    } else {
      const mockUsers = [
        { email: 'ayse@example.com', name: 'Ayşe Yılmaz', id: 'user1' },
        { email: 'mehmet@example.com', name: 'Mehmet Kaya', id: 'user2' },
        { email: 'zeynep@example.com', name: 'Zeynep Demir', id: 'user3' },
        { email: 'can@example.com', name: 'Can Özkan', id: 'user4' },
      ];
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        onLogin(user.name, user.id);
      } else {
        onLogin(email.split('@')[0], 'user_new');
      }
    }
  };

  const inputClass = darkMode
    ? 'form-control text-white border-secondary'
    : 'form-control';
  const inputWrapperClass = darkMode
    ? 'login-input-dark'
    : '';
  const labelClass = darkMode ? 'text-light' : 'text-body';

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center p-2 p-sm-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="w-100 mx-2 mx-sm-0" style={{ maxWidth: 400 }}>
        <div className="d-flex justify-content-end mb-3">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`btn rounded-3 ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
            title={darkMode ? 'Açık Mod' : 'Gece Modu'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary mb-3" style={{ width: 64, height: 64 }}>
            <TrendingUp className="text-white" size={32} />
          </div>
          <h1 className={`h3 fw-semibold mb-1 ${darkMode ? 'text-white' : 'text-dark'}`}>Growfolio</h1>
          <p className={darkMode ? 'text-secondary' : 'text-muted mb-0'}>
            Gelişim yolculuğunuza başlayın
          </p>
        </div>

        <div className={`card border shadow ${darkMode ? 'bg-dark border-secondary' : 'bg-white'} rounded-3 overflow-hidden`}>
          <div className="card-body p-4">
            <div className="d-flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`flex-grow-1 btn py-2 rounded-3 ${!isSignUp ? 'btn-primary' : darkMode ? 'btn-outline-secondary' : 'btn-outline-secondary'}`}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`flex-grow-1 btn py-2 rounded-3 ${isSignUp ? 'btn-primary' : darkMode ? 'btn-outline-secondary' : 'btn-outline-secondary'}`}
              >
                Kayıt Ol
              </button>
            </div>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {isSignUp && (
                <div>
                  <label className={`form-label small fw-medium ${labelClass}`}>Ad Soyad</label>
                  <div className={`position-relative d-flex align-items-center ${inputWrapperClass}`}>
                    <span className="position-absolute d-flex align-items-center justify-content-center start-0 top-0 bottom-0 ps-3 pe-0" style={{ width: 44 }} aria-hidden>
                      <UserPlus className={darkMode ? 'text-secondary' : 'text-muted'} size={20} />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className={`${inputClass} ps-5`}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`form-label small fw-medium ${labelClass}`}>E-posta</label>
                <div className={`position-relative d-flex align-items-center ${inputWrapperClass}`}>
                  <span className="position-absolute d-flex align-items-center justify-content-center start-0 top-0 bottom-0 ps-3 pe-0" style={{ width: 44 }} aria-hidden>
                    <Mail className={darkMode ? 'text-secondary' : 'text-muted'} size={20} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className={`${inputClass} ps-5`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`form-label small fw-medium ${labelClass}`}>Şifre</label>
                <div className={`position-relative d-flex align-items-center ${inputWrapperClass}`}>
                  <span className="position-absolute d-flex align-items-center justify-content-center start-0 top-0 bottom-0 ps-3 pe-0" style={{ width: 44 }} aria-hidden>
                    <Lock className={darkMode ? 'text-secondary' : 'text-muted'} size={20} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} ps-5`}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary py-2 rounded-3 fw-medium">
                {isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}
              </button>
            </form>

            {!isSignUp && (
              <div className={`mt-4 p-3 rounded-3 ${darkMode ? 'bg-primary bg-opacity-25' : 'bg-primary bg-opacity-10'}`}>
                <p className={`small fw-medium mb-1 ${darkMode ? 'text-primary' : 'text-primary'}`}>
                  Demo Hesapları:
                </p>
                <ul className={`small mb-0 ps-3 ${darkMode ? 'text-primary' : 'text-primary'}`}>
                  <li>ayse@example.com - Ayşe Yılmaz</li>
                  <li>mehmet@example.com - Mehmet Kaya</li>
                  <li>zeynep@example.com - Zeynep Demir</li>
                  <li>can@example.com - Can Özkan</li>
                </ul>
                <p className={`small mt-2 mb-0 opacity-75 ${darkMode ? 'text-primary' : 'text-primary'}`}>
                  (Herhangi bir şifre ile giriş yapabilirsiniz)
                </p>
              </div>
            )}
          </div>
        </div>

        <p className={`text-center small mt-4 mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`}>
          {isSignUp ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?'}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="btn btn-link btn-sm p-0 text-primary text-decoration-none fw-medium border-0 bg-transparent"
          >
            {isSignUp ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </p>
      </div>
    </div>
  );
}
