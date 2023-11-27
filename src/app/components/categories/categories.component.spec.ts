import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions} from '@ngrx/effects/testing';
import { AppCategoriesComponent } from './categories.component';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';
import { AppState } from 'src/app/types/app-state.interface';
import * as RecipeCategoryActions from '../../store/actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppNavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { initialState } from 'src/app/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeCategoriesEffect } from 'src/app/store/effects';
import { Actions } from '@ngrx/effects';
import { RecipesHttpService } from 'src/app/services/http/recipes-http.service';

class MockActivatedRoute {
  data = of({ name: 'Mock Page Title' });
}

describe('AppCategoriesComponent', () => {
  let component: AppCategoriesComponent;
  let fixture: ComponentFixture<AppCategoriesComponent>;
  let store: MockStore;

  let effects$: RecipeCategoriesEffect;
  let actions$: Observable<Actions>;
  let recipesHttpServiceMock = jasmine.createSpyObj('RecipesHttpService', ['getCategories', 'getAreas']);
  let recipesDataStorageService: RecipesDataStorageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppCategoriesComponent, 
          AppNavbarComponent,
        ],
        providers: [
          RecipesDataStorageService,
          {
            provide: RecipesHttpService,
            useValue: recipesHttpServiceMock,
          },
          provideMockStore({ initialState: {
            categoryState: initialState
          } as AppState }),
          { 
            provide: ActivatedRoute, 
            useClass: MockActivatedRoute,
          },
          RecipeCategoriesEffect,
          provideMockActions(() => actions$),
        ],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
        ]
      }).compileComponents();

      store = TestBed.inject<Store>(Store) as MockStore;
      actions$ = TestBed.inject(Actions);
      effects$ = TestBed.inject(RecipeCategoriesEffect);
      recipesDataStorageService = TestBed.inject(RecipesDataStorageService);
    })
  );

  beforeEach(() => {
    recipesHttpServiceMock.getAreas.and.returnValue(of(["Poland", "Gernany"]));
    fixture = TestBed.createComponent(AppCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getRecipeCategories action on ngOnInit', () => {
    const getAreasSpy = spyOn(recipesDataStorageService, 'getAreas').and.callThrough();
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(
      RecipeCategoryActions.getRecipeCategories()
    );

    expect(getAreasSpy).toHaveBeenCalled();

    expect(component.recipeDataStorage.recipeAreas).toEqual(["Poland", "Gernany"]);
  });

  it('should fetch getRecipeCategories', () => {
    const mockRecipeCategories = [{ id: 1, name: 'Category 1', image: 'ds', description: "ds"}];

    recipesHttpServiceMock.getCategories.and.returnValue(of(mockRecipeCategories));

    component.ngOnInit();

    effects$.getRecipeCategories$.subscribe((resultAction) => {
      expect(resultAction).toEqual(
        RecipeCategoryActions.getRecipeCategoriesSuccess({ recipeCategories: mockRecipeCategories })
      );
    });
  });
});
