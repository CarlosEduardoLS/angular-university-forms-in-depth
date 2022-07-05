import { Component, Input } from "@angular/core";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
})
export class FileUploadComponent {
  @Input() requiredFileType: string;

  fileName: string = "";

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
  }
}
