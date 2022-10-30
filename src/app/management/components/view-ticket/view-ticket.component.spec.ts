import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketComponent } from './view-ticket.component';

describe('EditTicketComponent', () => {
  let component: ViewTicketComponent;
  let fixture: ComponentFixture<ViewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
