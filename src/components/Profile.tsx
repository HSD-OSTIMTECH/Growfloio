import { useState } from 'react';
import { User, Briefcase, Plus, X, Calendar, Target } from 'lucide-react';
import { mockProjects, mockExperiences } from '../data/mockData';
import { Project, UserData } from '../App';

interface ProfileProps {
  currentUser: UserData;
  darkMode?: boolean;
}

export function Profile({ currentUser, darkMode }: ProfileProps) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const myExperiences = mockExperiences.filter(exp => exp.userId === currentUser.id);
  const totalLikes = myExperiences.reduce((sum, exp) => sum + exp.likes, 0);

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      problem: formData.get('problem') as string,
      date: formData.get('date') as string
    };
    setProjects([newProject, ...projects]);
    setShowAddForm(false);
  };

  const cardClass = darkMode ? 'bg-dark border-secondary' : 'bg-white border';
  const inputClass = darkMode ? 'form-control bg-dark border-secondary text-white' : 'form-control';

  return (
    <div className="d-flex flex-column gap-4">
      <div className="card border-0 rounded-3 bg-primary text-white overflow-hidden">
        <div className="card-body p-3 p-md-5">
          <div className="d-flex flex-column flex-md-row align-items-start gap-4">
            <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center flex-shrink-0 mx-auto mx-md-0" style={{ width: 80, height: 80 }}>
              <User className="text-white" size={40} />
            </div>
            <div className="flex-grow-1">
              <h2 className="h3 fw-semibold mb-1">{currentUser.name}</h2>
              <p className="opacity-90 mb-4">Bilgisayar Mühendisliği Öğrencisi</p>
              <div className="row g-3">
                <div className="col-12 col-sm-4">
                  <div className="bg-white bg-opacity-25 rounded-3 p-3">
                    <p className="small opacity-90 mb-0">Toplam Deneyim</p>
                    <p className="fs-4 fw-semibold mb-0">{myExperiences.length}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="bg-white bg-opacity-25 rounded-3 p-3">
                    <p className="small opacity-90 mb-0">Toplam Beğeni</p>
                    <p className="fs-4 fw-semibold mb-0">{totalLikes}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="bg-white bg-opacity-25 rounded-3 p-3">
                    <p className="small opacity-90 mb-0">Toplam Proje</p>
                    <p className="fs-4 fw-semibold mb-0">{projects.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`card border rounded-3 ${cardClass}`}>
        <div className="card-body">
          <h3 className={`h6 fw-semibold mb-4 ${darkMode ? 'text-white' : 'text-dark'}`}>Paylaştığım Deneyimler</h3>
          {myExperiences.length > 0 ? (
            <div className="d-flex flex-column gap-2">
              {myExperiences.map(exp => (
                <div key={exp.id} className={`p-3 border rounded-3 ${cardClass}`}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h4 className={`fw-medium mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>{exp.title}</h4>
                      <p className={`small mb-0 mt-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}>
                        {exp.resources.length} kaynak kullanıldı
                        {exp.grade && <span className="ms-2 text-primary fw-medium">• Not: {exp.grade}</span>}
                      </p>
                    </div>
                    <span className={`small ${darkMode ? 'text-secondary' : 'text-muted'}`}>{exp.likes} ❤️</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center py-4 mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`}>Henüz deneyim paylaşılmamış</p>
          )}
        </div>
      </div>

      <div className={`card border rounded-3 ${cardClass}`}>
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div>
              <h3 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>Projelerim</h3>
              <p className={`small mb-0 mt-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}>CV niteliğinde proje portföyünüz</p>
            </div>
            <button type="button" onClick={() => setShowAddForm(true)} className="btn btn-primary rounded-3 d-flex align-items-center gap-2">
              <Plus size={16} />
              Proje Ekle
            </button>
          </div>

          {showAddForm && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center p-3 overflow-auto" style={{ zIndex: 1050 }}>
              <div className={`card rounded-3 shadow modal-content-responsive w-100 my-4 mx-0 ${darkMode ? 'bg-dark border-secondary' : 'bg-white'}`} style={{ maxWidth: 576 }}>
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h3 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>Yeni Proje Ekle</h3>
                    <button type="button" onClick={() => setShowAddForm(false)} className={`btn btn-link p-0 ${darkMode ? 'text-secondary' : 'text-body'}`}>
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleAddProject} className="d-flex flex-column gap-3">
                    <div>
                      <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Proje Başlığı</label>
                      <input type="text" name="title" placeholder="Örn: E-Ticaret Web Uygulaması" className={inputClass} required />
                    </div>
                    <div>
                      <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Proje Açıklaması</label>
                      <textarea name="description" placeholder="Projenin ne yaptığını kısaca açıklayın..." rows={3} className={`${inputClass} resize-none`} required />
                    </div>
                    <div>
                      <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Çözülen Problem</label>
                      <textarea name="problem" placeholder="Bu proje hangi problemi çözüyor?" rows={4} className={`${inputClass} resize-none`} required />
                    </div>
                    <div>
                      <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Tamamlanma Tarihi</label>
                      <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} className={inputClass} required />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline-secondary flex-grow-1 rounded-3">İptal</button>
                      <button type="submit" className="btn btn-primary flex-grow-1 rounded-3">Ekle</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {projects.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {projects.map(project => (
                <div key={project.id} className={`card border rounded-3 ${cardClass}`}>
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className={`rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 ${darkMode ? 'bg-primary' : 'bg-primary bg-opacity-10'}`} style={{ width: 48, height: 48 }}>
                        <Briefcase className={darkMode ? 'text-white' : 'text-primary'} size={24} />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex flex-wrap align-items-start justify-content-between gap-2 mb-2">
                          <h4 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>{project.title}</h4>
                          <span className={`small d-flex align-items-center gap-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}>
                            <Calendar size={14} />
                            {new Date(project.date).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <p className={`small mb-3 ${darkMode ? 'text-secondary' : 'text-body'}`}>{project.description}</p>
                        <div className={`rounded-3 p-3 ${darkMode ? 'bg-primary bg-opacity-25' : 'bg-primary bg-opacity-10'}`}>
                          <div className="d-flex gap-2">
                            <Target className={`flex-shrink-0 mt-1 ${darkMode ? 'text-primary' : 'text-primary'}`} size={16} />
                            <div>
                              <p className={`small fw-medium mb-0 ${darkMode ? 'text-primary' : 'text-primary'}`}>Çözülen Problem:</p>
                              <p className={`small mb-0 ${darkMode ? 'text-secondary' : 'text-body'}`}>{project.problem}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <Briefcase className={`mb-3 ${darkMode ? 'text-secondary' : 'text-muted'}`} size={48} />
              <p className={`mb-4 ${darkMode ? 'text-secondary' : 'text-muted'}`}>Henüz proje eklenmemiş</p>
              <button type="button" onClick={() => setShowAddForm(true)} className="btn btn-primary rounded-3 d-inline-flex align-items-center gap-2">
                <Plus size={16} />
                İlk Projeyi Ekle
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`card border rounded-3 ${darkMode ? 'bg-info bg-opacity-25 border-info' : 'bg-info bg-opacity-10 border-info'}`}>
        <div className="card-body">
          <h3 className={`h6 fw-semibold mb-2 ${darkMode ? 'text-white' : 'text-dark'}`}>💼 Profilini Güçlendir</h3>
          <p className={`small mb-0 ${darkMode ? 'text-secondary' : 'text-body'}`}>
            Projelerinizi düzenli olarak güncelleyerek profesyonel bir portföy oluşturabilirsiniz.
            Deneyimlerinizi paylaşarak hem kendinize hem de topluluk için değerli bir kaynak oluşturmuş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
}
