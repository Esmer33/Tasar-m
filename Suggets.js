async function suggestProjects() {
  const inputField = document.getElementById("material-input");
  const suggestions = document.getElementById("suggestions");
  const userMaterials = inputField.value
    .toLowerCase()
    .split(",")
    .map(item => item.trim());

  suggestions.innerHTML = "🔄 Öneriler yükleniyor...";

  try {
    const response = await fetch("projects.json");
    const data = await response.json();

    const matched = data.projects.filter(project =>
      project.materials.every(mat =>
        userMaterials.includes(mat.toLowerCase())
      )
    );

    if (matched.length === 0) {
      suggestions.innerHTML = "<p>😕 Uygun proje bulunamadı.</p>";
    } else {
      suggestions.innerHTML = matched
        .map(
          p => `
        <div class="project-card">
          <strong>${p.name}</strong><br/>
          Malzemeler: ${p.materials.join(", ")}
        </div>`
        )
        .join("");
    }
  } catch (error) {
    suggestions.innerHTML = "<p>⚠️ Veri alınırken hata oluştu.</p>";
    console.error("JSON yüklenemedi:", error);
  }
}
