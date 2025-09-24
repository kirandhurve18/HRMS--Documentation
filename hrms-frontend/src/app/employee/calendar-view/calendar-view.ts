import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { addMonths, subMonths } from 'date-fns';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './calendar-view.html',
  styleUrls: ['./calendar-view.css']
})
export class CalendarView {
  viewDate: Date = new Date();
  refresh: Subject<void> = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Present',
      allDay: true,
      color: { primary: '#28a745', secondary: '#D4EDDA' }
    }
  ];

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.refresh.next();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.refresh.next();
  }
}
