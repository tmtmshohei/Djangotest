# Generated by Django 2.1.4 on 2018-12-12 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('heatmap', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='position',
            name='time',
            field=models.TextField(default=0),
        ),
    ]
