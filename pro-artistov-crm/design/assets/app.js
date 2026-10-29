// Общая оболочка: боковое меню, мобильная навигация. Страница задаёт data-page на <body>.
(function () {
  const NAV = [
    { id: "today", href: "index.html", icon: "ti-layout-dashboard", label: "Сегодня" },
    { id: "leads", href: "leads.html", icon: "ti-inbox", label: "Заявки", count: 7 },
    { id: "students", href: "students.html", icon: "ti-users", label: "Ученики" },
    { id: "schedule", href: "schedule.html", icon: "ti-calendar-week", label: "Расписание" },
    { id: "finance", href: "finance.html", icon: "ti-wallet", label: "Финансы" },
  ];
  const SECONDARY = [
    { icon: "ti-school", label: "Педагоги" },
    { icon: "ti-ticket", label: "Абонементы" },
    { icon: "ti-settings", label: "Настройки" },
  ];

  const page = document.body.dataset.page;
  const side = document.querySelector(".side");
  if (side) {
    const link = (n) =>
      `<a href="${n.href || "#"}"${n.id === page ? ' aria-current="page"' : ""}>
        <i class="ti ${n.icon}" aria-hidden="true"></i>${n.label}${n.count ? `<span class="count">${n.count}</span>` : ""}
      </a>`;
    side.innerHTML = `
      <a class="logo" href="index.html" aria-label="Про Артистов, на главную">
        <span class="logo-mark" aria-hidden="true">pa</span>
        <span class="logo-text">про артистов<small>CRM продюсерского центра</small></span>
      </a>
      <nav class="nav" aria-label="Основные разделы">${NAV.map(link).join("")}</nav>
      <div class="nav-sep"></div>
      <nav class="nav" aria-label="Справочники">${SECONDARY.map(link).join("")}</nav>
      <div class="side-foot">
        <div class="place-select">
          <label for="place">Площадка</label>
          <select id="place" class="select">
            <option>Обе площадки</option>
            <option>Лабораторный пр., 23</option>
            <option>Можайская ул., 9</option>
          </select>
        </div>
        <div class="me">
          <span class="avatar" style="--h:200">КС</span>
          <div><b>Ксения Сорокина</b><span>Администратор</span></div>
        </div>
      </div>`;
  }

  const app = document.querySelector(".app");
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  app.appendChild(scrim);
  document.querySelector(".menu-btn")?.addEventListener("click", () => app.classList.add("nav-open"));
  scrim.addEventListener("click", () => app.classList.remove("nav-open"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") app.classList.remove("nav-open");
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      const s = document.querySelector(".search input");
      if (s) { e.preventDefault(); s.focus(); }
    }
  });

  // Сегментированные переключатели: один активный в группе
  document.querySelectorAll(".seg").forEach((seg) => {
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      seg.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      seg.dispatchEvent(new CustomEvent("change", { detail: b.dataset.value }));
    });
  });
})();
