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
  private lastMariosData: MariosElement[] = [];
  private sentMariosData: MariosElement[] = [];
  private receivedMariosData: MariosElement[] = [];

  private lastMariosList$ = new ReplaySubject<MariosElement[]>(1);
  private sentMariosList$ = new ReplaySubject<MariosElement[]>(1);
  private receivedMariosList$ = new ReplaySubject<MariosElement[]>(1);
  private destroy$ = new Subject<void>();

  private sentMariosListSize = 0;
  private receivedMariosListSize = 0;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  get lastMariosList(): Observable<MariosElement[]> {
    if (this.lastMariosData.length === 0) {
      this.fetchMariosList();
    }
    return this.lastMariosList$.asObservable();
  }

  get sentMariosList(): Observable<MariosElement[]> {
    if (this.sentMariosData.length === 0) {
      this.fetchMariosList();
    }
    return this.sentMariosList$.asObservable();
  }

  get receivedMariosList(): Observable<MariosElement[]> {
    if (this.receivedMariosData.length === 0) {
      this.fetchMariosList();
    }
    return this.receivedMariosList$.asObservable();
  }

  public getSentMariosListSize(): number {
    return this.sentMariosListSize;
  }

  public getReceiveMariosListSize(): number {
    return this.receivedMariosListSize;
  }

  private fetchMariosList(): void {
    this.http
      .get<MariosElement[]>(this.baseUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.lastMariosData = [...data];
        this.lastMariosList$.next(this.lastMariosData);
      });
  }

  public refreshMariosList(): void {
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
        this.sentMariosData = [...data];
        this.sentMariosList$.next(this.sentMariosData);
        this.sentMariosListSize = this.sentMariosData.length;
      });
  }

  fetchMariosReceivedByEmployee(): void {
    const employeeId = this.sessionService.getUserUUID();
    this.http
      .get<MariosElement[]>(`${this.baseUrl}/receive/${employeeId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.receivedMariosData = [...data];
        this.receivedMariosList$.next(this.receivedMariosData);
        this.receivedMariosListSize = this.receivedMariosData.length;
      });
  }
}
