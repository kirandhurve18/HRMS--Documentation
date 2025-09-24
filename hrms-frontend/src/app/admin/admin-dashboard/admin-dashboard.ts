import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit {
  attendanceStatus: 'present' | 'late' | 'not_checked' | 'leave' | 'weekly_off' = 'not_checked';
  checkInTime: string = '09:25AM';

  tasks: any[] = []; 
  newTaskTitle = '';
  editingIndex: number = -1;
  isEditing = false;
  showAddTaskPopup = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.setAttendanceStatus();
    this.fetchAdminTasks();
  }

  fetchAdminTasks() {
    this.adminService.getAdminTasks().subscribe({
      next: (res) => {
        this.tasks = res?.data || [];
        console.log('Admin tasks fetched:', this.tasks);
      },
      error: (err) => {
        console.error('Failed to load admin tasks:', err);
      },
    });
  }

  setAttendanceStatus() {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();

    if (day === 0 || day === 6) {
      this.attendanceStatus = 'weekly_off';
    } else if (this.isOnLeaveToday()) {
      this.attendanceStatus = 'leave';
    } else if (this.isCheckedIn()) {
      if (hour < 9 || (hour === 9 && minutes <= 30)) {
        this.attendanceStatus = 'present';
      } else {
        this.attendanceStatus = 'late';
      }
    } else {
      this.attendanceStatus = 'not_checked';
    }
  }

  openAddTaskPopup() {
    this.showAddTaskPopup = true;
    this.newTaskTitle = '';
    this.editingIndex = -1;
    this.isEditing = false;
  }

  closeAddTaskPopup() {
    this.showAddTaskPopup = false;
    this.newTaskTitle = '';
    this.editingIndex = -1;
    this.isEditing = false;
  }

  submitTask() {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    if (this.isEditing && this.editingIndex !== -1) {
      this.tasks[this.editingIndex].title = title;
    } else {
      this.tasks.push({ title }); 
    }

    this.closeAddTaskPopup();
  }

  editTask(index: number) {
    this.editingIndex = index;
    this.newTaskTitle = this.tasks[index].title;
    this.isEditing = true;
    this.showAddTaskPopup = true;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  isCheckedIn(): boolean {
    return true;
  }

  isOnLeaveToday(): boolean {
    return false;
  }
}
