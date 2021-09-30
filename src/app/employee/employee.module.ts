import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    FormEmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [FormEmployeeComponent],
})
export class EmployeeModule {}
