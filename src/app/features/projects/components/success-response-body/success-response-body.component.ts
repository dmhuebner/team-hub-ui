import { Component, Input, OnInit } from '@angular/core';
import HealthCheckSuccessResponseBody from '../../interfaces/health-check-success-response-body.interface';

@Component({
  selector: 'app-success-response-body',
  templateUrl: './success-response-body.component.html',
  styleUrls: ['./success-response-body.component.scss']
})
export class SuccessResponseBodyComponent implements OnInit {

  @Input() successResponseBody: HealthCheckSuccessResponseBody;
  @Input() invalidResponseBody: boolean;

  showSuccessResponseBody: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleShowSuccessResBody() {
    this.showSuccessResponseBody = !this.showSuccessResponseBody;
  }

}
