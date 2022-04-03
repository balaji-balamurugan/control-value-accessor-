import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors, ValidatorFn, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { get } from 'lodash';

@Component({
  selector: 'app-dynamic-custom-form-field',
  templateUrl: './dynamic-custom-form-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DynamicCustomFormFieldComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DynamicCustomFormFieldComponent,
      multi: true
    },
  ],
})
export class DynamicCustomFormFieldComponent implements OnInit {

  @Input()
  editMode!: boolean;

  cusFieldData!: any[];
  rendererForm!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  get cusFields(): any { return this.cusFieldData; }

  @Input()
  set customFieldsList(value: any) {
    this.cusFieldData = value;
    this.rendererForm = this._fb.group({});
    if (this.cusFields) {
      this.cusFields.forEach((eachData: any) => {
        if (get(eachData, 'title', '') !== 'Line Break') {
          this.rendererForm.addControl(get(eachData, 'id', ''), this._fb.control('', this.addValidators(eachData?.validations)));
          console.log(this.rendererForm);
        }
        if (get(eachData, 'disableOnEdit') && this.editMode) {
          this.rendererForm.get(get(eachData, 'id', ''))?.disable();
        }
      });
    };
  }

  ngOnInit(): void {
  }

  onTouched = (): any => { };
  onChange = (): any => { };
  onValidationChange = (): any => { };

  writeValue(val: any): void {
    console.log('val:', val);
    if (val) {
      this.rendererForm.patchValue(val);
    }
    this.rendererForm.reset();
  }

  registerOnChange(fn: any): void {
    this.rendererForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(): ValidationErrors | null {
    if (this.rendererForm.valid) {
      return null;
    };
    const errors = { formNotFilled: true };
    return errors;
  }

  registerOnValidatorChange(fn: () => any): void {
    this.rendererForm.statusChanges.subscribe(fn);
  }

  markFormAsTouched(): void {
    this.rendererForm.markAllAsTouched();
  }

  addValidators(validations: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (validations) {
      if (validations.includes('required')) {
        validators.push(Validators.required);
      }
      if (validations.includes('url')) {
        validators.push(Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/));
      }
    }
    return validators;
  }

  compareWith(firstOption: any, secondOption: any): any {
    return firstOption && secondOption && firstOption.name === secondOption.name;
  }

}
