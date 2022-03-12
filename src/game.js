import Map from "./map.js";
import Food from "./food.js";
import Snake from "./snake.js";

export default class Game {
  constructor(
    el,
    rect,
    toControll = null,
    toGrade = null,
    toOver = null,
    toWin = null
  ) {
    this.map = new Map(el, rect);
    this.food = new Food(this.map.cells, this.map.rows);
    this.snake = new Snake();

    this.map.setData(this.snake.data);
    this.map.render();

    this.grade = 0;
    this.timer = 0;
    this.interval = 200;
    this.keydown = this.keydown.bind(this);
    this.controll();
    this.toControll = toControll;
    this.toGrade = toGrade;
    this.toOver = toOver;
    this.toWin = toWin;
  }
  // 开始游戏
  start() {
    this.move();
  }

  // 暂停游戏
  stop() {
    clearInterval(this.timer);
  }

  // 控制移动
  move() {
    this.stop();
    this.timer = setInterval(() => {
      this.snake.move();
      this.map.clearData();

      if (this.isEat()) {
        this.grade++;
        this.snake.eatFood();
        this.food.createFood();
        if (this.map.include(this.food.data)) {
          this.food.createFood();
        }
        this.map.setData(this.food.data);
        this.changeGrade(this.grade);
        this.interval *= 0.95;
        this.stop();
        this.start();
        if (this.grade > 30) {
          this.over(1);
        }
      }

      if (this.isOver()) {
        this.over(0);
        return;
      }
      this.map.setData(this.snake.data);
      this.map.setData(this.food.data);
      this.map.render();
    }, this.interval);
  }

  isEat() {
    return (
      this.snake.data[0].x === this.food.data.x &&
      this.snake.data[0].y === this.food.data.y
    );
  }

  // 是否结束
  isOver() {
    // 1.判断蛇出了地图
    let snakeHeadX = this.snake.data[0].x;
    let snakeHeadY = this.snake.data[0].y;
    if (
      snakeHeadX < 0 ||
      snakeHeadY < 0 ||
      snakeHeadX > this.map.cells ||
      snakeHeadY > this.map.rows
    ) {
      return true;
    }

    // 2.判断蛇头是否撞到自己身体
    for (let i = 1; i < this.snake.data.length; i++) {
      if (
        snakeHeadX == this.snake.data[i].x &&
        snakeHeadY == this.snake.data[i].y
      ) {
        return true;
      }
    }
    return false;
  }

  // 结束
  /**
   *
   * @param {*} flag 0表示游戏失败，1表示游戏胜利
   */
  over(flag = 0) {
    if (flag) {
      this.toWin && this.toWin();
    } else {
      this.toOver && this.toOver();
    }

    this.stop();
  }

  keydown({ keyCode }) {
    // 37 38 39 40
    switch (keyCode) {
      case 37: //left
        this.snake.changeDirection("left");
        break;
      case 38: //top
        this.snake.changeDirection("top");
        break;
      case 39: //right
        this.snake.changeDirection("right");
        break;
      case 40: //bttom
        this.snake.changeDirection("bottom");
        break;
      default:
        break;
    }
  }

  // 控制器
  controll() {
    if (this.toControll) {
      this.controll();
      return;
    }
    window.addEventListener("keydown", this.keydown);
  }

  // 自定义控制 eg: w a s d
  addControll(fn) {
    fn.call(this);
    window.removeEventListener("keydown", this.keydown);
  }

  changeGrade(grade) {
    this.toGrade && this.toGrade(grade);
  }
}
