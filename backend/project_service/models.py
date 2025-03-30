from django.db import models

# Create your models here.

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    user_id = models.CharField(max_length=100)
    current_funds = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    target_funds = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()

    class Meta:
        db_table = "projects"

class Photo(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    photo_url = models.TextField()

    class Meta:
        db_table = "photos"

class Favorite(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    class Meta:
        db_table = "favorites"
        unique_together = ("user_id", "project")
