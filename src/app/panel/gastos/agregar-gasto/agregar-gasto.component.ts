import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Moneda } from 'src/app/models/moneda/moneda';
import { Secretaria } from 'src/app/models/secretaria/secretaria';
import { GastosService } from 'src/app/services/gastos/gastos.service';
import { MonedasService } from 'src/app/services/monedas/monedas.service';
import { SecretariasService } from 'src/app/services/secretarias/secretarias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.component.html',
  styleUrls: ['./agregar-gasto.component.css'],
})
export class AgregarGastoComponent implements OnInit {
  @Input() monedas: Moneda[];
  @Input() secretarias: Secretaria[];

  mostrarSkeleton = false;

  gasto: string;

  isEdit = false;
  loading = false;

  frmAddEditGasto: FormGroup;

  selectedFiles: File[] = [];
  archivos: string[] = [];

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedMoneda: string;
  selectedSecretaria: string;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gastosService: GastosService,
    private monedasService: MonedasService,
    private secretariasService: SecretariasService
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.createForm();

    this.cargarCmbMonedas();
    this.cargarCmbSecretarias();

    this.cargarDatosEnFormulario();
  }

  // f************************************** FUNCION PARA INICIALIZAR FORM ***************************
  createForm() {
    this.frmAddEditGasto = this.formBuilder.group({
      idGasto: [0],
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      observacion: [''],
      titulo: ['', Validators.required],
      idMoneda: ['', Validators.required],
      idSecretaria: ['', Validators.required],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const formData = this.frmAddEditGasto.value;

    this.selectedFiles.map((file) => file.name).join(',');

    if (this.frmAddEditGasto.valid) {
      this.loading = true;
      this.gastosService
        .addData(
          0,
          formData.titulo,
          formData.descripcion,
          this.selectedFiles,
          formData.proveedor,
          formData.observaciones,
          formData.fecha,
          formData.monto,
          formData.idMoneda,
          formData.idSecretaria
        )
        .subscribe({
          next: (res: any) => {
            console.log('respuesta cargar gasto', res);
            this.toastr.success('¡Gasto cargado con éxito!');
            this.frmAddEditGasto.reset();
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
      Object.values(this.frmAddEditGasto.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // f************************************** FUNCION PARA EDITAR BARRIO ***************************
  onUpdate() {
    if (this.frmAddEditGasto.valid) {
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
      const formValues = this.frmAddEditGasto.value;
      formData.append('idGasto', formValues.idGasto);
      formData.append('titulo', formValues.titulo);
      formData.append('descripcion', formValues.descripcion);
      formData.append('proveedor', formValues.proveedor);
      formData.append('observaciones', formValues.observaciones);
      formData.append('fecha', formValues.fecha);
      formData.append('monto', formValues.monto);
      formData.append('idMoneda', formValues.idMoneda);
      formData.append('idSecretaria', formValues.idSecretaria);

      // Agregar los archivos al FormData
      archivosFinales.forEach((file) => {
        formData.append('files', file, file.name);
      });

      Swal.fire({
        title: '¿Estás seguro que deseas editar este inmueble?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.gastosService
              .updateData(
                formValues.idGasto,
                formValues.titulo,
                formValues.descripcion,
                archivosFinales,
                formValues.proveedor,
                formValues.observaciones,
                formValues.fecha,
                formValues.monto,
                formValues.idMoneda,
                formValues.idSecretaria
              )
              .subscribe({
                next: (response: any) => {
                  console.log('respuesta al editar', response);
                  Swal.fire(
                    '¡Editado!',
                    '¡El gasto se ha editado correctamente!',
                    'success'
                  );
                  this.loading = false;
                  this.router
                    .navigate(['/admin/gastos/listado-de-gastos'])
                    .then(() => {
                      location.reload();
                    });
                },
                error: (error: any) => {
                  console.log('error al editar gastos', error);
                  Swal.fire(
                    'Error!',
                    'Ha ocurrido un error. Inténtelo de nuevo más tarde.',
                    'error'
                  );
                },
              })
          );
        }
      });
    } else {
      this.toastr.error(
        'Ocurrió un error, revise los campos e intente nuevamente'
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

        // Obtener los datos por ID
        this.gastosService.getDataById(id).subscribe(
          (data: any) => {
            console.log('data del patch value', data);

            const resultado = data.resultado;

            if (data.resultado.fecha) {
              const fechaRecibida = new Date(data.resultado.fecha);
              const fechaFormateada = fechaRecibida.toISOString().split('T')[0]; // Convertir a formato 'YYYY-MM-DD'
              data.resultado.fecha = fechaFormateada;
            }

            this.frmAddEditGasto.patchValue(data.resultado);
            this.selectedSecretaria = data.resultado.idSecretaria;
            this.selectedMoneda = data.resultado.idMoneda;

            // Cargar las imágenes si existen
            const urlImagenes = resultado.urlImagenes;
            if (urlImagenes) {
              // Convertir la cadena de URLs a un array y eliminar entradas vacías
              this.archivos = urlImagenes
                .split(',')
                .filter((url: any) => url.trim() !== '');
            }

            this.mostrarSkeleton = false;
          },
          (error) => {
            console.error('Error al cargar los datos de la propiedad:', error);
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

  // f************************************** FUNCION PARA CREAR  ***************************
  // MONEDAS
  cargarCmbMonedas() {
    this.monedasService.getAllData().subscribe(
      (data: any) => {
        // console.log(data);
        const monedas = data.resultado;
        this.monedas = monedas;
      },
      (error) => {
        console.error('Error al obtener los monedas:', error);
      }
    );
  }
  // SECRETARIAS
  cargarCmbSecretarias() {
    this.secretariasService.getAllData().subscribe(
      (data: any) => {
        console.log(data);
        const secretarias = data.resultado;
        this.secretarias = secretarias;
      },
      (error) => {
        console.error('Error al obtener los secretarias:', error);
      }
    );
  }

  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlGasto(): FormControl {
    return this.frmAddEditGasto.controls['descripcion'] as FormControl;
  }
  get controlMonto(): FormControl {
    return this.frmAddEditGasto.controls['monto'] as FormControl;
  }
  get controlProveedor(): FormControl {
    return this.frmAddEditGasto.controls['proveedor'] as FormControl;
  }
  get controlFecha(): FormControl {
    return this.frmAddEditGasto.controls['fecha'] as FormControl;
  }
  get controlTitulo(): FormControl {
    return this.frmAddEditGasto.controls['titulo'] as FormControl;
  }
  get controlMoneda(): FormControl {
    return this.frmAddEditGasto.controls['idMoneda'] as FormControl;
  }
  get controlSecretaria(): FormControl {
    return this.frmAddEditGasto.controls['idSecretaria'] as FormControl;
  }
}
