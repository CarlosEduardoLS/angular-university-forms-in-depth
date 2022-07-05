import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
})
export class FileUploadComponent implements ControlValueAccessor {
  constructor(private readonly http: HttpClient) {}

  fileName: string = "";
  fileUploadError = false;
  uploadProgress: number;

  @Input() requiredFileType: string;

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  onChange: (fileName: string) => {};

  onTouched: () => {};

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
            this.onChange(this.fileName);
          }
        });
    }
  }
}
