
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Superadmin } from '../../core/services/superadmin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './superadmin-dashboard.html',
  styleUrls: ['./superadmin-dashboard.css']
})
export class SuperadminDashboard implements OnInit {
presentCount: number = 0;
lateCount: number = 0;
onTimeCount: number = 0;   // added
onLeaveCount: number = 0;


  role: string = 'admin';
  attendanceStatus: 'present' | 'late' | 'not_checked' | 'leave' | 'weekly_off' = 'not_checked';
  checkInTime: string = '09:35AM';

  tasks: string[] = [];
  newTaskTitle = '';
  editingIndex: number = -1;
  isEditing = false;
  showAddTaskPopup = false;

  employeeLeaveData: any[] = [];
  employeeBirthdayOrWorkAnniversaryData: any[] = [];

  approvalPendings = {
    timeSheets: 0,
    leave_request: 0,
    leaves_pendings_reviewer_approval: 0
  };
  router: any;

  constructor(private superadmin: Superadmin) {}

  ngOnInit(): void {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();

    if (day === 0 || day === 6) {
      this.attendanceStatus = 'weekly_off';
    } else if (this.isOnLeaveToday()) {
      this.attendanceStatus = 'leave';
    } else if (this.isCheckedIn()) {
      this.attendanceStatus = (hour < 9 || (hour === 9 && minutes <= 30)) ? 'present' : 'late';
    } else {
      this.attendanceStatus = 'not_checked';
    }

    this.loadAttendanceSummary();
    this.loadTasks();
    this.loadEmployeesOnLeaveToday();
    // this.loadUpcomingBirthdaysAndAnniversaries();
    this.loadApprovalPendings();
  }

  openAddTaskPopup(): void {
    this.showAddTaskPopup = true;
    this.newTaskTitle = '';
    this.isEditing = false;
    this.editingIndex = -1;
  }

  closeAddTaskPopup(): void {
    this.showAddTaskPopup = false;
    this.newTaskTitle = '';
    this.isEditing = false;
    this.editingIndex = -1;
  }

  editTask(index: number): void {
    this.editingIndex = index;
    this.newTaskTitle = this.tasks[index];
    this.isEditing = true;
    this.showAddTaskPopup = true;
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  submitTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    if (this.isEditing && this.editingIndex !== -1) {
      this.tasks[this.editingIndex] = title;
    } else {
      this.tasks.push(title);
    }

    this.closeAddTaskPopup();
  }


  isCheckedIn(): boolean {
    return true;
  }

  isOnLeaveToday(): boolean {
    return false;
  }


loadAttendanceSummary(): void {
  this.superadmin.getAttendanceSummary().subscribe({
    next: (res) => {
      if (res?.success) {
        this.presentCount = res.total_present || 0;
        this.lateCount = res.late_count || 0;
        this.onTimeCount = res.on_time_count || 0;
        // leave not provided in API, set default 0
        this.onLeaveCount = res.on_leave_count || 0; 
      } else {
        console.warn('Attendance summary response missing data');
      }
    },
    error: (err) => {
      console.error('Failed to fetch attendance summary:', err);
    }
  });
}



  loadTasks(): void {
    this.superadmin.getMyTasks().subscribe({
      next: (res) => {
        if (res?.success && res?.data) {
          this.tasks = res.data;
        } else {
          console.warn('Tasks response missing data');
          this.tasks = [];
        }
      },
      error: (err) => {
        console.error('Failed to fetch tasks:', err);
      }
    });
  }

  loadEmployeesOnLeaveToday(): void {
    this.superadmin.getEmployeesOnLeaveToday().subscribe({
      next: (res) => {
        if (res?.success && res?.data) {
          this.employeeLeaveData = res.data.map((emp: any) => ({
            name: `${emp.first_name} ${emp.middle_name} ${emp.last_name}`,
            department: emp.department,
            startDate: emp.start_date,
            endDate: emp.end_date
          }));
        } else {
          console.warn('Leave data not found');
          this.employeeLeaveData = [];
        }
      },
      error: (err) => {
        console.error('Failed to fetch employees on leave today:', err);
      }
    });
  }

  // loadUpcomingBirthdaysAndAnniversaries(): void {
  //   this.superadmin.getUpcomingBirthdaysAndAnniversaries().subscribe({
  //     next: (res) => {
  //       if (res?.success && res?.data) {
  //         this.employeeBirthdayOrWorkAnniversaryData = res.data.map((emp: any) => ({
  //           name: `${emp.first_name} ${emp.middle_name} ${emp.last_name}`,
  //           department: emp.department,
  //           Type: emp.Type,
  //           Date: emp.date
  //         }));
  //       } else {
  //         console.warn('No data found for birthdays/anniversaries');
  //         this.employeeBirthdayOrWorkAnniversaryData = [];
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error loading upcoming birthdays/anniversaries:', err);
  //     }
  //   });
  // }


  loadApprovalPendings(): void {
    this.superadmin.getApprovalPendings().subscribe({
      next: (res) => {
        if (res?.success && res?.data) {
          this.approvalPendings = {
            timeSheets: res.data.timeSheets || 0,
            leave_request: res.data.leave_request || 0,
            leaves_pendings_reviewer_approval: res.data.leaves_pendings_reviewer_approval || 0
          };
        } else {
          console.warn('No approval pending data found.');
          this.approvalPendings = { timeSheets: 0, leave_request: 0, leaves_pendings_reviewer_approval: 0 };
        }
      },
      error: (err) => {
        console.error('Failed to load approval pendings:', err);
      }
    });
  }

  navigateToSummary(type: string) {
  this.router.navigate(['/attendance-summary'], { queryParams: { filter: type } });
}
}
