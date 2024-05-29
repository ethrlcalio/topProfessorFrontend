from rest_framework import serializers
from .models import Professor, Student, Class, Days, Schedule, Rating
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')  # Include other fields if needed
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ProfessorSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Professor
        fields = ['professorID', 'lastName', 'firstName', 'professorCode', 'program', 'division', 'schoolYear', 'position','user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        professor = Professor.objects.create(user=user, **validated_data)
        return professor
    
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested serializer for creating user

    class Meta:
        model = Student
        fields = ('studentID', 'lastName', 'firstName', 'email', 'user', 'program', 'division', 'created_at')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
        else:
            raise serializers.ValidationError(user_serializer.errors)

        student = Student.objects.create(user=user, **validated_data)
        return student

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ('classID', 'className', 'professorID', 'startTime', 'endTime', 'created_at')

class DaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = ('dayID', 'classID', 'day', 'created_at')

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('scheduleID', 'classID', 'studentID', 'created_at')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('ratingID', 'classID', 'studentID', 'rating1', 'rating2' , 'rating3', 'rating4', 'comments')