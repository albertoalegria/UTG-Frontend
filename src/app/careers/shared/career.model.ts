export class Career {
  id: number;
  name: string;
  acronym: string;
  imgPath: string;

  constructor(name: string, acronym: string, imgPath: string) {
    this.name = name;
    this.acronym = acronym;
    this.imgPath = imgPath;
  }
}
