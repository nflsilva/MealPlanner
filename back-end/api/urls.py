from rest_framework import routers
from .api import IngredientViewSet, MealViewSet

router = routers.DefaultRouter()
router.register("ingredient", IngredientViewSet, "ingredient")
router.register("meal", MealViewSet, "meal")

urlpatterns = router.urls