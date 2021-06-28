import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedZoomModule } from 'ngx-red-zoom';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthconfirmGuard } from '../assets/services/authconfirm.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardsComponent } from './pages/cards/cards.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatSidenavModule } from '@angular/material/sidenav'
import {  MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { LoginComponent } from './pages/login/login.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons';
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { CustomFormsModule } from 'ngx-custom-validators';
// import { ConfirmPasswordValidatorDirective } from '../assets/validator/confirm_password_validator.directive';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DialogueProfileComponent } from './pages/dialogue-profile/dialogue-profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ChangeAddressComponent } from './pages/change-address/change-address.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ForgetPasswordNextComponent } from './pages/forget-password-next/forget-password-next.component';
import { OrderComponent } from './pages/order/order.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressListComponent } from './pages/address-list/address-list.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { ProductsComponent } from './pages/products/products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddAddressComponent } from './pages/add-address/add-address.component';
import { DialogCartComponent } from './pages/dialog-cart/dialog-cart.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgRatingModule } from 'd-ng-rating';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { environment } from 'ng-star-rating-master/src/environments/environment';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// const config = new SocialAuthService([
//   id:GoogleLoginProvider.PROVIDER_ID,
//   prvider: new GoogleLoginProvider('')
// ])
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardsComponent,
    FooterComponent,
    CartComponent,
    ProductComponent,
    UserComponent,
    MyAccountComponent,
    CarouselComponent,
    LoginComponent,
    RegistrationComponent,
    DialogueProfileComponent,
    CheckoutComponent,
    ChangeAddressComponent,
    ForgetPasswordComponent,
    ForgetPasswordNextComponent,
    OrderComponent,
    ChangePasswordComponent,
    ProfileComponent,
    AddressListComponent,
    ThankYouComponent,
    ProductsComponent,
    AddAddressComponent,
    DialogCartComponent,
    // ConfirmPasswordValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatBadgeModule,
    SocialLoginModule,
    MatExpansionModule,
    MatTabsModule,
    MatRadioModule,
    ShareButtonsModule,
    ShareIconsModule,
    FontAwesomeModule,
    ShareModule,
    CustomFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    NgxImgZoomModule,
    RedZoomModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSnackBarModule,
    NgxUiLoaderModule,
    NgRatingModule,
    MatButtonToggleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AuthconfirmGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '794071323450-jef6jfi9hmh2bijef30kgrjc42927g3v.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('932916477478336')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
