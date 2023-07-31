import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Marios } from '../models/marios.model';
import { MariosElement } from '../models/marios-element.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class MariosService {
  private baseUrl = '/api/marios';
  private mariosData: MariosElement[] = [];
  private lastMariosList$ = new ReplaySubject<MariosElement[]>(1);
  private sentMariosList$ = new ReplaySubject<MariosElement[]>(1);
  private receivedMariosList$ = new ReplaySubject<MariosElement[]>(1);
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  get lastMariosList(): Observable<MariosElement[]> {
    if (this.mariosData.length === 0) {
      this.fetchMariosList();
    }
    return this.lastMariosList$.asObservable();
  }

  private fetchMariosList(): void {
    this.http
      .get<MariosElement[]>(this.baseUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mariosData = [...data];
        this.lastMariosList$.next(this.mariosData);
      });
  }

  private refreshMariosList(): void {
    this.fetchMariosList();
    this.fetchMariosReceivedByEmployee();
    this.fetchMariosSentByEmployee();
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
      .subscribe(() => {
        this.refreshMariosList();
      });
  }

  updateMarios(marios: Marios): void {
    this.http
      .put<Marios>(`${this.baseUrl}/${marios.id}`, marios)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshMariosList();
      });
  }

  deleteMarios(mariosId: string): void {
    this.http
      .delete(`${this.baseUrl}/${mariosId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshMariosList();
      });
  }

  fetchMariosSentByEmployee(): void {
    const employeeId = this.sessionService.getUserUUID();
    this.http
      .get<MariosElement[]>(`${this.baseUrl}/sent/${employeeId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mariosData = [...data];
        this.sentMariosList$.next(this.mariosData);
      });
  }

  fetchMariosReceivedByEmployee(): void {
    const employeeId = this.sessionService.getUserUUID();
    this.http
      .get<MariosElement[]>(`${this.baseUrl}/receive/${employeeId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mariosData = [...data];
        this.receivedMariosList$.next(this.mariosData);
      });
  }
}
