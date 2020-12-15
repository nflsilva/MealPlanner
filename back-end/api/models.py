from django.db import models

class Ingredient(models.Model):

    name = models.CharField(max_length=112, unique=True)
    proteins = models.DecimalField(decimal_places=1, max_digits=3, default=0.0)
    fats = models.DecimalField(decimal_places=1, max_digits=3, default=0.0)
    carbohydrates = models.DecimalField(decimal_places=1, max_digits=3, default=0.0)

    last_updated = models.DateTimeField(auto_now=True)


class Meal(models.Model):

    name = models.CharField(max_length=112, unique=True)
    ingredients = models.ManyToManyField(Ingredient)

    last_updated = models.DateTimeField(auto_now=True)