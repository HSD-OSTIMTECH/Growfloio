function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function nowTrDate() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}.${mm}.${yyyy}`;
}

function splitSources(text) {
  return (text || "")
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function setHidden(el, hidden) {
  el.classList.toggle("isHidden", hidden);
  el.setAttribute("aria-hidden", hidden ? "true" : "false");
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("experienceModal");
  const openBtn = document.getElementById("openExperienceModal");
  const closeBtn = document.getElementById("closeExperienceModal");
  const cancelBtn = document.getElementById("cancelExperience");
  const form = document.getElementById("experienceForm");
  const list = document.getElementById("experienceList");
  const countEl = document.getElementById("experienceCount");

  if (!overlay || !modal || !openBtn || !form || !list || !countEl) return;

  let lastActive = null;

  const open = () => {
    lastActive = document.activeElement;
    setHidden(overlay, false);
    document.body.style.overflow = "hidden";
    modal.focus();
  };

  const close = () => {
    setHidden(overlay, true);
    document.body.style.overflow = "";
    if (lastActive && typeof lastActive.focus === "function") lastActive.focus();
  };

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  cancelBtn?.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("isHidden")) return;
    if (e.key === "Escape") close();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const title = (fd.get("title") || "").toString().trim();
    const sources = splitSources((fd.get("sources") || "").toString());
    const body = (fd.get("body") || "").toString().trim();
    const note = (fd.get("note") || "").toString().trim() || "—";

    if (!title || !body) return;

    const sourcesHtml =
      sources.length === 0
        ? "<li>—</li>"
        : sources.map((s) => `<li>${escapeHtml(s)}</li>`).join("");

    const cardHtml = `
      <article class="experienceCard">
        <div class="experienceCard__top">
          <div>
            <h3 class="experienceCard__title">${escapeHtml(title)}</h3>
            <div class="experienceCard__meta">
              <span>Paylaşan: Sen</span>
              <span>·</span>
              <span>${nowTrDate()}</span>
              <span class="experienceCard__note">Not: ${escapeHtml(note)}</span>
            </div>
          </div>
          <button class="likePill" type="button" aria-label="Beğeni">
            <span class="likePill__icon" aria-hidden="true">❤</span>
            <span class="likePill__count">0</span>
          </button>
        </div>

        <div class="experienceCard__sources">
          <div class="sources__label">Kullanılan Kaynaklar:</div>
          <ul class="sources__list">
            ${sourcesHtml}
          </ul>
        </div>

        <div class="experienceCard__body">
          <div class="experienceCard__text">${escapeHtml(body)}</div>
        </div>
      </article>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = cardHtml.trim();
    const newCard = wrapper.firstElementChild;
    if (newCard) {
      const empty = list.querySelector(".emptyState");
      if (empty) empty.remove();
      list.prepend(newCard);
      countEl.textContent = String(Number(countEl.textContent || "0") + 1);
    }

    form.reset();
    close();
  });
});

