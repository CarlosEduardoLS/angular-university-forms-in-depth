import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    { provide: NG_VALIDATORS, multi: true, useExisting: FileUploadComponent },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  constructor(private readonly http: HttpClient) {}

  fileName: string = "";
  fileUploadError = false;
  uploadProgress: number;
  fileUploadSuccess = false;

  @Input() requiredFileType: string;

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  onChange: (fileName: string) => {};

  onTouched: () => {};

  onValidatorChange = () => {};

  disabled: boolean = false;

  writeValue(value: string): void {
    this.fileName = value;
  }

  registerOnChange(value: (val: string) => {}): void {
    this.onChange = value;
  }

  registerOnTouched(value: () => {}): void {
    this.onTouched = value;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) return null;

    let errors: any = {
      requiredFileType: this.requiredFileType,
    };

    if (this.fileUploadError) errors.uploadFailed = true;

    return errors;
  }

  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.fileUploadError = false;
      this.http
        .post("/api/thumbnail-upload", formData, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          } else if (event.type === HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }
}
