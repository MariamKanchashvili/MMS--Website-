import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home),
  },
  {
    path: 'news',
    loadComponent: () => import('./__pages/news-list/news-list').then(m => m.NewsList),
  },
  {
    path: 'news/:id',
    loadComponent: () => import('./__pages/news-detail/news-detail').then(m => m.NewsDetail),
  },
  {
    path: 'partnership',
    loadComponent: () => import('./__pages/partnership/partnership').then(m => m.Partnership),
  },
];