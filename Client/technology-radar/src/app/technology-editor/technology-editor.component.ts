import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Technology, Category, Ring } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-technology-editor',
  templateUrl: './technology-editor.component.html',
  styleUrls: ['./technology-editor.component.scss']
})
export class TechnologyEditorComponent {

  categories = Category;
  rings = Ring;
  pageType:string = "add";
  technology: Technology | undefined;

  technologyForm = this.fb.group({
    base: this.fb.group({
      name: [''],
      category: [''],
      description: [''],
    }),
    ring: this.fb.group({
      ring: [''],
      classification: [''],
    }),
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private technologyService: TechnologyService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    const type = String(this.route.snapshot.paramMap.get('type'));
    if (type == "add") {
      let formControls = this.technologyForm.controls.base.controls;
      formControls.name.setValidators(Validators.required);
      formControls.category.setValidators(Validators.required);
      formControls.description.setValidators(Validators.required);
    } else {
      this.pageType = type;

      const id = String(this.route.snapshot.paramMap.get('id'));
      this.technologyService.getTechnology(id)
        .subscribe(
          technology => {
            this.technology = technology;
            if (type == "base") {
              let formControls = this.technologyForm.controls.base.controls;
              formControls.name.setValidators(Validators.required);
              formControls.category.setValidators(Validators.required);
              formControls.description.setValidators(Validators.required);
              formControls.category.setValue(technology.category);
            } else if (type == "ring" || type == "publish") {
              let formControls = this.technologyForm.controls.ring.controls;
              formControls.ring.setValidators(Validators.required);
              formControls.classification.setValidators(Validators.required);
              formControls.ring.setValue(technology.ring);
            }
          }
        );
    }
  }

  addTechnology(): void {
    let formValue = this.technologyForm.value;

    let newTechnology = {
      name: formValue.base!.name ?? "",
      category: formValue.base!.category ?? "",
      description: formValue.base!.description ?? "",
      ring: formValue.ring!.ring ?? "",
      classification: formValue.ring!.classification ?? "",
      published: false
    };
    console.log(newTechnology);
    this.technologyService.addTechnology(newTechnology).subscribe(
      result => {
        if (result) {
          let technologyID = result.insertedId;
          this.addHistoryItem(technologyID, "added Technology");
        } else {
          console.error("Error on adding Technology");
        }
      }
    );
    this.goBack();
  }

  updateBase(): void {
    if (this.technology) {
      let formValue = this.technologyForm.value;
      this.technology.name = formValue.base!.name || this.technology.name;
      this.technology.category = formValue.base!.category || this.technology.category;
      this.technology.description = formValue.base!.description || this.technology.description;

      this.technologyService.updateTechnology(this.technology).subscribe(
        result => {
          if (result.modifiedCount > 0) {
            let technologyID = this.technology?._id  ?? "";
            this.addHistoryItem(technologyID, "updated base Technology");
          } else {
            console.error("Error on updating Technology");
          }
        }
      );
    } else {
      console.log("technologie is not set");
    }
    this.goBack();
  }

  updateRing(): void {
    if (this.technology) {
      let formValue = this.technologyForm.value;
      this.technology.ring = formValue.ring!.ring || this.technology.ring;
      this.technology.classification = formValue.ring!.classification || this.technology.classification;

      this.technologyService.updateTechnology(this.technology).subscribe(
        result => {
          if (result.modifiedCount > 0) {
            let technologyID = this.technology?._id  ?? "";
            this.addHistoryItem(technologyID, "updated ring Technology");
          } else {
            console.error("Error on updating Technology");
          }
        }
      );
    } else {
      console.log("technologie is not set");
    }
    this.goBack();
  }

  publish(): void {
    if (this.technology) {
      let formValue = this.technologyForm.value;
      this.technology.ring = formValue.ring!.ring || this.technology.ring;
      this.technology.classification = formValue.ring!.classification || this.technology.classification;
      this.technology.published = true;

      this.technologyService.updateTechnology(this.technology).subscribe(
        result => {
          if (result.modifiedCount > 0) {
            let technologyID = this.technology?._id  ?? "";
            this.addHistoryItem(technologyID, "published Technology");
          } else {
            console.error("Error on publishing Technology");
          }
        }
      );
    } else {
      console.log("technologie is not set");
    }
    this.goBack();
  }

  addHistoryItem(technologyID: string, type: string) {
    let currentDateTime:string = this.datepipe.transform((new Date), 'yyyy/MM/dd H:mm:ss') ?? "";

    let newHistoryItem = {
      technologyID: technologyID,
      userID: "adminTest",
      type: type,
      dateTime: currentDateTime
    }
    this.technologyService.addHistoryItem(newHistoryItem).subscribe(
      result => {
        if (result) {
          console.log(result);
        } else {
          console.error("Error ".concat(type, " Technology"));
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
