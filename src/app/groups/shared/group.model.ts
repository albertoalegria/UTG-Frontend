import { Curriculum } from '../../curricula/shared/curriculum.model';

export class Group {
  id: number;
  semester: number;
  shift: string;
  curriculum: Curriculum;

  constructor(semester: number, shift: string, curriculum: Curriculum) {
    this.semester = semester;
    this.shift = shift;
    this.curriculum = curriculum;
  }
}
