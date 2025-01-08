import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() gastos: any[];
  secretarias: any[];

  totalRecords: number;
  loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getAllDatos();
    this.gastos = [
      {
        nombre: 'compra de tachos de pintura',
        descripcion:
          'se realizó la compra de 8 tachos de pintura para cambiarle el frente al colegio San Martín, ubicado en las calle Brasil esq. Prudencio Bustos, Barrio Norte.',
        fecha: '07/01/2025',
        monto: '1500000',
        proveedor: 'Walter Quinteros',
        secretaria: 'Turísmo',
      },
    ];

    this.secretarias = [
      { id: 1, nombre: 'Todas' },
      { id: 2, nombre: 'Turísmo' },
      { id: 3, nombre: 'Salud' },
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

  // f************************************** FUNCION PARA CREAR DROPDOWN ***************************
  // SECRETARIA
  // cargarCmbTipoInmueble() {
  //   this.tiposInmueblesService.getAllData().subscribe(
  //     (data: any) => {
  //       // console.log(data);
  //       const tiposInmuebles = data.resultado;
  //       this.tiposInmuebles = tiposInmuebles;
  //     },
  //     (error) => {
  //       console.error('Error al obtener los tiposInmuebles:', error);
  //     }
  //   );
  // }
}
