import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL: string = "https://api.wisey.app/api/v1/core/preview-courses";
const TOKEN: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MGU3Mzg5MS1mOGYyLTQ4MjQtYTJkNi03NGIzNGVmZTA3NzAiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkyMjI0OTIsImV4cCI6MTY4MDEyMjQ5Mn0.nraQriLLpvkfcx5uZvxvhHFmt8p1IgUa5ROY3uksgvg';

@Injectable({
  providedIn: 'root'
})
export class CoursesApiService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${TOKEN}`);
    return this.http.get(BASE_URL, { headers: headers });
  }


  getCourse(id: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${TOKEN}`);
    return this.http.get(BASE_URL + '/' + id, { headers: headers });
  }
}
