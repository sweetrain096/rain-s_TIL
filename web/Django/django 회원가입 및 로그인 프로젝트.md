# django 회원가입 및 로그인 프로젝트

## 00. forms 정리

| django             |               |           |
| ------------------ | ------------- | --------- |
| UserCreationForm   | 회원가입      | ModelForm |
| AuthenticationForm | 로그인        | Form      |
| UserChangeForm     | 회원변경      | ModelForm |
| PasswordChangeForm | 비밀번호 변경 | Form      |
|                    |               |           |
|                    |               |           |

+ `UserCreationForm`, `UserChangeForm` : ModelForm

  + request.POST, instance=request.user 넣고 instance는 있다.

+ `AuthenticationForm`, `PasswordChangeForm` : Form

  + request.user, request.POST 순서로 들어가고, instance= 로 시작하지 않는다.

+ `bash`에서 확인

  ```bash
  >>> from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm, PasswordChangeForm
  >>> UserCreationForm.mro()
  [<class 'django.contrib.auth.forms.UserCreationForm'>, <class 'django.forms.models.ModelForm'>, <class 'django.forms.models.BaseModelForm'>, <class 'django.forms.forms.BaseForm'>, <class 'object'>]
  >>> AuthenticationForm.mro()
  [<class 'django.contrib.auth.forms.AuthenticationForm'>, <class 'django.forms.forms.Form'>, <class 'django.forms.forms.BaseForm'>, <class 'object'>]
  >>> UserChangeForm.mro()
  [<class 'django.contrib.auth.forms.UserChangeForm'>, <class 'django.forms.models.ModelForm'>, <class 'django.forms.models.BaseModelForm'>, <class 'django.forms.forms.BaseForm'>, <class 'object'>]
  >>> PasswordChangeForm.mro()
  [<class 'django.contrib.auth.forms.PasswordChangeForm'>, <class 'django.contrib.auth.forms.SetPasswordForm'>, <class 'django.forms.forms.Form'>, <class 'django.forms.forms.BaseForm'>, <class 'object'>]
  ```

  

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

+ 회원가입과 관련된 내용은 [`django authentication system`](https://docs.djangoproject.com/en/2.1/topics/auth/default/) 에서 확인 가능하다.
  + [`username`](https://docs.djangoproject.com/en/2.1/ref/contrib/auth/#django.contrib.auth.models.User.username)
  + [`password`](https://docs.djangoproject.com/en/2.1/ref/contrib/auth/#django.contrib.auth.models.User.password)
  + [`email`](https://docs.djangoproject.com/en/2.1/ref/contrib/auth/#django.contrib.auth.models.User.email)
  + [`first_name`](https://docs.djangoproject.com/en/2.1/ref/contrib/auth/#django.contrib.auth.models.User.first_name)
  + [`last_name`](https://docs.djangoproject.com/en/2.1/ref/contrib/auth/#django.contrib.auth.models.User.last_name)
+ 위와 같이 다섯가지의 내용을 포함할 수 있다.

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
    + `passwoard1`과 `password2`를 각각 받은 후 두개를 맞는지 확인하기. 

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









## 02. 로그인/로그아웃

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

   + [`login required decorator`](<https://docs.djangoproject.com/en/2.1/topics/auth/default/#the-login-required-decorator>) 

   + 사용할 때 settings.py로 들어온 후 

     ```python
     LOGIN_URL = '/accounts/login/'
     ```

     하지만 기본 url이 `'/accounts/login/'`이기 때문에 이 경로로 맞춰주었다면 굳이 변경할 필요는 없다.

     

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
   + `<h1>{{ user }}</h1>`에서 `{{ user}}`로 사용할 수 있는 이유는, `views.py` 에서 `return render(request)`로 할 때 `request` 안에 user 정보가 들어있기 때문에 user만 사용해도 username이 뜨게 된다.
   + 때문에 views.py에서 받아올 때에는 `request.user`로 사용하게 된다.



## 03. 회원 탈퇴

1. `accounts/urls.py`

   ```python
   urlpatterns = [
       path('signup/', views.signup, name='signup'),
       path('login/', views.login, name='login'),
       path('logout/', views.logout, name='logout'),
       path('delete/', views.delete, name='delete'),
   ]
   ```

2. `boards/base.html`

   ```html
       {% if user.is_authenticated %}
           <h1>{{ user }}</h1>
           <a href="{% url 'accounts:logout' %}">로그아웃</a><br>
           <form action="{% url 'accounts:delete' %}" method="POST" onsubmit="return confirm('탈퇴할거야??')">
               {% csrf_token %}
               <input type="submit" value="회원 탈퇴">
           </form>
   ```

   + delete를 받아올 때 

3. `accounts/views.py`

   ```python
   @login_required    
   def delete(request):
       print(request)
       print(request.user)
       
       request.user.delete()
   
       return redirect('boards:index')
   ```

   + login_required를 사용하는 이유? 꼭 로그인을 해야만 탈퇴가 가능하게 만든다.

4. require_http_methods

   1. ```python
      from django.views.decorators.http import require_http_methods
      
      @login_required    
      @require_http_methods(["POST"])
      def delete(request):
          request.user.delete()
      
          return redirect('boards:index')
      ```

   2. ```python
      @login_required
      def delete(request):
          if request.method == 'POST':
              request.user.delete()
          return redirect('boards:index')
      ```

   + 1번은 `from django.views.decorators.http import require_http_methods` 를 사용하여 POST요청일 때에만 요청을 허가한다. 따라서 삭제가 post일때만 된다.

     405라는 메서드가 허용되지 않을 때 나는 에러코드를 사용하고, 위 코드에서는 POST요청이 아닐 때에는 405 에러코드를 보내준다.

   + 2번은 if문으로 POST일때만 delete가 가능하도록 만들었다.  이 경우에는 에러코드가 아닌 인덱스 화면으로 간다. 이 경우에는 else문을 사용하여 잘못된 요청이라는것을 플래시 메세지 등으로 남겨줄 수 있다.

5. `views.py`

   `@require_http_methods(["POST"])` 대신에 `@require_POST`를 사용한다.

   ```python
   from django.views.decorators.http import require_POST
   
   @login_required    
   @require_POST
   def delete(request):
       request.user.delete()
   
       return redirect('boards:index')
   ```

   

   

   

   

## 04. 사용자 변경

1. `accounts/urls.py`

   ```python
   urlpatterns = [
       path('signup/', views.signup, name='signup'),
       path('login/', views.login, name='login'),
       path('logout/', views.logout, name='logout'),
       path('delete/', views.delete, name='delete'),
       path('update/', views.update, name='update'),
   ]
   ```

2. `accounts/views.py`

   ```python
   from django.contrib.auth.forms import UserChangeForm
   def update(request):
       user_form = UserChangeForm()
       context = {'user_form' : user_form}
       return render(request, 'accounts/update.html', context)
   ```

3. `accounts/update.html`

   ```html
   {% extends 'boards/base.html' %}
   {% block body %}
   {% load crispy_forms_tags %}
   <form method="POST">
       {% csrf_token %}
       {{ user_form|crispy }}
       <input type="submit" value="프로필 수정">
   </form>
   {% endblock %}
   ```

4. `boards/base.html`

   ```html
       {% if user.is_authenticated %}
           <h1>{{ user }}</h1>
           <a href="{% url 'accounts:logout' %}">로그아웃</a><br>
           <a href="{% url 'accounts:update' %}">프로필 수정</a>
           <form action="{% url 'accounts:delete' %}" method="POST" onsubmit="return confirm('탈퇴할거야??')">
               {% csrf_token %}
               <input type="submit" value="회원 탈퇴">
           </form>
   ```

   이렇게 들어가면 엄청 이상한것들이 많이 보인다.

   ![1554774119687](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554774119687.png)

   + 이것을 수정하려면 우리가 필요한것만 보이게 오버라이딩 한다.

5. `accounts/forms.py`

   ```python
   from django.contrib.auth.forms import UserChangeForm
   
   class UserCustomChangeForm(UserChangeForm):
       class Meta:
           model = get_user_model()
           fields = ('username', 'email', 'first_name', 'last_name',)
   ```

   + 내가 원하는 `UserChangeForm`을 상속받아서 내가 원하는대로 필드를 고쳐 오버라이딩 할것이다.

6. `accounts/forms.py`

   ```python
   from .forms import UserCustomChangeForm
   
   def update(request):
       # user_form = UserChangeForm()
       user_form = UserCustomChangeForm()
       context = {'user_form' : user_form}
       return render(request, 'accounts/update.html', context)
   ```

   + UserChangeForm을 `forms.py`에서 수정한 UserCustomChangeForm으로 대신 불러와서 사용한다.
   + ![1554774491880](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554774491880.png)

7. 정보 수정하기 및 아이디 수정 불가하게 만들기

8. `accounts/forms`

   ```python
   class UserCustomChangeForm(UserChangeForm):
       class Meta:
           model = get_user_model()
           fields = ('email', 'first_name', 'last_name',)
   ```

9. `accounts/views.py`

   ```python
   @require_http_methods(["GET", "POST"])
   def update(request):
       # user_form = UserChangeForm()
       if request.method =='POST':
           user_form = UserCustomChangeForm(request.POST, instance=request.user)
           if user_form.is_valid():
               user_form.save()
               # plus = True
               return redirect('boards:index')
   
       else:
           user_form = UserCustomChangeForm(instance=request.user)
       context = {'user_form' : user_form}
       return render(request, 'accounts/update.html', context)
   ```

   

## 05. 비밀번호 변경

1. `accounts/urls.py`

   ```python
   urlpatterns = [
   	...
       path('password/', views.password, name='password'),
   ]
   ```

2. password 변경하는 클래스

   + `PasswordChangeForm` : 암호 입력을 받고 새로운 암호로 변경
   + `SetPasswordForm` : 암호 입력을 받지 않고 새로운 암호로 변경

3. `accounts/views.py`

   ```python
   @login_required
   def password(request):
       user_form = PasswordChangeForm(request.user)
       context = {'user_form' : user_form}
       return render(request, 'accounts/update.html', context)
   ```

   + `@login_required` : 로그인 필수
   + render로 받는 내용은 update.html과 같이 사용하기.

   ![1554784973392](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554784973392.png)

4. `accounts/views.py`

   ```python
   @login_required
   def password(request):
       if request.method == 'POST':
           user_form = PasswordChangeForm(request.user, request.POST) # 순서 주의하기
           if user_form.is_valid():
               user_form.save()
               return redirect('boards:index')
       else:
           user_form = PasswordChangeForm(request.user) # instance= 로 시작하기 않기 주의
       context = {'user_form' : user_form}
       return render(request, 'accounts/update.html', context)
   ```

   + 원래는 `request.POST, request.user`인데 순서가 바뀐것 주의하기
   + ` PasswordChangeForm(request.user)`에서 `instance=request.user`가 아닌 것 주의
   + 왜그럴까? => `세션`이기 때문
   + 이 경우 비밀번호가 바뀌면 로그인이 로그아웃된다.

5. `accounts/views.py`

   ```python
   from django.contrib.auth import update_session_auth_hash
   
   @login_required
   def password(request):
       if request.method == 'POST':
           user_form = PasswordChangeForm(request.user, request.POST) # 순서 주의하기
           if user_form.is_valid():
               user = user_form.save()
               update_session_auth_hash(request, user)
               return redirect('boards:index')
       else:
           user_form = PasswordChangeForm(request.user) # instance= 로 시작하기 않기 주의
       context = {'user_form' : user_form}
       return render(request, 'accounts/update.html', context)
   ```

   + is_valid 함수 아래의 두 줄.
   + `user = user_form.save()` 와 `update_session_auth_hash(request, user)` 를 추가하기.
   + 현재 가지고 있는 session을 가지고 업데이트를 시켜준다.





## 06. 게시글 작성자가 누구인지 표시하기

+ 1 : N의 구조.
+ 한 명(user)은 여러 개의 글(board)을 가진다.
+ 글(board)가 user의 id를 가지게 된다.

1. `boards/models.py`

   ```python
   from django.db import models
   from django.urls import reverse
   # from django.contrib.auth.models import User # 사용하지 마세요.
   # from django.contrib.auth import get_user_model
   from django.conf import settings
   # settings.AUTH_USER_MODEL   # 윗줄 사용하기
   # 위 두줄이 환경변수처럼 사용하기
   # default 값이 'auth.User'
   ```

   + `from django.contrib.auth.models import User` : 원본을 가져오는것

   + `from django.contrib.auth import get_user_model` : 원본과 비슷한 느낌. 

   + 따라서 위에 두개는 만약 글 작성자가 변경되면 모든것을 다 바꿔주어야한다. 그러나 `from django.conf import settings`으로 사용하면 변수처럼 사용할 수 있기 때문에 하나가 바뀐다고 모든것이 변화되지 않는다.

   + default값은 settings.py에 

     ```python
     # AUTH_USER_MODEL = 'auth.User'
     ```

     작성되어있지는 않지만 저런 식으로 디폴트값을 갖는다.

   ```python
   from django.db import models
   from django.urls import reverse
   from django.contrib.auth import get_user_model
   from django.conf import settings
   # settings.AUTH_USER_MODEL   # 윗줄 사용하기
   
   # Create your models here.
   class Board(models.Model):
       title = models.CharField(max_length=10)
       content = models.TextField()
       hit = models.IntegerField(default=0, editable=False)
       created_at = models.DateTimeField(auto_now_add=True)
       updated_at = models.DateTimeField(auto_now=True)
       user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
       
   ```

2. bash창

   ```bash
   $ python manage.py makemigrations
   You are trying to add a non-nullable field 'user' to board without a default; we can't do that (the database needs something to populate existing rows).
   Please select a fix:
    1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
    2) Quit, and let me add a default in models.py
   Select an option: 1
   Please enter the default value now, as valid Python
   The datetime and django.utils.timezone modules are available, so you can do e.g. timezone.now
   Type 'exit' to exit this prompt
   >>> 5
   ```

   => 새롭게 등록할 때 필요한 등록값을 지정하기.

   => 5번 사용자에게 이 전 값을 모두 저장한다.

3. `boards/index.html`

   ```html
   {% for board in boards %}
       <p>{{ board.pk }}</p>
       <p>작성자 : {{ board.user }}</p>
       <p>{{ board.title }} | {{ board.hit }}</p>
       <a href="{% url 'boards:detail' board.pk %}">글 보러 가기</a>
       <hr>
   {% endfor %}
   ```

   + 작성자 추가

4. `boards/forms.py`

   ```python
   # modelform
   class BoardForm(forms.ModelForm):
       class Meta:
           model = Board
           fields = ['title', 'content']
           ...
   
   
   
   ```

   + 표시를 제목과 선택만 가능하게.
   + `class Meta` ? :
     + form 을 설명하는 정보들을 담는 부분. 정보를 담는 부분이 원 class에 들어가게 되면 database의 column과 혼동될 수 있기 때문에 구분하여 사용한다.

5. `boards/detail.html`

   ```html
   <h1>{{ board.pk }}번째 글</h1>
   <h2>{{ board.title }}</h2>
   <p>작성자 : {{ board.user }}</p>
   <p>조회수 : {{ board.hit }}</p>
   <hr>
   ```

   + 작성자 표시

6. `boards/views.py`

   ```python
   def create(request):
       if request.method == 'POST':
           board_form = BoardForm(request.POST)
           if board_form.is_valid():
               # board_form.user = request.user
               # board.save()
               
               board = board_form.save(commit=False)
               board.user = request.user
               board.save()
               return redirect(board)
   ```

   + 주석처리 된 두 줄로 처리도 가능하지만, 우선 board_form.save(commit=False)로 지정해서 일단 들어올 내용이 다 없으면 저장까지는 하지 말고, 모두 받아온 후, 나머지 내용이 모두 다 들어오면 완전히 save한다.
   + 관련 내용[save commit](https://docs.djangoproject.com/en/2.1/topics/forms/modelforms/#the-save-method)



## 07. 특정 아이디만 삭제

1. `boards/views.py`

   ```python
   def delete(request, board_pk):
       board = get_object_or_404(Board, pk=board_pk)
       if request.method == 'POST':
           if request.user.is_superuser:
               board.delete()
               return redirect('boards:index')
           if board.user == request.user:
               board.delete()
               return redirect('boards:index')
   
       return redirect(board)
   ```

   + `request.user.is_superuser` : 현재 사용자가 super user인지 확인후 superuser면 삭제
   + `board.user == request.user` : 글 작성자가 현재 사용자인지 확인 후 같으면 삭제

2. 삭제 후 제대로 된 삭제인지/잘못된요청인지 확인 후 알람띄우기

3. `settings.py`

   ```python
   MESSAGE_STORAGE = 'django.contrib.messages.storage.session.SessionStorage'
   ```

   + session이 동작할 때 메세지 

4. `boards/views.py`

   ```python
   def delete(request, board_pk):
       board = get_object_or_404(Board, pk=board_pk)
       if request.method == 'POST':
           if request.user.is_superuser:
               board.delete()
               messages.success(request, '삭제되었습니다.')
               return redirect('boards:index')
           if board.user == request.user:
               board.delete()
               messages.success(request, '삭제되었습니다.')
               return redirect('boards:index')
       messages.warning(request, '유효하지 않은 접근입니다.')
   
       return redirect(board)
   ```

   ![1554795194713](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554795194713.png)

   ![1554795477362](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\1554795477362.png)

   



## 08. 회원가입에서 email 주소 받기

1. `accounts/forms.py`

   ```python
   from django.contrib.auth.forms import UserChangeForm, UserCreationForm
   
   class UserCustomCreationForm(UserCreationForm):
       class Meta:
           model = get_user_model()
           fields = ('username', 'password1', 'password2', 'email')
   ```

   

2. `accounts/views.py`

   ```python
   from .forms import UserCustomChangeForm, UserCustomCreationForm
   
   # Create your views here.
   @require_http_methods(["GET", "POST"])
   def signup(request):
       if request.user.is_authenticated:
           return redirect('boards:index')
       if request.method == 'POST':
           user_form = UserCustomCreationForm(request.POST)
           if user_form.is_valid():
               user = user_form.save()
               auth_login(request, user)
               return redirect('boards:index')
       else:
           user_form = UserCustomCreationForm()
       context = {'user_form' : user_form}
       return render(request, 'accounts/signup.html', context)
   ```

   + forms.py에서 우리가 원하는 email을 받기 위해 fields를 변경해준다. 이 때, 비밀번호를 등록하려면 비밀번호 확인 창이 필요하고, 이 두개의 비밀번호 확인창이 'password1', 'password2'로 나오게 된다.



## 09. [Gravatar](<https://ko.gravatar.com/>) 사용하기

+ 사진을 설정는것
+ 어떻게 사용? MTV 중 View에 먼저 사용

1. 회원가입 후 -> 개발자리소스 -> [해시생성](<https://ko.gravatar.com/site/implement/hash/>)

   

   All URLs on Gravatar are based on the use of the hashed value of an email address. Images and profiles are both accessed via the hash of an email, and it is considered the primary way of identifying an identity within the system. To ensure a consistent and accurate hash, the following steps should be taken to create a hash:

   1. **Trim leading and trailing whitespace from an email address**
   2. **Force all characters to lower-case**
   3. **md5 hash the final string**

   As an example, let's say we start with "MyEmailAddress@example.com " (note the trailing space which our hypothetical user entered by mistake). If we md5 encode that string directly, we get the following (in PHP):

   ```
   `echo` `md5( ``"MyEmailAddress@example.com "` `);``// "f9879d71855b5ff21e4963273a886bfc"`
   ```

   If we now run that same email address through the above process, you will see that we get a different result (again in PHP):

   ```
   `$email` `= trim( ``"MyEmailAddress@example.com "` `); ``// "MyEmailAddress@example.com"``$email` `= ``strtolower``( ``$email` `); ``// "myemailaddress@example.com"``echo` `md5( ``$email` `);``// "0bc83cb571cd1c50ba6f3e8a78ef1346"`
   ```

   This can easily be combined into a single line:

   ```
   `echo` `md5( ``strtolower``( trim( ``"MyEmailAddress@example.com "` `) ) );`
   ```

   **Once you have generated a consistent hash, you can then request either an image or a profile.**

2. 위에서 원하는대로 사용하기 위해 

   1. 공백제거

      `.strip`

   2. 모두 소문자

      `.lower()`

   3. md5 해시를 사용하기

      `import hashlib`

      `hashlib.md5('이메일~~~~'.encode('utf-8')).hexdigest()`

   로 나온 결과를 `bc30de118c3c43d5e945e3bd0d0c5d8c` View에 사용할것.

3. `boards/views.py`

   ```python
   import hashlib
   ...
   
   
   def index(request):
       boards = Board.objects.order_by('-pk')
       if request.user.is_authenticated:
           gravatar_url = hashlib.md5(request.user.email.strip().lower().encode('utf-8')).hexdigest()
       # 윗줄의 결과 : 'ca0edbd4500a8efb88e88a7---------' 뒤에 ------- 부분에도 문자 들어감.
       else:
           gravatar_url = None
       context = {'boards' : boards, 'gravatar_url' : gravatar_url}
       print(request.user.id)
       
       return render(request, 'boards/index.html', context)
   
   ```

   + 로그인이 안 되어있을 때에는 user가 없기 때문에 email이 존재하지 않는다. 
   + 로그인이 되어 있을 경우에만 url을 만들 수 있기 때문에  if문으로 분기를 나눈다.

4. `boards/base.html`

   ```html
   ...
   <div class="container mt-5">
           <div class="row">
               <div class="col-2">
                   {% if user.is_authenticated %}
                       <img src="https://s.gravatar.com/avatar/{{ gravatar_url }}?s=150">
                       <h1>{{ user }}님</h1>
   ...
   ```

   + img 태그를 사용하여 이미지를 보여주고, size를 정해준다.

5.  `3번` ~ `4번` 에서 하게 되면 index에서만 사용하게 된다. 그러면 이걸 모든 views에 넣어줘야 할까???? 

   => NO!!!!!!!!!!!!!!!!

   => 우리는 MTV에서 T에 적용할 수 있다. [참고 문서](<https://docs.djangoproject.com/en/2.2/ref/templates/builtins/>)



## 10. Gravatar Template에서 사용하기!

1. `accounts/templatetags` 폴더 생성하기

2. `accounts/templatetags/gravatar.py` 파일 생성하기

   ```python
   import hashlib
   # 템플릿 가져오기
   from django import template
   
   # 템플릿 라이브러리 가져오기
   register = template.Library()
   
   # 필터로 makehash 함수를 추가하기
   @register.filter
   def makehash(email):
       return hashlib.md5(email.strip().lower().encode('utf-8')).hexdigest()
   
   ```

   + 위 views.py에서 사용했던것과 다르게 request.user를 없애고 hashlib를 부른다. 왜냐하면 makehash 함수에서 email 자체를 받아오기 때문이다

3. `boards/base.html`

   ```django
       <div class="container mt-5">
           <div class="row">
               <div class="col-2">
                   {% if user.is_authenticated %}
                   {% load gravatar %}
                       <img src="https://s.gravatar.com/avatar/{{ user.email|makehash }}?s=150">
                       <h1>{{ user }}님</h1>
   
   ```

   + 위에서 만든 `gravatar.py` 를 사용하기 위해 `{% load gravatar %}` 를 추가하고, `<img src="https://s.gravatar.com/avatar/{{ user.email|makehash }}?s=150">` 로 `user.email|makehash` 를 사용하여 위에서 만든 makehash를 필터로 사용한다.

4. 위의 과정을 하게 되면 `accounts/views.py`에서 만든 gravatar_url을 사용하지 않아도 된다.

5. `accounts/templatetags/gravatar.py`

   ```python
   ...
   from django.template.defaultfilters import stringfilter
   ...
   
   @stringfilter
   def makehash(email):
       return hashlib.md5(email.strip().lower().encode('utf-8')).hexdigest()
   
   ```

   + [string일 경우에만 동작하기 위해서 사용하는 필터. ](<https://docs.djangoproject.com/en/2.1/howto/custom-template-tags/#template-filters-that-expect-strings>)

6. 

   오늘은 gravatar를 배웠다. 
   내용을 template에서 만들어 뿌린다.
   templatetags를 만들어서 gravatar.py를 생성. 여기서 만든 def를 filter로 사용하여 
   base.html에서 사용할 eamil 주소를 확인하여 가져온다.





## 11. 유저목록(유저 index)

1. `boards/base.html`

   ```django
                   {% if user.is_authenticated %}
                   {% load gravatar %}
                       ...
                       <h2>{{ user }}님</h2>
                       ...
                       {% if user.is_superuser %}
                       <a href="{% url 'accounts:userlist' %}">사용자 목록</a>
                       {% endif %}
   ```

   + admin일때만 사용자 목록을 확인할 수 있게 만들었다.

     

2. `accounts/urls.py`

   ```python
   urlpatterns = [
   	...
       path('userlist/', views.userlist, name='userlist'),
   ]
   ```

   

3. `accounts/views.py`

   ```python
   from django.contrib.auth.models import User
   ...
   
   def userlist(request):
       print(request.user)
       users = User.objects.all()
       for user in users:
           user.cnt = len(user.board_set.all())
       context = {'user_list' : users}
       return render(request, 'accounts/userlist.html', context)
   ```

   + User를 import 해와 그 안의 모든 objects를 불러오게 된다.
   + 각 user들이 작성한 글 수를 체크하기 위해 user.board_set.all()으로 모든 글을 불러온 후 그 개수를 체크해 cnt에 넣어 context로 보낸다.

4. `accounts/userlist.html`

   ```django
   {% extends 'boards/base.html' %}
   {% block title %} user list {% endblock %}
   
   {% block css %}
       
       <style>
           h1{
               font-family: 'Noto Serif KR', serif;
           }
           #index{
               font-family: 'Nanum Myeongjo:800', serif;
           }
       </style>
   {% endblock %}
   
   
   {% block body %}
   <h1>사용자 목록</h1>
   
   
   <div id="index" class="row my-3">
       <div class="col-1">id</div>
       <div class="col-2"></div>
       <div class="col-5">username</div>
       <div class="col-2">작성 글 수</div>
   </div>
   
   
   {% for user in user_list %}
   <div class="row">
       <div class="col-1">
           {{ user.id }}
       </div>
       <div class="col-2">
           {% load gravatar %}
           <img src="https://s.gravatar.com/avatar/{{ user.email|makehash }}?s=50&d=https://d2jcw5q7j4vmo4.cloudfront.net/Jo68lEw1EbPdJa2AtD3ZnKXkStCNIxfxvKS_QglmKYXOV1TC7dtbSIhlMqjI_19Qobc=w50">
                       
       </div>
       <div class="col-5">
           {{ user.username }}
       </div>
       <div class="col-2">{{ user.cnt }}</div>
   </div>
   <hr>
   {% endfor %}
   
   <div class="row">
       <div class="col-9"></div>
       <div class="col-3 d-flex justify-content-end">
           <a href="{% url 'boards:index' %}" class="btn btn-outline-info btn-sm" role="button">목록</a>
   
       </div>
   </div>
   {% endblock %}
   ```

   ![1554879250901](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\img\1554879250901.png)

   



## 12. 프로필 페이지(유저 detail)

1. `boards/base.html`

   ```django
                   {% if user.is_authenticated %}
                   {% load gravatar %}
                       ...
                       <h2>{{ user }}님</h2>
                       <a href="{% url 'accounts:mypage' user.pk %}">Mypage</a><br>
                       
   ```

   + mypage로 넘어가기 위해서 user의 pk를 보내준다.

     

2. `accounts/urls.py`

   ```python
   urlpatterns = [
       ...
       path('<int:user_id>/', views.mypage, name='mypage'),
   ]
   ```

3. `accounts/views.py`

   ```python
   def mypage(request, user_id):
       contents = request.user.board_set.all()
       print(contents)
       context = {'contents' : contents}
       return render(request, 'accounts/mypage.html', context)
   ```

   + user id를 받아와서 그 사람이 작성한 글들을 가져오기 위해 board_set으로 가져온다.

4. `accounts/mypage.html`

   ```django
   {% extends 'boards/base.html' %}
   {% block title %} user list {% endblock %}
   
   {% block css %}
       
       <style>
           h1{
               font-family: 'Noto Serif KR', serif;
           }
           #index{
               font-family: 'Nanum Myeongjo:800', serif;
           }
       </style>
   {% endblock %}
   
   
   {% block body %}
   <h1>My Page</h1>
   <div class="row d-flex justify-content-center">
       {% load gravatar %}
       <div class="my-5"><img src="https://s.gravatar.com/avatar/{{ user.email|makehash }}?s=250&d=https://d2jcw5q7j4vmo4.cloudfront.net/Jo68lEw1EbPdJa2AtD3ZnKXkStCNIxfxvKS_QglmKYXOV1TC7dtbSIhlMqjI_19Qobc=w250"></div>
   </div>
   
   
   <form>
       <div class="form-group row">
           <label class="col-sm-2 col-form-label">username</label>
           <label class="col-sm-10 col-form-label">{{user}}</label>
       </div>
       
       <div class="form-group row">
           <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
           {% if user.email %}
           <label for="staticEmail" class="col-sm-10 col-form-label">{{ user.email }}</label>
           {% else %}
           <label for="staticEmail" class="col-sm-10 col-form-label">None</label>
           {% endif %}
       </div>
   
       <div class="form-group row">
           <div class="col-sm-2">
               <label class="col-form-label">작성한 글</label>
           </div>
           <div class="col-sm-10">
               {% if contents %}
               {% for content in contents %}
                   <label for="staticEmail" class="col-sm-10 col-form-label">{{ content.title }}</label>
               {% endfor %}
           
               {% else %}
               <label for="staticEmail" class="col-sm-10 col-form-label">None</label>
               {% endif %}
           </div>
           
       </div>
   </form>
   
   <div class="row">
       <div class="col-9"></div>
       <div class="col-3 d-flex justify-content-end">
           <a href="{% url 'boards:index' %}" class="btn btn-outline-info btn-sm" role="button">목록</a>
   
       </div>
   </div>
   {% endblock %}
   ```

   ![1554879704854](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\img\1554879704854.png)

   



## 13. 댓글 작성하기

1. `boards/models.py`

   ```python
   class Comment(models.Model):
       content = models.TextField()
       created_at = models.DateTimeField(auto_now_add=True)
       updated_at = models.DateTimeField(auto_now=True)
       board = models.ForeignKey('Board', on_delete=models.CASCADE)
       user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
       
   ```

   



















