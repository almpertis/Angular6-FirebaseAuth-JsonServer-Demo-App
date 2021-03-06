import { Client } from '../models/client';
import { EventEmitter } from '@angular/core';

export class ClientService {
    clientSelected = new EventEmitter<Client>();
    totalItems = new EventEmitter<String>();
    deletedItem = new EventEmitter<number>();
    updatedItem = new EventEmitter<Boolean>();
}
