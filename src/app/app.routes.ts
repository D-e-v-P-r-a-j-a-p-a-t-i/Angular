import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './guard/loginAuth.guard';
import { dashboardAuthGuard } from './guard/dashboard-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        canDeactivate: [dashboardAuthGuard],
        children: [
          { path: '', component: HomeComponent },
          { path: 'products', component: ProductListComponent },
          { path: 'products/:id', component: ProductDetailComponent },
          { path: 'cart', component: CartComponent },
          { path: 'checkout', component: CheckoutComponent },
        ],
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
  ];
