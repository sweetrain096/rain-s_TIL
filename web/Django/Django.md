# Django

## 0. 구조 확인하기

![photo_2019-02-11_12-10-57](img/photo_2019-02-11_12-10-57.jpg)



## 1. 시작하기

0. c9에서 사용될 것이므로 c9 설정 & django 설치

```
pip install django
```



1. 프로젝트 시작하기

   ```python
   $ django-admin startproject (django_intro)(프로젝트 이름)
   ```

   ​	프로젝트 시작하겠다는 뜻

   ​	하게 되면 프로젝트 이름으로 파일 생성

   ```bash
   django-admin startapp home(app 이름)
   ```

   

   ```
   django_intro
   	django_intro
   		django_intro
   			__init__.py
   			settings.py
   			urls.py
   			wsgi.py
   		db.sqlite3
   		manage.py
   	README.md
   ```

   ```
   ├── django_intro
   │   ├── __init__.py
   │   ├── __pycache__
   │   │   ├── __init__.cpython-36.pyc
   │   │   ├── settings.cpython-36.pyc
   │   │   ├── urls.cpython-36.pyc
   │   │   └── wsgi.cpython-36.pyc
   │   ├── settings.py
   │   ├── urls.py
   │   └── wsgi.py
   ├── db.sqlite3
   └── manage.py
   ```

   

   지금부터 pwd는 `~/workspace/django_intro` 이다.



2. 서버 실행하기

   + `settings.py`   (django_intro/django_intro/settings.py)

   ```python
   28| ALLOWED_HOSTS = ['*']
   # c9에서는 host - 0.0.0.0, port - 8080만 활용할 수 있기 때문에 위와 같이 설정한다.
   ```

   ```bash
   ~/workspace/django_intro $ python manage.py runserver 0.0.0.0:8080
   ```

   실행시키면 서버에서 로켓모양이 떠야한다!

   앞으로 모든 장고 명령어는 프로젝트를 만들때를 제외하고 `python manage.py`를 활용한다. 따라서, 명령어가 안 될때는 반드시 `pwd`와 `ls`를 통해 현재 bash(터미널) 위치를 확인하자

   




## 2. 사용하기(hello, django)

> Django 프로젝트는 여러가지 app의 집합.
>
> 각각의  app은 MTV 패턴으로 구성되어 있다.
>
> M (Model) : 어플리케이션의 핵심 로직의 동작을 수행한다. 
>
> T (Template) : 사용자에게 결과물을 보여준다.
>
> V (View) : 모델과 템플릿의 동작을 제어한다. (모델의 상태를 변경하거나 값을 가져오고, 템플릿에 값을 전달하기 등)
>
> **일반적으로 MVC패턴으로 더 많이 사용된다.**
>
> 
>
> MVC (MODEL VIEW CONTROLER)
>
> 모델링 : 데이터베이스
>
> view : 보여주는 것 (html)
>
> controler : 모델과 뷰 사이의 연결고리
>
> template(mtv) == view(mvc)
>
> view(mtv) == controler(mvc)



### 1. 기본 로직

앞으로 1. 요청 url(`urls.py`)	2. 처리할 view 설정(`views.py`)		3. 결과 보여줄 template 설정(`templates/`)으로 작성할것.





1. url 설정 (`urls.py`)

   ```python
   # django_intro/urls.py
   from django.contrib import admin
   from django.urls import path
   # home 폴더 내에 있는 views.py를 불러온다.
   from home import views
   
   urlpatterns = [
       path('admin/', admin.site.urls),
       # 요청이 home/으로 오면, views의 index 함수를 실행시킨다.
       path('home/', views.index)
   ]
   ```

   

2. view 설정(`views.py`)

   ```python
   # home/views.py
   from django.shortcuts import render, HttpResponse
   
   # Create your views here.
   def index(request):
       return HttpResponse("hello, django!")
   ```

   + 주의할 점은 선언된 함수에서 `request`를 인자로 받아야 한다.
     + request는 사용자(client. 클라이언트)의 요청 정보와 서버에 대한 정보가 담겨있다.
     + Django 내부에서 해당 함수를 호출하면서 정보를 넘겨주기 때문에 반드시 명시해야한다.

3. (`settings.py`)

   ```python
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
       'home',		#이것을 추가
   ]
   # 하나하나의 앱들, 외부 라이브러리 추가.
   # 맨 마지막에 붙어도 ','를 붙이기(트레일링)
   ```

   



views.py

```python
def index(request):
    print(request)
    print(type(request))
    print(request.META)
    return HttpResponse("hello, django!")
```

print(request)

out :

<WSGIRequest: GET '/home/'>



print(type(request))

out :

<class 'django.core.handlers.wsgi.WSGIRequest'>



(요청에 대한 클라이언트 정보)

print(request.META)

out :

{'APACHE_PID_FILE': '/home/ubuntu/lib/apache2/run/apache2.pid', 'MANPATH': '/home/ubuntu/.nvm/versions/node/v6.11.2/share/man:/usr/local/rvm/rubies/ruby-2.4.0/share/man:/usr/local/man:/usr/local/share/man:/usr/share/man:/usr/local/rvm/man', 'rvm_bin_path': '/usr/local/rvm/bin', 'C9_SHARED': '/mnt/shared', 'PYENV_ROOT': '/home/ubuntu/.pyenv', 'C9_FULLNAME': 'Rain ...(후략)







## 3. Template (MTV 中 T)

> Django에서 활용되는 Template은 DTL(Django Template Language)이다.
>
> jinja2 와 문법이 유사.



1. 요청 url 설정

   ```python
   # urls.py
   path('home/dinner/', views.dinner),
   ```

2. view 설정

   ```python
   # views.py
   def dinner(request):
       box = ['치킨', '밥', '피자']
       pick = random.choice(box)
       return render(request, 'dinner.html', {'dinner' : pick})
   ```

   + Template을 리턴하려면,  `render`를 사용하여야 한다.
     + `request` (필수)
     + `template 파일 이름` (필수)
     + `template 변수` (선택) : `dictionary` 타입으로 구성해야한다.

3. Template 설정

   ```bash
   $ mkdir home/templates
   $ touch home/templates/dinner.html
   ```

   ```html
   <!-- home/templates/dinner.html -->
   <h1> {{dinner}} </h1>
   ```

4. base 설정

   ```html
   <!DOCTYPE html>
   <html lang="ko">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>{% block title %}{% endblock %}</title>
   </head>
   <body>
       <h1> Django 실습</h1>
       <hr>
       {% block body %}
       {% endblock %}
   </body>
   </html>
   ```

   

## 4. Variable Routing

1. url 설정

   ```python
   path('home/you/<name>', views.you),
   path('hone/cube/<int:num>', views, cube),
   ```

2. view 파일 설정

   ```python
   def you(request, name):
       return render(request, 'you.html', {'name' : name})
   ```

3. template 설정

   ```django
   <h1> {{ name }}, 안녕!! </h1>
   ```




## 5. Form data

1. `ping`

   1. 요청 url 설정

      ```python
      path('home/ping/', views.ping)
      ```

   2. view 설정

      ```python
      def ping(request):
          return render(request, 'ping.html')
      ```

   3. template 설정

      ```django
      <form action='/home/pong/'>
          <inupt name="message" tyep="text">
          <inupt type="submit">
      </form>
      ```

2. `pong`

   1. 요청 url 설정

      ```python
      path('home/pong/', views.pong)
      ```

   2. view 설정

      ```python
      def pong(request):
          msg = request.GET.get("message")
          return render(request, 'pong.html', {'msg' : msg})
      ```

   3. template 설정

      ```django
      <h1>{{ msg }}</h1>
      ```

3. POST 요청 처리

   1. 요청 FORM 수정

      ```django
      <form action="/home/pong/" method="POST">
          {% csrf_token %}
      </form>
      ```

   2. view 수정

      ```python
      def pong(request):
          msg = request.POST.get("message")
      ```

   + `csrf_token`은 보안을 위해 django에서 기본적으로 설정해 놓은 보안 장치(?) 이다.
     + CSRF 공격 : Cross Site Request Forgery
     + form을 통해 POST 요청을 보낸다는 것은 데이터베이스에 반영되는 경우가 대부분인데, 해당 요청을 우리가 만든 정해진 form에서 보내는지 검증하는 것.
     + 실제로 input type hidden으로 특정한 hash 값이 담겨 있는 것을 볼 수 있다.
     + `settings.py`에 `MIDDLEWARE` 설정에 보면 csrf  관련된 내용이 설정된 것을 볼 수 있다.



## django 에서는...

1. @app.route 부분(flask)이 urls.py 안에 모두 들어가게된다.

   | flask              | django              |
   | ------------------ | ------------------- |
   | @app.route('home') | def index(request): |
   |                    | return 'hello'      |
   
   

2. 하나의 project 안에 여러개의 app이 들어가게 된다고 생각하면 된다.

   ```bash
   $ python manage.py startapp home
   ```

   새로운 폴더(home)(app)을 만들게 된다. => MTV의 집합