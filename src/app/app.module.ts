import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
