document.addEventListener("DOMContentLoaded", () => {

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

});