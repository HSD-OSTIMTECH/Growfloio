import { useState } from 'react';
import { Calendar, Plus, Check, X, List, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { mockAgendaItems, mockCategories } from '../data/mockData';
import { AgendaItem } from '../App';

type ViewMode = 'list' | 'calendar';

interface AgendaProps {
  darkMode?: boolean;
}

export function Agenda({ darkMode }: AgendaProps) {
  const [items, setItems] = useState<AgendaItem[]>(mockAgendaItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-01-24');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1));
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, AgendaItem[]>);

  const sortedDates = Object.keys(groupedItems).sort();

  const toggleComplete = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setDeleteConfirm(null);
  };

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: AgendaItem = {
      id: Date.now().toString(),
      date: formData.get('date') as string,
      categoryId: formData.get('categoryId') as string,
      categoryName: mockCategories.find(c => c.id === formData.get('categoryId'))?.code || '',
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      completed: false
    };
    setItems([...items, newItem]);
    setShowAddForm(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const firstDay = new Date(year, month, 1);
    return { daysInMonth: lastDay.getDate(), startingDayOfWeek: firstDay.getDay(), year, month };
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const getDateString = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const isToday = (dateString: string) => dateString === '2024-01-24';

  const cardClass = darkMode ? 'bg-dark border-secondary' : 'bg-white border';
  const inputClass = darkMode ? 'form-control bg-dark border-secondary text-white' : 'form-control';

  const renderCalendarView = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days: React.ReactNode[] = [];
    const weekDays = ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className={`p-2 min-vh-calendar ${darkMode ? 'bg-dark' : 'bg-light'}`} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = getDateString(year, month, day);
      const dayItems = groupedItems[dateString] || [];
      const completedCount = dayItems.filter(item => item.completed).length;
      const isTodayDate = isToday(dateString);
      const dayCellClass = isTodayDate
        ? darkMode ? 'bg-primary bg-opacity-25 border-primary' : 'bg-primary bg-opacity-10 border-primary'
        : darkMode ? 'bg-dark border-secondary' : 'bg-white border';
      days.push(
        <div key={day} className={`p-2 border min-vh-calendar ${dayCellClass}`}>
          <div className={`small fw-medium mb-1 ${isTodayDate ? 'text-primary' : darkMode ? 'text-light' : 'text-body'}`}>
            {day}{isTodayDate && <span className="ms-1 small">•</span>}
          </div>
          <div className="d-flex flex-column gap-1">
            {dayItems.slice(0, 2).map(item => (
              <div key={item.id} className={`small p-1 rounded text-truncate ${item.completed ? 'text-decoration-line-through text-muted' : darkMode ? 'bg-primary bg-opacity-25 text-primary' : 'bg-primary bg-opacity-10 text-primary'}`} title={item.title}>{item.title}</div>
            ))}
            {dayItems.length > 2 && <div className="small text-muted ps-1">+{dayItems.length - 2} daha</div>}
          </div>
          {dayItems.length > 0 && <div className={`small mt-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}>{completedCount}/{dayItems.length}</div>}
        </div>
      );
    }

    return (
      <div className={`card border rounded-3 ${cardClass}`}>
        <div className="card-body p-3 p-md-4">
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
            <h3 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>
              {currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="d-flex gap-1">
              <button type="button" onClick={() => changeMonth('prev')} className={`btn btn-sm ${darkMode ? 'btn-outline-secondary' : 'btn-outline-dark'}`}><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => changeMonth('next')} className={`btn btn-sm ${darkMode ? 'btn-outline-secondary' : 'btn-outline-dark'}`}><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="agenda-calendar-wrap">
            <div className={`agenda-calendar-grid border ${darkMode ? 'border-secondary' : 'border'}`} style={{ backgroundColor: darkMode ? 'var(--bs-dark)' : 'var(--bs-gray-200)' }}>
            {weekDays.map(day => (
              <div key={day} className={`border border-secondary p-2 text-center small fw-medium ${darkMode ? 'bg-dark text-secondary' : 'bg-light text-body'}`}>{day}</div>
            ))}
            {days}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => (
    <div className="d-flex flex-column gap-4">
      {sortedDates.map(date => {
        const dateItems = groupedItems[date];
        const completedCount = dateItems.filter(item => item.completed).length;
        const isTodayDate = isToday(date);
        const isPast = new Date(date) < new Date('2024-01-24');
        return (
          <div key={date} className={`card border rounded-3 ${cardClass}`}>
            <div className="card-body">
              <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4 gap-3">
                <div className="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
                  <div className={`rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 ${isTodayDate ? (darkMode ? 'bg-primary' : 'bg-primary bg-opacity-10') : (darkMode ? 'bg-secondary' : 'bg-light')}`} style={{ width: 48, height: 48 }}>
                    <Calendar className={isTodayDate ? 'text-primary' : (darkMode ? 'text-secondary' : 'text-muted')} size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`h6 fw-semibold mb-0 text-break ${darkMode ? 'text-white' : 'text-dark'}`}>
                      {new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {isTodayDate && <span className={`ms-2 small fw-normal ${darkMode ? 'text-primary' : 'text-primary'}`}>• Bugün</span>}
                      {isPast && <span className="ms-2 small text-muted fw-normal">• Geçmiş</span>}
                    </h3>
                    <p className={`small mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`}>{completedCount} / {dateItems.length} görev tamamlandı</p>
                  </div>
                </div>
                <div className="flex-shrink-0" style={{ width: 64, height: 64 }}>
                  <svg className="w-100 h-100" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={darkMode ? '#495057' : '#dee2e6'} strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--bs-primary)" strokeWidth="3" strokeDasharray={`${(completedCount / dateItems.length) * 100}, 100`} />
                  </svg>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                {dateItems.map(item => (
                  <div key={item.id} className={`d-flex align-items-start gap-2 p-3 rounded-3 ${item.completed ? (darkMode ? 'bg-dark' : 'bg-light') : (darkMode ? 'bg-primary bg-opacity-25' : 'bg-primary bg-opacity-10')}`}>
                    <button type="button" onClick={() => toggleComplete(item.id)} className={`mt-1 border-2 rounded flex-shrink-0 d-flex align-items-center justify-content-center ${item.completed ? 'bg-primary border-primary' : darkMode ? 'border-secondary' : 'border-secondary'}`} style={{ width: 20, height: 20 }}>
                      {item.completed && <Check size={12} className="text-white" />}
                    </button>
                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="small fw-medium text-primary">{item.categoryName}</span>
                        <span className={darkMode ? 'text-secondary' : 'text-muted'}>•</span>
                        <span className={`small ${item.completed ? 'text-decoration-line-through text-muted' : 'fw-medium'} ${darkMode ? 'text-white' : 'text-dark'}`}>{item.title}</span>
                      </div>
                      <p className={`small mb-0 mt-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}>{item.description}</p>
                    </div>
                    <button type="button" onClick={() => setDeleteConfirm(item.id)} className={`btn btn-link btn-sm p-0 flex-shrink-0 ${darkMode ? 'text-secondary' : 'text-muted'}`}><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3">
        <div>
          <h2 className={`h4 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>Ajanda</h2>
          <p className={`small mb-0 mt-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}>Gelişim planlarınızı takip edin</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className={`d-flex gap-1 rounded-3 p-1 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
            <button type="button" onClick={() => setViewMode('list')} className={`btn btn-sm rounded-2 ${viewMode === 'list' ? 'btn-primary' : (darkMode ? 'btn-link text-secondary' : 'btn-link text-body')}`}>
              <List size={16} /> <span className="small ms-1">Liste</span>
            </button>
            <button type="button" onClick={() => setViewMode('calendar')} className={`btn btn-sm rounded-2 ${viewMode === 'calendar' ? 'btn-primary' : (darkMode ? 'btn-link text-secondary' : 'btn-link text-body')}`}>
              <Calendar size={16} /> <span className="small ms-1">Takvim</span>
            </button>
          </div>
          <button type="button" onClick={() => setShowAddForm(true)} className="btn btn-primary rounded-3 d-flex align-items-center gap-2">
            <Plus size={16} /> Yeni Görev
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center p-3 overflow-auto" style={{ zIndex: 1050 }}>
          <div className={`card rounded-3 shadow modal-content-responsive w-100 mx-0 ${darkMode ? 'bg-dark border-secondary' : 'bg-white'}`} style={{ maxWidth: 448 }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>Yeni Görev Ekle</h3>
                <button type="button" onClick={() => setShowAddForm(false)} className={`btn btn-link p-0 ${darkMode ? 'text-secondary' : 'text-body'}`}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddItem} className="d-flex flex-column gap-3">
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Tarih</label>
                  <input type="date" name="date" defaultValue={selectedDate} className={inputClass} required />
                </div>
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Kategori</label>
                  <select name="categoryId" className={inputClass} required>
                    {mockCategories.map(cat => (<option key={cat.id} value={cat.id}>{cat.code} - {cat.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Başlık</label>
                  <input type="text" name="title" placeholder="Görev başlığı" className={inputClass} required />
                </div>
                <div>
                  <label className={`form-label small fw-medium ${darkMode ? 'text-light' : 'text-body'}`}>Açıklama</label>
                  <textarea name="description" placeholder="Görev detayları" rows={3} className={`${inputClass} resize-none`} required />
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

      {deleteConfirm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 1050 }}>
          <div className={`card rounded-3 shadow ${darkMode ? 'bg-dark border-secondary' : 'bg-white'}`} style={{ maxWidth: 400 }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className={`h6 fw-semibold mb-0 ${darkMode ? 'text-white' : 'text-dark'}`}>Görevi Sil</h3>
                <button type="button" onClick={() => setDeleteConfirm(null)} className={`btn btn-link p-0 ${darkMode ? 'text-secondary' : 'text-body'}`}><X size={20} /></button>
              </div>
              <p className={darkMode ? 'text-secondary' : 'text-muted mb-4'}>Bu görevi silmek istediğinize emin misiniz?</p>
              <div className="d-flex gap-2">
                <button type="button" onClick={() => setDeleteConfirm(null)} className="btn btn-outline-secondary flex-grow-1 rounded-3">İptal</button>
                <button type="button" onClick={() => deleteItem(deleteConfirm)} className="btn btn-danger flex-grow-1 rounded-3">Sil</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'list' ? renderListView() : renderCalendarView()}
    </div>
  );
}
