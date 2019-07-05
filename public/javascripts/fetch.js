document.addEventListener("DOMContentLoaded", () => {

  const isLocalFetch = false;
  const modeFetch = isLocalFetch ? "http://localhost:3000/ventes/liste-ventes" :
    "https://gestion-vente-piece.herokuapp.com/ventes/liste-ventes";

  const months = [
    "jan", "fév", "mars", "avril", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"
  ];

  fetch(modeFetch)
    .then(res => res.json())
    .then(data => {

      let result = data.reduce((a, c, i) => (v = months[new Date(c.date_vente).getMonth()],
        a[v] ? a[v]++ : a[v] = 1, a), []);

      let objNbVentes = [];

      for (let i in result) {
        objNbVentes.push({ n: result[i], m: i, indx: months.indexOf(i) })
      }

      objNbVentes = objNbVentes.sort((i, j) => i.indx - j.indx);

      let config = {
        "type": "line",
        "title": {
          "text": "nombre de vente pour chaque moi",
          "font-size": "18px"
        },
        "plot": {
          "value-box": { "text": "%v" },
          "tooltip": { "text": "%v" }
        },
        "legend": {
          "toggle-action": "hide", "header": { "text": "Ventes" },
          "item": { "cursor": "pointer" },
          "draggable": true,
          "drag-handler": "icon"
        },
        "scale-x": { "values": objNbVentes.map(o => o.m) },
        "series": [
          { "values": objNbVentes.map(o => o.n), "text": "nombre de vente" }
        ]
      }

      zingchart.render({ id: 'myChart', data: config, height: '100%', width: '100%' });

    })
    .catch(err => console.log(err))
});