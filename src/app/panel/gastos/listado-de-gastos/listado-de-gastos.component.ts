import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-de-gastos',
  templateUrl: './listado-de-gastos.component.html',
  styleUrls: ['./listado-de-gastos.component.css'],
})
export class ListadoDeGastosComponent implements OnInit {
  @Input() gastos: any[];

  totalRecords: number;
  loading: boolean = false;

  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDatos();
    this.gastos = [
      {
        nombre: 'dasdsa',
        descripcion: ' compra de tachos de pintura',
        fecha: '07/01/2025',
        monto: '1500000',
        proveedor: 'Walter Quinteros',
      },
    ];
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    // this.categoriasService.getAllData().subscribe(
    //   (data: any) => {
    //     this.categorias = data.resultado;
    //     // console.log(this.pagos);
    //     this.loading = false;
    //     this.totalRecords = this.categorias.length;
    //   },
    //   (error) => {
    //     console.error('Error al obtener los categorias:', error);
    //   }
    // );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(proyecto: any) {
    // this.categoriasService.deleteData(proyecto).subscribe({
    //   next: (response: any) => {
    //     if (response.statusCode === 204) {
    //       this.toastr.success('¡La categoría se ha eliminado correctamente!');
    //       this.getAllDatos();
    //     } else {
    //     }
    //   },
    //   error: (error: any) => {
    //     this.toastr.error(
    //       'Ha ocurrido un error al intentar eliminar categoria.'
    //     );
    //   },
    // });
  }

  // d***************************************** FUNCION PARA OBTENER EL TOTAL DE DATOS ***********************************
  obtenerTotalResultados(): number {
    return this.gastos?.length;
  }

  // d***************************************** FUNCION PARA REDIRECCIONAR A AGREGAR PROYECTO ***********************************
  navigateToCategoria() {
    this.router.navigate(['/admin/gastos/agregar-gasto']);
  }
}
