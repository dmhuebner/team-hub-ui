import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-monitor-info',
  templateUrl: './monitor-info.component.html',
  styleUrls: ['./monitor-info.component.scss']
})
export class MonitorInfoComponent implements OnInit {

  @Input() monitorOn: boolean;
  @Input() monitorCountdown: number;
  @Input() intervalLength: number;
  @Input() hasConfig: boolean;
  @Output() startedMonitoring = new EventEmitter<boolean>();
  @Output() stoppedMonitoring = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  startMonitoringProjects() {
    this.startedMonitoring.emit(true);
  }

  stopMonitoringProjects() {
    this.stoppedMonitoring.emit(true);
  }

}
