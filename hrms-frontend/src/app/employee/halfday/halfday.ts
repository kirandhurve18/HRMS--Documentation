import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-halfday',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './halfday.html',
  styleUrl: './halfday.css'
})
export class Halfday implements OnInit {
  leaveType: string = 'halfDay';
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
      this.router.navigate(['/employee/halfday'], { queryParams: { tab: 'apply' } });
    }
  }

  onLeaveTypeChange() {
    if (this.leaveType === 'fullDay') {
      this.router.navigate(['/employee/fullday'], { queryParams: { tab: 'apply' } });
    }
  }

   submitLeave() {
  const submittedData = {
    srNo: 1,
    applyDate: new Date().toLocaleDateString(),
    el: '',
    leaveType: 'Full Day',
    startDate: '',
    endDate: '',  
    unpaid: '',   
    totalDays: '',
    reason: '',   
    status: 'Pending'
  };

  this.router.navigate(['/employee/leavemanagement'], {
    queryParams: { tab: 'status' },
    state: { newLeave: submittedData }
  });
}
}
