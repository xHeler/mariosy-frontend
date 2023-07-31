import { Component, OnDestroy, OnInit } from '@angular/core';
import { MariosService } from 'src/app/core/services/marios.service';
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
  private destroy$ = new Subject<void>();

  constructor(private mariosService: MariosService) {}

  ngOnInit() {
    this.mariosService.receiveMariosList
      .pipe(takeUntil(this.destroy$))
      .subscribe((receivedMariosData) => {
        this.recivedCounter = receivedMariosData.length;
      });

    this.mariosService.sentMariosList
      .pipe(takeUntil(this.destroy$))
      .subscribe((sentMariosData) => {
        this.sentCounter = sentMariosData.length;
      });

    this.mariosService.refreshMariosList();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
