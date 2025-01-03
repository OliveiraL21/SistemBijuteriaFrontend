import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaletaCadastroComponent } from './maleta-cadastro.component';

describe('MaletaCadastroComponent', () => {
  let component: MaletaCadastroComponent;
  let fixture: ComponentFixture<MaletaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaletaCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaletaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
