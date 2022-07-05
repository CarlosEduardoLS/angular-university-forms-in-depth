import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
})
export class FileUploadComponent {
  constructor(private readonly http: HttpClient) {}

  fileName: string = "";
  fileUploadError = false;

  @Input() requiredFileType: string;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.fileUploadError = false;
      this.http
        .post("/api/thumbnail-upload", formData)
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          })
        )
        .subscribe();
    }
  }
}
