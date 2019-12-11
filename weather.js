var key = "c918647878d1f020d5c226f15183e169";
var jedinica = "metric";
var searchParametar = "q";

function pretraziVrijeme(Grad) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchParametar}=${Grad}&APPID=${key}&units={jedinica}&cnt=7`
  )
    .then(rezultat => {
      return rezultat.json();
    })
    .then(rezultat => {
      init(rezultat);
    });
}

function init(rezultatServer) {
  console.log(rezultatServer);

  var logoVremena = document.createElement("VrijemeDiv");
  var slika = document.createElement("img");
  var paragraf = document.createElement("p");
  var video = document.createElement("iframe");
  video.setAttribute("width", "500");
  video.setAttribute("height", "300");
  switch (rezultatServer.weather[0].main) {
    case "Rain":
      console.log("KIŠA");
      break;
    case "Clear":
      console.log("Vedro");
      break;
    case "Drizzle":
      console.log("Pljusak");
      break;
    case "Mist":
      console.log("Maglovito");
      break;
    case "Thunderstorm":
      console.log("Grmljavina");
      break;
    case "Snow":
      console.log("Snijeg");
      slika.setAttribute("src", "http://openweathermap.org/img/wn/13d@2x.png");
      var text = document.createTextNode("Snijeg");
      paragraf.appendChild(text);
      video.setAttribute("src", "https://www.youtube.com/watch?v=ZPVb_laFj_w");
      break;
    case "Clouds":
      console.log("Oblačno");
      break;
  }

  logoVremena.appendChild(video);
  logoVremena.appendChild(paragraf);
  logoVremena.appendChild(slika);
  document.body.appendChild(logoVremena);
}

document.querySelector("#searchBtn").addEventListener("click", () => {
  var trazi = document.querySelector("#inputBtn").value;
  if (trazi) {
    pretraziVrijeme(trazi);
  }
});

document.querySelector("#searchBtn").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    var trazi = document.querySelector("#inputBtn").value;
    if (trazi) {
      pretraziVrijeme(trazi);
      document.querySelector("#searchBtn").click();
    }
  }
});

document.querySelector("#searchBtnNav").addEventListener("click", () => {
  var trazi = document.querySelector("#inputBtnNav").value;
  if (trazi) {
    pretraziVrijeme(trazi);
  }
});
