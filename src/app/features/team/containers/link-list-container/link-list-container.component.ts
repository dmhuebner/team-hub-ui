import { Component, Input, OnInit } from '@angular/core';
import Resource from '../../../../shared/interfaces/resource.interface';

@Component({
  selector: 'app-link-list-container',
  templateUrl: './link-list-container.component.html',
  styleUrls: ['./link-list-container.component.scss']
})
export class LinkListContainerComponent implements OnInit {

  @Input() teamResources: Resource[];

  constructor() { }

  ngOnInit() {
  }

}
