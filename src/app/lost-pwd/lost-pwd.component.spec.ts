import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPwdComponent } from './lost-pwd.component';

describe('LostPwdComponent', () => {
  let component: LostPwdComponent;
  let fixture: ComponentFixture<LostPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
