import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFavoritesComponent } from './app-favorites.component';

describe('AppFavoritesComponent', () => {
  let component: AppFavoritesComponent;
  let fixture: ComponentFixture<AppFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppFavoritesComponent]
    });
    fixture = TestBed.createComponent(AppFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
