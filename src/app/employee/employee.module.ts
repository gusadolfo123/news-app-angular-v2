import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [EmployeeComponent, EmployeeListComponent],
  imports: [CommonModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
