import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Member
import { FirstComponent } from './components/member/first/first.component'
import { CartComponent } from './components/member/cart/cart.component'
import { ElectronicsComponent } from './components/member/electronics/electronics.component';
import { WearsComponent } from './components/member/wears/wears.component';
import { FurnituresComponent } from './components/member/furnitures/furnitures.component';
import { FoodComponent } from './components/member/food/food.component';
import { SingleProductComponent } from './components/member/single-product/single-product.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';

// Admin
import { AddproductComponent } from './components/admin/addproduct/addproduct.component';
import { ShowproductsComponent } from './components/admin/showproducts/showproducts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'first', component: FirstComponent },
      { path: 'cart', component: CartComponent },
      { path: 'electronics', component: ElectronicsComponent },
      { path: 'wears', component: WearsComponent },
      { path: 'furnitures', component: FurnituresComponent },
      { path: 'food', component: FoodComponent },
      { path: 'single-product/:id', component: SingleProductComponent },
      { path: 'userinfo', component:  UserinfoComponent},

    ],
  },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'add-product', component: AddproductComponent },
      { path: 'show-products', component: ShowproductsComponent }
    ],
  },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  {
    path: 'unauthorized', children: []
  },
  
  {
    path: '**', component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }