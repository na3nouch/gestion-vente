document.addEventListener("DOMContentLoaded", () => {

  var urlPath = window.location.href.split("/");

  function includePath(basePath, key) {
    return urlPath.includes(basePath) && urlPath.includes(key)
  }

  // snackbar
  if (includePath("profile") || includePath("ajout")) {
    (function () {
      const x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    }());
  }

  // typeWriter
  if (window.location.pathname == "/") {
    let i = 0;
    const txt = 'Espace reservée pour la gestion des factures.';
    const speed = 50;

    function typeWriter() {

      if (i < txt.length) {
        const msg = document.querySelector(".home-msg");
        msg ? msg.innerHTML += txt.charAt(i) : "";
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }

});