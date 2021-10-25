import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBioApplicationsComponent } from './dashboard-bio-applications.component';

describe('DashboardBioApplicationsComponent', () => {
  let component: DashboardBioApplicationsComponent;
  let fixture: ComponentFixture<DashboardBioApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBioApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBioApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
