import { Group } from '../../groups/shared/group.model';
import { Subject } from '../../subjects/shared/subject.model';
import { Classroom } from '../../classrooms/shared/classroom.model';

export class Course {
  id: number;
  size: number;
  group: Group;
  classrooms: Classroom[];

  constructor(size: number, group: Group, classrooms: Classroom[]){
    this.size = size;
    this.group = group;
    this.classrooms = classrooms;
  }
}