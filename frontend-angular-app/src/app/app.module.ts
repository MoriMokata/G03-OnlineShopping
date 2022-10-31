import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';
import { CartComponent } from './components/cart/cart.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { WearsComponent } from './components/wears/wears.component';
import { FurnituresComponent } from './components/furnitures/furnitures.component';
import { FoodComponent } from './components/food/food.component';
import { SingleProductComponent } from './single-product/single-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    CartComponent,
    ElectronicsComponent,
    WearsComponent,
    FurnituresComponent,
    FoodComponent,
    SingleProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
