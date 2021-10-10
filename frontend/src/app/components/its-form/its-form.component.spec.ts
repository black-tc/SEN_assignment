import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsFormComponent } from './its-form.component';

describe('ItsFormComponent', () => {
  let component: ItsFormComponent;
  let fixture: ComponentFixture<ItsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
