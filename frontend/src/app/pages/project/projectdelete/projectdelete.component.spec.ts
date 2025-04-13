import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectdeleteComponent } from './projectdelete.component';

describe('ProjectdeleteComponent', () => {
  let component: ProjectdeleteComponent;
  let fixture: ComponentFixture<ProjectdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectdeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
