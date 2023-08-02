import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Marios } from '../models/marios.model';
import { EmptyMariosList, MariosList } from '../models/marios-list.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class MariosService {
  private baseUrl = '/api/marios';
  private lastMariosData: MariosList = EmptyMariosList;
  private sentMariosData: MariosList = EmptyMariosList;
  private receivedMariosData: MariosList = EmptyMariosList;

  private lastMariosList$ = new ReplaySubject<MariosList>(1);
  private sentMariosList$ = new ReplaySubject<MariosList>(1);
  private receivedMariosList$ = new ReplaySubject<MariosList>(1);
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  get lastMariosList(): Observable<MariosList> {
    if (this.lastMariosData.mariosElementList.length === 0) {
      this.fetchMariosList();
    }
    return this.lastMariosList$.asObservable();
  }

  get sentMariosList(): Observable<MariosList> {
    if (this.sentMariosData.mariosElementList.length === 0) {
      this.fetchMariosList();
    }
    return this.sentMariosList$.asObservable();
  }

  get receivedMariosList(): Observable<MariosList> {
    if (this.receivedMariosData.mariosElementList.length === 0) {
      this.fetchMariosList();
    }
    return this.receivedMariosList$.asObservable();
  }

  public fetchDataFromServer(): void {
    this.fetchMariosList();
    this.fetchMariosReceivedByEmployee();
    this.fetchMariosSentByEmployee();
  }

  private fetchMariosList(): void {
    this.http
      .get<MariosList>(this.baseUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.lastMariosData = data;
        this.lastMariosList$.next(this.lastMariosData);
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
      .subscribe(() => {
        this.fetchDataFromServer();
      });
  }

  updateMarios(marios: Marios): void {
    this.http
      .put<Marios>(`${this.baseUrl}/${marios.id}`, marios)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.fetchDataFromServer();
      });
  }

  deleteMarios(mariosId: string): void {
    this.http
      .delete(`${this.baseUrl}/${mariosId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.fetchDataFromServer();
      });
  }

  fetchMariosSentByEmployee(): void {
    const employeeId = this.sessionService.getUserUUID();
    this.http
      .get<MariosList>(`${this.baseUrl}/sent/${employeeId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.sentMariosData = data;
        this.sentMariosList$.next(this.sentMariosData);
      });
  }

  fetchMariosReceivedByEmployee(): void {
    const employeeId = this.sessionService.getUserUUID();
    this.http
      .get<MariosList>(`${this.baseUrl}/receive/${employeeId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.receivedMariosData = data;
        this.receivedMariosList$.next(this.receivedMariosData);
      });
  }
}
