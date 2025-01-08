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
import { SecretariasService } from 'src/app/services/secretarias/secretarias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-secretaria',
  templateUrl: './agregar-editar-secretaria.component.html',
  styleUrls: ['./agregar-editar-secretaria.component.css'],
})
export class AgregarEditarSecretariaComponent implements OnInit {
  mostrarSkeleton = false;

  secretaria: any;

  isEdit = false;
  loading = false;

  private subscription = new Subscription();

  deshabilitado: any;

  frmAddEditSecretaria: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private secretariasService: SecretariasService,
    private activatedRoute: ActivatedRoute,
    private router: Router // private clientesService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.createForm();

    this.cargarDatosEnFormulario();
  }

  // f************************************** FUNCION PARA INICIALIZAR FORM ***************************
  createForm() {
    this.frmAddEditSecretaria = this.formBuilder.group({
      idSecretaria: [0],
      secretaria: ['', Validators.required],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const { secretaria } = this.frmAddEditSecretaria.value;

    if (this.frmAddEditSecretaria.valid) {
      this.loading = true;
      this.secretariasService.addData(0, secretaria).subscribe({
        next: (res: any) => {
          console.log('respuesta cargar secretaria', res);
          this.toastr.success('¡Secretaría cargada con éxito!');
          this.frmAddEditSecretaria.reset();
          this.loading = false;
          setTimeout(() => {
            location.reload();
          }, 200);
        },
        error: (error: any) => {
          this.toastr.error(
            'Ha ocurrido un error. Espere e intente nuevamente.'
          );
        },
      });
    } else {
      Object.values(this.frmAddEditSecretaria.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // f************************************** FUNCION PARA EDITAR BARRIO ***************************
  onUpdate() {
    if (this.frmAddEditSecretaria.valid) {
      this.loading = true;
      const body = {
        idSecretaria: this.frmAddEditSecretaria.value.idSecretaria,
        secretaria: this.frmAddEditSecretaria.value.secretaria,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta secretaría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.secretariasService.updateData(body).subscribe({
              next: (response: any) => {
                console.log('respuesta editar', response);
                Swal.fire(
                  '¡Editado!',
                  '¡La secretaría se ha editado correctamente!',
                  'success'
                );
                this.loading = false;
                setTimeout(() => {
                  this.router
                    .navigate(['/admin/secretarias/listado-de-secretarias'])
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
                  'Ha ocurrido un error al intentar editar el secretaria. Por favor, inténtelo de nuevo más tarde.',
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
        this.secretariasService.getDataById(id).subscribe(
          (data: any) => {
            this.frmAddEditSecretaria.patchValue(data.resultado);

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

  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlSecretaria(): FormControl {
    return this.frmAddEditSecretaria.controls['secretaria'] as FormControl;
  }
}
