import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TypeForm } from 'src/app/core/Enums/typeForm.enum';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'position', 'salary', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  updateEmployee(employee: Employee) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.data = {
      type: TypeForm.MODIFY,
      employee,
    };

    const dialogRef = this.dialog.open(FormEmployeeComponent, config);

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          return this.employeeService.getEmployees();
        })
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  createEmployee() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.data = {
      type: TypeForm.CREATE,
    };

    const dialogRef = this.dialog.open(FormEmployeeComponent, config);

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          // if (data) {
          // this.router.navigate(['./employees']);
          return this.employeeService.getEmployees();
          // }
        })
      )
      .subscribe((data) => {
        this.dataSource.data = data;
        // console.log(data);
        // if (Object.) {
        //   var employee: Employee = {
        //     id: 0,
        //     state: 0,
        //     address: {
        //       street: '',
        //       number: '',
        //       postalCode: 0,
        //     },
        //     ...data,
        //   };
        //   this.employeeService.createEmployee(employee).subscribe((res) => {
        //     this.dataSource.connect().next([...this.dataSource.data, res]);
        //   });
        // }
      });
  }

  deleteEmployee(id: number) {
    let res = confirm('Realmente desea eliminar el registro?');
    if (res) {
      this.employeeService
        .deleteEmployee(id)
        .subscribe((res) => this.getEmployees());
    }
  }
}
