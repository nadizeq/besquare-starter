//clap
const clap = document.getElementById("clap");

function playSoundClap() {
  const clap_audio = new Audio("./sounds/clap.wav");
  clap_audio.play();
}

clap.addEventListener("click", playSoundClap);

function checkKeysclap(event) {
  if (event.key === "a" || event.key === "A") {
    playSoundClap();
  }
}

document.addEventListener("keydown", playSoundClap);

//Hi Hat
const hi_hat = document.getElementById("hi_hat");

function playSoundHiHat() {
  const hi_hat_audio = new Audio("./sounds/hi_hat.wav");
  hi_hat_audio.play();
}

hi_hat.addEventListener("click", playSoundHiHat);

function checkKeysHiHat(event) {
  if (event.key === "s" || event.key === "S") {
    playSoundHiHat();
  }
}

document.addEventListener("keydown", checkKeysHiHat);

//kick
const kick = document.getElementById("kick");

function playSoundKick() {
  const kick = new Audio("./sounds/kick.wav");
  kick.play();
}

kick.addEventListener("click", playSoundKick);

function checkKeyskick(event) {
  if (event.key === "d" || event.key === "D") {
    playSoundKick();
  }
}

//open_hat
const open_hat = document.getElementById("open_hat");

function playSoundOpen_Hat() {
  const open_hat = new Audio("./sounds/open_hat.wav");
  open_hat.play();
}

open_hat.addEventListener("click", playSoundOpen_Hat);

function checkKeysOpen_Hat(event) {
  if (event.key === "f" || event.key === "F") {
    playSoundOpen_Hat();
  }
}
