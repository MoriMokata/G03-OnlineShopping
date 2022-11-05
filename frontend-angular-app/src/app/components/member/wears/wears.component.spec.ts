import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WearsComponent } from './wears.component';

describe('WearsComponent', () => {
  let component: WearsComponent;
  let fixture: ComponentFixture<WearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WearsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
