import { Subject } from 'rxjs';
import { LoaderService } from './../../core/services/loader.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {}
  isLoading: Subject<boolean> = this.loaderService.isLoading;
}
