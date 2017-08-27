import { Course } from '../../courses/shared/course.model';

export class Teacher {
    id: number;
    firstName: string;
    lastName: string;
    studyLevel: string;
    imgPath: string;
    hours: number;
    checkIn: number;
    checkOut: number;
    courses: Course[];

    constructor(firstName: string, lastName: string, studyLevel: string, imgPath: string, hours: number, checkIn: number, checkOut: number, courses: Course[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.studyLevel = studyLevel;
        this.imgPath = imgPath;
        this.hours = hours;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.courses = courses;
    }
}