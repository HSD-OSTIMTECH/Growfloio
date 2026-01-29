import { useState } from "react";
import {
  Calendar,
  BookOpen,
  User,
  TrendingUp,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { Dashboard } from "./components/Dashboard";
import { Agenda } from "./components/Agenda";
import { Categories } from "./components/Categories";
import { Profile } from "./components/Profile";
import { CategoryDetail } from "./components/CategoryDetail";
import { Login } from "./components/Login";
import { Footer } from "./components/Footer";

export type View =
  | "dashboard"
  | "agenda"
  | "categories"
  | "profile"
  | "category-detail";

export interface Category {
  id: string;
  name: string;
  code: string;
  color: string;
  description: string;
}

export interface Experience {
  id: string;
  categoryId: string;
  userId: string;
  userName: string;
  title: string;
  resources: string[];
  notes: string;
  grade?: string;
  date: string;
  likes: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  date: string;
}

export interface AgendaItem {
  id: string;
  date: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface UserData {
  id: string;
  name: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (view !== "category-detail") {
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView("category-detail");
    setMobileMenuOpen(false);
  };

  const handleLogin = (userName: string, userId: string) => {
    setCurrentUser({ id: userId, name: userName });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("dashboard");
  };

  if (!currentUser) {
    return (
      <Login
        onLogin={handleLogin}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  const navBtnClass = (active: boolean) =>
    active
      ? "btn btn-primary w-100 w-lg-auto justify-content-center"
      : darkMode
        ? "btn btn-link text-light text-decoration-none w-100 w-lg-auto justify-content-center"
        : "btn btn-link text-dark text-decoration-none w-100 w-lg-auto justify-content-center";

  const navLinks = (
    <>
      <button
        type="button"
        onClick={() => handleViewChange("dashboard")}
        className={`d-flex align-items-center justify-content-center justify-content-lg-start gap-2 px-3 py-2 py-lg-2 rounded-3 border-0 ${navBtnClass(currentView === "dashboard")}`}
      >
        <TrendingUp style={{ width: 16, height: 16 }} />
        <span>Ana Sayfa</span>
      </button>
      <button
        type="button"
        onClick={() => handleViewChange("agenda")}
        className={`d-flex align-items-center justify-content-center justify-content-lg-start gap-2 px-3 py-2 py-lg-2 rounded-3 border-0 ${navBtnClass(currentView === "agenda")}`}
      >
        <Calendar style={{ width: 16, height: 16 }} />
        <span>Ajanda</span>
      </button>
      <button
        type="button"
        onClick={() => handleViewChange("categories")}
        className={`d-flex align-items-center justify-content-center justify-content-lg-start gap-2 px-3 py-2 py-lg-2 rounded-3 border-0 ${navBtnClass(currentView === "categories" || currentView === "category-detail")}`}
      >
        <BookOpen style={{ width: 16, height: 16 }} />
        <span>Kategoriler</span>
      </button>
      <button
        type="button"
        onClick={() => handleViewChange("profile")}
        className={`d-flex align-items-center justify-content-center justify-content-lg-start gap-2 px-3 py-2 py-lg-2 rounded-3 border-0 ${navBtnClass(currentView === "profile")}`}
      >
        <User style={{ width: 16, height: 16 }} />
        <span>Profil</span>
      </button>
    </>
  );

  return (
    <div
      className={`min-vh-100 overflow-x-hidden ${darkMode ? "bg-dark" : "bg-light"}`}
      data-bs-theme={darkMode ? "dark" : "light"}
    >
      {/* Header - responsive: hamburger + offcanvas on mobile, inline nav on desktop */}
      <header className={`${darkMode ? "bg-dark border-secondary" : "bg-white border-bottom"} border-bottom sticky-top z-50`}>
        <div className="container container-xl px-3 px-sm-4">
          <div className="d-flex align-items-center justify-content-between py-2 py-md-3">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40 }}>
                <TrendingUp className="text-white" style={{ width: 24, height: 24 }} />
              </div>
              <h1 className={`h5 mb-0 fw-semibold text-nowrap overflow-hidden text-truncate ${darkMode ? "text-white" : "text-dark"}`} style={{ maxWidth: "calc(100vw - 180px)" }}>
                Growfolio
              </h1>
            </div>

            {/* Desktop nav */}
            <nav className="d-none d-lg-flex align-items-center gap-1 flex-wrap">
              {navLinks}
              <div className={`d-flex align-items-center gap-2 ms-3 ps-3 border-start ${darkMode ? "border-secondary" : "border-dark"}`}>
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`btn btn-sm ${darkMode ? "btn-outline-light" : "btn-outline-dark"} rounded-3`}
                  title={darkMode ? "Açık Mod" : "Gece Modu"}
                >
                  <Sun style={{ width: 16, height: 16 }} className={darkMode ? "" : "d-none"} />
                  <Moon style={{ width: 16, height: 16 }} className={darkMode ? "d-none" : ""} />
                </button>
                <span className={`small text-nowrap overflow-hidden text-truncate ${darkMode ? "text-light" : "text-body"}`} style={{ maxWidth: 100 }}>
                  {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`btn btn-sm ${darkMode ? "btn-outline-light" : "btn-outline-secondary"} rounded-3`}
                >
                  <LogOut style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </nav>

            {/* Mobile: hamburger + user/logout */}
            <div className="d-flex d-lg-none align-items-center gap-2">
              <span className={`small text-nowrap overflow-hidden text-truncate ${darkMode ? "text-light" : "text-body"}`} style={{ maxWidth: 80 }}>
                {currentUser.name}
              </span>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`btn btn-sm ${darkMode ? "btn-outline-light" : "btn-outline-dark"} rounded-3 p-2`}
                title={darkMode ? "Açık Mod" : "Gece Modu"}
              >
                <Sun style={{ width: 18, height: 18 }} className={darkMode ? "" : "d-none"} />
                <Moon style={{ width: 18, height: 18 }} className={darkMode ? "d-none" : ""} />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"} rounded-3 p-2`}
                aria-label="Menüyü aç"
              >
                <Menu style={{ width: 22, height: 22 }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu offcanvas - sadece mobil */}
      <div
        className={`d-lg-none mobile-offcanvas ${mobileMenuOpen ? "show" : ""} ${darkMode ? "bg-dark text-light" : "bg-white"}`}
        style={{ width: "min(320px, 85vw)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
      >
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <h5 className="mb-0 fw-semibold">Menü</h5>
          <button
            type="button"
            className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"} rounded-3 p-2`}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Kapat"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>
        <div className="d-flex flex-column gap-1 p-3">
          {navLinks}
          <hr className="my-3" />
          <button
            type="button"
            onClick={handleLogout}
            className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-secondary"} rounded-3 d-flex align-items-center justify-content-center gap-2 px-3 py-2`}
          >
            <LogOut style={{ width: 18, height: 18 }} />
            Çıkış Yap
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className="d-lg-none mobile-offcanvas-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={(e) => { if (e.key === "Escape") setMobileMenuOpen(false); }}
          role="button"
          tabIndex={0}
          aria-label="Menüyü kapat"
        />
      )}

      {/* Main Content */}
      <main className="container container-xl px-3 px-sm-4 py-3 py-md-4">
        {currentView === "dashboard" && (
          <Dashboard
            onCategorySelect={handleCategorySelect}
            currentUser={currentUser}
            darkMode={darkMode}
          />
        )}
        {currentView === "agenda" && <Agenda darkMode={darkMode} />}
        {currentView === "categories" && (
          <Categories
            onCategorySelect={handleCategorySelect}
            darkMode={darkMode}
          />
        )}
        {currentView === "profile" && (
          <Profile currentUser={currentUser} darkMode={darkMode} />
        )}
        {currentView === "category-detail" && selectedCategory && (
          <CategoryDetail
            category={selectedCategory}
            onBack={() => handleViewChange("categories")}
            darkMode={darkMode}
          />
        )}
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
