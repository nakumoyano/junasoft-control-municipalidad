import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { ListadoDeGastosComponent } from './panel/gastos/listado-de-gastos/listado-de-gastos.component';
import { AgregarGastoComponent } from './panel/gastos/agregar-gasto/agregar-gasto.component';
import { CargarMunicipalidadComponent } from './panel/municipalidad/cargar-municipalidad/cargar-municipalidad.component';
import { VerMunicipalidadComponent } from './panel/municipalidad/ver-municipalidad/ver-municipalidad.component';
import { SkeletonGridComponent } from './components/skeleton-grid/skeleton-grid.component';
import { BotonCancelarComponent } from './components/boton-cancelar/boton-cancelar.component';
import { PanelRightComponent } from './components/panel-right/panel-right.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BotonEliminarComponent } from './components/boton-eliminar/boton-eliminar.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ListadoDeGastosComponent, AgregarGastoComponent, CargarMunicipalidadComponent, VerMunicipalidadComponent, SkeletonGridComponent, BotonCancelarComponent, PanelRightComponent, SidebarComponent, BotonEliminarComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    ToastModule,
    HttpClientModule,
    ConfirmDialogModule,
    AccordionModule,
    ToolbarModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
