import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  loading = false;

  mostrarIngresos = false;

  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.getAllData();
    this.getAllDataBajoStocks();
    this.getAllDataFacturacionMes();
  }

  // S************************* FUNCION PARA MOSTRAR CLIENTES*********************
  getAllData() {
    this.loading = true;
    // this.clientesService.getAllData().subscribe(
    //   (data: any) => {
    //     // console.log('datos de clientes', data);
    //     const clientes = data.resultado;
    //     this.clientes = clientes;
    //     // console.log(this.ventas);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las clientes', error);
    //   }
    // );
  }

  // S************************* FUNCION PARA MOSTRAR PRODCUTOS CON STOCJK ABJO *********************
  getAllDataBajoStocks() {
    this.loading = true;
    // this.stockService.getAllDataBajoStocks().subscribe(
    //   (data: any) => {
    //     console.log('datos de usuario no al dia', data);
    //     const stocks = data.resultado;
    //     this.stocks = stocks;
    //     // console.log(this.ventas);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las stocks', error);
    //   }
    // );
  }

  // S************************* FUNCION PARA MOSTRAR TOTAL DE INGRESOS DEL MES *********************
  getAllDataFacturacionMes() {
    // this.loading = true;
    // this.pagosService.getAllFacturacionDelMes().subscribe(
    //   (data: any) => {
    //     // console.log('datos de ingresos', data);
    //     const ingresos = data;
    //     this.ingresos = ingresos; // Convierte ingresos a número si no lo es ya
    //     // console.log(this.ventas);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las ingresos', error);
    //   }
    // );
  }

  // S************************* FUNCION PARA OBTENER TOTAL DE RESULETADOS *********************
  // CLIENTES
  obtenerTotalResultados(): number {
    return this.clientes?.length;
  }

  // S************************* FUNCION PARA HACER ENVIO POR WPP *********************
  completarURLWhatsapp(urlBase: any, telefono: any) {
    if (urlBase && telefono) {
      const urlCompleta = urlBase.replace('phone=549', `phone=549${telefono}`);
      window.open(urlCompleta, '_blank');
    } else {
      this.toastr.error(
        'La URL base y el teléfono son requeridos para enviar un mensaje de WhatsApp.'
      );
    }
  }

  // S************************* FUNCION PARA MOSTRAR INGRESOS *********************
  toggleIngresos() {
    this.mostrarIngresos = !this.mostrarIngresos;
  }
}
