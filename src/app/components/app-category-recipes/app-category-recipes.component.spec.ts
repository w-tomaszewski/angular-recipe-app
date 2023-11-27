import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppCategoryRecipesComponent } from './app-category-recipes.component';
import { AppNavbarComponent } from '../app-navbar/app-navbar.component';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';
import { RecipesHttpService } from 'src/app/services/http/recipes-http.service';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeShort } from 'src/app/types/recipe-short.interface';

describe('AppCategoryRecipesComponent', () => {
  let component: AppCategoryRecipesComponent;
  let fixture: ComponentFixture<AppCategoryRecipesComponent>;
  let recipesHttpServiceMock = jasmine.createSpyObj('RecipesHttpService', ['getCategoryRecipes']);
  let recipesDataStorageService: RecipesDataStorageService;
  const categoryNameMock = 'Beef';
  const categoryRecipesMock: RecipeShort[] = [
    {
    id: 1,
    name: 'Beef Burger',
    image: 'img',
    } as RecipeShort,
    {
      id: 2,
      name: 'Beef Pizza',
      image: 'img',
      } as RecipeShort,
  ];

  beforeEach(
    waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCategoryRecipesComponent,
        AppNavbarComponent,
      ],
      providers: [
        RecipesDataStorageService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ name: 'Mock Page Title' }),
            snapshot: {
              paramMap: convertToParamMap({ categoryName: categoryNameMock }),
            },
          },
        },
        {
          provide: RecipesHttpService,
          useValue: recipesHttpServiceMock,
        }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
  }).compileComponents();
    recipesHttpServiceMock.getCategoryRecipes.and.returnValue(of(categoryRecipesMock));
    recipesDataStorageService = TestBed.inject(RecipesDataStorageService);
  })
  );

  beforeEach(() => { 

    fixture = TestBed.createComponent(AppCategoryRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch category recipes on ngOnInit', () => {
    component.ngOnInit();

    expect(component.categoryName).toEqual(categoryNameMock);

    expect(component.categoryRecipes$.subscribe((result) => {
      expect(result).toEqual(categoryRecipesMock);
    }));
  });
});
