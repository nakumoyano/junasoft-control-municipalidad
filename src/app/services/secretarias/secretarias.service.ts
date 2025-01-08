import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Secretaria } from 'src/app/models/secretaria/secretaria';

@Injectable({
  providedIn: 'root',
})
export class SecretariasService {
  private API_URL = 'https://gestiontransparente.junasoft.com/Secretarias';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Secretaria[]> {
    return this.http.get<Secretaria[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(idSecretaria: number, secretaria: string): Observable<Secretaria> {
    const formData: FormData = new FormData();

    formData.append('idSecretaria', idSecretaria.toString());
    formData.append('secretaria', secretaria);

    return this.http.post<Secretaria>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(secretaria: Secretaria): Observable<Secretaria> {
    return this.http.put<Secretaria>(
      this.API_URL + '/' + secretaria.idSecretaria,
      secretaria
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Secretaria> {
    return this.http.get<Secretaria>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(secretaria: Secretaria): Observable<Secretaria[]> {
    return this.http.delete<Secretaria[]>(
      this.API_URL + '/' + secretaria.idSecretaria
    );
  }
}
