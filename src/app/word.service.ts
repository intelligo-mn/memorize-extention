import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  getWordsList(): Observable<any> {
    return this.http.get(`https://memorize.intelligo.systems/api/words`);
  }
}
