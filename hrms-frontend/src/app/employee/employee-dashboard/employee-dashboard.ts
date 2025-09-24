import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/services/user'; // adjust path if needed

@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard implements OnInit {
  attendanceStatus: 'present' | 'late' | 'not_checked' | 'leave' | 'weekly_off' = 'not_checked';
  checkInTime: string = '09:25AM';

  tasks: string[] = [];
  newTaskTitle = '';
  editingIndex: number = -1;
  isEditing = false;
  showAddTaskPopup = false;

  constructor(private userService: User) {}

  ngOnInit() {
    this.loadTasks();
    this.setAttendanceStatus();
  }

  loadTasks() {
    this.userService.getMyTasks().subscribe({
      next: (res) => {
        console.log('My Tasks Response:', res);
        if (res.success && Array.isArray(res.data)) {
          this.tasks = res.data;
        }
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
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
      this.attendanceStatus = hour < 9 || (hour === 9 && minutes <= 30) ? 'present' : 'late';
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
      this.tasks[this.editingIndex] = title;
    } else {
      this.tasks.push(title);
    }

    this.closeAddTaskPopup();
  }

  editTask(index: number) {
    this.editingIndex = index;
    this.newTaskTitle = this.tasks[index];
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
