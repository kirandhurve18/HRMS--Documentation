import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Superadmin } from '../../core/services/superadmin';
import { ToastrService } from 'ngx-toastr';

interface WorkLog {
  startTime: string;
  endTime: string;
  task?: string;
}

interface TimesheetData {
  date: string;
  employee: string;
  submitStatus: number;
  workLogs: { hourSlot: string; task: string }[];
}

interface TimesheetResponse {
  success: boolean;
  message?: string;
  data?: TimesheetData;
}

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './timesheet.html',
  styleUrls: ['./timesheet.css'],
})
export class Timesheet implements OnInit {
  isMobile = false;
  timesheetForm!: FormGroup;
  employeeId: string = localStorage.getItem('employee_id') || '';
  todayDate: string = new Date().toISOString().split('T')[0];
  loading = false;

  private fb = inject(FormBuilder);
  private superadmin = inject(Superadmin);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.onResize();
    this.initForm();

    if (!this.employeeId) {
      this.toastr.error('Employee ID not found. Please login again.');
      return;
    }

    // ✅ Removed auto getWorkReport call
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  /** ✅ Initialize form with slots */
  private initForm(): void {
    this.timesheetForm = this.fb.group({
      date: [this.todayDate],
      employee: [this.employeeId],
      submitStatus: [1],
      workLogs: this.fb.array([]),
    });

    this.generateTimeSlots();
  }

  get workLogs(): FormArray<FormGroup> {
    return this.timesheetForm.get('workLogs') as FormArray<FormGroup>;
  }

  /** ✅ Generate fixed time slots 08:30 - 19:30 */
  private generateTimeSlots(): void {
    this.workLogs.clear();

    const start = 8.5; // 08:30
    const end = 19.5; // 19:30

    for (let t = start; t < end; t++) {
      const startHour = Math.floor(t);
      const startMin = (t % 1) * 60;
      const endHour = Math.floor(t + 1);
      const endMin = ((t + 1) % 1) * 60;

      const startTime = this.formatTime(startHour, startMin);
      const endTime = this.formatTime(endHour, endMin);

      this.workLogs.push(
        this.fb.group({
          startTime: [startTime],
          endTime: [endTime],
          task: [''],
        })
      );
    }
  }

  private formatTime(hour: number, minute: number): string {
    const h = hour.toString().padStart(2, '0');
    const m = minute.toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  /** ✅ Reset back to today's report */
  resetToToday(): void {
    this.timesheetForm.patchValue({ date: this.todayDate });
    this.getWorkReport(this.todayDate);
  }

  /** ✅ Fetch Work Report only on button click */
  getWorkReport(date: string): void {
    if (!date || !this.employeeId) return;
    this.loading = true;

    this.superadmin.getTimesheetByEmployee(this.employeeId, date).subscribe({
      next: (res: TimesheetResponse) => {
        this.generateTimeSlots();

        if (res.success && res.data?.workLogs?.length) {
          this.timesheetForm.patchValue({
            date,
            submitStatus: res.data.submitStatus || 1,
            employee: this.employeeId,
          });

          res.data.workLogs.forEach((savedLog: any) => {
            if (savedLog.hourSlot) {
              const [startTime, endTime] = savedLog.hourSlot.split('-');
              const slot = this.workLogs.controls.find(
                (ctrl) =>
                  ctrl.value.startTime === startTime &&
                  ctrl.value.endTime === endTime
              );
              if (slot) {
                slot.patchValue({ task: savedLog.task });
              }
            }
          });

          this.toastr.success('Work report fetched successfully');
        } else {
          this.toastr.info('No report found for this date');
        }
      },
      error: () => this.toastr.error('Error fetching report'),
      complete: () => (this.loading = false),
    });
  }

  /** ✅ Save / Submit Timesheet */
  saveTimesheet(status: number): void {
    const rawValue = this.timesheetForm.value;

    const formattedWorkLogs = rawValue.workLogs
      .filter((log: WorkLog) => log.task && log.task.trim() !== '')
      .map((log: WorkLog) => ({
        hourSlot: `${log.startTime}-${log.endTime}`,
        task: log.task,
      }));

    const payload: TimesheetData = {
      date: rawValue.date || this.todayDate,
      employee: this.employeeId || rawValue.employee,
      submitStatus: status,
      workLogs: formattedWorkLogs,
    };

    if (!payload.employee) {
      this.toastr.error('Employee ID is missing. Please login again.');
      return;
    }

    this.loading = true;

    this.superadmin.addTimesheet(payload).subscribe({
      next: (res: TimesheetResponse) => {
        if (res.success) {
          this.toastr.success(
            status === 1 ? 'Draft saved' : 'Timesheet submitted'
          );
        } else {
          this.toastr.error(res.message || 'Something went wrong');
        }
      },
      error: () => this.toastr.error('Error saving timesheet'),
      complete: () => {
        this.loading = false;
        if (status === 2) {
          this.getWorkReport(this.timesheetForm.value.date);
        }
      },
    });
  }
}
