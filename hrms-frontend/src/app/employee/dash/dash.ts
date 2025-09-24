import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dash.html',
  styleUrl: './dash.css'
})
export class Dash {
  // isSidebarCollapsed = false;

  // toggleSidebar() {
  //   this.isSidebarCollapsed = !this.isSidebarCollapsed;
  // }

  // menuItems = [
  //   { label: 'Dashboard', link: '/dashboard', icon: 'tachometer-alt-solid 1.svg' },
  //   { label: 'Mark Attendance', link: '/timesheet', icon: 'fingerprint_565512 1.svg' },
  //   { label: 'Festival Leave', link: '/festivalleave', icon: 'gift-solid 1.svg' },
  //   { label: 'Leave Management', link: '/leavemanagement', icon: 'plane-departure-solid 1.svg' },
  //   { label: 'Rewards & Recognition', link: '/rnr', icon: 'award-solid 1.svg' },
  //   { label: 'Today’s Timesheet', link: '/timesheet', icon: 'clock-solid 1.svg' },
  //   { label: 'Work History', link: '/workhistory', icon: 'briefcase-solid 1.svg' },
  //   { label: 'Timesheet History', link: '/timesheethistory', icon: 'calendar-days-solid 1.svg' },

  // ];
}
