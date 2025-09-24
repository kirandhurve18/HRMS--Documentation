import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Termsandconditions } from './auth/termsandconditions/termsandconditions';
import { Privacyandpolicy } from './auth/privacyandpolicy/privacyandpolicy';

export const routes: Routes = [
  // ✅ Default route → redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ✅ Auth pages
  { path: 'login', component: Login },
  { path: 'termsandconditions', component: Termsandconditions },
  { path: 'privacyandpolicy', component: Privacyandpolicy },

  // ✅ Lazy loaded feature modules
  {
    path: 'superadmin',
    loadChildren: () =>
      import('./superadmin/superadmin.routes').then((m) => m.superadminRoutes),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/user.routes').then((m) => m.userRoutes),
  },

  // ✅ Wildcard → redirect unknown routes to login
  { path: '**', redirectTo: 'login' },
];
