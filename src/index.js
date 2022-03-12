import Game from "./game.js";
let el = document.querySelector("#map");
let gradeEl = document.querySelector("#grade");
let game = new Game(el, 10);

game.start();

game.toGrade = function (grade) {
  gradeEl.innerHTML = `当前分数:${grade}`;
};

game.toOver = function () {
  alert("game over～🎮");
};

game.toWin = function () {
  alert("you win 🎉");
};
