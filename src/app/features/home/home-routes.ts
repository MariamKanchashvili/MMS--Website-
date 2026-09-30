import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home),
  },
  {
    path: 'news/:id',
    loadComponent: () => import('./news-detail/news-detail').then(m => m.NewsDetail),
  },
  {
    path: 'partnership',
    loadComponent: () => import('./partnership/partnership').then(m => m.Partnership),
  },
  {
  path: 'news',
  loadComponent: () => import('./news-list/news-list').then(m => m.NewsList),
},
];