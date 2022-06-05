# Generated by Django 4.0.3 on 2022-03-08 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LegoSet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SetNo', models.TextField(unique=True)),
                ('Name', models.TextField()),
                ('Year', models.IntegerField()),
                ('ThemeGroup', models.TextField(null=True)),
                ('Theme', models.TextField(null=True)),
                ('Subtheme', models.TextField(null=True)),
                ('MainTag', models.TextField(null=True)),
                ('PriceStore', models.FloatField(null=True)),
                ('PriceNew', models.FloatField(null=True)),
                ('PriceUsed', models.FloatField(null=True)),
                ('Volume', models.FloatField(null=True)),
                ('Weight', models.FloatField(null=True)),
                ('PieceCount', models.IntegerField(null=True)),
                ('MinifigCount', models.IntegerField(null=True)),
                ('RatingValue', models.FloatField(null=True)),
                ('RatingVotes', models.IntegerField(null=True)),
            ],
        ),
    ]