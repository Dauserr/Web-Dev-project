from django.db import models

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    user_id = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    current_funds = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    target_funds = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()

    class Meta:
        db_table = "projects"
        managed = False

class Photo(models.Model):
    photo_id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    photo_url = models.TextField()

    class Meta:
        db_table = "photos"
        managed = False

class Favorite(models.Model):
    favorite_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    class Meta:
        db_table = "favorites"
        unique_together = ("user_id", "project")
        managed = False
