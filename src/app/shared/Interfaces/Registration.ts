import { Course } from "./Course";

export interface Registration {
    id: number;
    name: string;
    birthdate: string,
    course: Course,
    courseId: number,
    registrationDate: string,
    email: string
  }