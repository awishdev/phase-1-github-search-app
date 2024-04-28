
let searchToggle = true;

let resultsHolder = {};

function init(){
    let form = document.getElementById("github-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        handleSubmit(e.target);
        form.reset();
        
    })

}


document.addEventListener("DOMContentLoaded", init);

function handleSubmit(formInput){

    fetch(`https://api.github.com/search/users?q=${formInput.search.value}`,{
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json"
    },})
  .then(response => response.json())
  .then(data => data.items.forEach(userResult => {
    renderUser(userResult)}));

}


function renderUser(user){
    let card = document.createElement("li");
    card.className = "card";
    card.innerHTML = `
      <h2>${user.login}</h2>
      <img class="avatar" src="${user.avatar_url}"/>
      <a href="${user.html_url}">Profile</a>
      <button id="${user.login}">Display Repos</button>
    `;
    
    document.getElementById("user-list").appendChild(card);
    document.getElementById(`${user.login}`).addEventListener("click", (e) => {
        getRepos(e.target.id);});
    
  
  }


  function getRepos(reposId){
    fetch(`https://api.github.com/users/${reposId}/repos`,{
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json"
    },})
  .then(response => response.json())
  .then(data => data.forEach(repoResult => {
    renderRepos(repoResult)
    window.scrollTo(0, document.body.scrollHeight);
    }));
  }

  function renderRepos(repo){
    let card = document.createElement("li");
    card.innerHTML = `
      <a href="${repo.html_url}">${repo.name}</a>
    `;
    document.getElementById("repos-list").appendChild(card);
  }