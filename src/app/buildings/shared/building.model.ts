export class Building {
  id: number;
  name: string;
  imgPath: string;

  constructor(name: string, imgPath: string) {
    this.name = name;
    this.imgPath = imgPath;
  }
}
