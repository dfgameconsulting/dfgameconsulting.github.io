let lupe = document.querySelectorAll(".lupe");
let lupeAus = true;
let secretLevelInnenstadtDone = false;
let secretIsRunning = false;
lupe.forEach((lupe) => {
  lupe.onclick = () => {
    anime({
      targets: ".lupe",
      scale: [1.33, 1],
      duration: 500,
      easing: "easeOutSine",
    });
    lupeAus = !lupeAus;
    if (!lupeAus) {
      document.body.style.cursor = "url(img/inventar/LupeCursor.svg), auto";
    } else {
      document.body.style.cursor = "auto";
    }
  };
});

class secretEntry {
  constructor(name, x, y, place, text, img, invImg) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.place = place;
    this.text = text;
    this.img = img;
    this.wasFound = false;
    this.invImg = invImg;

    this.imgProxy = new Image();
    this.imgProxy.src = "img/" + this.img;
    this.imgProxy.onload = () => {
      this.w = this.imgProxy.width;
      this.h = this.imgProxy.height;
      setTimeout(() => {
        this.render();
      }, 500);
    };
  }
  render() {
    let div = document.createElement("div");
    div.id = this.name;
    div.className = "secretEntry";
    document.getElementById(this.place).appendChild(div);

    let pos = this.place === "screen01" ? screen01Pos : this.place == "screen02" ? screen02Pos : this.place == "screen03" ? screen03Pos : screen04Pos;
    r.style.setProperty(`--${this.name}X`, `${pos.left + screen01Width * this.x}px`);
    r.style.setProperty(`--${this.name}Y`, `${pos.top + screen01Height * this.y}px`);
    document.getElementById(this.name).style.cssText = `
      position: absolute;
      width: ${this.w}px;
      height: ${this.h}px;
      left: var(--${this.name}X);
      top: var(--${this.name}Y); 
      transform-origin: 0% 0%;
      transform: translate(0%, 0%) var(--scaleFactorObjects);
      background-image: url(img/${this.img});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      `;

    secrets.push(this);


    div.onmouseleave = () => {
      console.log("leave")
      if (secretLevelInnenstadtDone || secretIsRunning) return
      anime({
        begin: () => {

          document.querySelector('#hintCircleSecret').style.display = 'block'
          let tl = new anime.timeline();
          tl.add({
            targets: "#hintCircleSecret",
            opacity: [0, 1],
            duration: 1000,
            easing: "easeInOutSine",
          })
        }
      });
    }
    div.onclick = () => {
      if (lupeAus) return;
      if (secretLevelInnenstadtDone) return;
      //   fadeIn("#backgroundDark");
      fadeIn("#secretInnenstadt");
      secretIsRunning = true;
      document.body.style.cursor = "auto";
      lupeAus = !lupeAus;
      sound06.play();
    };
  }
}
let sound06 = new Pizzicato.Sound("sound/Secret.mp3");
let auszugSound = new Pizzicato.Sound("sound/kontoauszug.mp3");
object24 = new secretEntry("Geldautomat", 0.360938, 0.546759, "screen03", "Das ist ein ", "CityCenter/Bild_002/Objekte_ImBild/geldautomat.png");

// Secret Innenstadt Logik

let secretInnenstadt = document.querySelector("#secretInnenstadt");

document.querySelector('.close').onclick = () => {
  fadeOut('#secretInnenstadt')
  secretIsRunning = false
}

let geldBeutel = document.querySelector("#geldbeutel");
let bankkarte = document.querySelector("#bankkarte");
let bankschlitz = document.querySelector("#bankschlitz");
let optionen01 = document.querySelector("#optionen01");
let optionen02 = document.querySelector("#optionen02");
let kontoauszug = document.querySelector("#kontoauszug");
let loadedSecret = [];
let lodedGlitchImages = [];
let glitch01Images = [
  "img/CityCenter/Zoom/glitch/bsod.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod01.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod02.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod03.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod04.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod05.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod06.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod07.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod08.png",
  "img/CityCenter/Zoom/glitch/glitch-dos01.png",
  "img/CityCenter/Zoom/glitch/glitch-dos02.png",
  "img/CityCenter/Zoom/glitch/dos.png",
];
let kontoSecretImages = [
  "img/CityCenter/Zoom/CityCenter_Zoom_002_rl.png",
  "img/CityCenter/Zoom/CityCenter_Zoom_003_rl.png",
  "img/CityCenter/Zoom/CityCenter_Zoom_004_rl.png",
  "img/CityCenter/Zoom/CityCenter_Zoom_005_rl.png",
  "img/CityCenter/Zoom/CityCenter_Zoom_006_rl.png",
];
kontoSecretImages.forEach((e) => {
  let img = new Image();
  img.src = e;
  loadedSecret.push(img);
});

glitch01Images.forEach((e) => {
  let img = new Image();
  img.src = e;
  lodedGlitchImages.push(img);
});


geldBeutel.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[0].src})`;
  geldBeutel.style.display = "none";
  bankkarte.style.display = "block";
};
bankkarte.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[1].src})`;
  bankkarte.style.display = "none";
  bankschlitz.style.display = "block";
};
bankschlitz.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[2].src})`;
  bankschlitz.style.display = "none";
  optionen01.style.display = "block";
  optionen02.style.display = "block";
};
optionen01.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[3].src})`
  optionen01.style.display = "none";
  optionen02.style.display = "none";
  kontoauszug.style.display = "block";
  auszugSound.play();
};
let glitchSound = new Pizzicato.Sound("sound/glitch01.mp3");

let glitch01 = document.querySelector('#glitch01')
optionen02.onclick = () => {

  let glitchIndex = 20;
  let glitchInterval = setInterval(() => {
    glitchIndex += Math.random() * 100 + 20;
    glitch01.style.backgroundImage = `url(${lodedGlitchImages[Math.floor(Math.random() * lodedGlitchImages.length)].src})`;
    if (Math.random() > 0.95) {
      glitch01.style.backgroundSize = `${Math.floor(Math.random() * 20 + 110)}%`
    };
  }, glitchIndex);
  glitchSound.play(0, Math.floor(Math.random() * 9));

  setTimeout(() => {
    clearInterval(glitchInterval);
    glitch01.style.backgroundImage = "none";
    glitchSound.stop();
  }, Math.random() * 1000 + 1000)
};
kontoauszug.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[4].src})`;
  kontoauszug.style.display = "none";
  secretLevelInnenstadtDone = true;
  document.querySelector('#hintCircleSecret').style.display = 'none'
  secretItemToInventory("Kontoauszug")
  setTimeout(() => {
    secretInnenstadt.style.display = "none";
  }, 5000);
};

function fadeIn(selector) {
  anime({
    begin: () => {
      document.querySelector(selector).style.display = "block";
    },
    targets: selector,
    opacity: [0, 1],
    duration: 500,
    easing: "easeInOutSine",
  });
}
function fadeOut(selector) {
  anime({
    targets: selector,
    opacity: [1, 0],
    duration: 500,
    easing: "easeInOutSine",
    complete: () => {
      document.querySelector(selector).style.display = "none";
    },
  });
}

let wasFound = false;
function secretItemToInventory(name) {
  anime({
    begin: () => {
      isRunning = true;
      wasFound = true;
      // GameManager!
      localStorage.setItem(name, "true");
      let tl = new anime.timeline();
      tl.add({
        begin: () => {
          document.querySelector('#foundInfo').innerHTML = name.replace(/_/g, ' ') + " gefunden!";
        },
        targets: "#options-info",
        opacity: [0, 1],
        duration: 500,
        easing: "easeInOutSine",
      }).add({
        duration: 1000,
      }).add({
        targets: "#options-info",
        opacity: [1, 0],
        duration: 500,
        easing: "easeInOutSine",
      })
    },
    targets: "#" + name,
    scale: [1.5, 1, 0.01],
    translate: "-33% -33%",
    transformOrigin: "50% 50%",
    easing: "linear",
    duration: 500,
    complete: () => {
      sound01.play();
      let index = objects.indexOf(this);
      objectCopy.push(...objects.splice(index, 1));
      document.getElementById(name).remove();
      isRunning = false;
      anime({
        targets: `#${name + "Inventory"}`,
        filter: ["brightness(0.1) sepia(1) opacity(0.3)", "brightness(1) sepia(0) opacity(1)"],
        scale: [0.9, 1.3, 1],
        easing: "easeInOutExpo",
        duration: 300,
        complete: () => {
          checkAllObjectsFound();
        },
      });
    },
  });
}