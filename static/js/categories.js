function normalize(str) {
  return (str || "")
    .toString()
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function setSelectedCard(selected, cards) {
  cards.forEach((c) => c.classList.toggle("isSelected", c === selected));
}

function fillDetail(panel, data) {
  panel.querySelector("#detailCode").textContent = data.code || "";
  panel.querySelector("#detailTitle").textContent = data.title || "";
  panel.querySelector("#detailDesc").textContent = data.desc || "";
  panel.querySelector("#detailExperiences").textContent = String(
    data.experiences ?? 0
  );
  panel.querySelector("#detailLikes").textContent = String(data.likes ?? 0);
}

function showDetail(panel) {
  panel.classList.remove("isHidden");
}

function hideDetail(panel) {
  panel.classList.add("isHidden");
}

function cardData(card) {
  return {
    title: card.dataset.title || "",
    code: card.dataset.code || "",
    desc: card.dataset.desc || "",
    experiences: Number(card.dataset.experiences || 0),
    likes: Number(card.dataset.likes || 0),
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("categorySearch");
  const grid = document.getElementById("categoriesGrid");
  const detailPanel = document.getElementById("detailPanel");
  const closeBtn = document.getElementById("detailClose");

  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".card"));

  const onCardActivate = (card) => {
    const code = card.dataset.code;
    if (code) {
      window.location.href = `/categories/${encodeURIComponent(code)}/`;
      return;
    }

    if (!detailPanel) return;
    setSelectedCard(card, cards);
    fillDetail(detailPanel, cardData(card));
    showDetail(detailPanel);
    detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => onCardActivate(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onCardActivate(card);
      }
    });
  });

  closeBtn?.addEventListener("click", () => {
    if (!detailPanel) return;
    hideDetail(detailPanel);
    setSelectedCard(null, cards);
  });

  const applyFilter = (value) => {
    const q = normalize(value);

    cards.forEach((card) => {
      const hay = normalize(`${card.dataset.title || ""} ${card.dataset.code || ""}`);
      const match = q.length === 0 || hay.includes(q);
      card.style.display = match ? "" : "none";
    });

    if (detailPanel && !detailPanel.classList.contains("isHidden")) {
      const selected = cards.find((c) => c.classList.contains("isSelected"));
      if (selected && selected.style.display === "none") {
        hideDetail(detailPanel);
        setSelectedCard(null, cards);
      }
    }
  };

  searchInput?.addEventListener("input", (e) => {
    applyFilter(e.target.value);
  });

  if (detailPanel) {
    const first = cards[0];
    if (first) {
      setSelectedCard(first, cards);
      fillDetail(detailPanel, cardData(first));
      showDetail(detailPanel);
    }
  }
});

