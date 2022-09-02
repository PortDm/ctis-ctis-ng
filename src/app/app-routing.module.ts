import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";

const ROUTES: Routes = [
    {path: '', redirectTo: '/users/login', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'users', loadChildren: () => import('./admin/admin.module').then(m => m.UsersModule)}
]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}