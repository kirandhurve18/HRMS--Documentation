import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-leavemanagement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leavemanagement.html',
  styleUrl: './leavemanagement.css'
})
export class Leavemanagement implements OnInit {
  selectedTab: string = 'status';
  leaveData: any[] = [];

  popupVisible = false;
  leaveToDelete: any = null;

  viewPopupVisible = false;
  selectedLeave: any = null;

  employeeleave: any[] = [
    { leaveType: 'Paid Leave', Taken: '0', Available: '3', Total: '3' },
    { leaveType: 'Sick Leave', Taken: '0', Available: '6', Total: '0' },
    { leaveType: 'Unpaid Leave', Taken: '0', Available: '6', Total: '0' },
    { leaveType: 'Half Day', Taken: '0', Available: '0', Total: '0' },
    { leaveType: 'Comp Off', Taken: '0', Available: '6', Total: '0' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.selectedTab = params['tab'];
      }
    });

    const storedLeaves = localStorage.getItem('allLeaves');
    this.leaveData = storedLeaves ? JSON.parse(storedLeaves) : [];

    const navState = this.location.getState() as any;
    if (navState?.newLeave) {
      this.leaveData.push(navState.newLeave);
      localStorage.setItem('allLeaves', JSON.stringify(this.leaveData));
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    if (tab === 'apply') {
      this.router.navigate(['/employee/fullday'], { queryParams: { tab: 'apply' } });
    } else {
      this.router.navigate(['/employee/leavemanagement'], { queryParams: { tab: 'status' } });
    }
  }

  openDeletePopup(leave: any) {
    this.leaveToDelete = leave;
    this.popupVisible = true;
  }

  closePopup() {
    this.popupVisible = false;
    this.leaveToDelete = null;
  }

  confirmDeleteLeave() {
    if (this.leaveToDelete) {
      this.leaveData = this.leaveData.filter(l => l !== this.leaveToDelete);
      localStorage.setItem('allLeaves', JSON.stringify(this.leaveData));
      this.closePopup();
    }
  }

  viewLeave(leave: any) {
    this.selectedLeave = leave;
    this.viewPopupVisible = true;
  }

  closeViewPopup() {
    this.viewPopupVisible = false;
    this.selectedLeave = null;
  }
}
