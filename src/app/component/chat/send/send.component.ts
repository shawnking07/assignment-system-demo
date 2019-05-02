import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendComponent implements OnInit {
  @Input()
  value: any;

  constructor() { }

  ngOnInit() {
  }

}
