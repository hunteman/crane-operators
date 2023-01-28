import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseApiUrl: string = environment.api;

  constructor(private http: HttpClient) { }

  public getShifts() {
    return this.http.get(this.baseApiUrl);
  }
}


