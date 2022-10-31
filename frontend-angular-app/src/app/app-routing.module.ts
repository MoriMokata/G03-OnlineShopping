import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from './components/first/first.component'
import { SecondComponent } from './components/second/second.component'
import { ThirdComponent } from './components/third/third.component'
import { CartComponent } from './components/cart/cart.component'
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { WearsComponent } from './components/wears/wears.component';
import { FurnituresComponent } from './components/furnitures/furnitures.component';
import { FoodComponent } from './components/food/food.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  {path: 'first', component: FirstComponent},
  {path: 'second', component: SecondComponent},
  {path: 'third', component: ThirdComponent},
  {path: 'cart', component: CartComponent},
  {path: 'electronics', component: ElectronicsComponent},
  {path: 'wears', component: WearsComponent},
  {path: 'furnitures', component: FurnituresComponent},
  {path: 'food', component: FoodComponent},
  {path: 'single-product', component:SingleProductComponent},
  {path: '', 
    redirectTo: 'first', 
    pathMatch: 'full'          
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
