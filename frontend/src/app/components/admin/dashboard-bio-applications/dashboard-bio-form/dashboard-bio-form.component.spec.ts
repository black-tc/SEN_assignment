import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBioFormComponent } from './dashboard-bio-form.component';

describe('DashboardBioFormComponent', () => {
  let component: DashboardBioFormComponent;
  let fixture: ComponentFixture<DashboardBioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
