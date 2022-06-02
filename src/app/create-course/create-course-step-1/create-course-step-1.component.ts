import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { courseTitleValidator } from "../../validators/course-title.validator";

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  constructor(
    private readonly _fb: FormBuilder,
    private readonly courses: CoursesService
  ) {}

  form: FormGroup;

  ngOnInit() {
    this.form = this._fb.group({
      title: [
        "",
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(60),
          ],
          asyncValidators: [courseTitleValidator(this.courses)],
          updateOn: "blur",
        },
      ],
      releasedAt: [new Date(), [Validators.required]],
    });
  }

  get courseTitle() {
    return this.form.controls["title"];
  }
}
