import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from "./dashboard/dashboard.component";
import { ManageComponent } from "./manage/manage.component";
import { AccessComponent } from "./access/access.component";
import { SettingsComponent } from "./settings/settings.component";


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: "dashboard", component: DashboardComponent},
  { path: "manage", component: ManageComponent },
  { path: "access", component: AccessComponent },
  { path: "settings", component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
