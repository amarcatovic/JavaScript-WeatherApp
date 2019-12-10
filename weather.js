var key = "c918647878d1f020d5c226f15183e169";
var jedinica = "metric";
var searchParametar = "q";

function pretraziVrijeme(Grad) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchParametar}=${Grad}&APPID=${key}&units={jedinica}`
  )
    .then(rezultat => {
      return rezultat.json();
    })
    .then(rezultat => {
      init(rezultat);
    });
}

function init(rezultatServer) {
  document.write(rezultatServer);
  console.log(rezultatServer);
}

document.querySelector("#searchBtn").addEventListener("click", () => {
  var trazi = document.querySelector("#inputBtn").value;
  if (trazi) {
    pretraziVrijeme(trazi);
  }
});
