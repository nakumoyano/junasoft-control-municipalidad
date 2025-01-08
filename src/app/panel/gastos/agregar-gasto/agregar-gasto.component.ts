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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.component.html',
  styleUrls: ['./agregar-gasto.component.css'],
})
export class AgregarGastoComponent implements OnInit {
  mostrarSkeleton = false;

  gasto: string;

  isEdit = false;
  loading = false;

  private subscription = new Subscription();

  frmAddEditGasto: FormGroup;

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
    this.frmAddEditGasto = this.formBuilder.group({
      idGasto: [0],
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      proveedor: ['', Validators.required],
      fechaProximaVisita: ['', Validators.required],
      observacion: [''],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const { nombre } = this.frmAddEditGasto.value;

    if (this.frmAddEditGasto.valid) {
      this.loading = true;
      // this.categoriasService.addData(0, nombre).subscribe({
      //   next: (res: any) => {
      //     console.log('respuesta cargar categoria', res);
      //     this.toastr.success('¡Categoría cargada con éxito!');
      //     this.frmAddEditGasto.reset();
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

      const body = {
        idGasto: this.frmAddEditGasto.value.idGasto,
        nombre: this.frmAddEditGasto.value.nombre,
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
        //     this.frmAddEditGasto.patchValue(data.resultado);

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
    return this.frmAddEditGasto.controls['fechaProximaVisita'] as FormControl;
  }
}
