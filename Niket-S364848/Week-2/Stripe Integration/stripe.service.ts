import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StripeService {

  apiRootUrl = environment.apiRootUrl;

  constructor(private http: HttpClient) { }

  createStripeSession(): Observable<any> {
    return this.http.post<any>(`${this.apiRootUrl}/api/stripe/create-stripe-session-subscription`,{});
  }
}
