import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Superadmin } from '../../core/services/superadmin';

@Component({
  selector: 'app-employeeinfo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employeeinfo.html',
  styleUrls: ['./employeeinfo.css'],
})
export class EmployeeinfoComponent implements OnInit {
  employees: any[] = [];
  entriesPerPage: number = 10;
  searchQuery: string = '';

  // Pagination (from backend)
  currentPage: number = 1;
  totalPages: number = 1;
  totalEmployees: number = 0;

  showModal = false;
  showBulkImportModal = false;
  showImportResultModal = false;
  selectedEmployee: any = null;

  importSummary = {
    successCount: 0,
    errorCount: 0,
    errors: [] as { name: string; description: string }[],
  };

  constructor(private superadmin: Superadmin, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ✅ Get employees from backend with pagination
  loadEmployees() {
    this.superadmin.getAllEmployees(this.currentPage, this.entriesPerPage).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.employees = res.data || [];
          this.totalEmployees = res.pagination?.total || 0;
          this.totalPages = res.pagination?.totalPages || 1;
          this.currentPage = res.pagination?.page || 1;
        } else {
          this.employees = [];
        }
      },
      error: (err) => console.error('Failed to fetch employees:', err),
    });
  }

  // ✅ Search filter (only frontend filtering)
  get filteredEmployees() {
    const search = this.searchQuery.toLowerCase();
    if (!search) return this.employees;

    return this.employees.filter(
      (emp) =>
        `${emp.first_name ?? ''} ${emp.middle_name ?? ''} ${emp.last_name ?? ''}`
          .toLowerCase()
          .includes(search) ||
        emp.company_email?.toLowerCase().includes(search)
    );
  }

  // ✅ Pagination controls (backend call)
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEmployees();
    }
  }
  get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployees();
    }
  }

  onEntriesPerPageChange() {
    this.currentPage = 1;
    this.loadEmployees();
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  // ✅ Navigation
  goToRegistration(): void {
    this.router.navigate(['/superadmin/registration']);
  }

 goToUpdateInfo(emp: any): void {
  this.router.navigate(['/superadmin/updateinfo', emp._id || emp.id || emp.employee_id]);
}


  goToTeamHierarchy() {
    this.router.navigate(['/superadmin/teamhierarchy']);
  }

  // ✅ Status Modal
  openStatusModal(emp: any) {
    this.selectedEmployee = emp;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEmployee = null;
  }

  confirmToggleStatus() {
    const updatedStatus = !this.selectedEmployee.is_active;
    this.selectedEmployee.is_active = updatedStatus;
    this.closeModal();
  }

  // ✅ Bulk Import
  openBulkImportModal() {
    this.showBulkImportModal = true;
    this.showImportResultModal = false;
  }

  closeBulkImportModal() {
    this.showBulkImportModal = false;
  }

  processImport() {
    this.showBulkImportModal = false;
    this.showImportResultModal = true;
  }

  closeImportResultModal() {
    this.showImportResultModal = false;
  }

  restartBulkImport() {
    this.showImportResultModal = false;
    this.showBulkImportModal = true;
  }

  // ✅ Download Employee List
  downloadEmployeeList() {
    this.superadmin.downloadEmployeeListService().subscribe({
      next: (res: Blob) => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Failed to download employee list:', err),
    });
  }
}
