from django.db import models
from django.contrib.auth.models import User

class Professor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    professorID = models.BigAutoField(primary_key=True)
    professorCode = models.IntegerField()
    lastName = models.CharField(max_length=32)
    firstName = models.CharField(max_length=64)
    program = models.CharField(max_length=128)
    division = models.CharField(max_length=128)
    schoolYear = models.CharField(max_length=128)
    email = models.EmailField(max_length=64)
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    position = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    studentID = models.IntegerField(primary_key=True)
    lastName = models.CharField(max_length=32)
    firstName = models.CharField(max_length=64)
    program = models.CharField(max_length=128)
    division = models.CharField(max_length=128)
    email = models.EmailField(max_length=64)
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

class Class(models.Model):
    classID = models.IntegerField(primary_key=True)
    className = models.CharField(max_length=128)
    professorID = models.ForeignKey(Professor, on_delete=models.CASCADE)
    startTime = models.TimeField()
    endTime = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

class Days(models.Model):
    dayID = models.BigAutoField(primary_key=True)
    classID = models.ForeignKey(Class, on_delete=models.CASCADE)
    day = models.CharField(max_length=10, choices=[(day, day) for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']])
    created_at = models.DateTimeField(auto_now_add=True)

class Schedule(models.Model):
    scheduleID = models.BigAutoField(primary_key=True)
    classID = models.ForeignKey(Class, on_delete=models.CASCADE)
    studentID = models.ForeignKey(Student, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Rating(models.Model):
    ratingID = models.BigAutoField(primary_key=True)
    classID = models.ForeignKey(Class, on_delete=models.CASCADE)
    studentID = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating1 = models.DecimalField(max_digits=3, decimal_places=2)
    rating2 = models.DecimalField(max_digits=3, decimal_places=2)
    rating3 = models.DecimalField(max_digits=3, decimal_places=2)
    rating4 = models.DecimalField(max_digits=3, decimal_places=2)
    comments = models.TextField(null=True, blank=True)
    
