import { Component, OnDestroy, OnInit } from '@angular/core';
import { MariosElement } from 'src/app/core/models/marios-element.model';
import { MariosService } from '../../core/services/marios.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sent-marios',
  templateUrl: './sent-marios.component.html',
  styleUrls: ['./sent-marios.component.scss'],
})
export class SentMariosComponent implements OnInit, OnDestroy {
  public sentMariosData: MariosElement[] = [];
  private destroy$ = new Subject<void>();

  constructor(private mariosService: MariosService) {}

  ngOnInit() {
    this.mariosService.fetchDataFromServer();
    this.mariosService.sentMariosList
      .pipe(takeUntil(this.destroy$))
      .subscribe((sentMariosData) => {
        this.sentMariosData = sentMariosData.mariosElementList;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
