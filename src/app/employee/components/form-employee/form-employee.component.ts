import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css'],
})
export class FormEmployeeComponent implements OnInit {
  action: string;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder
  ) {
    this.action = data.action;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      this.onClose(this.form.value);
    }
  }

  onClose(data: any) {
    this.dialogRef.close(data);
  }
}
