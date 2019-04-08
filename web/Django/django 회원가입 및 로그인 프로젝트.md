# django 회원가입 및 로그인 프로젝트

## 0. shell_plus 사용하기

**django 설치 버전 맞추기** `pip install django==2.1.5`



1. `createsuperuser`

   ```bash
   $ python manage.py createsuperuser
   사용자 이름 (leave blank to use 'ubuntu'): rain 
   이메일 주소: rain@ssafy.com
   Password: 
   Password (again): 
   ```

   + user 를 만든다.

2. `settings.py`

   ```python
   INSTALLED_APPS = [
   	...
       'django_extensions',
   	...
   ]
   ```

3. `bash`

   ```bash
   $ python manage.py shell_plus
   ```

   + shell_plus를 사용하는 이유. 모든 내용을 import 해준다.

4. `bash`

   ```bash
   >>> Board.objects.all()
   <QuerySet [<Board: <Board (1)> : 1번입니다>, <Board: <Board (2)> : 2번입니다>, <Board: <Board (4)> : 3번일까?>, <Board: <Board (5)> : 5번일까??>, <Board: <Board (7)> : 시작하시겠습니까?>, <Board: <Board (8)> : 아니오>]>
   ```

   ```bash
   >>> User.objects.all()
   <QuerySet [<User: rain>]>
   ```

   + 방금 만들었던 user 나온다.
   + 어떻게 나오는걸까?

5. `shell_plus` 의 설명창

   ```bash
   # Shell Plus Model Imports
   from boards.models import Board
   from django.contrib.admin.models import LogEntry
   from django.contrib.auth.models import Group, Permission, User
   from django.contrib.contenttypes.models import ContentType
   from django.contrib.sessions.models import Session
   # Shell Plus Django Imports
   from django.core.cache import cache
   from django.conf import settings
   from django.contrib.auth import get_user_model
   from django.db import transaction
   from django.db.models import Avg, Case, Count, F, Max, Min, Prefetch, Q, Sum, When, Exists, OuterRef, Subquery
   from django.utils import timezone
   from django.urls import reverse
   ```

   에서

   ```bash
   from django.contrib.auth.models import Group, Permission, User
   
   from django.contrib.auth import get_user_model
   ```

   User라는 모델을 가져올 수 있고, get_user_model로 새롭게 만들 수 있다.

   이것을 사용하기 위해서는 `settings.py`에

   ```python
   INSTALLED_APPS = [
       ...
   	'django.contrib.auth',
       ...
   ]
   ```

   가 있어야 사용할 수 있다.

   

   ```bash
   >>> User.objects.all()
   <QuerySet [<User: rain>]>
   >>> Uuser = get_user_model()
   >>> Uuser.objects.all()
   <QuerySet [<User: rain>]>
   ```

6. `board`만들기 1)

   ```bahs
   >>> board = Board()
   >>> board.title = 'hi'
   >>> board.content = '내용입니다.'
   >>> board.save()
   >>> board.objects.all()
   <QuerySet [<Board: <Board (1)> : 1번입니다>, <Board: <Board (2)> : 2번입니다>, <Board: <Board (4)> : 3번일까?>, <Board: <Board (5)> : 5번일까??>, <Board: <Board (7)> : 시작하시겠습니까?>, <Board: <Board (8)> : 아니오>, <Board: <Board (9)> : hi>]>
   ```

   `board`만들기 2)

   ```bash
   >>> b = Board.objects.create(title='hihi', content='bye')
   >>> b
   <Board: <Board (10)> : hihi>
   ```

7. `user`사용하기

   ```bash
   >>> u = User.objects.create(username='rain22')
   >>> u
   <User: rain22>
   >>> User.objects.all()
   <QuerySet [<User: rain>, <User: rain22>]>
   ```

   + 이렇게 만드는 것이 괜찮을까? No, 비밀번호 없다.

     

   ```bash
   >>> u = User.objects.create(username='rain2', password='123')
   >>> u.password
   '123'
   ```

   + 그럼 이렇게 비밀번호를 넣는것이 괜찮을까?
   + cratesuperuser로 만든것과 비교해보자

   

   ```bash
   >>> u = User.objects.all()[0]
   >>> u.password
   'pbkdf2_sha256$120000$Q4Mnv9YLiROQ$q8EO63ltkfne61pKMqfBMPISRGgzEBWjsnD7dhv/puM='
   ```

   + admin에서 만든 것은 암호화가 되어 나오게 된다. 
   + 암호화를 새롭게 해서 만들려면 어떻게?

   

   ```bash
   >>> u = User.objects.create_user('sweetrain', 'rain@rain', '123')
   >>> u
   <User: sweetrain>
   >>> u.password
   'pbkdf2_sha256$120000$17gu33Z3U23K$WQvsIYw7PufQboMNxdDR1wh7EtcH8oUiPNbq4iqXeH0='
   ```

   + [create_user](<https://docs.djangoproject.com/en/2.2/ref/contrib/auth/#django.contrib.auth.models.UserManager>)의 메소드 경우에는 특정 메소드도 사용할 수 있다.

   

   ```bash
   >>> u.last_name = 'han'
   >>> u.first_name='rain'
   >>> u.save()
   >>> u.get_full_name()
   'rain han'
   ```

   

   + user의 비밀번호를 확인할 때에는 `check_password` 로 확인 할 수 있는데, 이 경우 특정 문자와 일치한지만 확인 가능하다.

   

   ```bash
   >>> u.set_password('123')
   >>> u.password
   'pbkdf2_sha256$120000$mBghffTCSzrZ$IpwJqZ9KnO4sqyKjoC0RBIi0CFxV2cO/Ig/amKvPd7w='
   >>> u.save()
   >>> u.check_password('123')
   True
   >>> u.password
   'pbkdf2_sha256$120000$mBghffTCSzrZ$IpwJqZ9KnO4sqyKjoC0RBIi0CFxV2cO/Ig/amKvPd7w='
   ```

   

   + 그러나 우리는 crate_user로 사용하지 않는다





## 01. 회원가입 창 만들기

1. `accounts` 앱 만들기

2. `settings.py`

   ```python
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
       'django_extensions',
       'crispy_forms',
       'boards',
       'accounts',
   ]
   ```

3. `urls.py`

   ```python
   urlpatterns = [
       path('admin/', admin.site.urls),
       path('boards/', include('boards.urls')),
       path('accounts/', include('accounts.urls')),
   ]
   
   ```

4. `accounts/urls.py`

   ```python
   from django.urls import path
   from . import views
   
   app_name = 'accounts'
   urlpatterns = [
       path('signup/', views.signup, name='signup'),
       
   ]
   ```

5. `accounts/views.py`

   ```python
   from django.shortcuts import render
   
   # Create your views here.
   def signup(request):
       return render(request, '')
   ```

6. `accounts/templates/signup.html`

   ```html
   <form action="">
       <input type="text" name="username">
       <input type="password" name="password">
   </form>
   ```

7. `6번`을 하지 않기 위해 `accounts/forms.py` 생성

   ```python
   from django import forms
   from django.contrib.auth import get_user_model
   
   class UserForm(forms.ModelForm):
       class Meta:
           model = get_user_model()
           fields = '__all__'
           
   ```

8. `7번` 을 사용하기 위해 `accounts/views.py`

   ```python
   from django.shortcuts import render
   from .forms import UserForm
   
   # Create your views here.
   def signup(request):
       context = {'user_form' : UserForm()}
       return render(request, 'signup.html', context)
       
   ```

9. `signup.html`

   ```html
   <form method="POST">
       {% csrf_token %}
       {{ user_form.as_p }}
   </form>
   ```

   ![1554702575390](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554702575390.png)

   너무 많은 정보를 주기 때문에 우리가 필요한 아이디/비밀번호만 가져오기

   

10. `accounts/forms.py`

    ```python
    class UserForm(forms.ModelForm):
        class Meta:
            model = get_user_model()
            fields = ['username', 'password']
            
    ```

    ![1554702666341](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554702666341.png)

    저장한 후 시작하면 아이디와 비밀번호만 가져올 수 있다.

11. 신청 받기

    `accounts/signup.html`

    ```html
    <form method="POST">
        {% csrf_token %}
        {{ user_form.as_p }}
        <input type="submit" value="회원가입신청">
    </form>
    ```

12. `accounts/views.py`

    ```python
    from django.shortcuts import render, redirect
    # from .forms import UserForm
    from django.contrib.auth.forms import UserCreationForm
    # userform을 사용할 때에는 contrib.auth로 사용하기. UserForm 대신에 UserCreationForm으로 사용한다.
    
    # Create your views here.
    def signup(request):
        if request.method == 'POST':
            user_form = UserCreationForm(request.POST)
            if user_form.is_valid():
                user_form.save()
                return redirect('boards:index')
        else:
            user_form = UserCreationForm()
        context = {'user_form' : user_form}
        return render(request, 'accounts/signup.html', context)
        
    ```

    + `UserCreationForm`는 회원 가입 form을 만들기 위해 사용한다.

    ![1554703217342](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554703217342.png)

13. `signup.html`에 `crispy_forms`사용하기

    ```html
    {% extends 'boards/base.html' %}
    {% block body %}
    {% load crispy_forms_tags %}
    <form method="POST">
        {% csrf_token %}
        {{ user_form|crispy }}
        <input type="submit" value="회원가입신청">
    </form>
    {% endblock %}
    ```

    + `boards`에 부트스트랩 넣어놓기 가능.



## 02. 로그인

+ 로그인을 확인 할 수 있는 방식은 무엇일까?
+ 로그인 확인은 connectless, stateless



+ 쿠키와 세션의 차이

  + 쿠키 : 클라이언트 **로컬**에 저장되는 **키와 값**이 들어있는 작은 데이터 파일
  + 세션 : **서버측**에서 관리. 접속시간에 제한을 두어 일정 시간 응답이 없다면 정보가 유지 되지 않게 설정 가능. 

+ 로그인과 로그아웃

  + 로그인 : 세션을 만드는 것. 
  + 로그아웃 : 세션을 삭제하는것.

+ `settings.py`

  ```python
  INSTALLED_APPS = [
      ...
      'django.contrib.sessions',
      ...
  ]
  ```

  + sessions 라는 앱으로 로그인과 로그아웃 세션을 작동시킬 수 있다.

  ```python
  # LOGIN_URL = '/boards/'
  ```

  + 셋팅에 url을 설정해주면 로그인을 한 후 무조건 boards로 이동하게된다.



### 1. 로그인

1. `accounts/urls.py`

   ```python
   urlpatterns = [
       path('signup/', views.signup, name='signup'),
       path('login/', views.login, name='login'),
   ]
   ```

2. `accounts/views.py`

   ```python
   from django.shortcuts import render, redirect
   # from .forms import UserForm
   from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
   
   def login(request):
       context = {'login_form' : AuthenticationForm()}
       return render(request, 'accounts/login.html', context)
   ```

   + `AuthenticationForm` 를 사용하여 로그인용도로 사용한다. 
   + 특정 시간동안 로그인을 하게 만들어 일정 시간 이상 움직임이 없으면 세션에서 밀어내버린다.

3. `accounts/login.html`

   ```html
   {% extends 'boards/base.html' %}
   {% block body %}
   {% load crispy_forms_tags %}
   <form method="POST">
       {% csrf_token %}
       {{ login_form|crispy }}
       <input type="submit" value="로그인">
   </form>
   {% endblock %}
   ```

   ![1554706356250](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554706356250.png)

   여기에는 비밀번호 확인란이 없다.

4. `accounts/vies.py`

   ```python
   from django.contrib.auth import login as auth_login
   
   def login(request):
       if request.method == 'POST':
           login_form = AuthenticationForm(request, request.POST)
           if login_form.is_valid():
               auth_login(request, login_form.get_user())
               return redirect('boards:index')
       else:
           login_form = AuthenticationForm()
       context = {'login_form' : login_form}
       return render(request, 'accounts/login.html', context)
   ```

   + `from django.contrib.auth import login as auth_login`
     + as auth_login으로 불러온 이유?
       + def 이름이 login이다. 이 경우 우리가 from에서 import 해오는 값을 재귀로 불러오는 꼴이 되기 때문에 as로 다른 이름으로 부르게 된다.
   + request를 한번 더 요청받는다. 요청정보에 대한 정보가 헤더에 들어있는것들도 있는데 이 모든 정보를 가져와야 한다. 사용자가 준 정보 + 가져와야 하는 정보가 더 필요하다.
   + `auth_login(request, login_form.get_user())` :
     + db에 저장하는것이 아니고 세션에 추가할 뿐.
     + 세션에 만들때에도 request 정보가 필요하며, `auth_login`이라는 함수에서 정보를 가져온다.

   ![1554707024916](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554707024916.png)

   + 로그인을 하지 않았을 때의 유저 이름

     

   ![1554707052133](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554707052133.png)

   + 로그인을 한 후 유저 이름

     

   + 쿠키를 삭제하게 되면

     ![1554707106160](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554707106160.png)

   + 다시 유저 정보가 삭제된다.

     ![1554707149664](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554707149664.png)

     

5. `boards/base.html`

   ```html
       {% if user.is_authenticated %}
           <h1>{{ user }}</h1>
           <a>로그아웃</a>
       {% else %}
           <a href="{% url 'accounts:signup' %}">회원가입</a><br>
           <a href="{% url 'accounts:login' %}">로그인</a>
       {% endif %}
   ```

   + 로그인이 되어있을 때에는 로그아웃을, 로그인이 안되어있을 때에는 회원가입/로그인이 보이게 만듦.
   + `{% if user.is_authenticated %}` 로그인이 되어있는지 확인.

6. `boards/index.html`

   ```html
   {% if user.is_authenticated %}
       <a href="{% url 'boards:create' %}">새 글 쓰기</a>
   {% endif %}
   ```

   + 위와 같은 방식으로 로그인이 되어있을 경우에만 새 글 쓰기 가능한 링크를 만들어준다.

7. 위 `5번`과 `6번`같은 경우 뚫리기 때문에 사용하지 않는다.

8. `boards/views.py`

   ```python
   def create(request):
       if not request.user.is_authenticated:
           return redirect('boards:index')
       
       if request.method == 'POST':
           ...
       else:
           board_form = BoardForm()
       context = {'board_form' : board_form}
       return render(request, 'boards/form.html', context)
   ```

   + if not 으로 로그인이 되어있지 않을 경우를 확인한다.

9. `8번` 대신에 아래와 같이 사용

   ```python
   from django.contrib.auth.decorators import login_required
   
   @login_required
   def create(request):
       # if not request.user.is_authenticated:
       #     return redirect('boards:index')
       if request.method == 'POST':
           ...
   ```

   + 로그인이 꼭 필요하다는 것을 데코레이터로 표시해주고, 로그인이 안 되어있을 경우 로그인창으로 보내버린다.

10. 회원가입 한 후 자동으로 로그인 시켜주기

    + `accounts/views.py`

      ```python
      def signup(request):
          if request.user.is_authenticated:
              return redirect('boards:index')
          if request.method == 'POST':
              user_form = UserCreationForm(request.POST)
              if user_form.is_valid():
                  user = user_form.save()
                  auth_login(request, user)
                  return redirect('boards:index')
          else:
              user_form = UserCreationForm()
          context = {'user_form' : user_form}
          return render(request, 'accounts/signup.html', context)
      
      ```

      + `user = user_form.save()`
      + `auth_login(request, user)`
      + 유저 저장을 user에 한 후 auth_login으로 보낸다.



### 2. 로그아웃

1. `accounts/urls.py` 

   ```python
   urlpatterns = [
       path('signup/', views.signup, name='signup'),
       path('login/', views.login, name='login'),
       path('logout/', views.logout, name='logout'),
   ]
   ```

2. `accoutns/views.py`

   ```python
   from django.contrib.auth import login as auth_login
   from django.contrib.auth import logout as auth_logout
   
   def logout(request):
       auth_logout(request)
       return redirect('boards:index')
   ```

3. `boards/base.html`

   ```html
       {% if user.is_authenticated %}
           <h1>{{ user }}</h1>
           <a href="{% url 'accounts:logout' %}">로그아웃</a>
       {% else %}
           <a href="{% url 'accounts:signup' %}">회원가입</a><br>
           <a href="{% url 'accounts:login' %}">로그인</a>
       {% endif %}
   ```

   + 로그아웃 링크까지 연결
   + 







































