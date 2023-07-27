import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Marios } from '../models/marios.model';
import { MariosList } from '../models/marios-list.model';

@Injectable({
  providedIn: 'root',
})
export class MariosService {
  private baseUrl = '/api/marios';
  private mariosData: Marios[] = [];
  private mariosList$ = new ReplaySubject<Marios[]>(1);
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get mariosList(): Observable<Marios[]> {
    if (this.mariosData.length === 0) {
      this.fetchMariosList();
    }
    return this.mariosList$.asObservable();
  }

  private fetchMariosList(): void {
    this.http
      .get<Marios[]>(this.baseUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mariosData = [...data];
        this.mariosList$.next(this.mariosData);
      });
  }

  getMariosById(mariosId: string): Observable<Marios> {
    return this.http
      .get<Marios>(`${this.baseUrl}/${mariosId}`)
      .pipe(takeUntil(this.destroy$));
  }

  addMarios(payload: Marios): void {
    this.http
      .post<Marios>(this.baseUrl, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mariosData = [...this.mariosData, data];
        this.mariosList$.next(this.mariosData);
      });
  }

  updateMarios(marios: Marios): void {
    this.http
      .put<Marios>(`${this.baseUrl}/${marios.id}`, marios)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mariosData = this.mariosData.map((marios) =>
          marios.id === data.id ? data : marios
        );
        this.mariosList$.next(this.mariosData);
      });
  }

  deleteMarios(mariosId: string): void {
    this.http
      .delete(`${this.baseUrl}/${mariosId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.mariosData = this.mariosData.filter((marios) => marios.id !== mariosId);
        this.mariosList$.next(this.mariosData);
      });
  }

  getMariosSentByEmployee(employeeId: string): Observable<MariosList> {
    return this.http
      .get<MariosList>(`${this.baseUrl}/sent/${employeeId}`)
      .pipe(takeUntil(this.destroy$));
  }

  getMariosReceivedByEmployee(employeeId: string): Observable<MariosList> {
    return this.http
      .get<MariosList>(`${this.baseUrl}/receive/${employeeId}`)
      .pipe(takeUntil(this.destroy$));
  }
}
