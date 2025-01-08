import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipalidad } from 'src/app/models/municipalidad/municipalidad';

@Injectable({
  providedIn: 'root',
})
export class MunicipalidadesService {
  private API_URL = 'https://gestiontransparente.junasoft.com/Municipalidades';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Municipalidad[]> {
    return this.http.get<Municipalidad[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idMunicipalidad: number,
    municipalidad: string,
    files: File[],
    colorFondo: string
  ): Observable<Municipalidad> {
    const formData: FormData = new FormData();

    formData.append('idMunicipalidad', idMunicipalidad.toString());
    formData.append('municipalidad', municipalidad);
    formData.append('colorFondo', colorFondo);

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append('files', file, file.name);
      });
    }

    return this.http.post<Municipalidad>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(
    idMunicipalidad: number,
    municipalidad: string,
    files: File[],
    colorFondo: string
  ): Observable<Municipalidad> {
    const formData: FormData = new FormData();

    formData.append('idMunicipalidad', idMunicipalidad.toString());
    formData.append('municipalidad', municipalidad);
    formData.append('colorFondo', colorFondo);

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append('files', file, file.name);
      });
    }

    return this.http.put<Municipalidad>(
      `${this.API_URL}/${idMunicipalidad}`,
      formData
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Municipalidad> {
    return this.http.get<Municipalidad>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(municipalidad: Municipalidad): Observable<Municipalidad[]> {
    return this.http.delete<Municipalidad[]>(
      this.API_URL + '/' + municipalidad.idMunicipalidad
    );
  }
}
