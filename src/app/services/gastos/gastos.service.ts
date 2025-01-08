import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from 'src/app/models/gasto/gasto';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private API_URL = 'https://gestiontransparente.junasoft.com/Gastos';
  private API_URL_DEL_DIA =
    'https://gestiontransparente.junasoft.com/GastosDelDia';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.API_URL);
  }

  // MOSTRAR DATOS DE LA SEMANA
  getAllDataSemana(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.API_URL + '/GastosDeLaSemana');
  }

  // MOSTRAR DATOS DEL DIA
  getAllDataDia(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.API_URL_DEL_DIA);
  }

  // CARGAR DATOS
  addData(
    idGasto: number,
    titulo: string,
    descripcion: string,
    files: File[],
    proveedor: string,
    observaciones: string,
    fecha: string,
    monto: number,
    idMoneda: number,
    idSecretaria: number
  ): Observable<Gasto> {
    const formData: FormData = new FormData();

    formData.append('idGasto', idGasto.toString());
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('proveedor', proveedor);
    formData.append('observaciones', observaciones);
    formData.append('fecha', fecha);
    formData.append('monto', monto.toString());
    formData.append('idMoneda', idMoneda.toString());
    formData.append('idSecretaria', idSecretaria.toString());

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append('files', file, file.name);
      });
    }

    return this.http.post<Gasto>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(
    idGasto: number,
    titulo: string,
    files: File[],
    proveedor: string,
    observaciones: string,
    fecha: string,
    monto: number,
    idMoneda: number,
    idSecretaria: string
  ): Observable<Gasto> {
    const formData: FormData = new FormData();

    formData.append('idGasto', idGasto.toString());
    formData.append('titulo', titulo);
    formData.append('proveedor', proveedor);
    formData.append('observaciones', observaciones);
    formData.append('fecha', fecha);
    formData.append('monto', monto.toString());
    formData.append('idMoneda', idMoneda.toString());
    formData.append('idSecretaria', idSecretaria.toString());

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append('files', file, file.name);
      });
    }

    return this.http.put<Gasto>(`${this.API_URL}/${idGasto}`, formData);
  }

  // GET BY ID
  getDataById(id: number): Observable<Gasto> {
    return this.http.get<Gasto>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(gasto: Gasto): Observable<Gasto[]> {
    return this.http.delete<Gasto[]>(this.API_URL + '/' + gasto.idGasto);
  }
}
