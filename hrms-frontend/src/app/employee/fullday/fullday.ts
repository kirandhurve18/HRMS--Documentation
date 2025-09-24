import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fullday',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fullday.html',
  styleUrl: './fullday.css'
})
export class Fullday implements OnInit {
  leaveType: string = 'fullDay';
  selectedTab: string = 'apply';
     employeeleave: any[] = [
    { leaveType: 'Paid Leave', Taken: '0', Available: '3', Total: '3' },
    { leaveType: 'Sick Leave', Taken: '0', Available: '6', Total: '0' },
    { leaveType: 'Unpaid Leave', Taken: '0', Available: '6', Total: '0' },
    { leaveType: 'Half Day', Taken: '0', Available: '0', Total: '0' },
    { leaveType: 'Comp Off', Taken: '0', Available: '6', Total: '0' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedTab = params['tab'] || 'apply';
    });
  }

  selectTab(tab: string) {
    if (tab === 'status') {
      this.router.navigate(['/employee/leavemanagement'], { queryParams: { tab: 'status' } });
    } else if (tab === 'apply') {
      this.router.navigate(['/employee/fullday'], { queryParams: { tab: 'apply' } });
    }
  }

  onLeaveTypeChange() {
    if (this.leaveType === 'halfDay') {
      this.router.navigate(['/employee/halfday'], { queryParams: { tab: 'apply' } });
    }
  }
startDate: string = '';
endDate: string = '';
selectedLeaveType: string = '';
reason: string = '';
submitLeave() {
  const submittedData = {
    applyDate: new Date().toLocaleDateString(),
    el: '',
    leaveType: this.selectedLeaveType || 'N/A',
    startDate: this.startDate,
    endDate: this.endDate,
    paid: '', 
    unpaid: '', 
    totalDays: this.calculateDays(),
    reason: this.reason,
    status: 'Pending'
  };

  this.router.navigate(['/employee/leavemanagement'], {
    queryParams: { tab: 'status' },
    state: { newLeave: submittedData }
  });
}

calculateDays(): string {
  if (this.startDate && this.endDate) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff.toString() : '0';
  }
  return '0';
}



}
