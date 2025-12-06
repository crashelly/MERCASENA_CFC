let icon1 = document.getElementById("icon1");

// menus 
let menu1 = document.getElementById("menu1");
let menu2 = document.getElementById("menu2");
let menu3 = document.getElementById("menu3");
let menu4 = document.getElementById("menu4");
let menu5 = document.getElementById("menu5");
let menu6 = document.getElementById("menu6");
let menu7 = document.getElementById("menu7");
let menu8 = document.getElementById("menu8");
const showMenu1 = (flag) => {
  if (flag) {
    icon1.classList.toggle("rotate-180");
    menu1.classList.toggle("hidden");
  }
};
let icon2 = document.getElementById("icon2");

const showMenu2 = (flag) => {
  if (flag) {
    icon2.classList.toggle("rotate-180");
    menu2.classList.toggle("hidden");
  }
};
let icon3 = document.getElementById("icon3");

const showMenu3 = (flag) => {
  if (flag) {
    icon3.classList.toggle("rotate-180");
    menu3.classList.toggle("hidden");
  }
};
let icon4 = document.getElementById("icon4");
const showMenu4 = (flag) => {
  if (flag) {
    icon4.classList.toggle("rotate-180");
    menu4.classList.toggle("hidden");
  }
};
let icon5 = document.getElementById("icon5");
const showMenu5 = (flag) => {
  if (flag) {
    icon5.classList.toggle("rotate-180");
    menu5.classList.toggle("hidden");
  }
};

let icon6 = document.getElementById("icon6");
const showMenu6 = (flag) => {
  if (flag) {
    icon6.classList.toggle("rotate-180");
    menu6.classList.toggle("hidden");
  }
};

let icon7 = document.getElementById("icon7");
const showMenu7 = (flag) => {
  if (flag) {
    icon7.classList.toggle("rotate-180");
    menu7.classList.toggle("hidden");
  }
};
let icon8 = document.getElementById("icon8");
const showMenu8 = (flag) => {
  if (flag) {
    icon8.classList.toggle("rotate-180");
    menu8.classList.toggle("hidden");
  }
};

let Main = document.getElementById("Main");
let open = document.getElementById("open");
let close = document.getElementById("close");

const showNav = (flag) => {
  if (flag) {
    Main.classList.toggle("-translate-x-full");
    Main.classList.toggle("translate-x-0");
    open.classList.toggle("hidden");
    close.classList.toggle("hidden");
  }
};