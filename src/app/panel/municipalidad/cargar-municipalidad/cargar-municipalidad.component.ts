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

  private subscription = new Subscription();

  frmAddEditMunicipalidad: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
      nombre: ['', Validators.required],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const { nombre } = this.frmAddEditMunicipalidad.value;

    if (this.frmAddEditMunicipalidad.valid) {
      this.loading = true;
      // this.categoriasService.addData(0, nombre).subscribe({
      //   next: (res: any) => {
      //     console.log('respuesta cargar categoria', res);
      //     this.toastr.success('¡Categoría cargada con éxito!');
      //     this.frmAddEditMunicipalidad.reset();
      //     this.loading = false;
      //     setTimeout(() => {
      //       location.reload();
      //     }, 200);
      //   },
      //   error: (error: any) => {
      //     this.toastr.error(
      //       'Ha ocurrido un error. Espere e intente nuevamente.'
      //     );
      //   },
      // });
    } else {
      Object.values(this.frmAddEditMunicipalidad.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // f************************************** FUNCION PARA EDITAR BARRIO ***************************
  onUpdate() {
    if (this.frmAddEditMunicipalidad.valid) {
      this.loading = true;

      const body = {
        idGasto: this.frmAddEditMunicipalidad.value.idGasto,
        nombre: this.frmAddEditMunicipalidad.value.nombre,
      };

      Swal.fire({
        title: '¿Estás seguro que deseas editar este categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription
            .add
            // this.categoriasService.updateData(body).subscribe({
            //   next: (response: any) => {
            //     console.log('respuesta editar', response);
            //     Swal.fire(
            //       '¡Editado!',
            //       '¡La categoría se ha editado correctamente!',
            //       'success'
            //     );
            //     this.loading = false;
            //     setTimeout(() => {
            //       this.router
            //         .navigate(['/admin/categorias/listado-de-categorias'])
            //         .then(() => {
            //           setTimeout(() => {
            //             location.reload();
            //           }, 10);
            //         });
            //     }, 1000);
            //   },
            //   error: (error: any) => {
            //     Swal.fire(
            //       'Error!',
            //       'Ha ocurrido un error al intentar editar la categoria. Por favor, inténtelo de nuevo más tarde.',
            //       'error'
            //     );
            //   },
            // })
            ();
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
        // this.categoriasService.getDataById(id).subscribe(
        //   (data: any) => {
        //     this.frmAddEditMunicipalidad.patchValue(data.resultado);

        //     this.mostrarSkeleton = false;
        //   },
        //   (error) => {
        //     console.error(error);
        //     this.mostrarSkeleton = false;
        //   }
        // );
      }
    });
  }
  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlNombre(): FormControl {
    return this.frmAddEditMunicipalidad.controls['nombre'] as FormControl;
  }
}
