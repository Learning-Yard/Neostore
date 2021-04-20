import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueProfileComponent } from './dialogue-profile.component';

describe('DialogueProfileComponent', () => {
  let component: DialogueProfileComponent;
  let fixture: ComponentFixture<DialogueProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
