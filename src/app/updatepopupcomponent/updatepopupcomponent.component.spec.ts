import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepopupcomponentComponent } from './updatepopupcomponent.component';

describe('UpdatepopupcomponentComponent', () => {
  let component: UpdatepopupcomponentComponent;
  let fixture: ComponentFixture<UpdatepopupcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepopupcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatepopupcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
