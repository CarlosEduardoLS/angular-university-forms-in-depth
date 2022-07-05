import { Component, Input } from "@angular/core";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
})
export class FileUploadComponent {
  @Input() requiredFileType: string;

  fileName: string = "";
}
