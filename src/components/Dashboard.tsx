import { TrendingUp, BookOpen, Calendar, Users, CheckCircle, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { mockCategories, mockExperiences, mockAgendaItems } from '../data/mockData';
import { Category, UserData } from '../App';

interface DashboardProps {
  onCategorySelect: (category: Category) => void;
  currentUser?: UserData;
  darkMode?: boolean;
}

const categoryColorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-primary bg-opacity-10', text: 'text-primary' },
  purple: { bg: 'bg-info bg-opacity-10', text: 'text-info' },
  green: { bg: 'bg-success bg-opacity-10', text: 'text-success' },
  orange: { bg: 'bg-warning bg-opacity-10', text: 'text-warning' },
  pink: { bg: 'bg-danger bg-opacity-10', text: 'text-danger' },
};

function getCategoryStyles(color: string) {
  const c = categoryColorClasses[color];
  if (c) return c;
  return { bg: 'bg-secondary bg-opacity-10', text: 'text-secondary' };
}

export function Dashboard({ onCategorySelect, currentUser, darkMode }: DashboardProps) {
  const todayItems = mockAgendaItems.filter(item => item.date === '2024-01-24');
  const completedToday = todayItems.filter(item => item.completed).length;
  const recentExperiences = mockExperiences.slice(0, 4);
  const myExperiences = mockExperiences.filter(exp => exp.userId === currentUser?.id);

  const upcomingItems = mockAgendaItems
    .filter(item => item.date > '2024-01-24' && !item.completed)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  const cardClass = darkMode ? 'bg-dark border-secondary' : 'bg-white border';
  const textClass = darkMode ? 'text-white' : 'text-dark';
  const mutedClass = darkMode ? 'text-secondary' : 'text-muted';

  return (
    <div className="d-flex flex-column gap-4">
      {/* Welcome Section */}
      <div className={`rounded-3 p-3 p-sm-4 p-md-5 text-white shadow ${darkMode ? 'bg-primary' : 'bg-primary'}`}>
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3">
          <div className="min-w-0 flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <Sparkles className="flex-shrink-0" style={{ width: 24, height: 24 }} />
              <h2 className="h5 h4-md h3-lg fw-semibold mb-0 text-break">{getGreeting()}, {currentUser?.name || 'Kullanıcı'}!</h2>
            </div>
            <p className="opacity-90 mb-4 small">
              Gelişim yolculuğunuzda harika gidiyorsunuz 🚀
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <div className="bg-white bg-opacity-25 backdrop-blur rounded-3 p-3">
                <p className="small opacity-90 mb-0">Bugün</p>
                <p className="fs-4 fw-semibold mb-0">{completedToday}/{todayItems.length}</p>
                <p className="small opacity-75 mb-0">görev tamamlandı</p>
              </div>
              <div className="bg-white bg-opacity-25 backdrop-blur rounded-3 p-3">
                <p className="small opacity-90 mb-0">Bu hafta</p>
                <p className="fs-4 fw-semibold mb-0">{myExperiences.length}</p>
                <p className="small opacity-75 mb-0">deneyim paylaşıldı</p>
              </div>
            </div>
          </div>
          <div className="d-none d-md-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-25" style={{ width: 128, height: 128 }}>
            <TrendingUp className="text-white" style={{ width: 64, height: 64 }} />
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className={`card card-hover h-100 border ${cardClass} rounded-3`}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between mb-2">
                <div className={`rounded-3 d-flex align-items-center justify-content-center ${darkMode ? 'bg-primary' : 'bg-primary bg-opacity-10'}`} style={{ width: 40, height: 40 }}>
                  <BookOpen className={darkMode ? 'text-white' : 'text-primary'} style={{ width: 20, height: 20 }} />
                </div>
              </div>
              <p className={`fs-4 fw-semibold mb-0 ${textClass}`}>{mockCategories.length}</p>
              <p className={`small mb-0 ${mutedClass}`}>Aktif Kategori</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className={`card card-hover h-100 border ${cardClass} rounded-3`}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between mb-2">
                <div className={`rounded-3 d-flex align-items-center justify-content-center ${darkMode ? 'bg-primary' : 'bg-primary bg-opacity-10'}`} style={{ width: 40, height: 40 }}>
                  <Calendar className={darkMode ? 'text-white' : 'text-primary'} style={{ width: 20, height: 20 }} />
                </div>
              </div>
              <p className={`fs-4 fw-semibold mb-0 ${textClass}`}>{todayItems.length}</p>
              <p className={`small mb-0 ${mutedClass}`}>Bugünkü Görev</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className={`card card-hover h-100 border ${cardClass} rounded-3`}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between mb-2">
                <div className={`rounded-3 d-flex align-items-center justify-content-center ${darkMode ? 'bg-success' : 'bg-success bg-opacity-10'}`} style={{ width: 40, height: 40 }}>
                  <TrendingUp className={darkMode ? 'text-white' : 'text-success'} style={{ width: 20, height: 20 }} />
                </div>
              </div>
              <p className={`fs-4 fw-semibold mb-0 ${textClass}`}>{mockExperiences.length}</p>
              <p className={`small mb-0 ${mutedClass}`}>Toplam Deneyim</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className={`card card-hover h-100 border ${cardClass} rounded-3`}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between mb-2">
                <div className={`rounded-3 d-flex align-items-center justify-content-center ${darkMode ? 'bg-warning' : 'bg-warning bg-opacity-10'}`} style={{ width: 40, height: 40 }}>
                  <Users className={darkMode ? 'text-dark' : 'text-dark'} style={{ width: 20, height: 20 }} />
                </div>
              </div>
              <p className={`fs-4 fw-semibold mb-0 ${textClass}`}>
                {mockExperiences.reduce((sum, exp) => sum + exp.likes, 0)}
              </p>
              <p className={`small mb-0 ${mutedClass}`}>Toplam Beğeni</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Today's Tasks */}
        <div className="col-12 col-lg-8">
          <div className={`card border ${cardClass} rounded-3 h-100`}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                  <CheckCircle className={darkMode ? 'text-primary' : 'text-primary'} style={{ width: 20, height: 20 }} />
                  <h3 className={`h6 fw-semibold mb-0 ${textClass}`}>Bugünkü Görevler</h3>
                </div>
                {todayItems.length > 0 && (
                  <span className={`small ${mutedClass}`}>
                    {completedToday}/{todayItems.length} tamamlandı
                  </span>
                )}
              </div>

              {todayItems.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {todayItems.map(item => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-3 border ${
                        item.completed
                          ? darkMode ? 'bg-dark border-secondary' : 'bg-light border'
                          : darkMode ? 'bg-primary bg-opacity-25 border-primary' : 'bg-primary bg-opacity-10 border-primary'
                      }`}
                    >
                      <div className="d-flex gap-2">
                        <div className={`rounded-2 border d-flex align-items-center justify-content-center flex-shrink-0 ${
                          item.completed ? 'bg-primary border-primary' : darkMode ? 'border-secondary' : 'border-secondary'
                        }`} style={{ width: 20, height: 20 }}>
                          {item.completed && <CheckCircle className="text-white" style={{ width: 14, height: 14 }} />}
                        </div>
                        <div className="flex-grow-1 min-w-0">
                          <span className={`badge mb-1 ${darkMode ? 'bg-primary' : 'bg-primary bg-opacity-10 text-primary'}`}>
                            {item.categoryName}
                          </span>
                          <p className={`fw-medium mb-0 small ${item.completed ? 'text-decoration-line-through text-muted' : textClass}`}>
                            {item.title}
                          </p>
                          <p className={`small mb-0 ${mutedClass}`}>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${darkMode ? 'bg-secondary' : 'bg-light'}`} style={{ width: 64, height: 64 }}>
                    <Calendar className={mutedClass} style={{ width: 32, height: 32 }} />
                  </div>
                  <p className={`mb-1 ${mutedClass}`}>Bugün için görev yok</p>
                  <p className={`small ${mutedClass}`}>Yeni görev ekleyerek planınızı oluşturun</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="col-12 col-lg-4">
          <div className={`card border ${darkMode ? 'bg-primary bg-opacity-25 border-primary' : 'bg-primary bg-opacity-10 border-primary'} rounded-3 h-100`}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Clock className={darkMode ? 'text-primary' : 'text-primary'} style={{ width: 20, height: 20 }} />
                <h3 className={`h6 fw-semibold mb-0 ${textClass}`}>Yaklaşan Görevler</h3>
              </div>

              {upcomingItems.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {upcomingItems.map(item => (
                    <div key={item.id} className={`rounded-3 p-2 border ${cardClass}`}>
                      <p className={`small fw-medium mb-0 ${darkMode ? 'text-primary' : 'text-primary'}`}>
                        {new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                      </p>
                      <p className={`small fw-medium mb-0 ${textClass}`}>{item.title}</p>
                      <p className={`small mb-0 line-clamp-2 ${mutedClass}`}>{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className={`small mb-0 ${mutedClass}`}>Yaklaşan görev yok</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Experiences */}
      <div className={`card border ${cardClass} rounded-3`}>
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div>
              <h3 className={`h6 fw-semibold mb-0 ${textClass}`}>Topluluktan Son Deneyimler</h3>
              <p className={`small mb-0 mt-1 ${mutedClass}`}>Diğer kullanıcıların paylaşımlarını keşfedin</p>
            </div>
            <button type="button" className="btn btn-link btn-sm p-0 text-primary text-decoration-none d-flex align-items-center gap-1">
              Tümünü Gör
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

          <div className="row g-3">
            {recentExperiences.map(exp => {
              const category = mockCategories.find(c => c.id === exp.categoryId);
              const styles = category ? getCategoryStyles(category.color) : getCategoryStyles('blue');
              return (
                <div
                  key={exp.id}
                  className="col-12 col-md-6"
                  role="button"
                  tabIndex={0}
                  onClick={() => category && onCategorySelect(category)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); category && onCategorySelect(category); } }}
                >
                  <div className={`card card-hover h-100 border ${cardClass} rounded-3`}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <div className={`rounded-3 d-flex align-items-center justify-content-center ${styles.bg}`} style={{ width: 32, height: 32 }}>
                            <BookOpen className={styles.text} style={{ width: 16, height: 16 }} />
                          </div>
                          <div>
                            <span className={`small ${mutedClass}`}>{category?.code}</span>
                            {exp.grade && (
                              <span className="small fw-medium ms-1 text-primary">★ {exp.grade}</span>
                            )}
                          </div>
                        </div>
                        <span className={`small ${mutedClass}`}>{exp.likes} ❤️</span>
                      </div>
                      <h4 className={`h6 fw-medium mb-1 ${textClass}`}>{exp.title}</h4>
                      <p className={`small line-clamp-2 mb-2 ${mutedClass}`}>{exp.notes}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className={`small ${mutedClass}`}>Paylaşan: {exp.userName}</span>
                        <ArrowRight className={mutedClass} style={{ width: 16, height: 16 }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Motivation Card */}
      <div className={`card border ${darkMode ? 'bg-success bg-opacity-25 border-success' : 'bg-success bg-opacity-10 border-success'} rounded-3`}>
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-start">
            <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${darkMode ? 'bg-success' : 'bg-success bg-opacity-25'}`} style={{ width: 48, height: 48 }}>
              <Sparkles className={darkMode ? 'text-white' : 'text-success'} style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h3 className={`h6 fw-semibold mb-1 ${textClass}`}>💡 Bugünün İpucu</h3>
              <p className={`small mb-0 lh-base ${mutedClass}`}>
                Düzenli deneyim paylaşımı, hem kendi öğrenme sürecinizi pekiştirir hem de topluluk için
                değerli bir kaynak oluşturur. Her gün küçük adımlarla ilerlemeye devam edin!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
