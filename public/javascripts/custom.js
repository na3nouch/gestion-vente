document.addEventListener("DOMContentLoaded", () => {

  // api
  var baseURL = window.location.href.split("/");

  var checkURL = (basePath, key) => {
    return baseURL.includes(basePath) && baseURL.some(i => i.startsWith(key))
  }
  // end api

  // top menu buttons - dropdown
  function toggle(parent, child) {
    const btn = document.querySelector(parent);
    const btnN = document.querySelector(child);

    btn.onclick = () => {
      btnN.style.display = btnN.style.display === "block" ? "none" : "block";
    }
  }

  toggle(".vv", ".v");
  toggle(".cc", ".c");
  toggle(".pp", ".p");
  toggle(".navbar-toggler-icon", "#navbarNavDropdown");
  


  if (checkURL("clients", "supprimer")) {

    const formDelete = document.getElementById("form-delete-client");
    formDelete ? formDelete.onsubmit = () => confirm("voulez-vous vraiment supprimer?") : "";
  }

  if (checkURL("clients", "modifier")) {

    const formModifier = document.getElementById("form-modifier-client");
    formModifier ? formModifier.onsubmit = () => confirm("voulez-vous vraiment modifier?") : "";
  }

  if (checkURL("ventes", "supprimer")) {

    const formDelete = document.getElementById("form-delete-vente");
    formDelete ? formDelete.onsubmit = () => confirm("voulez-vous vraiment supprimer?") : "";
  }

  if (checkURL("ventes", "modifier")) {

    const formModifier = document.getElementById("form-modifier-vente");
    formModifier ? formModifier.onsubmit = () => confirm("voulez-vous vraiment modifier?") : "";
  }



  
});