import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionBusComponent } from './simulacion-bus.component';

describe('SimulacionBusComponent', () => {
  let component: SimulacionBusComponent;
  let fixture: ComponentFixture<SimulacionBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulacionBusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulacionBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
