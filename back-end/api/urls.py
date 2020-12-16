from django.urls import path
from .views import meals, mealDetail, ingredients, ingredientDetail

urlpatterns = [
    path("meals/", meals, name="meal-list"),
    path("meals/<int:id>/", mealDetail, name="meal-detail"),
    path("ingredients/", ingredients, name="ingredient-list"),
    path("ingredients/<int:id>/", ingredientDetail, name="ingredient-detail"),
]