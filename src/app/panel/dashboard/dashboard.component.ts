import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gasto } from 'src/app/models/gasto/gasto';
import { GastosService } from 'src/app/services/gastos/gastos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() clientes: any[];
  @Input() stocks: any[];
  // @Input() ingresos: Pago[];
  ingresos: number = 0;

  gastosSemana: number;
  gastosSemanaPesos: number;

  gastosDelDia: any[];

  loading = false;

  mostrarIngresos = false;
  mostrarIngresosPesos = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private gastosService: GastosService
  ) {}

  ngOnInit(): void {
    this.getAllDatosSemana();
    this.getAllDatosDia();
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS LA SEMANA ***********************************
  getAllDatosSemana() {
    this.loading = true;
    this.gastosService.getAllDataSemana().subscribe(
      (data: any) => {
        this.gastosSemana = data.gastoEnDolares;
        this.gastosSemanaPesos = data.gastoEnPesos;
        console.log(this.gastosSemana);
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los gastos:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS DEL DIA ***********************************
  getAllDatosDia() {
    this.loading = true;
    this.gastosService.getAllDataDia().subscribe(
      (data: any) => {
        this.gastosDelDia = data.resultado;
        console.log(data);
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los gastos:', error);
      }
    );
  }

  // S************************* FUNCION PARA OBTENER TOTAL DE RESULETADOS *********************
  // CLIENTES
  obtenerTotalResultados(): number {
    return this.gastosDelDia?.length;
  }

  // S************************* FUNCION PARA MOSTRAR INGRESOS *********************
  toggleIngresos() {
    this.mostrarIngresos = !this.mostrarIngresos;
  }
  toggleIngresosPesos() {
    this.mostrarIngresosPesos = !this.mostrarIngresosPesos;
  }
}
