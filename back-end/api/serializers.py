from rest_framework import serializers
from api.models import Ingredient, Meal, IngredientAmount


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name", "last_updated"]


class IngredientSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class IngredientAmountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientAmount
        fields = ["id", "amount", "ingredient"]

    ingredient = IngredientSerializer()


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name", "last_updated"]


class MealSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"

    ingredientAmounts = IngredientAmountsSerializer(many=True)
