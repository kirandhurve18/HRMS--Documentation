import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave',
  imports: [CommonModule, FormsModule],
  templateUrl: './leave.html',
  styleUrl: './leave.css',
})
export class Leave {
  constructor(private router: Router) {}
  leaveData: any[] = [
    {
      srno: 1,
      applyDate: '2025-01-01',
      el: 1,
      leaveType: 'paid',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Family Wedding',
      status: 'Pending Manager',
    },
    {
      srno: 2,
      applyDate: '2025-01-01',
      el: 1,
      leaveType: 'paid',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Office Trip',
      status: 'Approved Reviewer',
    },
    {
      srno: 3,
      applyDate: '2025-01-01',
      el: 1,
      leaveType: 'paid',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Reason',
      status: 'Rejected Reviewer',
    },
    {
      srno: 4,
      applyDate: '2025-01-01',
      el: 1,
      leaveType: 'paid',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Reason',
      status: 'Cancelled',
    },
    {
      srno: 4,
      applyDate: '2025-01-01',
      el: 1,
      leaveType: 'paid',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Reason',
      status: 'Cancelled',
    },
    {
      srno: 4,
      applyDate: '2025-01-01',
      el: 1,
      leaveType: 'paid',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Reason',
      status: 'Cancelled',
    },
    {
      srno: 4,
      applyDate: '2025-01-01',
      el: 1,
      leaveType: 'paid',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Reason',
      status: 'Cancelled',
    },
  ];
  myTeamLeaveData: any[] = [
    {
      name: 'Vibha Shinde',
      el: 1,
      leaveType: 'paid',
      applyDate: '2025-01-01',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Family Wedding',
      status: 'Pending Manager',
    },
    {
      name: 'John Doe',
      el: 1,
      leaveType: 'paid',
      applyDate: '2025-01-01',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Office Trip',
      status: 'Approved Reviewer',
    },
    {
      name: 'John Doe',
      el: 1,
      leaveType: 'paid',
      applyDate: '2025-01-01',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Office Trip',
      status: 'Rejected Reviewer',
    },
    {
      name: 'John Doe',
      el: 1,
      leaveType: 'paid',
      applyDate: '2025-01-01',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      totalDays: 1,
      reason: 'Reason',
      status: 'Cancelled',
    },
  ];

  selectedTab: string = 'status';
  showViewDetailsModal: boolean = false;
  showApplyLeaveForTeamMemberModal: boolean = false;
  applyDate: string = '';
  selectedLeave: any = null;
  leaveType: string = 'fullDay';
  showReviewLeaveRequestModal: boolean = false;
  selectedReviewLeave: any = null;
  showRejectLeaveRequestModal: boolean = false;
  selectedRejectLeave: any = null;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  leaveSummaryData = [
    { type: 'Paid ', taken: 0, available: 3, total: 10 },
    { type: 'Sick', taken: 0, available: 6, total: 10 },
    { type: 'Unpaid', taken: 2, available: 0, total: 10 },
    { type: 'Half Day', taken: 0, available: 0, total: 10 },
    { type: 'Comp Off', taken: 0, available: 0, total: 10 },
  ];

  upcomingLeaveData = [
    {
      name: 'Khushi Dubey',
      designation: 'Content Writer',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
    {
      name: 'Khushi Dubey',
      designation: 'Content Writer',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
    {
      name: 'Khushi Dubey',
      designation: 'Content Writer',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
  ];

  getStatusBgColor(status: string) {
    if (status === 'Pending Manager') {
      return '#FFA500';
    } else if (status === 'Approved Reviewer') {
      return '#28A745';
    } else if (status === 'Rejected Reviewer') {
      return '#DC3545';
    } else if (status === 'Cancelled') {
      return '#6C757D';
    }
    return '#fff';
  }

  viewLeaveDetails(leave: any) {
    this.selectedLeave = leave;
    this.showViewDetailsModal = true;
  }
  closeViewDetailsModal() {
    this.showViewDetailsModal = false;
  }
  onLeaveTypeChange() {
    console.log(this.leaveType);
  }
  applyLeaveForTeamMember() {
    this.showApplyLeaveForTeamMemberModal = true;
  }
  closeApplyLeaveForTeamMemberModal() {
    this.showApplyLeaveForTeamMemberModal = false;
  }
  reviewLeaveRequest(leave: any) {
    this.selectedReviewLeave = leave;
    this.showReviewLeaveRequestModal = true;
  }
  closeReviewLeaveRequestModal() {
    this.showReviewLeaveRequestModal = false;
  }
  rejectLeaveRequest(leave: any) {
    this.selectedRejectLeave = leave;
    this.showRejectLeaveRequestModal = true;
  }
  closeRejectLeaveRequestModal() {
    this.showRejectLeaveRequestModal = false;
  }
}
