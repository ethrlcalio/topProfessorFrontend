# Generated by Django 5.0.5 on 2024-05-15 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_student_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='division',
            field=models.CharField(default='default_value', max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='program',
            field=models.CharField(default='default_value', max_length=128),
            preserve_default=False,
        ),
    ]
