import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ProhibitedItemsComponent } from './pages/prohibited-items/prohibited-items.component';
import { CustomComponent } from './custom/custom.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StorageTableComponent } from './pages/storage-table/storage-table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DeclarationComponent } from './pages/declaration/declaration.component';
import { FacebookModule } from 'ngx-facebook';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { PartnersComponent } from './pages/partners/partners.component';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { AdminComponent } from './pages/admin/admin.component';

import { InvoiceComponent } from './pages/invoice/invoice.component';

import { MatIconModule } from '@angular/material/icon';
import { CurrencyComponent } from './pages/currency/currency.component';
import { CityComponent } from './pages/city/city.component';
import { ProductsComponent } from './pages/products/products.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OntheroadTableComponent } from './pages/ontheroad-table/ontheroad-table.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { MatTableModule } from '@angular/material/table';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChamosuliComponent } from './pages/chamosuli/chamosuli.component';
import { IssuedComponent } from './pages/issued/issued.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutModule } from '@angular/cdk/layout';
import { UsersComponent } from './pages/users/users.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { TarifsComponent } from './pages/tarifs/tarifs.component';
import { FlightsViewComponent } from './pages/flights-view/flights-view.component';
import { HowToComponent } from './pages/how-to/how-to.component';
import { EditUserComponent } from './auth/edit-user/edit-user.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    AboutComponent,
    ProhibitedItemsComponent,
    CustomComponent,
    ShopsComponent,
    SigninComponent,
    SignupComponent,
    ContactsComponent,
    DashboardComponent,
    StorageTableComponent,
    SidebarComponent,
    FooterComponent,
    DeclarationComponent,
    PartnersComponent,
    AdminComponent,
    InvoiceComponent,
    CurrencyComponent,
    CityComponent,
    ProductsComponent,
    OntheroadTableComponent,
    NotFoundComponent,
    ChamosuliComponent,
    IssuedComponent,
    UsersComponent,
    FlightsComponent,
    TarifsComponent,
    FlightsViewComponent,
    HowToComponent,
    EditUserComponent,
    FaqComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    ProgressSpinnerModule,
    MatTableModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    LayoutModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
