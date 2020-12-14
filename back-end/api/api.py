from rest_framework import viewsets, permissions
from .serializers import IngredientSerializer, MealSerializer

from api.models import Ingredient, Meal


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = IngredientSerializer


class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MealSerializer