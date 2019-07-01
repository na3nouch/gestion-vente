function formatTel(tel) {
  tel = tel.replace(/\s*/g, "");
  return tel.slice(0, 2) + " " + tel.slice(2, 5) + " " + tel.slice(5)
}

module.exports = { formatTel };
