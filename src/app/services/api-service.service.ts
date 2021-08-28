import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.test';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  /*********************************************************
   * Application common headers to be send to rest api's 
   * 
   *********************************************************/
   setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return new HttpHeaders(headersConfig);
  }

  /**********************************************************
   * Error formatter
   * 
   **********************************************************/
  private formatErrors(error: any) {
    return (JSON.stringify(error));
  }

  /***********************************************************
   * HTTP GET method wrapper responsible to return observable
   *
   * @param path 
   * @param params 
   * @param responseType 
   * @returns observable
   **********************************************************/
  get(path: string, params: HttpParams = new HttpParams(), responseType?): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params, responseType: responseType })
      .pipe(catchError(this.formatErrors));
  }
 
  
}
