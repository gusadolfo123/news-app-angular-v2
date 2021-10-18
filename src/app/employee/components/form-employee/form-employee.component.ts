import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { TypeForm } from 'src/app/core/Enums/typeForm.enum';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css'],
})
export class FormEmployeeComponent implements OnInit {
  type: TypeForm;
  form: FormGroup;
  employee: Employee;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<FormEmployeeComponent>,
    private formBuilder: FormBuilder,
    private employeService: EmployeeService
  ) {
    this.type = data.type;
    this.employee = data.employee;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: [this.employee?.name ?? '', Validators.required],
      position: [this.employee?.position ?? '', Validators.required],
      salary: [this.employee?.salary ?? 0, Validators.required],
    });
  }

  getError(control: string) {
    return this.form.controls[control].hasError;
  }

  getErrorMessage(control: string) {
    if (this.form.controls[control].hasError('required'))
      return 'Debe ingresar un valor';

    return 'Campo Invalido';
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.type == TypeForm.CREATE) {
        this.employeService
          .createEmployee({
            ...this.form.value,
            address: { street: '', number: '', postalCode: 0 },
          })
          .pipe(tap(console.log))
          .subscribe((res) => {
            this.onClose(res);
          });
      } else {
        this.employeService
          .updateEmployee({
            id: this.employee.id,
            ...this.form.value,
            address: { street: '', number: '', postalCode: 0 },
          })
          .pipe(tap(console.log))
          .subscribe((res) => {
            this.onClose(res);
          });
      }
    }
  }

  onClose(data: any) {
    this.dialogRef.close(data);
  }
}
