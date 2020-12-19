from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from .serializers import (
    IngredientSerializer,
    IngredientSerializerDetail,
    MealSerializer,
    MealSerializerDetail,
)


from api.models import Ingredient, Meal, IngredientAmount


@transaction.atomic
@api_view(["GET", "POST"])
def ingredients(request):

    if request.method == "GET":

        search = request.query_params.get("name", None)
        if search is None:
            ingredients = Ingredient.objects.all()
        else:
            ingredients = Ingredient.objects.filter(name__startswith=search)

        serializer = IngredientSerializer(ingredients, many=True)
        return Response(data=serializer.data)

    elif request.method == "POST":

        try:
            ingredient = Ingredient(
                name=request.data["name"],
                proteins=request.data["proteins"],
                fats=request.data["fats"],
                carbohydrates=request.data["carbohydrates"],
            )
            ingredient.save()

            return Response()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@transaction.atomic
@api_view(["GET", "PUT"])
def ingredientDetail(request, id):

    try:
        ingredient = Ingredient.objects.get(id=id)
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "GET":
        serializer = IngredientSerializerDetail(ingredient, many=False)
        return Response(data=serializer.data)

    elif request.method == "PUT":

        ingredient.name = request.data["name"]
        ingredient.proteins = request.data["proteins"]
        ingredient.fats = request.data["fats"]
        ingredient.carbohydrates = request.data["carbohydrates"]
        ingredient.image = request.data["image"]

        print(ingredient.image)
        ingredient.save()

        return Response()


@transaction.atomic
@api_view(["GET", "POST"])
def meals(request):

    if request.method == "GET":

        meals = Meal.objects.all()
        serializer = MealSerializer(meals, many=True)
        return Response(data=serializer.data)

    elif request.method == "POST":

        ingredientAmounts = request.data["ingredientAmounts"]
        meal = Meal(name=request.data["name"])
        meal.save()
        for ia in ingredientAmounts:

            ia_ingredient_id = ia["ingredient"]["id"]
            related_ingredient = Ingredient.objects.get(id=ia_ingredient_id)

            new_ia = IngredientAmount(
                amount=ia["amount"],
                ingredient=related_ingredient,
            )
            new_ia.save()
            meal.ingredientAmounts.add(new_ia)

        meal.save()
        return Response()


@transaction.atomic
@api_view(["GET", "PUT"])
def mealDetail(request, id):

    try:
        meal = Meal.objects.get(id=id)
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "GET":
        serializer = MealSerializerDetail(meal, many=False)
        return Response(data=serializer.data)

    elif request.method == "PUT":

        try:
            name = request.data["name"]
            ingredientAmounts = request.data["ingredientAmounts"]
            ingredientsToDelete = request.data["removedIngredients"]

            for ia in ingredientAmounts:

                ia_ingredient_id = ia["ingredient"]["id"]
                related_ingredient = Ingredient.objects.get(id=ia_ingredient_id)

                try:
                    old_ia = meal.ingredientAmounts.get(ingredient=related_ingredient)
                except:
                    # did not find
                    old_ia = None

                if old_ia is None:
                    # Create news
                    new_ia = IngredientAmount(
                        amount=ia["amount"],
                        ingredient=related_ingredient,
                    )
                    new_ia.save()
                    meal.ingredientAmounts.add(new_ia)
                    new_ia.save()
                else:
                    # Update olds
                    if old_ia.id in ingredientsToDelete:
                        ingredientsToDelete.remove(old_ia.id)
                    old_ia.amount = ia["amount"]
                    old_ia.save()

            for toDelete in ingredientsToDelete:
                meal.ingredientAmounts.get(id=toDelete).delete()

            meal.name = name
            meal.save()
            return Response()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
