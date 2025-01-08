import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Municipalidad } from 'src/app/models/municipalidad/municipalidad';
import { MunicipalidadesService } from 'src/app/services/municipalidades/municipalidades.service';

@Component({
  selector: 'app-ver-municipalidad',
  templateUrl: './ver-municipalidad.component.html',
  styleUrls: ['./ver-municipalidad.component.css'],
})
export class VerMunicipalidadComponent implements OnInit {
  @Input() municipalidades: Municipalidad[] = [];

  totalRecords: any;
  loading: boolean = false;

  constructor(
    private municipalidadesService: MunicipalidadesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    this.municipalidadesService.getAllData().subscribe(
      (data: any) => {
        this.municipalidades = data.resultado;
        console.log(this.municipalidades);
        this.loading = false;
        this.totalRecords = this.municipalidades?.length;
      },
      (error) => {
        console.error('Error al obtener los municipalidades:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(marca: any) {
    this.municipalidadesService.deleteData(marca).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success(
            '¡La municipalidad se ha eliminado correctamente!'
          );
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar la municipalidad.'
        );
      },
    });
  }

  // d***************************************** FUNCION PARA OBTENER LA PRIMER IMAGNE ***********************************
  getPrimeraImagen(urlImagenes: any): string {
    // Imagen por defecto en caso de que no haya imágenes
    const imagenPorDefecto =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIy-OtDQm26V_xTmqGtzoF7ZoSsWgn4A1f5bWqfE5Dje08s9bS7FXiwApyk8WxPMa6UoI&usqp=CAU';

    if (!urlImagenes) {
      return imagenPorDefecto;
    }

    // Convertir el string en un array de URLs, eliminando elementos vacíos
    const imagenes = urlImagenes
      .split(',')
      .filter((url: any) => url.trim() !== '');

    // Si después de filtrar hay imágenes, retorna la primera; de lo contrario, retorna la imagen por defecto
    return imagenes.length > 0 ? imagenes[0] : imagenPorDefecto;
  }
}
