function suggestProjects() {
  const input = document.getElementById("material-input").value.toLowerCase();
  const materials = input.split(",").map(item => item.trim());
  const suggestions = document.getElementById("suggestions");

  // Veriler doğrudan JS içinde tanımlı
  const data = {
    projects: [
      {
        name: "Beton Saksı",
        materials: ["çimento", "su", "silikon kalıp", "zımpara"]
      },
      {
        name: "Makrome Duvar Süsü",
        materials: ["pamuk ipi", "ahşap çubuk", "makas"]
      }
    ]
  };

  const matched = data.projects.filter(project =>
    project.materials.every(mat => materials.includes(mat.toLowerCase()))
  );

  if (matched.length === 0) {
    suggestions.innerHTML = "<p>😕 Uygun proje bulunamadı.</p>";
  } else {
    suggestions.innerHTML = matched.map(project => `
      <div class="project-card">
        <strong>${project.name}</strong><br/>
        Malzemeler: ${project.materials.join(", ")}
      </div>
    `).join("");
  }
}
