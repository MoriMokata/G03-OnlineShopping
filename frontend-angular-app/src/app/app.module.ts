import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Member
import { FirstComponent } from './components/member/first/first.component';
import { CartComponent } from './components/member/cart/cart.component';
import { ElectronicsComponent } from './components/member/electronics/electronics.component';
import { WearsComponent } from './components/member/wears/wears.component';
import { FurnituresComponent } from './components/member/furnitures/furnitures.component';
import { FoodComponent } from './components/member/food/food.component';
import { SingleProductComponent } from './components/member/single-product/single-product.component';
import { PaymentComponent } from './components/member/payment/payment.component';
import { UserinfoComponent } from './components/member/userinfo/userinfo.component';

// Admin
import { AddproductComponent } from './components/admin/addproduct/addproduct.component';
import { ShowproductsComponent } from './components/admin/showproducts/showproducts.component';
import { CheckoutComponent } from './components/member/checkout/checkout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ShoppingBagComponent } from './components/member/checkout/shopping-bag/shopping-bag.component';
import { UserAddressComponent } from './components/member/checkout/user-address/user-address.component';
import { PaymentMethodComponent } from './components/member/checkout/payment-method/payment-method.component';

import { OrderSuccessComponent } from './components/member/order-success/order-success.component';
import { OrderHistoryComponent } from './components/member/order-history/order-history.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';


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
    AddproductComponent,
    ShowproductsComponent,
    NotFoundComponent,
    UserinfoComponent,
    CheckoutComponent,
    SidebarComponent,
    ShoppingBagComponent,
    UserAddressComponent,
    PaymentMethodComponent,
    OrderSuccessComponent,
    OrderHistoryComponent,
    ManageUsersComponent
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
