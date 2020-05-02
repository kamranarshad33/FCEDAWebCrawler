import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './dashboard/list/list.component';
import { ManageComponent } from './manage/manage.component';
import { KeywordsComponent } from './manage/keywords/keywords.component';
import { WebsitesComponent } from './manage/websites/websites.component';
import { FrequencyComponent } from './manage/frequency/frequency.component';
import { AccessComponent } from './access/access.component';
import { SettingsComponent } from './settings/settings.component';
import { WordsService } from './words.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderComponent,
    DashboardComponent,
    ListComponent,
    ManageComponent,
    KeywordsComponent,
    WebsitesComponent,
	FrequencyComponent,
    AccessComponent,
    SettingsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
