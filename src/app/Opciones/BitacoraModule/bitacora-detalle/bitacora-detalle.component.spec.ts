import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraDetalleComponent } from './bitacora-detalle.component';

describe('BitacoraDetalleComponent', () => {
  let component: BitacoraDetalleComponent;
  let fixture: ComponentFixture<BitacoraDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitacoraDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitacoraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
