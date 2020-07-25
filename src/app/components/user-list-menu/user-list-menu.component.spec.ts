import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMenuComponent } from './user-list-menu.component';

describe('UserListMenuComponent', () => {
  let component: UserListMenuComponent;
  let fixture: ComponentFixture<UserListMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
