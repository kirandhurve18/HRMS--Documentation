import { Routes } from '@angular/router';
import { Layout } from './layout/layout'; // Employee layout

// Import standalone components
import { EmployeeDashboard } from './employee-dashboard/employee-dashboard';
import { Festivalleave } from './festivalleave/festivalleave';
import { Timesheet } from './timesheet/timesheet';
import { Workhistory } from './workhistory/workhistory';
import { RNR } from './rnr/rnr';
import { Attendance } from './attendance/attendance';
import { CalendarView } from './calendar-view/calendar-view';
import { Leavemanagement } from './leavemanagement/leavemanagement';
import { Fullday } from './fullday/fullday';
import { Halfday } from './halfday/halfday';
import { Timesheethistory } from './timesheethistory/timesheethistory';
import { Termsandconditions } from '../auth/termsandconditions/termsandconditions';
import { Privacyandpolicy } from '../auth/privacyandpolicy/privacyandpolicy';
import { Remoteagreement } from '../superadmin/remoteagreement/remoteagreement';

export const userRoutes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EmployeeDashboard },
      { path: 'festivalleave', component: Festivalleave },
      { path: 'timesheet', component: Timesheet },
      { path: 'workhistory', component: Workhistory },
      { path: 'rnr', component: RNR },
      { path: 'attendance', component: Attendance },
      { path: 'calender-view', component: CalendarView },
      { path: 'leavemanagement', component: Leavemanagement },
      { path: 'fullday', component: Fullday },
      { path: 'halfday', component: Halfday },
      {path:'termsandconditions',component : Termsandconditions},
      {path:'privacyandpolicy',component : Privacyandpolicy},
      {path:'timesheethistory',component:Timesheethistory},
      {path:'remoteagreement',component:Remoteagreement}
    ]
  }
];
