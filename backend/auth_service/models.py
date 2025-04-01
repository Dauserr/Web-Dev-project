from django.db import models


# Create your models here.

class Users(models.Model):
    user_id = models.CharField(max_length=100, primary_key=True)
    user_name = models.CharField(max_length=100, unique=True)
    user_password = models.CharField(max_length=100, unique=True)
    user_fullName = models.CharField(max_length=60, default='')
    user_phoneNumber = models.CharField(max_length=11, default='')
    user_description = models.CharField(max_length=200, default='')
    class Meta:
        db_table = 'users'
        managed = False

    def __str__(self):
        return f"user with userID : {self.user_id} and with user name:{self.user_name}"
