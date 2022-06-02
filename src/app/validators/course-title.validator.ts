import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

export function courseTitleValidator(
  courses: CoursesService
): AsyncValidatorFn {
  return ({ value }: AbstractControl) => {
    return courses.findAllCourses().pipe(
      map((courses) => {
        const course = courses.find(
          (course) => course.description.toLowerCase() === value.toLowerCase()
        );

        return course ? { titleExists: true } : null;
      })
    );
  };
}
