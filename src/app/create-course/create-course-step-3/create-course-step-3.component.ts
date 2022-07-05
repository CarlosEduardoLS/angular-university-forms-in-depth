import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "create-course-step-3",
  templateUrl: "create-course-step-3.component.html",
  styleUrls: ["create-course-step-3.component.scss"],
})
export class CreateCourseStep3Component {
  constructor(private readonly _fb: FormBuilder) {}

  form = this._fb.group({});
}
