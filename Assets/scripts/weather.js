var logoVremena = document.getElementById("VrijemeDiv");

function pretraziVrijeme(Grad) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${Grad}&APPID=c918647878d1f020d5c226f15183e169`
  )
    .then(rezultat => {
      return rezultat.json();
    })
    .then(rezultat => {
      init(rezultat);
    })
    .catch(function(err) {
      console.log("Nepoznat grad " + err);
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

  var muzika = document.createElement("audio");
  muzika.setAttribute("id", "myAudio");
  var src = document.createElement("source");
  src.setAttribute("id", "backgroundSrc");
  src.setAttribute("type", "audio/mpeg");

  document.body.appendChild(muzika);

  var x = document.getElementById("myAudio");
  function playAudio() {
    x.play();
  }

  switch (rezultatServer.list[0].weather[0].main) {
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

  document.body.appendChild(logoVremena);
  popuniPodatke(rezultatServer);
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

document
  .querySelector("#inputBtnNav")
  .addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      var trazi = document.querySelector("#inputBtnNav").value;
      if (trazi) {
        pretraziVrijeme(trazi);
        document.querySelector("#searchBtnNav").click();
      }
    }
  });

document.querySelector("#searchBtnNav").addEventListener("click", () => {
  var trazi = document.querySelector("#inputBtnNav").value;
  if (trazi) {
    pretraziVrijeme(trazi);
  }
});

function popuniPodatke(rezultatServer) {
  logoVremena.style.display = "flex";

  document.querySelector("#searchDiv").style.height = "0vh";
  document.querySelector("#searchDiv").style.display = "none";
  var mjestoPretrage = document.querySelector("#weatherIn");
  var opisVremena = document.querySelector("#opisVremena");
  mjestoPretrage.innerHTML = `${rezultatServer.city.name}`;
  opisVremena.innerHTML = rezultatServer.list[0].weather[0].description;

  var stepeni = document.querySelector("#stepeniP");
  var stepeniC = Math.round(rezultatServer.list[0].main.temp - 273.15);
  stepeni.innerHTML = stepeniC + "°C";

  var vrijemeLogo = document.querySelector("#weatherLogo");
  vrijemeLogo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${rezultatServer.list[0].weather[0].icon}@2x.png`
  );

  var windSpeed = document.querySelector("#windP");
  var windDir = document.querySelector("#windDirP");
  windSpeed.innerHTML = rezultatServer.list[0].wind.speed + " m/s";
  windDir.innerHTML = rezultatServer.list[0].wind.deg + "°";

  var pritisak = document.querySelector("#pritisakP");
  pritisak.innerHTML = rezultatServer.list[0].main.pressure + "hPa";

  var sunrise = document.querySelector("#sunriseP");
  var sunset = document.querySelector("#sunsetP");
  sunrise.innerHTML = new Date(
    (rezultatServer.city.sunrise + rezultatServer.city.timezone) * 1000
  )
    .toISOString()
    .substr(11, 5);
  sunset.innerHTML = new Date(
    (rezultatServer.city.sunset + rezultatServer.city.timezone) * 1000
  )
    .toISOString()
    .substr(11, 5);

  var dani = [
    "Nedjelja",
    "Ponedjeljak",
    "Utorak",
    "Srijeda",
    "Četvrtak",
    "Petak",
    "Subota"
  ];
  document.querySelector("#petDana").style.display = "flex";
  document.querySelector("#d1").innerHTML =
    dani[new Date(rezultatServer.list[8].dt * 1000).getDay()];
  document.querySelector("#p1").innerHTML =
    Math.round(rezultatServer.list[8].main.temp - 273.15) + "°C";
  document
    .querySelector("#s1")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${rezultatServer.list[8].weather[0].icon}@2x.png`
    );

  document.querySelector("#d2").innerHTML =
    dani[new Date(rezultatServer.list[16].dt * 1000).getDay()];
  document.querySelector("#p2").innerHTML =
    Math.round(rezultatServer.list[16].main.temp - 273.15) + "°C";
  document
    .querySelector("#s2")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${rezultatServer.list[16].weather[0].icon}@2x.png`
    );

  document.querySelector("#d3").innerHTML =
    dani[new Date(rezultatServer.list[24].dt * 1000).getDay()];
  document.querySelector("#p3").innerHTML =
    Math.round(rezultatServer.list[24].main.temp - 273.15) + "°C";
  document
    .querySelector("#s3")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${rezultatServer.list[24].weather[0].icon}@2x.png`
    );

  document.querySelector("#d4").innerHTML =
    dani[new Date(rezultatServer.list[32].dt * 1000).getDay()];
  document.querySelector("#p4").innerHTML =
    Math.round(rezultatServer.list[32].main.temp - 273.15) + "°C";
  document
    .querySelector("#s4")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${rezultatServer.list[32].weather[0].icon}@2x.png`
    );

  document.querySelector("#d5").innerHTML =
    dani[new Date(rezultatServer.list[39].dt * 1000).getDay()];
  document.querySelector("#p5").innerHTML =
    Math.round(rezultatServer.list[39].main.temp - 273.15) + "°C";
  document
    .querySelector("#s5")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${rezultatServer.list[39].weather[0].icon}@2x.png`
    );
}
