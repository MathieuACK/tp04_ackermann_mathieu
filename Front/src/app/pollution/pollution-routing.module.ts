import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollutionListComponent } from '../components/pollution-list/pollution-list.component';
import { PollutionReportComponent } from '../components/pollution-report/pollution-report.component';
import { PollutionDetailComponent } from '../components/pollution-detail/pollution-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PollutionListComponent },
  { path: 'report', component: PollutionReportComponent },
  { path: ':id', component: PollutionDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollutionRoutingModule {}
