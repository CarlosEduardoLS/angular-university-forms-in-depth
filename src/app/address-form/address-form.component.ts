import { Component, Input, OnDestroy } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent,
    },
  ],
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  onChangeSub: Subscription;

  @Input() legend: string;

  onTouched = () => {};

  writeValue(value: any): void {
    if (value) this.form.setValue(value);
  }

  registerOnChange(onTouched: () => {}): void {
    this.onTouched = onTouched;
  }

  registerOnTouched(onChange: any): void {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.form.disable();
    else this.form.enable();
  }

  ngOnDestroy() {
    this.onChangeSub.unsubscribe();
  }
}
