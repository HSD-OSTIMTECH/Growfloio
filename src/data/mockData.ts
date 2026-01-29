import { Category, Experience, Project, AgendaItem } from '../App';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Matematik I',
    code: 'MAT101',
    color: 'blue',
    description: 'Temel matematik kavramları ve analiz'
  },
  {
    id: '2',
    name: 'Fizik I',
    code: 'FIZ101',
    color: 'purple',
    description: 'Klasik mekanik ve dinamik'
  },
  {
    id: '3',
    name: 'Programlama',
    code: 'BIL102',
    color: 'green',
    description: 'Python ile programlama temelleri'
  },
  {
    id: '4',
    name: 'Veri Yapıları',
    code: 'BIL201',
    color: 'orange',
    description: 'Algoritmalar ve veri yapıları'
  },
  {
    id: '5',
    name: 'İngilizce',
    code: 'ING101',
    color: 'pink',
    description: 'Akademik İngilizce'
  }
];

export const mockExperiences: Experience[] = [
  {
    id: '1',
    categoryId: '1',
    userId: 'user1',
    userName: 'Ayşe Yılmaz',
    title: 'Limit ve Süreklilik Çalışma Deneyimi',
    resources: ['Thomas Calculus Kitabı', 'Khan Academy', 'MIT OpenCourseWare'],
    notes: 'Limit konusunda başlangıçta zorlandım ama Khan Academy videoları çok yardımcı oldu. Özellikle epsilon-delta tanımını anlamak için MIT derslerini izledim. Pratik sorular için Thomas kitabı mükemmel.',
    grade: 'AA',
    date: '2024-01-15',
    likes: 24
  },
  {
    id: '2',
    categoryId: '1',
    userId: 'user2',
    userName: 'Mehmet Kaya',
    title: 'Türev Konusu Çalışma Yöntemi',
    resources: ['Stewart Calculus', 'YouTube - 3Blue1Brown', 'Calculus Made Easy Kitabı'],
    notes: 'Türev kurallarını ezberlemek yerine görsel olarak anlamaya çalıştım. 3Blue1Brown kanalı bu konuda harikaydı. Stewart kitabındaki örnekleri çözdükten sonra kendimi çok daha rahat hissettim.',
    grade: 'BA',
    date: '2024-01-20',
    likes: 18
  },
  {
    id: '3',
    categoryId: '3',
    userId: 'user3',
    userName: 'Zeynep Demir',
    title: 'Python ile Proje Geliştirme Süreci',
    resources: ['Python Crash Course', 'Real Python', 'Stack Overflow', 'GitHub Repositories'],
    notes: 'İlk Python projemi geliştirirken çok hata yaptım ama her hata bir öğrenme fırsatıydı. Real Python sitesindeki best practices rehberleri ve GitHub\'daki açık kaynak projeleri incelemek çok faydalı oldu.',
    grade: 'AA',
    date: '2024-02-01',
    likes: 32
  },
  {
    id: '4',
    categoryId: '2',
    userId: 'user4',
    userName: 'Can Özkan',
    title: 'Dinamik ve Hareket Denklemleri',
    resources: ['Halliday & Resnick', 'Walter Lewin MIT Dersleri', 'PhET Simulations'],
    notes: 'Fizik konularını anlamak için önce simülasyonlarla deneyler yaptım. PhET simülasyonları çok interaktif. Sonra Walter Lewin\'in derslerini izleyince konular oturdu. Kitaptaki problemleri düzenli çözmek önemliyorum.',
    grade: 'AB',
    date: '2024-01-28',
    likes: 15
  },
  {
    id: '5',
    categoryId: '4',
    userId: 'user1',
    userName: 'Ayşe Yılmaz',
    title: 'Binary Search Tree Implementation',
    resources: ['Introduction to Algorithms (CLRS)', 'GeeksforGeeks', 'LeetCode'],
    notes: 'BST\'yi implement ederken recursion mantığını oturtmak önemliydi. CLRS kitabı teorik temeli çok iyi veriyor. LeetCode\'da pratik yaparak farklı edge case\'leri öğrendim.',
    grade: 'AA',
    date: '2024-02-10',
    likes: 28
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Öğrenci Yönetim Sistemi',
    description: 'Web tabanlı öğrenci bilgilerini yönetebilen bir sistem',
    problem: 'Üniversite öğrencilerinin ders kayıtları ve not bilgilerini manuel takip etmek zaman alıcı ve hata yapılmasına açıktı. Bu sistem sayesinde tüm işlemler dijital ortamda hızlı ve güvenli şekilde gerçekleştiriliyor.',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Hava Durumu Analiz Uygulaması',
    description: 'Gerçek zamanlı hava durumu verilerini analiz eden mobil uygulama',
    problem: 'Tarım yapan aileler için günlük hava durumu takibi kritikti. Uygulama, hava durumu tahminlerini basit ve anlaşılır şekilde sunarak tarım planlamasına yardımcı oluyor.',
    date: '2023-12-20'
  },
  {
    id: '3',
    title: 'Kişisel Finans Takip Platformu',
    description: 'Gelir ve giderleri kategorize eden bütçe yönetim aracı',
    problem: 'Üniversite öğrencilerinin sınırlı bütçeyi yönetmesi zordu. Platform, harcamaları görselleştirerek tasarruf fırsatlarını gösteriyor ve finansal farkındalık yaratıyor.',
    date: '2024-02-05'
  }
];

export const mockAgendaItems: AgendaItem[] = [
  {
    id: '1',
    date: '2024-01-24',
    categoryId: '1',
    categoryName: 'MAT101',
    title: 'İntegral konusu tekrar',
    description: 'Belirsiz ve belirli integraller üzerinden 20 soru çöz',
    completed: false
  },
  {
    id: '2',
    date: '2024-01-24',
    categoryId: '3',
    categoryName: 'BIL102',
    title: 'Python projesi: Todo uygulaması',
    description: 'Class kullanarak basit bir todo list uygulaması yap',
    completed: true
  },
  {
    id: '3',
    date: '2024-01-25',
    categoryId: '2',
    categoryName: 'FIZ101',
    title: 'Dinamik problemleri',
    description: 'Ders notlarındaki 15 dinamik problemini çöz',
    completed: false
  },
  {
    id: '4',
    date: '2024-01-25',
    categoryId: '4',
    categoryName: 'BIL201',
    title: 'Graph algoritmaları oku',
    description: 'DFS ve BFS algoritmalarını çalış, kod örneklerini incele',
    completed: false
  },
  {
    id: '5',
    date: '2024-01-26',
    categoryId: '5',
    categoryName: 'ING101',
    title: 'Academic Writing practice',
    description: 'Bir essay yaz ve peer review yap',
    completed: false
  },
  {
    id: '6',
    date: '2024-01-26',
    categoryId: '1',
    categoryName: 'MAT101',
    title: 'Seri konusu çalış',
    description: 'Yakınsama testlerini öğren ve örnekleri çöz',
    completed: false
  },
  {
    id: '7',
    date: '2024-01-23',
    categoryId: '3',
    categoryName: 'BIL102',
    title: 'Exception handling',
    description: 'Try-except yapılarını öğren ve örnek kodlar yaz',
    completed: true
  }
];
