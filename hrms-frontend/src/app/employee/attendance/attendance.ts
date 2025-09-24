import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarCommonModule, CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { addMonths, subMonths } from 'date-fns';
import { CalendarWrapperModule } from '../shared/calendar-wrapper/calendar-wrapper-module';
import { Superadmin } from '../../core/services/superadmin';
import { AuthService } from '../../core/services/auth';
import moment from "moment-timezone";

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarCommonModule,
    CalendarWrapperModule,
  ],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css'],
})
export class Attendance implements OnInit {
  checkedIn = false;
  checkedOut = false;
  employee_id: string = '';

  checkInDate = "";
  checkOutDate = "";
  checkInTime = "";
  checkedOutTime = "";

  attendanceData: any[] = []; // API response
  attendanceMap: { [key: string]: any } = {};

  viewDate: Date = new Date();
  refresh: Subject<void> = new Subject<void>();

  events: CalendarEvent[] = [];

  holidays = [1, 5, 10];
  paidLeaves = [2, 12];
  unpaidLeaves = [3, 7];
  timesheetSubmitted = [4, 8, 9];

  constructor(
    private superadminService: Superadmin,
    private authService: AuthService
  ) { }

  // ---- Month navigation ----
  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    // console.log("this.viewDate --> ", this.viewDate);

    this.fetchAttendance();
    this.refresh.next();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.fetchAttendance();
    this.refresh.next();
  }

  // ---- Handle button click ----
  handleClick(): void {
    // console.log("this.checkedIn ---> ", this.checkedIn)
    // console.log("this.checkedOut ---> ", this.checkedOut)
    if (!this.checkedIn) {
      this.checkIn();
    } else if (this.checkedIn && !this.checkedOut) {
      this.checkOut();
    }
  }

  // ---- Check-In ----
  checkIn(): void {
    if (!this.employee_id) return;
    const payload = {
      employee_id: this.employee_id,
      checkin_location: 'Office',
      latitude: '18.520430',
      longitude: '73.856743',
    };

    console.log('📤 Sending check-in payload:', payload);

    this.superadminService.checkIn(payload).subscribe({
      next: (res) => {
        console.log('✅ Check-in successful:', res);
        this.checkedIn = true;

        this.events.push({
          start: new Date(),
          title: 'Present (Checked In)',
          allDay: true,
          color: { primary: '#28a745', secondary: '#D4EDDA' },
        });

        // this.saveStatus();
        this.refreshAttendance();
        this.refresh.next();
        alert('✅ Checked In Successfully');
      },
      error: (err) => {
        console.error('❌ Check-in failed:', err);
        alert(err?.error?.message || 'Check-in Failed');
      },
    });
  }

  // ---- Check-Out ----
  checkOut(): void {
    if (!this.employee_id) return;

    const payload = {
      employee_id: this.employee_id,
      checkout_location: 'Office',
      latitude: '18.520430',
      longitude: '73.856743',
    };

    console.log('📤 Sending check-out payload:', payload);

    this.superadminService.checkOut(payload).subscribe({
      next: (res) => {
        console.log('✅ Check-out successful:', res);
        this.checkedOut = true;

        this.events = this.events.map((event) =>
          event.start.toDateString() === new Date().toDateString()
            ? { ...event, title: 'Present (Checked Out)' }
            : event
        );

        // this.saveStatus();
        this.refreshAttendance();
        this.refresh.next();
        alert('✅ Checked Out Successfully');
      },
      error: (err) => {
        console.error('❌ Check-out failed:', err);
        alert(err?.error?.message || 'Check-out Failed');
      },
    });
  }

  // ---- Save status in localStorage ----
  private saveStatus(): void {
    localStorage.setItem(
      'attendanceStatus',
      JSON.stringify({
        checkedIn: this.checkedIn,
        checkedOut: this.checkedOut,
        date: new Date().toDateString(),
      })
    );
  }


  private refreshAttendance(): void {
    this.superadminService.getAttendance({ employee_id: this.employee_id }).subscribe({
      next: (res) => {
        // console.log('✅ Attendance Fetched:', res);
        let data = res.data || {}
        // this.checkedIn = true;
        this.checkedIn = data.checkin_time && true;
        this.checkedOut = data.checkout_time && true;
        this.checkInDate = data.checkin_date;
        this.checkOutDate = data.checkout_date;
        this.checkInTime = data.checkin_time;
        this.checkedOutTime = data.checkout_time;
      },
      error: (err) => {
        console.error('❌ Check-in failed:', err);
      },
    });
  }

  private fetchAttendance(month: void, year: void): void {
    console.log("this.viewDate --> ", this.viewDate);

    // use viewDate if available, else default to "now"
    const baseDate = this.viewDate ? moment(this.viewDate) : moment();

    const currentMonth = baseDate.tz("Asia/Kolkata").format("M");     // 1–12
    const currentYear = baseDate.tz("Asia/Kolkata").format("YYYY");   // 4-digit year

    this.superadminService.getMonthlyAttendance({
      employee_id: this.employee_id, month: currentMonth,
      year: currentYear
    }).subscribe({
      next: (res) => {
        console.log('✅ Monthly Attendance Fetched:', res);

        if (res.success && res.data) {
          this.attendanceMap = {};
          res.data.forEach((item: any) => {
            this.attendanceMap[item.date] = item;
          });
        }
      },
      error: (err) => {
        console.error('❌ Monthly Attendace failed:', err);
      },
    });
  }

  // ---- Button label ----
  getButtonLabel(): string {
    if (!this.checkedIn) return 'Check In';
    if (this.checkedIn && !this.checkedOut) return 'Check Out';
    return 'Checked Out';
  }

  // ---- Helpers for calendar display ----
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  isHoliday(date: Date): boolean {
    return this.holidays.includes(date.getDate());
  }

  isPaidLeave(date: Date): boolean {
    return this.paidLeaves.includes(date.getDate());
  }

  isUnpaidLeave(date: Date): boolean {
    return this.unpaidLeaves.includes(date.getDate());
  }

  isTimesheetSubmitted(date: Date): boolean {
    return this.timesheetSubmitted.includes(date.getDate());
  }



  getDateKey(date: Date): string {
    return moment(date).tz("Asia/Kolkata").format("YYYY-MM-DD");
  }


  ngOnInit(): void {
    console.log('🔍 Attendance component loaded');
    this.employee_id = this.authService.getEmployeeId();

    if (!this.employee_id) {
      alert('❌ No employee ID found. Please log in again.');
      return;
    }
    console.log('📌 Loaded employee_id:', this.employee_id);

    this.refreshAttendance();
    this.fetchAttendance();
  }

}
