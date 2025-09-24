import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Superadmin } from '../../core/services/superadmin';

@Component({
  selector: 'app-teamhierarchy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teamhierarchy.html',
  styleUrl: './teamhierarchy.css',
})
export class Teamhierarchy implements OnInit {
  employees: any[] = [];
  entriesPerPage: number = 10;
  searchQuery: string = '';

  selectedEmployees: any[] = [
    { name: 'Employee Name 1' },
    { name: 'Employee Name 2' },
    { name: 'Employee Name 3' },
    { name: 'Employee Name 4' }
  ];

  updateFields = [
    { label: 'Role' },
    { label: 'Department' },
    { label: 'Designation' },
    { label: 'Team Lead' },
    { label: 'Team Manager' },
    { label: 'Team Reviewer' }
  ];

  constructor(private superadmin: Superadmin, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.superadmin.getAllEmployees().subscribe({
      next: (res) => (this.employees = res || []),
      error: (err) => console.error('Failed to fetch employees:', err),
    });
  }

  get filteredEmployees() {
    const search = this.searchQuery.toLowerCase();
    return this.employees
      .filter(emp =>
        `${emp.first_name} ${emp.middle_name} ${emp.last_name}`.toLowerCase().includes(search) ||
        emp.company_email?.toLowerCase().includes(search) ||
        emp.designation?.toLowerCase().includes(search)
      )
      .slice(0, this.entriesPerPage);
  }

  goToRegistration(): void {
    this.router.navigate(['/superadmin/registration']);
  }

  goToUpdateInfo(empId: number | string) {
    this.router.navigate(['/superadmin/updateinfo']);
  }
}
