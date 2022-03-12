export default class Foo {
  constructor(
    cells = 10,
    rows = 10,
    colors = ["yellow", "pink", "skyblue", "red"]
  ) {
    this.cells = cells;
    this.rows = rows;
    this.colors = colors;
    this.data = null;
    this.createFood();
  }
  createFood() {
    let x = Math.floor(Math.random() * this.cells);
    let y = Math.floor(Math.random() * this.rows);
    let color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.data = { x, y, color };
    // if (this.map.include(this.data)) {
    //   this.createFood();
    // }
    // this.map.setData(this.data);
  }
}
