import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaletaListagemComponent } from './maleta-listagem.component';

describe('MaletaListagemComponent', () => {
  let component: MaletaListagemComponent;
  let fixture: ComponentFixture<MaletaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaletaListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaletaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
