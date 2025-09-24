import { Routes } from '@angular/router';
import { Layout } from '../employee/layout/layout';


import { SuperadminDashboard } from './superadmin-dashboard/superadmin-dashboard';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo';
import { Festival } from './festival/festival';
import { Registration } from './employeeinfo/registration/registration';
import { Leave } from './leave/leave';
import { Rnr } from './rnr/rnr';
import { LeaveSummary } from './leave-summary/leave-summary';
import { Teamhierarchy } from './teamhierarchy/teamhierarchy';
import { TeamSubmission } from './team-submission/team-submission';
import { IndividualAttendanceReport } from './individual-attendance-report/individual-attendance-report';
import { AttendanceReport } from './attendance-report/attendance-report';
import { AdminSettings } from './admin-settings/admin-settings';
import { Updateinfo } from './employeeinfo/updateinfo/updateinfo';
import { Remoteagreement } from './remoteagreement/remoteagreement';


import { OrganizationComponent } from './admin-settings/organization/organization';
import { PayrollComponent } from './admin-settings/payroll/payroll';
import { LeaveAttendance } from './admin-settings/leave-attendance/leave-attendance';
import { Permission } from './admin-settings/permission/permission';

export const superadminRoutes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SuperadminDashboard },
      { path: 'employeeinfo', component: EmployeeinfoComponent },
      { path: 'festival', component: Festival },
      { path: 'leave', component: Leave },
      { path: 'registration', component: Registration },
     { path: 'updateinfo/:id', component: Updateinfo },

      {path:'rnr',component:Rnr},
      {path:'leave-summary',component:LeaveSummary},
      { path: 'teamhierarchy', component: Teamhierarchy },
      { path: 'team-submission', component: TeamSubmission },
      { path: 'attendance-report', component: AttendanceReport },
      { path: 'individual-attendance-report', component: IndividualAttendanceReport },
      {path:'remoteagreement', component:Remoteagreement},

     
      {
        path: 'admin-settings',
        component: AdminSettings,
        children: [
          { path: '', redirectTo: 'organization', pathMatch: 'full' },
          { path: 'organization', component: OrganizationComponent },
          { path: 'leave-attendance', component: LeaveAttendance },
          { path: 'payroll', component: PayrollComponent },
          { path: 'permission', component: Permission },
        ]
      }
    ]
  }
];
