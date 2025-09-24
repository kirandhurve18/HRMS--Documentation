import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-festivalleave',
  imports: [CommonModule,FormsModule],
  templateUrl: './festivalleave.html',
  styleUrl: './festivalleave.css'
})
export class Festivalleave {
    searchTerm: string = '';
  entriesToShow: number = 10;

  festivals = [
    { sr: 1, name: 'New Year', date: '01-Jan-2025', day: 'Wednesday' },
    { sr: 2, name: 'Republic Day', date: '26-Jan-2025', day: 'Sunday' },
    { sr: 3, name: 'Holi', date: '14-Mar-2025', day: 'Friday' },
    { sr: 4, name: 'Gudi Padwa', date: '30-Mar-2025', day: 'Saturday' },
    { sr: 5, name: 'Maharashtra Day', date: '01-May-2025', day: 'Thursday' },
    { sr: 6, name: 'Independence Day', date: '15-Aug-2025', day: 'Friday' },
    { sr: 7, name: 'Ganesh Chaturthi', date: '27-Aug-2025', day: 'Wednesday' },
    { sr: 8, name: 'Anant Chaturdashi', date: '06-Sep-2025', day: 'Saturday' },
    { sr: 9, name: 'Mahatma Gandhi Jayanti', date: '02-Oct-2025', day: 'Thursday' },
    { sr: 10, name: 'Dussehra', date: '02-Oct-2025', day: 'Thursday' },
    { sr: 11, name: 'Diwali', date: '20-Oct-2025', day: 'Monday' },
    { sr: 12, name: 'Diwali', date: '21-Oct-2025', day: 'Tuesday' },
    { sr: 13, name: 'Diwali', date: '22-Oct-2025', day: 'Wednesday' },
    { sr: 14, name: 'Christmas Day', date: '25-Dec-2025', day: 'Thursday' },


  ];

  get filteredFestivals() {
    const searchLower = this.searchTerm.toLowerCase();

    const filtered = this.festivals.filter(fest =>
      fest.name.toLowerCase().includes(searchLower) ||
      fest.date.toLowerCase().includes(searchLower) ||
      fest.day.toLowerCase().includes(searchLower)
    );

    return filtered.slice(0, this.entriesToShow);
  }
  
}
