import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiveComponent implements OnInit {
  @Input()
  value: any;

  constructor() { }

  ngOnInit() {
  }

}
