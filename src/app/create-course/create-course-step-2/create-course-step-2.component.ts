import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  constructor(private readonly _fb: FormBuilder) {}

  form = this._fb.group({
    courseType: ["premium", [Validators.required]],
  });

  ngOnInit() {}
}
