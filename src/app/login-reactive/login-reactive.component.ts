import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  constructor(private readonly _fb: FormBuilder) {}

  form = this._fb.group({
    email: [
      "",
      { validators: [Validators.required, Validators.email], updateOn: "blur" },
    ],
    password: ["", [Validators.required, createPasswordStrengthValidator()]],
  });

  ngOnInit() {}

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }
}
