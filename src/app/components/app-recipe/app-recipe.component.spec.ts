import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRecipeComponent } from './app-recipe.component';

describe('AppRecipeComponent', () => {
  let component: AppRecipeComponent;
  let fixture: ComponentFixture<AppRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppRecipeComponent]
    });
    fixture = TestBed.createComponent(AppRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
