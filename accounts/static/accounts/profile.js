// ---------- MOCK DATA (sen burayı API'den de doldurabilirsin) ----------
const currentUser = {
  id: "u1",
  name: "Ayşe Yılmaz",
  title: "Bilgisayar Mühendisliği Öğrencisi",
};

const experiences = [
  { id: "e1", userId: "u1", title: "Limit ve Süreklilik Çalışma Deneyimi", resources: 3, grade: "AA", likes: 24 },
  { id: "e2", userId: "u1", title: "Binary Search Tree Implementation", resources: 3, grade: "AA", likes: 28 },
];

let projects = [
  {
    id: "p1",
    title: "Öğrenci Yönetim Sistemi",
    description: "Web tabanlı öğrenci bilgilerini yönetebilen bir sistem",
    date: "2024-01",
    problem:
      "Üniversite öğrencilerinin ders kayıtları ve not bilgilerini manuel takip etmek zaman alıcı ve hata yapılmasına açıktı. Bu sistem sayesinde tüm işlemler dijital ortamda hızlı ve güvenli şekilde gerçekleştiriliyor.",
  },
  {
    id: "p2",
    title: "Hava Durumu Analiz Uygulaması",
    description: "Gerçek zamanlı hava durumu verilerini analiz eden mobil uygulama",
    date: "2023-12",
    problem:
      "Tarım yapan aileler için günlük hava durumu takibi kritikti. Uygulama, hava durumu tahminlerini basit ve anlaşılır şekilde sunarak tarım planlamasına yardımcı oluyor.",
  },
  {
    id: "p3",
    title: "Kişisel Finans Takip Platformu",
    description: "Gelir ve giderleri kategorize eden bütçe yönetim aracı",
    date: "2024-02",
    problem:
      "Üniversite öğrencilerinin sınırlı bütçeyi yönetmesi zordu. Platform, harcamaları görselleştirerek tasarruf fırsatlarını gösteriyor ve finansal farkındalık yaratıyor.",
  },
];

// ---------- HELPERS ----------
const $ = (sel) => document.querySelector(sel);

function formatMonthTR(ym) {
  // ym: "2024-01"
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
}

function sumLikes(list) {
  return list.reduce((s, x) => s + (x.likes || 0), 0);
}

// ---------- RENDER ----------
function renderHeaderStats() {
  $("#userName").textContent = currentUser.name;
  $("#navUserName").textContent = currentUser.name;

  $("#statExp").textContent = String(experiences.filter(e => e.userId === currentUser.id).length);
  $("#statLikes").textContent = String(sumLikes(experiences.filter(e => e.userId === currentUser.id)));
  $("#statProjects").textContent = String(projects.length);
}

function renderExperiences() {
  const my = experiences.filter(e => e.userId === currentUser.id);
  const wrap = $("#experienceList");
  wrap.innerHTML = "";

  my.forEach(exp => {
    const el = document.createElement("div");
    el.className = "exp";
    el.innerHTML = `
      <div>
        <div class="exp__title">${exp.title}</div>
        <div class="exp__meta">
          ${exp.resources} kaynak kullanıldı
          ${exp.grade ? ` • <b>Not:</b> ${exp.grade}` : ""}
        </div>
      </div>
      <div class="exp__likes">
        <span>${exp.likes}</span>
        <span class="heart">❤</span>
      </div>
    `;
    wrap.appendChild(el);
  });
}

function renderProjects() {
  const wrap = $("#projectList");
  wrap.innerHTML = "";

  projects.forEach(p => {
    const el = document.createElement("article");
    el.className = "project";
    el.innerHTML = `
      <div class="project__top">
        <div class="project__left">
          <div class="picon" aria-hidden="true">🧳</div>
          <div>
            <h3 class="ptitle">${p.title}</h3>
            <p class="pdesc">${p.description}</p>
          </div>
        </div>

        <div class="pdate" title="Tarih">
          <span aria-hidden="true">🗓️</span>
          <span>${formatMonthTR(p.date)}</span>
        </div>
      </div>

      <div class="problem">
        <div class="problem__head">
          <span class="problem__dot" aria-hidden="true">◎</span>
          <span>Çözülen Problem:</span>
        </div>
        <p class="problem__text">${p.problem}</p>
      </div>
    `;
    wrap.appendChild(el);
  });
}

function renderAll() {
  renderHeaderStats();
  renderExperiences();
  renderProjects();
  $("#year").textContent = new Date().getFullYear();
}

// ---------- MODAL ----------
const modal = $("#modal");
const openModalBtn = $("#openModalBtn");
const closeModalBtn = $("#closeModalBtn");
const cancelBtn = $("#cancelBtn");
const overlay = $("#modalOverlay");
const form = $("#projectForm");

function openModal(){
  modal.classList.remove("hidden");
  // default month = current month
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
  form.elements["date"].value = ym;
  form.elements["title"].focus();
}
function closeModal(){
  modal.classList.add("hidden");
  form.reset();
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const newProject = {
    id: String(Date.now()),
    title: String(fd.get("title") || "").trim(),
    description: String(fd.get("description") || "").trim(),
    problem: String(fd.get("problem") || "").trim(),
    date: String(fd.get("date") || "").trim(),
  };

  projects = [newProject, ...projects];
  closeModal();
  renderAll();
});

// ---------- INIT ----------
renderAll();