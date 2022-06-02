import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { filter } from "rxjs/operators";
import { createPromoRangeValidator } from "../../validators/date-range.validator";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  constructor(private readonly _fb: FormBuilder) {}

  form = this._fb.group(
    {
      courseType: ["premium", [Validators.required]],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern("[0-9]+"),
        ],
      ],
      promoStartAt: [null],
      promoEndAt: [null],
    },
    {
      validators: [createPromoRangeValidator()],
      updateOn: "blur",
    }
  );

  ngOnInit() {
    const draft = localStorage.getItem("STEP_2");

    if (draft) this.form.setValue(JSON.parse(draft));

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((val) => localStorage.setItem("STEP_2", JSON.stringify(val)));

    this.form.valueChanges.subscribe((val) => {
      const priceControl = this.form.controls["price"];

      if (val.courseType == "free" && priceControl.enabled)
        priceControl.disable({ emitEvent: false });
      else if (val.courseType == "premium" && priceControl.disabled)
        priceControl.enable({ emitEvent: false });
    });
  }
}
