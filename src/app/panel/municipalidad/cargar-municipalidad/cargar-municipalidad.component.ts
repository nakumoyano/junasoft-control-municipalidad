import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MunicipalidadesService } from 'src/app/services/municipalidades/municipalidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-municipalidad',
  templateUrl: './cargar-municipalidad.component.html',
  styleUrls: ['./cargar-municipalidad.component.css'],
})
export class CargarMunicipalidadComponent implements OnInit {
  mostrarSkeleton = false;

  gasto: string;

  isEdit = false;
  loading = false;

  frmAddEditMunicipalidad: FormGroup;

  selectedFiles: File[] = [];
  archivos: string[] = [];

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private municipalidadesService: MunicipalidadesService
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.createForm();

    this.cargarDatosEnFormulario();
  }

  // f************************************** FUNCION PARA INICIALIZAR FORM ***************************
  createForm() {
    this.frmAddEditMunicipalidad = this.formBuilder.group({
      idMunicipalidad: [0],
      municipalidad: ['', Validators.required],
      colorFondo: [''],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const formData = this.frmAddEditMunicipalidad.value;

    this.selectedFiles.map((file) => file.name).join(',');

    if (this.frmAddEditMunicipalidad.valid) {
      this.loading = true;
      this.municipalidadesService
        .addData(
          0,
          formData.municipalidad,
          this.selectedFiles,
          formData.colorFondo
        )
        .subscribe({
          next: (res: any) => {
            console.log('respuesta cargar muni', res);
            this.toastr.success('¡Municipalidad cargada con éxito!');
            this.frmAddEditMunicipalidad.reset();
            this.loading = false;
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
          },
        });
    } else {
      Object.values(this.frmAddEditMunicipalidad.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // f************************************** FUNCION PARA EDITAR  ***************************
  onUpdate() {
    if (this.frmAddEditMunicipalidad.valid) {
      this.loading = true;

      const formData = new FormData(); // Usamos FormData para enviar los archivos

      // Obtener los archivos existentes (URLs)
      let archivosExistentes: string[] = [];
      if (this.archivos.length > 0) {
        archivosExistentes = this.archivos.filter((url) => url.trim() !== '');
      }

      // Combinar archivos existentes con los nuevos
      const archivosFinales: File[] = [];

      // Simular Blobs para las URLs existentes (si es necesario)
      archivosExistentes.forEach((url) => {
        const blob = new Blob(); // Simulamos un Blob vacío (el backend debe manejar estos blobs)
        archivosFinales.push(new File([blob], url)); // Usamos la URL como nombre del archivo
      });

      // Agregar archivos seleccionados al arreglo final
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file) => {
          archivosFinales.push(file);
        });
      }

      // Agregar los valores del formulario al FormData
      const formValues = this.frmAddEditMunicipalidad.value;

      formData.append('idMunicipalidad', formValues.idMunicipalidad);
      formData.append('municipalidad', formValues.municipalidad);
      formData.append('colorFondo', formValues.colorFondo);

      // Agregar los archivos al FormData
      archivosFinales.forEach((file) => {
        formData.append('files', file, file.name);
      });

      Swal.fire({
        title: '¿Estás seguro que deseas editar la municipalidad?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.municipalidadesService
              .updateData(
                formValues.idMunicipalidad,
                formValues.municipalidad,
                archivosFinales,
                formValues.colorFondo
              )
              .subscribe({
                next: (response: any) => {
                  console.log('respuesta editar', response);
                  Swal.fire(
                    '¡Editado!',
                    '¡La municipalidad se ha editado correctamente!',
                    'success'
                  );
                  this.loading = false;

                  setTimeout(() => {
                    this.router
                      .navigate(['/admin/municipalidades/ver-municipalidad'])
                      .then(() => {
                        setTimeout(() => {
                          location.reload();
                        }, 10);
                      });
                  }, 1000);
                },
                error: (error: any) => {
                  Swal.fire(
                    'Error!',
                    'Ha ocurrido un error al intentar editar la municipalidad. Por favor, inténtelo de nuevo más tarde.',
                    'error'
                  );
                },
              })
          );
        }
      });
    } else {
      this.toastr.error(
        'Ocurrio un error, revise los campos e intente nuevamente'
      );
    }
  }

  // f************************************** FUNCION PARA CARGAR FORMULARIO CON DATOS ***************************
  cargarDatosEnFormulario() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.mostrarSkeleton = true;
        this.municipalidadesService.getDataById(id).subscribe(
          (data: any) => {
            console.log('data patchvalue', data);

            this.frmAddEditMunicipalidad.patchValue(data.resultado);

            // Cargar las imágenes si existen
            const urlImagenes = data.resultado.urlImagenes;
            if (urlImagenes) {
              // Si es una cadena, conviértela en un arreglo
              this.archivos = Array.isArray(urlImagenes)
                ? urlImagenes
                : urlImagenes
                    .split(',')
                    .filter((url: string) => url.trim() !== '');
            } else {
              this.archivos = []; // Si no hay imágenes, inicializa como un arreglo vacío
            }

            this.mostrarSkeleton = false;
          },
          (error) => {
            console.error(error);
            this.mostrarSkeleton = false;
          }
        );
      }
    });
  }

  // D****************************************** FUCNIONES PARA EL INPUT DE ARCHIVO *****************
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.updateInputFiles();
  }

  updateInputFiles(): void {
    const dataTransfer = new DataTransfer();
    this.selectedFiles.forEach((file) => dataTransfer.items.add(file));
    const inputElement = document.getElementById(
      'file_input'
    ) as HTMLInputElement;
    inputElement.files = dataTransfer.files;
  }

  // F****************************************** FUNCIONES PARA MOSTRAR NOMBRE DE LOS ARCHIVOS *************************
  getFileName(url: string): string {
    const parts = url.split('/');
    const fullName = parts[parts.length - 1];
    return fullName.replace(/^\d+_\d+_/, '');
  }

  // F****************************************** FUNCIONES PARA ELIMINAR ARCHIVOS *************************
  removeArchivo(index: number): void {
    const archivoUrl = this.archivos[index];
    // Puedes hacer una llamada al servidor para eliminar el archivo, si es necesario
    // this.internacionService.deleteArchivo(archivoUrl).subscribe(/* ... */);
    this.archivos.splice(index, 1);
  }
  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlNombre(): FormControl {
    return this.frmAddEditMunicipalidad.controls[
      'municipalidad'
    ] as FormControl;
  }
}
