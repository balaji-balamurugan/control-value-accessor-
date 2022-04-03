import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { integrationType, integrationTypeJson } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  docForm!: FormGroup;
  @Input()
  classes!: string;
  selectedIntegrations!: any;
  integrationTypeList = integrationType;

  constructor(private _fb: FormBuilder) { }


  ngOnInit(): void {
    this.docForm = this._fb.group({
      name: ['', Validators.required],
      type: '',
      conditions: null,
      config: null,
    });

  }

  onIntegrationChange(type: {id: string; label: string}): void {
    this.selectedIntegrations = integrationTypeJson.find(integration => integration.integrationType === type.id)?.integrationConfig;
  }


  onFormSubmit = async (): Promise<void> => {
    console.log(this.docForm);
    if (this.docForm.dirty) {
      if (this.docForm.invalid) {
        this.docForm.markAllAsTouched();
        return;
      } else {
        // post it to the backend
        this.docForm.markAsPristine();
      }
    }
  };

}
