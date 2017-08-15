import { Curriculum } from '../../curricula/shared/curriculum.model';

export class Subject {
  id: number;
  name: string;
  code: string;
  semester: number;
  type: string;
  hours: number;
  laboratoryHours: number;
  curriculum: Curriculum;

  constructor(name: string, code: string, semester: number, type: string, hours: number, laboratoryHours: number) {
    this.name = name;
    this.code = code;
    this.semester = semester;
    this.type = type;
    this.hours = hours;
    this.laboratoryHours = laboratoryHours;
  }
}
