async function suggestProjects() {
  const input = document.getElementById("material-input").value.toLowerCase();
  const materials = input.split(",").map(item => item.trim());
  const suggestions = document.getElementById("suggestions");

  suggestions.innerHTML = "🔄 Projeler yükleniyor...";

  try {
    const response = await fetch("projects.json");
    const data = await response.json();

    const matched = data.projects.filter(project =>
      project.materials.every(mat => materials.includes(mat.toLowerCase()))
    );

    if (matched.length === 0) {
      suggestions.innerHTML = "<p>😕 Uygun proje bulunamadı.</p>";
    } else {
      suggestions.innerHTML = matched
        .map(project => `
          <div class="project-card">
            <strong>${project.name}</strong><br/>
            Malzemeler: ${project.materials.join(", ")}
          </div>
        `)
        .join("");
    }
  } catch (err) {
    suggestions.innerHTML = "<p>⚠️ Veri yüklenemedi.</p>";
    console.error(err);
  }
}
