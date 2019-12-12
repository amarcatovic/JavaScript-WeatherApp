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
    })
    .catch(function(err) {
      console.log("Nepoznat grad" + err);
    });
}

function init(rezultatServer) {
  if (document.contains(document.getElementById("myAudio"))) {
    document.getElementById("myAudio").remove();
  }
  if (document.contains(document.getElementById("backgroundSrc"))) {
    console.log("SRC uništen");
    document.getElementById("backgroundSrc").remove();
  }
  if (document.contains(document.getElementById("musicFrame"))) {
    document.getElementById("musicFrame").remove();
  }

  console.log(rezultatServer);

  var logoVremena = document.getElementById("VrijemeDiv");
  var slika = document.createElement("img");
  var paragraf = document.createElement("p");
  var video = document.createElement("iframe");
  video.setAttribute("id", "musicFrame");
  var muzika = document.createElement("audio");
  muzika.setAttribute("id", "myAudio");
  var src = document.createElement("source");
  src.setAttribute("id", "backgroundSrc");
  src.setAttribute("type", "audio/mpeg");
  video.setAttribute("width", "500");
  video.setAttribute("height", "300");

  document.body.appendChild(muzika);

  var x = document.getElementById("myAudio");
  function playAudio() {
    x.play();
  }

  switch (rezultatServer.weather[0].main) {
    case "Rain":
      console.log("KIŠA");
      var niz = [
        "rain1.mp3",
        "rain2.mp3",
        "rain3.mp3",
        "rain4.mp3",
        "rain5.mp3"
      ];
      var pjesma = niz[Math.floor(Math.random() * 5)];
      src.setAttribute("src", `Assets/music/${pjesma}`);
      muzika.appendChild(src);
      playAudio();
      break;

    case "Clear":
      console.log("Vedro");
      src.setAttribute("src", `Assets/music/clear1.mp3`);
      muzika.appendChild(src);
      playAudio();
      break;

    case "Drizzle":
      console.log("Stina kiša");
      src.setAttribute("src", `Assets/music/drizzle1.mp3`);
      muzika.appendChild(src);
      playAudio();
      break;

    case "Mist":
      console.log("Maglovito");
      var niz = ["fog1.mp3", "fog2.mp3"];
      var pjesma = niz[Math.floor(Math.random() * 2)];
      console.log(pjesma);
      src.setAttribute("src", `Assets/music/${pjesma}`);
      muzika.appendChild(src);
      playAudio();
      break;

    case "Thunderstorm":
      console.log("Grmljavina");
      var niz = ["tstorm1.mp3", "tstorm2.mp3", "tstorm3.mp3"];
      var pjesma = niz[Math.floor(Math.random() * 3)];
      src.setAttribute("src", `Assets/music/${pjesma}`);
      muzika.appendChild(src);
      playAudio();
      break;

    case "Snow":
      console.log("Snijeg");
      var niz = ["snow1.mp3", "snow2.mp3", "snow3.mp3", "snow4.mp3"];
      var pjesma = niz[Math.floor(Math.random() * 4)];
      src.setAttribute("src", `Assets/music/${pjesma}`);
      muzika.appendChild(src);
      playAudio();
      break;

    case "Clouds":
      console.log("Oblačno");
      src.setAttribute("src", `Assets/music/clouds1.mp3`);
      muzika.appendChild(src);
      playAudio();
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
