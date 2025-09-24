import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-summary',
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-summary.html',
  styleUrl: './leave-summary.css',
})
export class LeaveSummary {
  activeTab = 'active';
  searchEmployee = '';
  activeLeavesData = [
    {
      sno: 1,
      employeeName: 'John Doe',
      department: 'IT',
      applyDate: '2021-01-01',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Approved',
    },
    {
      sno: 2,
      employeeName: 'Jane Smith',
      department: 'HR',
      applyDate: '2021-01-02',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Rejected',
    },
    {
      sno: 3,
      employeeName: 'Jim Beam',
      department: 'HR',
      applyDate: '2021-01-03',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Cancelled',
    },
    {
      sno: 4,
      employeeName: 'John Doe',
      department: 'IT',
      applyDate: '2021-01-01',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Pending',
    },
  ];
  pastLeavesData = [
    {
      sno: 1,
      employeeName: 'John Doe',
      department: 'IT',
      applyDate: '2021-01-01',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Approved',
    },
    {
      sno: 2,
      employeeName: 'Jane Smith',
      department: 'HR',
      applyDate: '2021-01-02',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Rejected',
    },
    {
      sno: 3,
      employeeName: 'Jim Beam',
      department: 'HR',
      applyDate: '2021-01-03',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Cancelled',
    },
    {
      sno: 4,
      employeeName: 'John Doe',
      department: 'IT',
      applyDate: '2021-01-01',
      el: '10',
      leaveType: 'Casual Leave',
      startDate: '2021-01-01',
      endDate: '2021-01-05',
      paid: '10',
      unpaid: '0',
      noOfDays: '10',
      reason: 'Personal',
      status: 'Pending',
    },
  ];
  summaryYear = 2025;
  leavesSummaryData = [
    {
      employeeId: 1,
      employeeName: 'John Doe',
      department: 'IT',
      designation: 'Software Engineer',
      casualLeaves: 10,
      paidLeaves: 10,
      sickLeaves: 10,
      totalLeaves: 10,
    },
    {
      employeeId: 2,
      employeeName: 'Jane Smith',
      department: 'HR',
      designation: 'HR Manager',
      casualLeaves: 10,
      paidLeaves: 10,
      sickLeaves: 10,
      totalLeaves: 10,
    },
    {
      employeeId: 3,
      employeeName: 'Jim Beam',
      department: 'HR',
      designation: 'HR Manager',
      casualLeaves: 10,
      paidLeaves: 10,
      sickLeaves: 10,
      totalLeaves: 10,
    },
    {
      employeeId: 4,
      employeeName: 'John Doe',
      department: 'IT',
      designation: 'Software Engineer',
      casualLeaves: 10,
      paidLeaves: 10,
      sickLeaves: 10,
      totalLeaves: 10,
    },
  ];
  getStatusBgColor(status: string) {
    if (status === 'Pending') {
      return '#FFA500';
    } else if (status === 'Approved') {
      return '#28A745';
    } else if (status === 'Rejected') {
      return '#DC3545';
    } else if (status === 'Cancelled') {
      return '#6C757D';
    }
    return '#fff';
  }
  getHeadingFromActiveTab() {
    if (this.activeTab === 'active') {
      return 'Active Leaves';
    } else if (this.activeTab === 'past') {
      return 'Past Leaves';
    } else if (this.activeTab === 'summary') {
      return 'Leave Report Summary for the Year :';
    }
    return '';
  }
  increaseSummaryYear() {
    this.summaryYear++;
    // call api to get the data for the new year
  }
  decreaseSummaryYear() {
    this.summaryYear--;
    // call api to get the data for the new year
  }
  searchEmployeeChange() {
    console.log(this.searchEmployee);
    //call api to get filtered data
  }
}
