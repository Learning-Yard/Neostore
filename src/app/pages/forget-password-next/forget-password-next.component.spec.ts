import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordNextComponent } from './forget-password-next.component';

describe('ForgetPasswordNextComponent', () => {
  let component: ForgetPasswordNextComponent;
  let fixture: ComponentFixture<ForgetPasswordNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
