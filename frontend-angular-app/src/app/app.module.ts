import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FirstComponent } from './components/first/first.component';
import { CartComponent } from './components/cart/cart.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { WearsComponent } from './components/wears/wears.component';
import { FurnituresComponent } from './components/furnitures/furnitures.component';
import { FoodComponent } from './components/food/food.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FirstComponent,
    CartComponent,
    ElectronicsComponent,
    WearsComponent,
    FurnituresComponent,
    FoodComponent,
    SingleProductComponent,
    LoginComponent,
    RegisterComponent,
    PaymentComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
