import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moneda } from 'src/app/models/moneda/moneda';

@Injectable({
  providedIn: 'root',
})
export class MonedasService {
  private API_URL = 'https://gestiontransparente.junasoft.com/Monedas';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(this.API_URL);
  }
}
