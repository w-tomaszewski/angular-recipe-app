import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNewRecipeComponent } from './new-recipe.component';

describe('AppNewRecipeComponent', () => {
  let component: AppNewRecipeComponent;
  let fixture: ComponentFixture<AppNewRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppNewRecipeComponent]
    });
    fixture = TestBed.createComponent(AppNewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
