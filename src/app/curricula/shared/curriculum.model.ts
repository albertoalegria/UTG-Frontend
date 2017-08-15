import { Career } from '../../careers/shared/career.model';

export class Curriculum {
  id: number;
  name: string;
  career: Career;

  constructor(name: string, career: Career) {
    this.name = name;
    this.career = career;
  }
}
