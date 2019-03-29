# django-curd

## 0. 기본 설정

1. 프로젝트 생성

   ```bash
   (django-venv) sweetrain:~/workspace $ django-admin startproject django_recrud
   ```

2. 설정 변경

   ```python
   # settings.py
   
   ALLOWED_HOSTS = ['*']
   INSTALLED_APPS = [
       ...
       'boards',
   ]
   LANGUAGE_CODE = 'ko-kr'
   
   TIME_ZONE = 'Asia/Seoul'
   ```

   

3. 앱 생성

   ```bash
   (django-venv) sweetrain:~/workspace $ cd django_recrud/
   
   (django-venv) sweetrain:~/workspace/django_recrud $ python manage.py startapp boards
   
   (django-venv) sweetrain:~/workspace/django_recrud $ python manage.py runserver 0.0.0.0:8080
   ```

   

4. 모델생성

   ```python
   # models.py
   from django.db import models
   
   # Create your models here.
   class Board(models.Model):
       title = models.charField(max_length=20)
       content = models.textField()
       created_at = models.DateTimeField(auto_now_add=True)
       updated_at = models.DateTimeField(auto_now=True)
   ```

   

5. 모델 migrations

   ```bash
   $ python manage.py makemigrations
   ```

   

6. db에 마이그래이션 적용

   ```bash
   $ python manage.py migrate
   ```

   

7. 프로젝트 / urls.py 설정

   ```python
   from django.contrib import admin
   from django.urls import path, include
   
   urlpatterns = [
       path('admin/', admin.site.urls),
       path('boards', include('boards.urls'))	#include 중요
   ]
   
   ```

   

8. app 아래에 urls.py 생성 후 설정

   ```python
   from django.urls import path
   from . import views
   
   urlpatterns = [
       path('new/', views.new)
   ]
   ```

   new 페이지 먼저 생성

   

9. views.py

   ```python
   def new(request):
       return render(request, 'boards/new.html')
   ```

10. `boards/templates/boards/` 생성 후 html 생성

11. base 

    ```html
    <!-- base.html-->
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        {% block body %}
        {% endblock %}
    </body>
    </html>
    ```

12. new

    ```html
    <!--new.html-->
    {% extends 'boards/base.html' %}
    {% block body %}
        <form action="/create" method="POST">
            title : <input type="text" name="title"/><br>
            content : <input type="text" name="content"/><br>
            <input type="submit"/>
        </form>
        
    
    {% endblock %}
    ```

    





