import { Component, OnDestroy, OnInit } from '@angular/core';
import { MariosElement } from '../../core/models/marios-element.model';
import { MariosService } from '../../core/services/marios.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-received-marios',
  templateUrl: './received-marios.component.html',
  styleUrls: ['./received-marios.component.scss'],
})
export class ReceivedMariosComponent implements OnInit, OnDestroy {
  public receivedMariosData: MariosElement[] = [];
  private destroy$ = new Subject<void>();

  constructor(private mariosService: MariosService) {}

  ngOnInit() {
    this.mariosService.fetchDataFromServer();
    this.mariosService.receivedMariosList
      .pipe(takeUntil(this.destroy$))
      .subscribe((receivedMariosData) => {
        this.receivedMariosData = receivedMariosData.mariosElementList;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
