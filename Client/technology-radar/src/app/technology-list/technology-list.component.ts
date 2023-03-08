import { Component, OnInit } from '@angular/core';

import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit {

  technologies: Technology[] = [];

  constructor(private technologyService: TechnologyService) { }

  ngOnInit(): void {
    this.getTechnologies();
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies()
      .subscribe(technologies => this.technologies = technologies);
  }
}
