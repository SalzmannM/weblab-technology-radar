import { Component } from '@angular/core';
import { Category, Ring, Technology } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-technology-overview',
  templateUrl: './technology-overview.component.html',
  styleUrls: ['./technology-overview.component.scss']
})
export class TechnologyOverviewComponent {

  categories = Category;
  rings = Ring;

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
