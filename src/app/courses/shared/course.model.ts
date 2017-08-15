import { Group } from '../../groups/shared/group.model';
import { Subject } from '../../subjects/shared/subject.model';
import { Classroom } from '../../classrooms/shared/classroom.model';
import { Teacher } from '../../teachers/shared/teacher.model';

export class Course {
  id: number;
  size: number;
  group: Group;
  classrooms: Classroom[];
  teacher: Teacher
}