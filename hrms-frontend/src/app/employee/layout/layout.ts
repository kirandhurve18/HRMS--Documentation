import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import {  AuthService } from '../../core/services/auth';

interface NavLink {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  isSidebarOpen = true;
  isMobile = false;
  full_name: string | null = '';
 role: string | null = '';
  navLinks: NavLink[] = [];

  constructor(private auth: AuthService, private router: Router) {
    this.updateDeviceView(); // initial check
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDeviceView();
  }

  ngOnInit() {
    this.full_name = localStorage.getItem('full_name');
    this.role = localStorage.getItem('role');
    this.setSidebarLinks();
  }

  updateDeviceView() {
    this.isMobile = window.innerWidth < 768;
    this.isSidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.auth.logout();
  }

  isActive(link: string): boolean {
    const currentUrl = this.router.url;
 if (link === '/superadmin/admin-settings') {
    return currentUrl.startsWith('/superadmin/admin-settings');
  }
  
    if (link === '/superadmin/employeeinfo') {
      return (
        currentUrl.startsWith('/superadmin/employeeinfo') ||
        currentUrl.startsWith('/superadmin/registration') ||
        currentUrl.startsWith('/superadmin/updateinfo') ||
        currentUrl.startsWith('/superadmin/teamhierarchy')
      );
    }

    if (link === '/superadmin/attendance-report') {
      return (
        currentUrl.startsWith('/superadmin/attendance-report') ||
        currentUrl.startsWith('/superadmin/individual-attendance-report')
      );
    }
    


    return currentUrl === link;
  }

  setSidebarLinks() {
    if (this.role === 'super-admin') {
      this.navLinks = [
        { label: 'Dashboard', link: '/superadmin/dashboard', icon: 'tachometer-alt-solid 1.svg' },
        { label: 'Employee Info', link: '/superadmin/employeeinfo', icon: 'id-badge-solid.svg' },
        { label: 'Festival Leave', link: '/superadmin/festival', icon: 'gift-solid 1.svg' },
        { label: 'Leave Management', link: '/superadmin/leave', icon: 'plane-departure-solid 1.svg' },
        { label: 'Leave Summary', link: '/superadmin/leave-summary', icon: 'calendar-check-solid 1 (1).svg' },
        { label: 'Rewards & Recognition', link: '/superadmin/rnr', icon: 'award-solid 1.svg' },
       
        { label: 'Attendance Report', link: '/superadmin/attendance-report', icon: 'calendar-check-solid 1.svg' },
        { label: 'Team Submissions', link: '/superadmin/team-submission', icon: 'users-solid (1).svg' },
        { label: 'Admin Settings', link: '/superadmin/admin-settings', icon: 'gear-solid 1 (2).svg' },
        
      ];
    } else {
      this.navLinks = [
        { label: 'Dashboard', link: '/employee/dashboard', icon: 'tachometer-alt-solid 1.svg' },
        { label: 'Mark Attendance', link: '/employee/attendance', icon: 'fingerprint_565512 1.svg' },
        { label: 'Festival Leave', link: '/employee/festivalleave', icon: 'gift-solid 1.svg' },
        { label: 'Leave Management', link: '/employee/leavemanagement', icon: 'plane-departure-solid 1.svg' },
        { label: 'Rewards & Recognition', link: '/employee/rnr', icon: 'award-solid 1.svg' },
        { label: 'Today’s Timesheet', link: '/employee/timesheet', icon: 'clock-solid 1.svg' },
        { label: 'Work History', link: '/employee/workhistory', icon: 'briefcase-solid 1.svg' },
        { label: 'Timesheet History', link: '/employee/timesheethistory', icon: 'calendar-days-solid 1.svg' },
        {label:'Remote Agreement',link:'/employee/remoteagreement', icon:'terms_conditions 1.png'}
      ];
    }
  }
}
