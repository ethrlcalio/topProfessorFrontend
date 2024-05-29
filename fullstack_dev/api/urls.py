from django.urls import path
from .views import ProfessorView, StudentView, ClassView, DaysView, ScheduleView, RatingView, save_rating_data, RegisterView, delete_rating, CustomLoginView, csrf_token_view
from . import views

urlpatterns = [
    path('professors/', ProfessorView.as_view()),
    path('students', StudentView.as_view()),
    path('classes', ClassView.as_view()),
    path('days', DaysView.as_view()),
    path('schedules', ScheduleView.as_view()),
    path('ratings', RatingView.as_view()),
    path('api/professor-data/', views.get_professor_data, name='professor_data'),
    path('api/professors/', views.get_professors, name='professors_data'),
    path('api/student-data/', views.get_student_data, name='student_data'),
    path('api/students/', views.get_students, name='students_data'),
    path('api/class-data/', views.get_class_data, name='class_data'),
    path('api/classes/', views.get_classes, name='classes_data'),
    path('api/days-data/', views.get_days_data, name='days_data'),
    path('api/schedule-data/', views.get_schedule_data, name='schedule_data'),
    path('api/rating-data/', views.get_rating_data, name='rating_data'),
    path('api/ratings/', views.get_ratings, name='ratings_data'),
    path('api/save-rating-data/', save_rating_data, name='save_rating_data'),
    path('api/rating/<int:rating_id>/', delete_rating, name='delete_rating'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', CustomLoginView.as_view(), name='custom_login'),
    path('csrf_token/', csrf_token_view, name='csrf_token'),
]