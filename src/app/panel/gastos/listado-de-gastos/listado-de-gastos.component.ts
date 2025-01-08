import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gasto } from 'src/app/models/gasto/gasto';
import { GastosService } from 'src/app/services/gastos/gastos.service';

@Component({
  selector: 'app-listado-de-gastos',
  templateUrl: './listado-de-gastos.component.html',
  styleUrls: ['./listado-de-gastos.component.css'],
})
export class ListadoDeGastosComponent implements OnInit {
  @Input() gastos: Gasto[];

  totalRecords: number;
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private gastosService: GastosService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
    // this.gastos = [
    //   {
    //     nombre: 'dasdsa',
    //     descripcion: ' compra de tachos de pintura',
    //     fecha: '07/01/2025',
    //     monto: '1500000',
    //     proveedor: 'Walter Quinteros',
    //   },
    // ];
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    this.gastosService.getAllData().subscribe(
      (data: any) => {
        this.gastos = data.resultado;
        console.log(this.gastos);
        this.loading = false;
        this.totalRecords = this.gastos.length;
      },
      (error) => {
        console.error('Error al obtener los gastos:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(proyecto: any) {
    this.gastosService.deleteData(proyecto).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡El gasto se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar categoria.'
        );
      },
    });
  }

  // d***************************************** FUNCION PARA OBTENER EL TOTAL DE DATOS ***********************************
  obtenerTotalResultados(): number {
    return this.gastos?.length;
  }

  // d***************************************** FUNCION PARA OBTENER LA PRIMER IMAGNE ***********************************
  getPrimeraImagen(urlImagenes: string): string {
    // Imagen por defecto en caso de que no haya imágenes
    const imagenPorDefecto =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIy-OtDQm26V_xTmqGtzoF7ZoSsWgn4A1f5bWqfE5Dje08s9bS7FXiwApyk8WxPMa6UoI&usqp=CAU';

    if (!urlImagenes) {
      return imagenPorDefecto;
    }

    // Convertir el string en un array de URLs, eliminando elementos vacíos
    const imagenes = urlImagenes.split(',').filter((url) => url.trim() !== '');

    // Si después de filtrar hay imágenes, retorna la primera; de lo contrario, retorna la imagen por defecto
    return imagenes.length > 0 ? imagenes[0] : imagenPorDefecto;
  }

  // d***************************************** FUNCION PARA REDIRECCIONAR A AGREGAR PROYECTO ***********************************
  navigateToCategoria() {
    this.router.navigate(['/admin/gastos/agregar-gasto']);
  }
}
