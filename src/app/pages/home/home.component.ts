import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/models/gasto/gasto';
import { Municipalidad } from 'src/app/models/municipalidad/municipalidad';
import { GastosService } from 'src/app/services/gastos/gastos.service';
import { MunicipalidadesService } from 'src/app/services/municipalidades/municipalidades.service';
import { SecretariasService } from 'src/app/services/secretarias/secretarias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() gastos: Gasto[];
  @Input() municipalidades: Municipalidad[] = [];

  gastosSemana: any;

  secretarias: any[];

  totalRecords: number;
  loading: boolean = false;

  constructor(
    private router: Router,
    private gastosService: GastosService,
    private secretariasService: SecretariasService,
    private municipalidadService: MunicipalidadesService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
    this.getAllDatosMunicipalidad();

    this.cargarCmbSecretarias();
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

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS DE MUNI ***********************************
  getAllDatosMunicipalidad() {
    this.loading = true;
    this.municipalidadService.getAllData().subscribe(
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
  cargarCmbSecretarias() {
    this.secretariasService.getAllData().subscribe(
      (data: any) => {
        // console.log(data);
        const secretarias = data.resultado;
        this.secretarias = secretarias;
      },
      (error) => {
        console.error('Error al obtener los secretarias:', error);
      }
    );
  }
}
