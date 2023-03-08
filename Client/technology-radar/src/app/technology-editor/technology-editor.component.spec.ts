import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyEditorComponent } from './technology-editor.component';

describe('TechnologyEditorComponent', () => {
  let component: TechnologyEditorComponent;
  let fixture: ComponentFixture<TechnologyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
