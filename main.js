var drumButton = document.querySelectorAll(".header").length;

var keysAarray = ["clap"];

console.log(drumButton);

for (var i = 0; i < drumButton; i++) {
  document
    .querySelectorAll(".header")
    [i].addEventListener("click", function () {
      var buttonInnerHTML = this.innerHTML;
      console.log(buttonInnerHTML);
      makeSound(buttonInnerHTML.toLowerCase());
      read_value(buttonInnerHTML.toLowerCase());
    });
}

document.addEventListener("keypress", function (event) {
  makeSound(event.key);
});

function makeSound(key) {
  switch (key) {
    case "a":
      var clap = new Audio("/sounds/clap.wav");
      clap.play();
      this.break;

    case "s":
      var hi_hat = new Audio("/sounds/hi_hat.wav");
      hi_hat.play();
      break;

    case "d":
      var kick = new Audio("/sounds/kick.wav");
      kick.play();
      break;

    case "f":
      var open_hat = new Audio("/sounds/open_hat.wav");
      open_hat.play();
      break;

    case "g":
      var boom = new Audio("/sounds/boom.wav");
      boom.play();
      break;

    case "h":
      var ride = new Audio("/sounds/ride.wav");
      ride.play();
      break;

    case "j":
      var snare = new Audio("/sounds/snare.wav");
      snare.play();
      break;

    case "k":
      var tom = new Audio("/sounds/tom.wav");
      tom.play();
      break;

    case "l":
      var tink = new Audio("/sounds/tink.wav");
      tink.play();
      break;

    default:
      console.log(key);
  }
}

function start_timer(duration) {
  let current_time = 180;
  const interval_id = setInterval(() => {
    const timer_id = document.getElementById("timer");
    timer_id.textContent = formatTime(current_time);
    current_time--;
    if (current_time > duration) {
      clearInterval(interval_id);
    }
    if (reset_timer == true) {
      clearInterval(interval_id);
      document.getElementById("timer").innerText = "00:00";
    }
    if (pause_timer == true) {
      clearInterval(interval_id);
    }
  }, 1000);
}

function freePlay_timer(duration) {
  let current_time = 0;
  const interval_id = setInterval(() => {
    const timer_id = document.getElementById("timer");
    timer_id.textContent = formatTime(current_time);
    current_time++;
    if (reset_timer == true) {
      clearInterval(interval_id);
      document.getElementById("timer").innerText = "00:00";
    }
    if (pause_timer == true) {
      clearInterval(interval_id);
    }
  }, 1000);
}

function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

//Update Target
let music_keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

let history_keys = [
  { keys: "", status: "" },
  { keys: "", status: "" },
  { keys: "", status: "" },
];

let display_keys = [];

const target_card_data = [
  {
    key: "",
    status: "active",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
];

const default_card_data = [
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "active",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
];

let reset_timer = false;
let pause_timer = false;

document.addEventListener("keydown", function (e) {
  read_value(e.key);
});

function read_value(key_pressed) {
  array_keys.shift();
  checkTarget(key_pressed);
  clearTarget();
  calculateTarget();
  updateTarget();
}

clearTarget();
defaultTarget();

let count_score = 1;

function defaultTarget() {
  default_card_data.forEach((t) => {
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    if (t.status != "") {
      target_card.classList.add(t.status);
    }

    target_card.textContent = t.key;
    const target_box = document.querySelector(".target-container");
    target_box.appendChild(target_card);
  });
}

function checkTarget(target) {
  let history_object = {};
  history_object.key = target.toUpperCase();
  if (display_keys[3].key === target.toUpperCase()) {
    document.getElementById("score").innerText = count_score++;
    history_object.status = "correct";
  } else {
    history_object.status = "wrong";
  }
  if (display_keys[2].key === undefined) {
    pause_timer = true;
  }
  history_keys.push(history_object);
  history_keys.shift();
}

function clearTarget() {
  display_keys = [];
  const target_box = document.querySelector(".target-container");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}

function calculateTarget() {
  let count = 0;
  let inverse = 3;
  let inverse_history = 2;
  let new_target_card_data = [];
  let new_history_key = [];

  for (let i = 0; i < history_keys.length; i++) {
    new_history_key.push(history_keys[inverse_history]);
    inverse_history--;
  }

  target_card_data.forEach((t) => {
    if (count <= 3) {
      target_card_data[inverse].key = array_keys[inverse];
      new_target_card_data.push(target_card_data[inverse]);
      inverse--;
      count++;
    }
  });

  let new_display_keys = [[...new_target_card_data], [...new_history_key]];
  for (let i = 0; i < new_display_keys.length; i++) {
    for (let j = 0; j < new_display_keys[i].length; j++) {
      display_keys.push(new_display_keys[i][j]);
    }
  }
}

function updateTarget() {
  display_keys.forEach((t) => {
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    if (t.status !== "") {
      target_card.classList.add(t.status);
    }

    target_card.textContent = t.key;
    const target_box = document.querySelector(".target-container");
    target_box.appendChild(target_card);
  });
}

//Start Game Mode
let play_btn = document.getElementById("SG");
play_btn.addEventListener("click", prepare_timer);

function prepare_timer() {
  if (play_btn.innerText === "Start Game") {
    count_score = 1;
    array_keys = ["G", "A", "S", "G", "A", "S", "H"];
    history_keys = [
      { key: "", status: "" },
      { key: "", status: "" },
      { key: "", status: "" },
    ];
    clearTarget();
    calculateTarget();
    updateTarget();
    play_btn.innerText = "End Game";
    pause_timer = false;
    reset_timer = false;
    start_timer();
  } else if (play_btn.innerText === "End Game") {
    reset();
  }
}

//Free Play Mode
let play_btn1 = document.getElementById("FP");
play_btn1.addEventListener("click", prepare_timer_freePlay);

function prepare_timer_freePlay() {
  if (play_btn1.innerText === "Free Play") {
    count_score = 1;
    array_keys = ["G", "A", "S", "G", "A", "S", "H"];
    history_keys = [
      { key: "", status: "" },
      { key: "", status: "" },
      { key: "", status: "" },
    ];
    clearTarget();
    calculateTarget();
    updateTarget();
    play_btn1.innerText = "End Game";
    pause_timer = false;
    reset_timer = false;
    freePlay_timer();
  } else if (play_btn1.innerText === "End Game") {
    reset();
  }
}

function reset() {
  reset_timer = true;
  document.getElementById("score").innerText = "0";
  document.getElementById("timer").innerText = "00:00";
  clearTarget();
  defaultTarget();
  play_btn.innerText = "Start Game";
  play_btn1.innerText = "Free Play";
}
