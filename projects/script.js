let selectedTags = new Set();
let allProjects = [];

async function loadProjects() {
    const response = await fetch("projects.json");
    allProjects = await response.json();
    allProjects = allProjects.projects;
    renderMain();
    renderTagFilter();
    renderProjects();
}

function renderMain() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div id="tag-filters"></div>
        <div id="projects-container"></div>
    `;
}

function toggleTag(tag, btn) {
    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        btn.classList.remove("active");
    } else {
        selectedTags.add(tag);
        btn.classList.add("active");
    }
    renderProjects();
}

function renderTagFilter() {
    const allTags = new Set();
    allProjects.forEach(p => p.tags.forEach(tag => allTags.add(tag)));

    if (allTags.size === 0) {
        document.getElementById("tag-filters").style.display = "none";
        return;
    }

    const filterHTML = Array.from(allTags)
        .sort()
        .map(tag => `
            <button class="tag-filter" data-tag="${tag}">
                ${tag}
            </button>
        `)
        .join("");

    document.getElementById("tag-filters").innerHTML = filterHTML;
    document.querySelectorAll(".tag-filter").forEach(btn => {
        btn.addEventListener("click", () => toggleTag(btn.dataset.tag, btn));
    });
}

function renderProjects() {
    const filtered = selectedTags.size === 0
        ? allProjects
        : allProjects.filter(project =>
            Array.from(selectedTags).every(tag => project.tags.includes(tag))
          );

    if (filtered.length === 0) {
        document.getElementById("projects-container").innerHTML = `
            <p class="nothin-to-see">
                Nothing to see here yet :(
            </p>
        `;
        return;
    }

    const html = filtered
        .map(project => `
            <div class="project-card">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `
                        <button class="tag" data-tag="${tag}">
                            ${tag}
                        </button>
                    `).join("")}
                </div>
                <div class="project-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" target="_blank">${link.label}</a>
                    `).join("")}
                </div>
            </div>
        `)
        .join("");
    document.getElementById("projects-container").innerHTML = html;
}

loadProjects();
