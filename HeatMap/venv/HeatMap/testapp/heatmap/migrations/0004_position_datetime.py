# Generated by Django 2.1.4 on 2018-12-19 02:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('heatmap', '0003_auto_20181219_0155'),
    ]

    operations = [
        migrations.AddField(
            model_name='position',
            name='DateTime',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
