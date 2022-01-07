import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/userform' },
  { path: 'userform', component:UserFormComponent },
  { path: 'usertable', component:UserTableComponent },
  { path: 'usertable/:id', component:UserTableComponent },
  { path: 'userform/:id', component:UserFormComponent },


  { path: '**', redirectTo: 'userform' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
