# Generated by Django 4.0.3 on 2022-03-08 22:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('business_module', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='legoset',
            name='MainTag',
        ),
        migrations.RemoveField(
            model_name='legoset',
            name='Volume',
        ),
        migrations.RemoveField(
            model_name='legoset',
            name='Weight',
        ),
    ]