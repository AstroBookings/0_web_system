import { Routes } from '@angular/router';

/**
 * App routes
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home.page'),
  },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about.page'),
  },
  {
    path: 'bookings',
    loadComponent: () => import('./routes/bookings/bookings.page'),
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.page'),
  },
  {
    path: 'register',
    loadComponent: () => import('./routes/register/register.page'),
  },
];
