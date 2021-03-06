import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ClientService } from '../services/client.service';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: Http, private clientService: ClientService) { }

    // API: GET /clients
    public getAllClients(page): Observable<Client[]> {
        return this.http.get(API_URL + '/clients?_page=' + page)
            .pipe(map(response => {
                this.clientService.totalItems.emit(response.headers.get('x-total-count').toString());
                return response.json().map((client) => new Client(client));
            })).pipe(catchError(error => {
                return throwError(error);
            }));
    }

    // API: POST /clients
    public createClient(client: Client) {
        return this.http
            .post(API_URL + '/clients', client)
            .pipe(map(response => {
                return new Client(response.json());
            })).pipe(catchError(error => {
                return throwError(error);
            }));
    }

    // API: PUT /clients/:id
    public updateClient(client: Client) {
        return this.http
        .put(API_URL + '/clients/' + client.id, client)
        .pipe(map(response => {
          return new Client(response.json());
        }))
        .pipe(catchError(error => {
            return throwError(error);
        }));
    }

    // DELETE /clients/:id
    public deleteClientById(clientId: number) {
        return this.http
            .delete(API_URL + '/clients/' + clientId)
            .pipe(map(response => null)).pipe(catchError(error => {
                return throwError(error);
            }));
    }

}
