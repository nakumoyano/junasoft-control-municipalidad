import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { ListadoDeGastosComponent } from './panel/gastos/listado-de-gastos/listado-de-gastos.component';
import { AgregarGastoComponent } from './panel/gastos/agregar-gasto/agregar-gasto.component';
import { CargarMunicipalidadComponent } from './panel/municipalidad/cargar-municipalidad/cargar-municipalidad.component';
import { VerMunicipalidadComponent } from './panel/municipalidad/ver-municipalidad/ver-municipalidad.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  // AUTH
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: HomeComponent,
    data: { title: 'Inicio | Control Municipalidad' },
  },
  // DASHBOARD
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard | Control Municipalidad' },
  },

  // GASTOS
  {
    path: 'admin/gastos/agregar-gasto',
    component: AgregarGastoComponent,
    data: { title: 'Agregar Gasto | Control Municipalidad' },
  },
  {
    path: 'admin/gastos/editar-gasto/:id',
    component: AgregarGastoComponent,
    data: { title: 'Editar Gasto | Control Municipalidad' },
  },
  {
    path: 'admin/gastos/listado-de-gastos',
    component: ListadoDeGastosComponent,
    data: { title: 'Listado de Gastos | Control Municipalidad' },
  },
  // MUNICIPALIDAD
  {
    path: 'admin/municipalidades/agregar-municipalidad',
    component: CargarMunicipalidadComponent,
    data: { title: 'Agregar Municipalidad | Control Municipalidad' },
  },
  {
    path: 'admin/municipalidades/editar-municipalidad/:id',
    component: CargarMunicipalidadComponent,
    data: { title: 'Editar Municipalidad | Control Municipalidad' },
  },
  {
    path: 'admin/municipalidades/ver-municipalidad',
    component: VerMunicipalidadComponent,
    data: { title: 'Ver Municipalidad | Control Municipalidad' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
