import { BookOpen, TrendingUp, Users } from 'lucide-react';
import { mockCategories, mockExperiences } from '../data/mockData';
import { Category } from '../App';

interface CategoriesProps {
  onCategorySelect: (category: Category) => void;
  darkMode?: boolean;
}

const colorMap: Record<string, { bg: string; text: string; border: string; darkBg: string; darkText: string; darkBorder: string }> = {
  blue: { bg: 'bg-primary bg-opacity-10', text: 'text-primary', border: 'border-primary', darkBg: 'bg-primary', darkText: 'text-white', darkBorder: 'border-primary' },
  purple: { bg: 'bg-info bg-opacity-10', text: 'text-info', border: 'border-info', darkBg: 'bg-info', darkText: 'text-white', darkBorder: 'border-info' },
  green: { bg: 'bg-success bg-opacity-10', text: 'text-success', border: 'border-success', darkBg: 'bg-success', darkText: 'text-white', darkBorder: 'border-success' },
  orange: { bg: 'bg-warning bg-opacity-10', text: 'text-warning', border: 'border-warning', darkBg: 'bg-warning', darkText: 'text-dark', darkBorder: 'border-warning' },
  pink: { bg: 'bg-danger bg-opacity-10', text: 'text-danger', border: 'border-danger', darkBg: 'bg-danger', darkText: 'text-white', darkBorder: 'border-danger' },
};

export function Categories({ onCategorySelect, darkMode }: CategoriesProps) {
  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h2 className={`h4 fw-semibold mb-0 text-break ${darkMode ? 'text-white' : 'text-dark'}`}>Kategoriler</h2>
        <p className={`small mb-0 mt-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}>Ders ve konularınızı keşfedin</p>
      </div>

      <div className="row g-4">
        {mockCategories.map(category => {
          const colors = colorMap[category.color] || colorMap.blue;
          const categoryExperiences = mockExperiences.filter(exp => exp.categoryId === category.id);
          const totalLikes = categoryExperiences.reduce((sum, exp) => sum + exp.likes, 0);
          const cardClass = darkMode ? `${colors.darkBg} bg-opacity-25 border ${colors.darkBorder}` : `${colors.bg} border ${colors.border}`;
          return (
            <div key={category.id} className="col-12 col-md-6 col-lg-4">
              <div
                role="button"
                tabIndex={0}
                onClick={() => onCategorySelect(category)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCategorySelect(category); } }}
                className={`card card-hover h-100 rounded-3 border ${cardClass} cursor-pointer`}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className={`rounded-3 d-flex align-items-center justify-content-center ${darkMode ? colors.darkBg : colors.bg} border ${darkMode ? colors.darkBorder : colors.border}`} style={{ width: 48, height: 48 }}>
                      <BookOpen className={darkMode ? colors.darkText : colors.text} size={24} />
                    </div>
                    <span className={`badge rounded-pill ${darkMode ? colors.darkBg : colors.bg} ${darkMode ? colors.darkText : colors.text}`}>
                      {category.code}
                    </span>
                  </div>
                  <h3 className={`h6 fw-semibold mb-2 ${darkMode ? colors.darkText : colors.text}`}>
                    {category.name}
                  </h3>
                  <p className={`small mb-4 ${darkMode ? 'text-secondary' : 'text-muted'}`}>
                    {category.description}
                  </p>
                  <div className={`d-flex align-items-center gap-3 pt-3 border-top ${darkMode ? 'border-secondary' : ''}`}>
                    <div className={`d-flex align-items-center gap-1 small ${darkMode ? 'text-secondary' : 'text-muted'}`}>
                      <TrendingUp size={16} />
                      <span>{categoryExperiences.length} deneyim</span>
                    </div>
                    <div className={`d-flex align-items-center gap-1 small ${darkMode ? 'text-secondary' : 'text-muted'}`}>
                      <Users size={16} />
                      <span>{totalLikes} beğeni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`card border rounded-3 ${darkMode ? 'bg-primary bg-opacity-25 border-primary' : 'bg-primary bg-opacity-10 border-primary'}`}>
        <div className="card-body">
          <h3 className={`h6 fw-semibold mb-2 ${darkMode ? 'text-white' : 'text-dark'}`}>💡 İpucu</h3>
          <p className={`small mb-0 ${darkMode ? 'text-secondary' : 'text-body'}`}>
            Herhangi bir kategoriye tıklayarak o kategorideki tüm deneyimleri görüntüleyebilir ve
            kendi deneyimlerinizi paylaşabilirsiniz. Diğer kullanıcıların başarı hikayelerinden
            ilham alın!
          </p>
        </div>
      </div>
    </div>
  );
}
