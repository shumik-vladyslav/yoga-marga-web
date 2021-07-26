import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComplexComponent } from './my-complex.component';

describe('MyComplexComponent', () => {
  let component: MyComplexComponent;
  let fixture: ComponentFixture<MyComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComplexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
