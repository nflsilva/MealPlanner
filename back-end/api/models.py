from django.db import models


def upload_file_path_ingredient(instance, filename):
    ext = filename.split(".")
    return "/".join(["ingredient", str(instance.name) + "." + ext[len(ext) - 1]])


def upload_file_path_meal(instance, filename):
    ext = filename.split(".")
    return "/".join(["meal", str(instance.name) + "." + ext[len(ext) - 1]])


class Ingredient(models.Model):

    name = models.CharField(max_length=112, unique=True)
    proteins = models.DecimalField(decimal_places=1, max_digits=3, default=0.0)
    fats = models.DecimalField(decimal_places=1, max_digits=3, default=0.0)
    carbohydrates = models.DecimalField(decimal_places=1, max_digits=3, default=0.0)

    last_updated = models.DateTimeField(auto_now=True)

    image = models.ImageField(upload_to=upload_file_path_ingredient, default=None)


class IngredientAmount(models.Model):

    amount = models.CharField(max_length=5)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)


class Meal(models.Model):

    name = models.CharField(max_length=112, unique=True)
    ingredientAmounts = models.ManyToManyField(IngredientAmount)

    last_updated = models.DateTimeField(auto_now=True)

    image = models.ImageField(upload_to=upload_file_path_meal, default=None)