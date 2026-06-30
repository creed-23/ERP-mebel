import th from '@angular/common/locales/th';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IconCard } from '@shared/components/cards/icon-card/icon-card';
import { TableAction, TableDefalt } from '@shared/components/tables/table-defalt/table-defalt';
import { PathResources } from '@shared/resources/path_resource';
export interface TableColumn {
  key: string;
  label: string;
}
export interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
  salary: string;
}

export interface Person {
  [key: string]: any;
}
@Component({
  selector: 'app-masters',
  imports: [IconCard, TableDefalt],
  templateUrl: './masters.html',
  styleUrl: './masters.scss',
})
export class Masters {
  private readonly router = inject(Router);

  columns: TableColumn[] = [
    { key: 'name', label: 'COLUMNS.NAME' },
    { key: 'position', label: 'COLUMNS.POSITION' },
    { key: 'email', label: 'COLUMNS.EMAIL' },
    { key: 'salary', label: 'COLUMNS.SALARY' },
  ];

  users: Employee[] = [
    {
      id: 1,
      name: 'Asilbek Toshmatov',
      position: 'Frontend dasturchi',
      email: 'asilbek@mail.uz',
      salary: "4,500,000 so'm",
    },
    {
      id: 2,
      name: 'Malika Yusupova',
      position: 'UI/UX Dizayner',
      email: 'malika@mail.uz',
      salary: "3,800,000 so'm",
    },
  ];
  handleView(action: TableAction) {
    const employee = action.row as Employee;

    this.router.navigate([PathResources.MASTER, employee.id]);
  }
}
