import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TechnologyListComponent } from './technology-list/technology-list.component';
import { TechnologyEditorComponent } from './technology-editor/technology-editor.component';
import { TechnologyOverviewComponent } from './technology-overview/technology-overview.component';

const routes: Routes = [
  { path: 'list', component: TechnologyListComponent },
  { path: 'editor/:type/:id', component: TechnologyEditorComponent },
  { path: 'editor/:type', component: TechnologyEditorComponent },
  { path: 'overview', component: TechnologyOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
