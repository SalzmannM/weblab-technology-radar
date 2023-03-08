import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HistoryItem, Technology } from './technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private technologiesUrl = 'http://localhost:4566';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
  };
  
  constructor(
    private http: HttpClient
  ) { }
  
  /** GET technologies from the server */
  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.technologiesUrl}/technologies`)
      .pipe(
        tap(_ => this.log('fetched technologies')),
        catchError(this.handleError<Technology[]>('getTechnologies', []))
      );
  }
  
  /** GET technology by id. Will 404 if id not found */
  getTechnology(id: string): Observable<Technology> {
    return this.http.get<Technology>(`${this.technologiesUrl}/technology/${id}`).pipe(
      tap(_ => this.log(`fetched technology id=${id}`)),
      catchError(this.handleError<Technology>(`getTechnology id=${id}`))
    );
  }

  /** PUT: update the technology on the server */
  updateTechnology(technology: Technology): Observable<any> {
    console.log(technology);
    let technologyId = technology._id;
    technology._id = undefined;
    let newTechnology = JSON.stringify(technology);
    technology._id = technologyId;
    console.log(technology);
    return this.http.put(`${this.technologiesUrl}/technology/${technology._id}`,  newTechnology, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated technology id=${technology._id}`)),
      catchError(this.handleError<any>('updateTechnology'))
    );
  }

  /** POST: add a new technology to the server */
  addTechnology(technology: Technology): Observable<any> {
    return this.http.post<Technology>(`${this.technologiesUrl}/technology`, JSON.stringify(technology), this.httpOptions)
      .pipe(
        tap((answer: any) => this.log(`added technology w/ id=${answer.insertedId}`)),
        catchError(this.handleError<Technology>('addTechnology'))
      );
  }

  /** GET history from the server */
  getHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.technologiesUrl}/history`)
      .pipe(
        tap(_ => this.log('fetched history')),
        catchError(this.handleError<HistoryItem[]>('getHistory', []))
      );
  }

  /** POST: add a new historyItem to the server */
  addHistoryItem(history: HistoryItem): Observable<any> {
    return this.http.post<HistoryItem>(`${this.technologiesUrl}/historyitem`, JSON.stringify(history), this.httpOptions)
      .pipe(
        tap((answer: any) => this.log(`added history item w/ id=${answer.insertedId}`)),
        catchError(this.handleError<HistoryItem>('addHistoryItem'))
      );
  }

  /** Log a TechnologyService message with the MessageService */
  private log(message: string) {
    console.log(`TechnologyService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
