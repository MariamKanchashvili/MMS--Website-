import { Routes } from '@angular/router';
import { headerRoutes } from './shared/layout/header-component/header-routes';
import { homeRoutes } from './features/home/home-routes';
import { productsRoutes } from './features/products/products-routes';

export const routes: Routes = [
   ...headerRoutes,
   ...homeRoutes,
   ...productsRoutes,
];
