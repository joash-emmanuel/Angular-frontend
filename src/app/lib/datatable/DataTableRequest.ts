import { Input, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { DataTableResponse } from './DataTableResponse';

export class DataTableRequest {


    constructor(private httpClient: HttpClient) {

    }

}