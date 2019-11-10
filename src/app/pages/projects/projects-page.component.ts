import { Component, OnInit } from '@angular/core';
import Config from '../../shared/interfaces/config.interface';
import { ConfigService } from '../../shared/services/config.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  config: Config;

  constructor(public configService: ConfigService) { }

  ngOnInit() {
  }

}
