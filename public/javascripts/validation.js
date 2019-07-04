document.addEventListener("DOMContentLoaded", () => {

  function validInput(element) {
    return !(element.includes("<script>") || element.includes("<script/>"))
  }

  let getPath = (basePath, key) => {
    let baseURL = window.location.href.split("/");
    return baseURL.includes(basePath) && baseURL.some(i => i.startsWith(key))
  }

  function validForm(form) {
    const formVal = document.querySelector(form);
    let cnt = 0;

    formVal.onsubmit = () => {
      for (let i = 0; i < formVal.length; i++) {
        if (validInput(formVal.elements[i].value)) cnt++;
      }

      return cnt === formVal.length;
    }
  }

  if (getPath("login", "")) validForm(".form-signin");
  if (getPath("ventes", "ajout")) validForm(".form-ajout-vente");

});