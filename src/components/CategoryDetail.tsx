import { useState } from 'react';
import { ArrowLeft, Heart, Plus, X, Book } from 'lucide-react';
import { mockExperiences } from '../data/mockData';
import { Category, Experience } from '../App';

interface CategoryDetailProps {
  category: Category;
  onBack: () => void;
  darkMode?: boolean;
}

const colorMap: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  blue: { bg: 'bg-primary bg-opacity-10', text: 'text-primary', darkBg: 'bg-primary', darkText: 'text-white' },
  purple: { bg: 'bg-info bg-opacity-10', text: 'text-info', darkBg: 'bg-info', darkText: 'text-white' },
  green: { bg: 'bg-success bg-opacity-10', text: 'text-success', darkBg: 'bg-success', darkText: 'text-white' },
  orange: { bg: 'bg-warning bg-opacity-10', text: 'text-warning', darkBg: 'bg-warning', darkText: 'text-dark' },
  pink: { bg: 'bg-danger bg-opacity-10', text: 'text-danger', darkBg: 'bg-danger', darkText: 'text-white' },
};

export function CategoryDetail({ category, onBack, darkMode }: CategoryDetailProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    mockExperiences.filter(exp => exp.categoryId === category.id)
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const colors = colorMap[category.color] || colorMap.blue;

  const handleLike = (id: string) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, likes: exp.likes + 1 } : exp
    ));
  };

  const handleAddExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const resourcesText = formData.get('resources') as string;
    const resources = resourcesText.split('\n').filter(r => r.trim());
    const newExperience: Experience = {
      id: Date.now().toString(),
      categoryId: category.id,
      userId: 'currentUser',
      userName: 'Ben',
      title: formData.get('title') as string,
      resources,
      notes: formData.get('notes') as string,
      grade: formData.get('grade') as string || undefined,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    setExperiences([newExperience, ...experiences]);
    setShowAddForm(false);
  };

  const inputClass = darkMode ? 'form-control bg-dark border-secondary text-white' : 'form-control';
  const cardClass = darkMode ? 'bg-dark border-secondary' : 'bg-white border';

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <button type="button" onClick={onBack} className={`btn btn-link p-0 d-inline-flex align-items-center gap-2 text-decoration-none mb-3 ${darkMode ? 'text-secondary' : 'text-body'}`}>
          <ArrowLeft size={16} />
          Kategorilere Dön
        </button>

          <div className={`card border rounded-3 ${darkMode ? `${colors.darkBg} bg-opacity-25` : colors.bg}`}>
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3">
              <div>
                <span className={`badge rounded-pill mb-2 ${darkMode ? colors.darkBg : colors.bg} ${darkMode ? colors.darkText : colors.text}`}>
                  {category.code}
                </span>
                <h2 className={`h4 fw-semibold mb-1 ${darkMode ? 'text-white' : 'text-dark'}`}>{category.name}</h2>
                <p className={`small mb-0 mt-2 ${darkMode ? 'text-secondary' : 'text-muted'}`}>{category.description}</p>
              </div>
              <button type="button" onClick={() => setShowAddForm(true)} className="btn btn-primary rounded-3 d-flex align-items-center gap-2 flex-shrink-0">
                <Plus size={16} />
                Deneyim Paylaş
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center p-3 overflow-auto" style={{ zIndex: 1050 }}>
          <div className={`card rounded-3 shadow modal-content-responsive ${darkMode ? 'bg-dark border-secondary' : 'bg-white'} w-100 my-4 mx-0`} style={{ maxWidth: 576 }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>Yeni Deneyim Paylaş</h3>
                <button type="button" onClick={() => setShowAddForm(false)} className={`btn btn-link p-0 ${darkMode ? 'text-secondary' : 'text-body'}`}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddExperience} className="d-flex flex-column gap-3">
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Başlık</label>
                  <input type="text" name="title" placeholder="Örn: Türev Konusu Çalışma Deneyimim" className={inputClass} required />
                </div>
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Kullandığım Kaynaklar (Her satıra bir kaynak)</label>
                  <textarea name="resources" placeholder="Örn:&#10;Thomas Calculus Kitabı&#10;Khan Academy" rows={4} className={`${inputClass} resize-none`} required />
                </div>
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Deneyimlerim ve Notlarım</label>
                  <textarea name="notes" placeholder="Çalışma sürecinizi paylaşın..." rows={6} className={`${inputClass} resize-none`} required />
                </div>
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Aldığım Not (Opsiyonel)</label>
                  <input type="text" name="grade" placeholder="Örn: AA, BA, 95" className={inputClass} />
                </div>
                <div className="d-flex gap-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline-secondary flex-grow-1 rounded-3">İptal</button>
                  <button type="submit" className="btn btn-primary flex-grow-1 rounded-3">Paylaş</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className={`h6 fw-semibold mb-3 ${darkMode ? 'text-white' : 'text-dark'}`}>Paylaşılan Deneyimler ({experiences.length})</h3>
        {experiences.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {experiences.map(exp => (
              <div key={exp.id} className={`card border rounded-3 ${cardClass}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h4 className={`h6 fw-semibold mb-1 ${darkMode ? 'text-white' : 'text-dark'}`}>{exp.title}</h4>
                      <div className="d-flex align-items-center gap-2 small flex-wrap">
                        <span className={darkMode ? 'text-secondary' : 'text-muted'}>Paylaşan: {exp.userName}</span>
                        <span className={darkMode ? 'text-secondary' : 'text-muted'}>{new Date(exp.date).toLocaleDateString('tr-TR')}</span>
                        {exp.grade && <span className="text-primary fw-medium">Not: {exp.grade}</span>}
                      </div>
                    </div>
                    <button type="button" onClick={() => handleLike(exp.id)} className="btn btn-link btn-sm p-0 text-danger text-decoration-none d-flex align-items-center gap-1">
                      <Heart size={16} fill="currentColor" />
                      <span className={darkMode ? 'text-light' : 'text-body'}>{exp.likes}</span>
                    </button>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-2 mb-1 small fw-medium">
                      <Book size={16} className={darkMode ? 'text-secondary' : 'text-muted'} />
                      <span className={darkMode ? 'text-light' : 'text-body'}>Kullanılan Kaynaklar:</span>
                    </div>
                    <ul className="list-unstyled small mb-0 ps-3">
                      {exp.resources.map((resource, idx) => (
                        <li key={idx} className={darkMode ? 'text-secondary' : 'text-muted'}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={`rounded-3 p-3 ${darkMode ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <p className={`small mb-0 lh-base whitespace-pre-line ${darkMode ? 'text-secondary' : 'text-body'}`}>{exp.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`card border rounded-3 ${cardClass} text-center`}>
            <div className="card-body py-5">
              <p className={`mb-4 ${darkMode ? 'text-secondary' : 'text-muted'}`}>Bu kategoride henüz deneyim paylaşılmamış.</p>
              <button type="button" onClick={() => setShowAddForm(true)} className="btn btn-primary rounded-3 d-inline-flex align-items-center gap-2">
                <Plus size={16} />
                İlk Deneyimi Paylaş
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
