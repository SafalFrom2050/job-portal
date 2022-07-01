import "reflect-metadata";
import {Lesson} from "./lesson.d.";

export interface Grade {
    id?: string;
    name?: string;
    lesson?: Lesson[];
}