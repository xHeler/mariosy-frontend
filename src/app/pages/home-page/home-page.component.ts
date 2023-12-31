import { Component, OnDestroy, OnInit } from '@angular/core';
import { MariosService } from 'src/app/core/services/marios.service';
import { MariosElement } from 'src/app/core/models/marios-element.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public recivedCounter = 0;
  public sentCounter = 0;
  public lastMariosData: MariosElement[] = [];
  private destroy$ = new Subject<void>();

  constructor(private mariosService: MariosService) {}

  ngOnInit() {
    this.mariosService.receivedMariosList
      .pipe(takeUntil(this.destroy$))
      .subscribe((receivedMariosData) => {
        this.recivedCounter = receivedMariosData.mariosSize;
      });

    this.mariosService.sentMariosList
      .pipe(takeUntil(this.destroy$))
      .subscribe((sentMariosData) => {
        this.sentCounter = sentMariosData.mariosSize;
      });

    this.mariosService.lastMariosList
      .pipe(takeUntil(this.destroy$))
      .subscribe((lastMariosData) => {
        this.lastMariosData = lastMariosData.mariosElementList;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
