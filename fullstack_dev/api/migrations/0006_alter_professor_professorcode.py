# Generated by Django 5.0.4 on 2024-05-07 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_professor_division_professor_program_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='professorCode',
            field=models.IntegerField(),
        ),
    ]
