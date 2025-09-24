import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-report.html',
  styleUrl: './attendance-report.css',
})
export class AttendanceReport {
  constructor(private router: Router) {}
  entriesToShow = 5;
  searchTerm = '';
  attendanceReportData: any[] = [
    {
      SNo: 1,
      name: 'John Doe',
      checkInDate: '2025-01-01',
      checkInTime: '10:00 AM',
      checkInLocation: 'New York',
      checkOutDate: '2025-01-01',
      checkOutTime: '10:00 AM',
      checkOutLocation: 'New York',
      latLong: '192.168.1.1',
      currentStatus: 'Present',
    },
    {
      SNo: 2,
      name: 'Jane Doe',
      checkInDate: '2025-01-01',
      checkInTime: '10:00 AM',
      checkInLocation: 'New York',
      checkOutDate: '2025-01-01',
      checkOutTime: '10:00 AM',
      checkOutLocation: 'New York',
      latLong: '192.168.1.1',
      currentStatus: 'Present',
    },
    {
      SNo: 3,
      name: 'John Doe',
      checkInDate: '2025-01-01',
      checkInTime: '10:00 AM',
      checkInLocation: 'New York',
      checkOutDate: '2025-01-01',
      checkOutTime: '10:00 AM',
      checkOutLocation: 'New York',
      latLong: '192.168.1.1',
      currentStatus: 'Present',
    },
    {
      SNo: 4,
      name: 'John Doe',
      checkInDate: '2025-01-01',
      checkInTime: '10:00 AM',
      checkInLocation: 'New York',
      checkOutDate: '2025-01-01',
      checkOutTime: '10:00 AM',
      checkOutLocation: 'New York',
      latLong: '192.168.1.1',
      currentStatus: 'Present',
    },
  ];
  absenteesData: any[] = [
    {
      SNo: 1,
      name: 'John Doe',
      whatsappNumber: '1234567890',
    },
    {
      SNo: 2,
      name: 'Jane Doe',
      whatsappNumber: '1234567890',
    },
    {
      SNo: 3,
      name: 'John Doe',
      whatsappNumber: '1234567890',
    },
    {
      SNo: 4,
      name: 'John Doe',
      whatsappNumber: '1234567890',
    },
  ];
  navigateToEmployeeAttendanceReport() {
    this.router.navigate(['/superadmin/individual-attendance-report']);
  }
}
