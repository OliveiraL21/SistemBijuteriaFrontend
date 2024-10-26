import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListagemComponent } from './user-listagem.component';

describe('UserListagemComponent', () => {
  let component: UserListagemComponent;
  let fixture: ComponentFixture<UserListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
