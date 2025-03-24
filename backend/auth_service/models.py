from django.db import models


# Create your models here.

class Users(models.Model):
    user_id = models.CharField(max_length=100, primary_key=True)
    user_name = models.CharField(max_length=100, unique=True)
    user_password = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f"user with userID : {self.user_id} and with user name:{self.user_name}"
