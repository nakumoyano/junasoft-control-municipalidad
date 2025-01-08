import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Secretaria } from 'src/app/models/secretaria/secretaria';
import { SecretariasService } from 'src/app/services/secretarias/secretarias.service';

@Component({
  selector: 'app-listado-de-secretarias',
  templateUrl: './listado-de-secretarias.component.html',
  styleUrls: ['./listado-de-secretarias.component.css'],
})
export class ListadoDeSecretariasComponent implements OnInit {
  @Input() secretarias: Secretaria[];

  totalRecords: number;
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private secretariasService: SecretariasService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    this.secretariasService.getAllData().subscribe(
      (data: any) => {
        this.secretarias = data.resultado;
        console.log(this.secretarias);
        this.loading = false;
        this.totalRecords = this.secretarias.length;
      },
      (error) => {
        console.error('Error al obtener los secretarias:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(proyecto: any) {
    this.secretariasService.deleteData(proyecto).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡La secretaría se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar secretaria.'
        );
      },
    });
  }

  // d***************************************** FUNCION PARA OBTENER EL TOTAL DE DATOS ***********************************
  obtenerTotalResultados(): number {
    return this.secretarias?.length;
  }
  // d***************************************** FUNCION PARA REDIRECCIONAR A AGREGAR PROYECTO ***********************************
  navigateToSecretaria() {
    this.router.navigate(['/admin/secretarias/agregar-secretaria']);
  }
}
