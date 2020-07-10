const targetElem = document.querySelector(".repo-list");

const getRepos = async () => {
  const reposRes = await fetch("https://api.github.com/users/reabreu/repos");
  return await reposRes.json();
};

const repos = getRepos().then(renderRepos);

// innerHTML
// function renderRepos(repos) {
//   const liList = repos.map((repo) => `<li>${repo.name}</li>`);
//   targetElem.innerHTML = `<ul>${liList.join("")}</ul>`;
// }

// DOM API
// function renderRepos(repos) {
//   const ul = document.createElement("ul");
//   const liList = repos.map((repo) => {
//     const li = document.createElement("li") as HTMLLIElement;
//     li.innerText = repo.name;
//     return li;
//   });

//   liList.forEach((elem) => {
//     ul.appendChild(elem);
//   });

//   targetElem.replaceWith(ul);
// }

// Template
function renderRepos(repos) {
  const tableTemplate = document.getElementById(
    "table-template"
  ) as HTMLTemplateElement;

  const table = document
    .importNode(tableTemplate.content, true)
    .querySelector(".tbody");

  const tableTrTemplate = document.getElementById(
    "table-tr-template"
  ) as HTMLTemplateElement;

  repos.forEach((repo) => {
    const trRow = document.importNode(tableTrTemplate.content, true);
    trRow.querySelector(".id").textContent = repo.id;
    trRow.querySelector(".name").textContent = repo.name;
    trRow.querySelector(".private").textContent = repo.private.toString();

    table.appendChild(trRow);
  });

  targetElem.replaceWith(table);
}
