import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../app/pages/cart/cart.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { MyAccountComponent } from '../app/pages/my-account/my-account.component';
import { ProductComponent } from '../app/pages/product/product.component';
import { LoginComponent } from '../app/pages/login/login.component'
import { RegistrationComponent } from '../app/pages/registration/registration.component';
import { AuthconfirmGuard } from '../assets/services/authconfirm.guard';
import { ForgetPasswordComponent } from '../app/pages/forget-password/forget-password.component';
import { ForgetPasswordNextComponent } from '../app/pages/forget-password-next/forget-password-next.component';
import { ProfileComponent } from '../app/pages/profile/profile.component'
import { ChangePasswordComponent } from '../app/pages/change-password/change-password.component';
import { ChangeAddressComponent } from '../app/pages/change-address/change-address.component';
import { ThankYouComponent } from '../app/pages/thank-you/thank-you.component';
import { ProductsComponent } from '../app/pages/products/products.component'

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full'
},
  {path:'cart', canActivate : [AuthconfirmGuard] , component: CartComponent },
  {path:'dashboard', component: DashboardComponent },
  // {path:'dashboard/:id', canActivate : [AuthGuard], component: DashboardComponent },
  // {path:'checkout', component: CheckoutComponent },
  {path:'my-account', canActivate : [AuthconfirmGuard], component: MyAccountComponent },
  // {path:'order', component: OrderComponent },
  {path:'product/:_id', component: ProductComponent },
  {path:'login', component:LoginComponent},
  // {path:'user', component: UserComponent }
  {path:'registration' , component:RegistrationComponent},
  {path:'forget-password' , component:ForgetPasswordComponent},
  {path:'forget-password-next', component:ForgetPasswordNextComponent},
  {path: 'profile' , component:ProfileComponent},
  {path: 'change-password' , component:ChangePasswordComponent},
  {path: 'change-address' , component:ChangeAddressComponent},
  {path: 'thank-you' , component:ThankYouComponent },
  {path: 'products' , component:ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
