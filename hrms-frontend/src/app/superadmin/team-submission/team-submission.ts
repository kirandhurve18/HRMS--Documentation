import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-submission',
  imports: [CommonModule,FormsModule],
  templateUrl: './team-submission.html',
  styleUrl: './team-submission.css'
})
export class TeamSubmission {
searchTerm: string = '';
  entriesToShow: number = 5;
  employees: any[] = [
    {
      sr: 1,
      name: 'John Doe',
      mobile: '1234567890',
      reportStatus: 'Submitted',
      action: 'View',
    },
    {
      sr: 2,
      name: 'Jane Smith',
      mobile: '0987654321',
      reportStatus: 'Not Submitted',
      action: 'View',
    },
    {
      sr: 3,
      name: 'Jim Beam',
      mobile: '1234567890',
      reportStatus: 'Approved',
      action: 'View',
    },
    {
      sr: 4,
      name: 'John Doe',
      mobile: '1234567890',
      reportStatus: 'N.A.',
      action: 'View',
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'Submitted':
        return '#FFA500';
      case 'Not Submitted':
        return '#F3523C';
      case 'Approved':
        return '#28A745';
      default:
        return '#000000';
    }
  }
}
