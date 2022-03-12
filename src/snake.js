export default class Snake {
  constructor() {
    this.data = [
      {
        x: 4,
        y: 3,
        color: "green",
      },
      {
        x: 3,
        y: 3,
        color: "white",
      },
      {
        x: 2,
        y: 3,
        color: "white",
      },
      {
        x: 1,
        y: 3,
        color: "white",
      },
    ];

    this.direction = "right";
  }

  move() {
    let i = this.data.length - 1;
    this.lastData = {
      x: this.data[i].x,
      y: this.data[i].y,
      color: this.data[i].color,
    };
    // 1. 让尾部向前一格
    for (i; i > 0; i--) {
      this.data[i].x = this.data[i - 1].x;
      this.data[i].y = this.data[i - 1].y;
    }

    // 2.移动蛇头的位置
    switch (this.direction) {
      case "left":
        this.data[0].x--;
        break;
      case "right":
        this.data[0].x++;
        break;
      case "top":
        this.data[0].y--;
        break;
      case "bottom":
        this.data[0].y++;
        break;
      default:
        break;
    }
  }

  changeDirection(direction) {
    // 如果蛇本身向 <== 或者向 ==> 走
    if (this.direction === "left" || this.direction === "right") {
      if (direction === "left" || direction === "right") {
        return false;
      }
      this.direction = direction;
    } else {
      if (direction === "top" || direction === "bottom") {
        return false;
      }
      this.direction = direction;
    }
  }

  eatFood() {
    this.data.push(this.lastData);
  }
}
