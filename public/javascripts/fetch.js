document.addEventListener("DOMContentLoaded", () => {

  const mode = "prod";

  const months = [
    "jan", "fév", "mars", "avril", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"
  ];

  fetch(mode === "dev" ? "http://localhost:3000/ventes/liste-vente":
  "https://gestion-vente.herokuapp.com/ventes/liste-vente")
    .then(res => res.json())
    .then(data => {
      let date = new Date(data[0].date_vente);
      let grpData = [];

      data.map((d, i) => {
        let date = new Date(d.date_vente).getMonth();
        let m = months[date];
        grpData.push({ m, d });
      });

      let result = data.reduce((a, c, i) => (v = months[new Date(c.date_vente).getMonth()],
        a[v] ? a[v]++ : a[v] = 1, a), [])

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
        "scale-x": { "values": Object.keys(result) },
        "series": [
          { "values": Object.values(result), "text": "nombre de vente" }
        ]
      }

      zingchart.render({
        id: 'myChart',
        data: config,
        height: '100%',
        width: '100%'
      });

    })
    .catch(err => console.log(err))

});