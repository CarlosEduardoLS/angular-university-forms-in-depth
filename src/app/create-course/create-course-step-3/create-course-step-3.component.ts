import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-3",
  templateUrl: "create-course-step-3.component.html",
  styleUrls: ["create-course-step-3.component.scss"],
})
export class CreateCourseStep3Component {
  constructor(private readonly _fb: FormBuilder) {}

  form = this._fb.group({
    lessons: this._fb.array([]),
  });

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this._fb.group({
      title: ["", [Validators.required]],
      level: ["beginner", [Validators.required]],
    });

    this.lessons.push(lessonForm);
  }

  deleteLesson(index: number) {
    this.lessons.removeAt(index);
  }
}
