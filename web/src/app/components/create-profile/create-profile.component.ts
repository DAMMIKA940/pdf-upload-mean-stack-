import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { Profile } from "../../models/Profile";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-create-profile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.css"],
})
export class CreateProfileComponent implements OnInit {
  form: FormGroup;
  pastpaper: Profile;
  pastpaperData: string;

  constructor(private pastpaperService: ProfileService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      pastpaper: new FormControl(null),
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ pastpaper: file });
    const allowedMimeTypes = ["application/pdf"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pastpaperData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.pastpaperService.addPastpaper(this.form.value.name, this.form.value.pastpaper);
    this.form.reset();
    this.pastpaperData = null;
  }
}
