import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-attendance-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './individual-attendance-report.html',
  styleUrl: './individual-attendance-report.css',
})
export class IndividualAttendanceReport {
  constructor(private router: Router) {}
  attendanceReportData = [
    {
      SNo: 1,
      checkInDate: '2021-01-01',
      checkInTime: '09:00',
      checkInLocation: 'Location 1',
      checkOutDate: '2021-01-01',
      checkOutTime: '18:00',
      checkOutLocation: 'Location 2',
    },
    {
      SNo: 2,
      checkInDate: '2021-01-01',
      checkInTime: '09:00',
      checkInLocation: 'Location 1',
      checkOutDate: '2021-01-01',
      checkOutTime: '18:00',
      checkOutLocation: 'Location 2',
    },
    {
      SNo: 3,
      checkInDate: '2021-01-01',
      checkInTime: '09:00',
      checkInLocation: 'Location 1',
      checkOutDate: '2021-01-01',
      checkOutTime: '18:00',
      checkOutLocation: 'Location 2',
    },
    {
      SNo: 4,
      checkInDate: '2021-01-01',
      checkInTime: '09:00',
      checkInLocation: 'Location 1',
      checkOutDate: '2021-01-01',
      checkOutTime: '18:00',
      checkOutLocation: 'Location 2',
    },
    {
      SNo: 5,
      checkInDate: '2021-01-01',
      checkInTime: '09:00',
      checkInLocation: 'Location 1',
      checkOutDate: '2021-01-01',
      checkOutTime: '18:00',
      checkOutLocation: 'Location 2',
    },
  ];
  employeeList = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'John Smith',
    },
  ];
  searchTerm: any;
  entriesToShow = 5;
  navigateToDailyAttendance() {
    this.router.navigate(['/superadmin/attendance-report']);
  }
}
