# instagram 만들기

## 00. setting

1. `bash` startproject

   ```bash
   $ django-admin startproject instagram
   $ cd instagram/
   ```

2. git 설정

   ```bash
   $ git init
   $ git add .
   $ git commit -m "startproject instagram"
   ```

3. git ignore

   `vi .gitignore`

   [gitignore](<https://www.gitignore.io/api/cloud9,django>)

   내용을 vi에 넣는다.

   

4. instagram 가상환경 새로 설정

   ```bash
   (django-venv) sweetrain:~/workspace/instagram (master) $ pyenv virtualenv 3.6.7 insta-venv
   (django-venv) sweetrain:~/workspace/instagram (master) $ pyenv local insta-venv
   ```

   결과

   ```bash
   (insta-venv) sweetrain:~/workspace/instagram (master) $ 
   (insta-venv) sweetrain:~/workspace/instagram (master) $ pip list
   Package    Version
   ---------- -------
   pip        10.0.1 
   setuptools 39.0.1 
   (insta-venv) sweetrain:~/workspace/instagram (master) $ pip install --upgrade pip
   (insta-venv) sweetrain:~/workspace/instagram (master) $ pip list
   Package    Version
   ---------- -------
   pip        19.0.3 
   setuptools 39.0.1 
   ```

5. django 설치

   ```bash
   (insta-venv) sweetrain:~/workspace/instagram (master) $ pip install django==2.1.8
   ```

   + 특정 버전으로 설정해주지 않으면 알아서 최신버전으로 설치.
   + but 이번 django 2.2버전대부터 sql lite 버전 업이 심하게 되면서 우리가 했던것과 오류 차이가 심하게 나기때문에 원하는 버전으로 설치한다.

6. 현재까지 버전 상태 저장

   ``` bash
   $ pip freeze > requirements.txt
   ```

   `requirements.txt`

   ```txt
   Django==2.1.8
   pytz==2019.1
   
   ```

   + 버전을 설정한 것을 저장해놓으면 다른 환경에서 새롭게 시작할 때 그것을 보고 시작할 수 있게 저장해놓는다.

7. `settings.py`

   ```python
   
   ALLOWED_HOSTS = ["*"]
   
   LANGUAGE_CODE = 'ko-kr'
   
   TIME_ZONE = 'Asia/Seoul'
   
   ```





## 01 posts app 생성

1. app 생성 및 등록

   ```bash
   $ python managpy startapp posts
   ```

   `settings.py`

   ```python
   INSTALLED_APPS = [
   	...
       'posts',
   ]
   ```

   `urls.py`

   ```python
   from django.urls import path, include
   
   urlpatterns = [
       path('admin/', admin.site.urls),
       ''path('posts/', include('posts.urls')),''
   ]
   
   ```

   `posts/urls.py`

   ```python
   from django.urls import path
   from . import views
   app_name = 'posts'
   
   urlpatterns = [
   ]
   ```

2. 위까지 하고 run 시키면 url없다고 에러.

   ```bash
   You have 15 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
   Run 'python manage.py migrate' to apply them.
   ```

   이 때 이런 에러가 뜨게 되는데 자동으로 생성되는 user 모델 등이 여기에 포함된다. 따라서 마이그래이션 해준다.

   ```bash
   $ python manage.py migrate
   ```

   

3. **app을 만들면 model을 먼저 만든다!!!!**

4. `posts/models.py`

   ```python
   from django.db import models
   from django.urls import reverse
   
   # Create your models here.
   class Post(models.Model):
       content = models.TextField()
       
       def __str__(self):
           return f'Post : {self.pk} - {self.content}'
       
       def get_absolute_url(self):
           return reverse('posts:detail', args=[self.pk])
           # reverse : object가 가야하는데 뒤의 내용을 실제 path로 만드는 역할.
   ```

   + `reverse` : 뒤에 따라 붙는 내용을 실제 path로 만드는 역할을 한다.

   ```bash
   $ python manage.py makemigrations
   $ python manage.py migrate
   ```

   migrate하기

5. `posts/admin.py`

   ```python
   from django.contrib import admin
   from .models import Post
   # Register your models here.
   class PostAdmin(admin.ModelAdmin):
       list_display = ('pk', 'content', )
   
   admin.site.register(Post, PostAdmin)
   ```

   + bash

     ```bash
     $ python manage.py createsuperuser
     ```

     superuser를 만들어서 모델이 제대로 만들어졌는지 확인하기. 새롭게 글도 작성해보기

6. `base.html`을 여러 app에서 사용하고 싶은데 한 앱 안에서 건드리기 좀 그러니까 새로운 적용할 수 있는 폴더를 만들어야한다.

   `settings.py`의 DIRS를 건드려야한다.

   ```python
   TEMPLATES = [
       {
           'BACKEND': 'django.template.backends.django.DjangoTemplates',
           'DIRS': [],
           'APP_DIRS': True,
           'OPTIONS': {
               'context_processors': [
                   'django.template.context_processors.debug',
                   'django.template.context_processors.request',
                   'django.contrib.auth.context_processors.auth',
                   'django.contrib.messages.context_processors.messages',
               ],
           },
       },
   ]
   ```

   `'DIRS': [os.path.join(BASE_DIR, 'instagram', 'templates')],` 로 수정해준다.

   이렇게 되면 주소는 `base_dir/instagram/templates/`가 되게 된다. templates 폴더는 우리가 프로젝트 아래(settings.py가 있는 곳)에 만들어주면 된다.

7. `posts/urls.py`

   ```python
   urlpatterns = [
       path('', views.list, name="list"),
   ]
   ```

   + class base view에서 forms을 상속받아서 사용했는데, 이것처럼 인덱스에 들어있는 리스트들을 상속받으려면  이름을 `list`로 지정해주어야 한다.

8. `posts/views.py`

   ```python
   from django.shortcuts import render
   
   # Create your views here.
   def list(request):
       return render(request, 'posts/list.html')
   ```

9. `posts/templates/posts/list.html` 만들기

   ```html
   {% extends 'base.html' %}
   {% block body %}
   <h1>list page</h1>
   
   
   {% endblock %}
   ```

10. `instagram/templates/_navbar.html`

    [navbar](<https://getbootstrap.com/docs/4.2/components/navbar/#supported-content>)

    내용을 모두 가져와서 복사한다.

    이렇게 분리하는 이유?

    내용 하나가 너무 커지면 base가 너무 커져보인다. 따라서 사용할 수 있게 나눠주게 한다.

    

11. `instagram/templates/base.html`

    ```html
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>rain's Instagram</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
        {% include '_navbar.html' %}
        <div class="container">
            {% block body %}
            {% endblock %}
        </div>
        
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    </body>
    </html>
    ```

    ![1554950295251](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\img\1554950295251.png)

12. `instagram/templates/_navbar.html` 수정하기

    ```html
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/posts"><i class="fab fa-instagram"> | rain's Instagram </i></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"> New Post <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> My Page </a>
          </li>
    
        </ul>
      </div>
    </nav>
    ```

13. `instagram/templates/_footer.html` 만들기

    ```html
    <footer class="footer mt-auto py-3 bg-dark">
      <div class="container">
        <span class="text-muted">© 2019 rain Han</span>
      </div>
    </footer>
    ```

14. `base.html`

    ```html
        <div class="container">
            {% block body %}
            {% endblock %}
            
        </div>
        {% include '_footer.html' %}
        
    ```

    

## CRUD









