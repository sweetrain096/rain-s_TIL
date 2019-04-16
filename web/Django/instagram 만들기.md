# instagram 만들기

+ user form 쉽게 외우기!!
  + `from django.contrib.auth.forms import UserCreationForm`
    + django가 주는 contrib(기여?) 중에 auth 에 사용할수 있는 forms. 중에서 UserCreationForm(여기서 **creation**에 주의!!!)
  +  `from django.contrib.auth import get_user_model`
    +  get_user_model은 user 내용을 가져와 보여주는 함수라고 생각하면 쉽다.
  + contribute

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





## 01. posts app 생성

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

    





## 02. CRUD

### create

1. `posts/urls.py`

   ```python
   urlpatterns = [
       path('', views.list, name="list"),
       path('create/', views.create, name="create"),
   ```

2. `posts/views.py`

   ```python
   def create(request):
       if request.method == 'POST':
           post_form = PostForm(request.POST)
           if post_form.is_valid():
               post = post_form.save()
               return redirect('posts:list')
       else:
           post_form = PostForm()
       context = {'post_form' : post_form}
       
       return render(request, 'posts/form.html', context)
   ```

3. `posts/forms.py`

   ```python
   from django import forms
   from .models import Post
   
   class PostForm(forms.ModelForm):
       class Meta:
           model = Post
           fields = ['content', ]
   ```

   

4. `posts/form.html`

   ```html
   {% extends 'base.html' %}
   {% block body %}
   
   <h2>new post</h2>
   <form method="POST">
       {% csrf_token %}
       {{ post_form }}
       <input type='submit' value="등록!">
   </form>
   {% endblock %}
   ```

   

### read

1. `posts/urls.py`

   ```python
   urlpatterns = [
       ...
       path('<int:post_pk>/', views.detail, name="detail"),
   ```

2. `posts/views.py`

   ```python
   from django.shortcuts import render, redirect, get_object_or_404
   
   
   def detail(request, post_pk):
       post = get_object_or_404(Post, pk=post_pk)
       context = {'post' : post}
       return render(request, 'posts/detail.html', context)
   ```

3. `posts/detail.html`

   ```html
   {% extends 'base.html' %}
   {% block body %}
   <p>{{ post.pk }}번 글</p>
   <p>{{ post.content}}</p>
   <a href="" class="btn btn-outline-warning btn-sm" role="button">수정</a>
   <form action="" method="POST" >
       {% csrf_token %}
       <input type="submit" class="btn btn-outline-danger btn-sm" role="button" value="삭제">
   </form>
   {% endblock %}
   ```

   + 수정, 삭제 버튼 미리 만들기



### delete

1. `posts/urls.py`

   ```python
   urlpatterns = [
       ...
       path('delete/<int:post_pk>/', views.delete, name="delete"),
   ]
   ```

2. `posts/views.py`

   ```python
   def delete(request, post_pk):
       post = get_object_or_404(Post, pk=post_pk)
       if request.method == 'POST':
           post.delete()
           return redirect('posts:list')
       else:
           return redirect('posts:detail', post_pk)
   ```



### edit (create와 form.html 공유)

1. `posts/urls.py`

   ```python
   urlpatterns = [
       ...
       path('edit/<int:post_pk>/', views.edit, name="edit"),
   ```

2. `posts/views.py`

   ```python
   def edit(request, post_pk):
       post = get_object_or_404(Post, pk=post_pk)
       if request.method == 'POST':
           post_form = PostForm(request.POST)
           if post_form.is_valid():
               post.content = post_form.cleaned_data.get('content')
               post.save()
               return redirect('posts:detail', post_pk)
       else:
           post_form = PostForm(initial=post.__dict__)
       
       context = {'post_form' : post_form}
       return render(request, 'posts/form.html', context)
   ```

   + GET 방식으로 들어올 때 post_form을 `PostForm(initial=post.__dict__)` 으로 받아온다. 이 경우 PostForm을 초기 값 자체를 우리가 받아온 post로 띄워준다. 이렇게 되면 post의 pk값까지 일치하게 되어 저장을 해도 그 위치로 저장되게된다.
   + POST요청으로 들어올 때에는 create와 유사하나 들어온 값이 유효한지를 확인 한 후 cleaned_data로 가져온 내용을 저장하게 된다.





## 03. [ImageField 만들기](<https://cjh5414.github.io/django-file-upload/>)

1. `posts/models.py`

   ```python
   class Post(models.Model):
       content = models.TextField()
       image = modles.ImageField()
   ```

   

2. `bash`

   ```bash
   $ pip install Pillow
   $ python manage.py makemigrations
   $ python manage.py migrate
   ```

   - 이미지 사용을 위해 pillow 를 설치한 후 마이그레이트.

     

3. `settings.py`

   ```python
   MEDIA_URL = '/media/'
   MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
   ```

   추가

   - MEDIA_URL : 만들 루트

   - MEDIA_ROOT : 실제로 저장되는 위치

   - 이후 project 가장 상단에서 media라는 이름의 폴더를 만든다.

     

4. `urls.py`

   ```python
   from django.conf import settings
   from django.conf.urls.static import static
   
   urlpatterns=[]
   
   urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   ```

   + settings를 불러오기 위해서는 `from django.conf import settings` 하기
   + 맨 아래 url을 불러오기 위해서 static을 import 해오게 된다.

   

5. `posts/forms.py`

   ```python
       class Meta:
           model = Post
           fields = ['content', 'image']
           widgets = {
               'content' : forms.Textarea(),
               'image' : forms.FileInput(),
           }
   
   ```

6. `posts/form.html`

   ```html
   {% extends 'base.html' %}
   {% block body %}
   
   <h2>new post</h2>
   <form method="POST" enctype="multipart/form-data">
       {% csrf_token %}
       {{ post_form }}
       <input type='submit' value="등록!">
   </form>
   {% endblock %}
   ```

   `enctype="multipart/form-data"`부분을 넣어야한다.

7. `posts/views.py`

   ```python
   def create(request):
       if request.method == 'POST':
           post_form = PostForm(request.POST, request.FILES)
           if post_form.is_valid():
               post = post_form.save()
               return redirect('posts:detail', post.pk)
       else:
           post_form = PostForm()
       context = {'post_form' : post_form}
       
       return render(request, 'posts/form.html', context)
       
   ```

   + redirect를 detail로 보내기

8. `posts/detail.html`

   ```html
   {% extends 'base.html' %}
   {% block body %}
   <p>{{ post.pk }}번 글</p>
   <p>{{ post.content}}</p>
   <img src="{{ post.image.url }}"><br>
   <a href="{% url 'posts:edit' post.pk %}" class="btn btn-outline-warning btn-sm" role="button">수정</a>
   <form action="{% url 'posts:delete' post.pk %}" method="POST" >
       {% csrf_token %}
       <input type="submit" class="btn btn-outline-danger btn-sm" role="button" value="삭제">
   </form>
   {% endblock %}
   ```

   





## 04. 이미지 여러장 받기

1. `posts/models.py`

   ```python
   class Post(models.Model):
       content = models.TextField()
       # image = models.ImageField()
       
       def __str__(self):
           return f'Post : {self.pk} - {self.content}'
       
       def get_absolute_url(self):
           return reverse('posts:detail', args=[self.pk])
           # reverse : object가 가야하는데 뒤의 내용을 실제 path로 만드는 역할.
           
   class Image(models.Model):
       file = models.ImageField()
       post = models.ForeignKey(Post, on_delete=models.CASCADE)
       
   ```

   + Image class가 가지고 있는 post의 주소 저장하기

     

2. `posts/forms.py`

   ```python
   from django import forms
   from .models import Post, Image
   
   class PostForm(forms.ModelForm):
       class Meta:
           model = Post
           fields = ['content',]
       
   class ImageForm(forms.ModelForm):
       class Meta:
           model = Image
           exclude = ('post',)
   ```

   + exclude에서 foreignkey만 제외하고 가져오기

3. `posts/views.py`

   ```python
   from .forms import PostForm, ImageForm
   
   def create(request):
       ...
       else:
           post_form = PostForm()
           image_form = ImageForm()
       context = {'post_form' : post_form, 'image_form' : image_form}
       
       return render(request, 'posts/form.html', context)
   ```

   + else에서 image_form을 같이 가져오기

4. `posts/form.html`

   ```html
   {% extends 'base.html' %}
   {% block body %}
   {% load crispy_forms_tags %}
   
   <h2>new post</h2>
   <form method="POST" enctype="multipart/form-data">
       {% csrf_token %}
       {{ post_form|crispy }}
       {{ image_form|crispy }}
       <input type='submit' value="등록!">
   </form>
   {% endblock %}
   ```

   + crispy 다운하여 적용.
   + post_form과 image_form을 각각 띄운다.

   여기까지는 아직 사진 한장만 업로드 가능

5. `posts/forms.py`

   ```python
   class ImageForm(forms.ModelForm):
       class Meta:
           model = Image
           exclude = ('post',)
           widgets = {
               'file' : forms.FileInput(attrs={'multiple' : True}),
           }
   ```

   + widgets에 file의 multiple을 주기만 하면 여러장 입력이 가능하다.

6. `posts/views.py`(이해하기 쉽게. but, 동작하지는 않는다.)

   ```python
   def create(request):
       if request.method == 'POST':
           post_form = PostForm(request.POST)
           if post_form.is_valid():
               post = post_form.save()
               files = request.FILES.getlist('file')
               for file in files:
                   image_form = ImageForm(file)
                   image = image_form.save(commit=False)
                   image.post = post
                   image.save()
               return redirect('posts:detail', post.pk)
   ```

   + files에 request.FILES.getlist('file')로 가져오게 된다. 이것은 장고가 지원하는 문법이며, file들의 목록이 된다.
     + 이때, 'file'은 모델에서 만든 column 이다
   + files 들을 하나씩 돌면서 file을 저장하기 위해 for문을 사용.
   + image_form을 ImageForm(file)로 가져오는데, 이 때 post의 id가 없기 때문에 우선 commit=False로 image 저장을 멈춰놓는다.
   + iamge.post = post로 image 아이디 값을 저장해놓고, image.save()로 저장한다....면 좋겠지만,,,,

7. `posts/views.py`

   ```python
   def create(request):
       if request.method == 'POST':
           post_form = PostForm(request.POST)
           if post_form.is_valid():
               post = post_form.save()
               files = request.FILES.getlist('file')
               for file in files:
                   request.FILES['file'] = file
                   image_form = ImageForm(files=request.FILES)
                   if image_form.is_valid():
                       image = image_form.save(commit=False)
                       image.post = post
                       image.save()
               return redirect('posts:detail', post.pk)
       else:
           post_form = PostForm()
           image_form = ImageForm()
       context = {'post_form' : post_form, 'image_form' : image_form}
       
       return render(request, 'posts/form.html', context)
   ```

   + request.FILSE를 할 때에는 필요한 내용 및 형식이 존재한다. 이것을 깨뜨리지 않고 저장하기 위해서 형식을 유지해준다. 
   + `request.FILES['file'] = file`를 통해 `request.FILES['file']`가 형식을 유지시키고, for 안에서 돌아가는 file 하나하나가 업데이트 된다. 
   + 이후 `image_form = ImageForm(request.POST, request.FILES)` 에서 image_form이 받는 ImageForm 함수에서 request.FILES는 우리가 위에서 업데이트 시킨 이미지 파일 하나에 대한 내용이며, 나머지 내용들을 같이 받기 위해 request.POST를 같이 가져오게된다.
   + 이렇게 가져온 image_form을 valid를 거쳐 저장하게 된다.









## 05. User사용하기

### 회원가입

1. bash

   ```bash
   $ python manage.py startapp accounts
   ```

2. `settings.py`

   ```python
   INSTALLED_APPS = [
   	...
       'posts',
       'accounts',
   ]
   
   ```

3. `urls.py`

   ```python
   urlpatterns = [
       path('admin/', admin.site.urls),
       path('posts/', include('posts.urls')),
       path('accounts/', include('accounts.urls')),
   ]
   ```

4. `accounts/urls.py` 생성.

   ```python
   from django.urls import path
   from . import views
   app_name = 'accounts'
   
   urlpatterns = [
       path('signup/', views.signup, name="signup"),
   ]
   ```

5. `accounts/views.py`

   ```python
   # Create your views here.
   def signup(request):
       return render(request, 'accounts/signup.html')
   ```

6. `accounts/templates/accounts/signup.html`

   ```html
   {% extends 'base.html' %}
   ```

7. `accounts/views.py`

   ```python
   from django.contrib.auth.forms import UserCreationForm
   # Create your views here.
   def signup(request):
       user_form = UserCreationForm()
       
       context = {"user_form" : user_form}
       return render(request, 'accounts/signup.html', context)
   ```

   + user를 사용하기 위해 `from django.contrib.auth.forms import UserCreationForm` 사용

8. `accounts/signup.html`

   ```html
   {% extends 'base.html' %}
   
   {% block body %}
   {% load crispy_forms_tags %}
   {{ user_form|crispy }}
   
   {% endblock %}
   ```

9. `accounts/forms.py` 생성

   ```python
   from django.contrib.auth import get_user_model
   from django.contrib.auth.forms import UserCreationForm
   
   class UserCustomCreationFrom(UserCreationForm):
       class Meta:
           model = get_user_model()
           # fields = '__all__'
           fields = ['username', 'email', 'password1', 'password2']
   ```

   + user 모델은 modelform이 아니라 만들어진 usercreateform 을 가져와야한다. 이렇게 우리가 가져오는 이유는 우리가 원하는 폼의 내용을 추가할 수 있기 때문이다. 
   + 우리가 사용하려고 하는 model이 class의 매개변수로 들어가고, model을 `get_user_model` 함수로 사용한다. get_user_model은 user 내용을 가져와 보여주는 함수라고 생각하면 쉽다. 그렇기 때문에 `from django.contrib.auth import get_user_model`로 가져올 수 있다.

10. `accounts/views.py`

    ```python
    from .forms import UserCustomCreationFrom
    
    # Create your views here.
    def signup(request):
        if request.method == "POST":
            user_form = UserCustomCreationFrom(request.POST)
            if user_form.is_valid():
                user_form.save()
                return redirect('posts:list')
                
        else:
            user_form = UserCustomCreationFrom()
        
        context = {"user_form" : user_form}
        return render(request, 'accounts/signup.html', context)
    ```

    + forms.py에서 만든 UserCustomCreationForm을 사용하여 회원가입한다.

11. `accounts/signup.html`

    ```html
    {% extends 'base.html' %}
    
    {% block body %}
    {% load crispy_forms_tags %}
    <form method="POST">
        {% csrf_token %}
        {{ user_form|crispy }}
        <input type="submit" class="button">
    </form>
    
    {% endblock %}
    ```

    + 이 때 `action=`을 쓰지 않아야 동작한다. 쓰지 않아도 자동으로 POST형식으로 넘어가게 된다.

12. `_navbar.html`

    ```html
            <li class="nav-item active">
              <a class="nav-link" href="{% url 'accounts:signup' %}">sign up</a>
            </li>
    ```

    + 회원가입 버튼 추가





### login

1. `accounts/urls.py`

   ```python
   urlpatterns = [
       path('signup/', views.signup, name="signup"),
       path('login/', views.login, name="login"),
   ]
   ```

2. `accounts/views.py`

   ```python
   from django.contrib.auth import login as auth_login
   from django.contrib.auth.forms import AuthenticationForm
   
   def login(request):
       if request.method == 'POST':
           user_form = AuthenticationForm(request, request.POST)
           print(user_form)
           if user_form.is_valid():
               user_form = auth_login(request, user_form.get_user())
           return redirect('posts:list')
       else:
           user_form = AuthenticationForm()
       context = {'user_form' : user_form}
       return render(request, 'accounts/login.html', context)
   ```

   + `AuthenticationForm`에서 정보를 요청받는다. 이 때 request와 request.POST를 모두 가져온다. POST로 받는 정보 이외의 정보도 받아와야만 로그인이 가능하다.

   + 받아온 정보가 유효한지 확인한 후, 이 정보를 가져오기 위해서는 `.get_user()`를 사용해서 form에서 가져온 정보를 가져온다.

   + 이 때 print(user_form)은 

     + ```
       <tr><th><label for="id_username">사용자 이름:</label></th><td><input type="text" name="username" value="admin" autofocus required id="id_username"></td></tr>
       <tr><th><label for="id_password">비밀번호:</label></th><td><input type="password" name="password" required id="id_password"></td></tr>
       ```

     + 이런 정보를 갖게되며, 여기서 `get_user()`를 통해 우리가 원하는 정보를 뽑아낼 수 있다. get_user는 Authentication이 제공하는 함수이다.

3. `_navbar.html`

   ```html
             {% if user.is_authenticated %}
             <li class="navbar-brand">{{user.username}}님</li>
             {% else %}
             <li class="nav-item active">
                 <a class="nav-link" href="{% url 'accounts:login' %}">login</a>
             </li>
             <li class="nav-item active">
                 <a class="nav-link" href="{% url 'accounts:signup' %}">sign up</a>
             </li>
             {% endif %}
   ```

   - 로그인 버튼 및 `is_authenticated`로 로그인 되어있는지 확인.



### logout

1. `accounts/urls.py`

   ```python
   urlpatterns = [
       path('signup/', views.signup, name="signup"),
       path('login/', views.login, name="login"),
       path('logout/', views.logout, name="logout"),
   ]
   ```

2. `accounts/views.py`

   ```python
   from django.contrib.auth import logout as auth_logout
   
   
   def logout(request):
       auth_logout(request)
       return redirect('posts:list')
       
   ```

3. `_navbar.html`

   ```html
             {% if user.is_authenticated %}
             <li class="navbar-brand">{{user.username}}님</li>
             <li class="nav-item active">
               <a class="nav-link" href="{% url 'accounts:logout' %}">logout</a>
             </li>
   
             {% else %}
   ```

   





## 06. mypage 생성 / 프로필 수정

### mypage

1. `accounts/urls.py`

   ```python
   urlpatterns = [
       path('signup/', views.signup, name="signup"),
       path('login/', views.login, name="login"),
       path('logout/', views.logout, name="logout"),
       path('<str:user_name>', views.mypage, name="mypage"),
   ]
   ```

2. `accounts/views.py`

   ```python
   def mypage(request, user_name):
       return render(request, 'accounts/mypage.html')
   ```

3. `accounts/mypage.html`

   ```html
   {% extends 'base.html' %}
   {% block css %}
   <style>
   
   </style>
   {% endblock %}
   
   {% block body %}
   <div id="inner" class="container m-5 " style="margin: 0 auto; max-width: 935px">
       <div class="row d-flex justify-content-around">
           <div class="col-3">
               <img src="https://picsum.photos/150/150">
           </div>
   
           <div class="col-6">
               <div class="row">
                   <div class="col-6">{{ user }}</div>
                   <div class="col-6">프로필편집</div>
               </div>
               <div class="row my-4">
                   게시물 : 
               </div>
               <div class="row my-4">
                   <pre>내 소개</pre>
               </div>
           </div>
       </div>
       <div class="row d-flex justify-content-center my-4">
           <div class="col-2">게시물</div>
           <div class="col-2">IGTV</div>
           <div class="col-2">저장됨</div>
           <div class="col-2">태그됨</div>
       </div>
       <hr>
       {{ user }}
   </div>
   
   {% endblock %}
   ```

4. `_navbar.html`

   ```html
             {% if user.is_authenticated %}
             <li class="navbar-brand">{{user.username}}님</li>
             <li class="nav-item active">
               <a class="nav-link" href="{% url 'accounts:mypage' user %}"> My Page </a>
             </li>
   ```



### 프로필 수정

1. `accounts/urls.py`

   ```python
   urlpatterns = [
       ...
       path('<str:user_name>', views.mypage, name="mypage"),
       path('<str:user_name>/edit', views.edit, name="edit"),
   ]
   ```

2. `accounts/views.py`

   ```python
   from django.contrib.auth.forms import UserChangeForm
   
   def edit(request, user_name):
       if request.method == 'POST':
           user_form = UserChangeForm(request.POST, instance=request.user)
           if user_form.is_valid():
               user_form.save()
       else:
           user_form = UserChangeForm(instance=request.user)
   
       
       context = {"user_form" : user_form}
       return render(request, 'accounts/edit.html', context)
   ```

3. `accounts/forms.py`

   ```python
   from django.contrib.auth.forms import UserChangeForm
   
   class UserCustomChangeForm(UserChangeForm):
       class Meta:
           model = get_user_model()
           fields = ['email']
   ```

   + 수정하는 form 사용

4. `accounts/views.py`

   ```python
   def edit(request, user_name):
       if request.method == 'POST':
           user_form = UserCustomChangeForm(request.POST, instance=request.user)
           if user_form.is_valid():
               user_form.save()
               return redirect('posts:list')
       else:
           user_form = UserCustomChangeForm(instance=request.user)
   
       context = {"user_form" : user_form}
       return render(request, 'accounts/edit.html', context)
   ```



### 비밀번호 수정

1. `accounts/urls.py`

   ```python
   urlpatterns = [
   	...
       path('<str:user_name>/password/', views.password, name="password"),
   ]
   ```

2. `accounts/views.py`

   ```python
   from django.contrib.auth.forms import PasswordChangeForm
   
   def password(request, user_name):
       if request.method == 'POST':
           user_form = PasswordChangeForm(request.POST, instance=request.user)
           if user_form.is_valid():
               user_form.save()
               return redirect('posts:list')
       else:
           user_form = PasswordChangeForm(request.user)
       context = { 'user_form' : user_form }
       return render(request, 'accounts/password.html', context)
   ```

3. `accounts/password.html`

   ```html
   {% extends 'base.html' %}
   
   {% block body %}
   <h1>비밀번호 변경</h1>
   {% load crispy_forms_tags %}
   <form method="POST">
       {% csrf_token %}
       {{ user_form|crispy }}
       <input type="submit" class="button">
   </form>
   
   {% endblock %}
   ```

   





## 07. 게시글 작성자 표시 및 댓글, userpage 수정

1. `posts/models.py`

   ```python
   from django.conf import settings
   from django.contrib.auth import get_user_model
   
   # Create your models here.
   class Post(models.Model):
       content = models.TextField()
       user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
       # image = models.ImageField()
       
       def __str__(self):
           return f'Post : {self.pk} - {self.content}'
       
       def get_absolute_url(self):
           return reverse('posts:detail', args=[self.pk])
           # reverse : object가 가야하는데 뒤의 내용을 실제 path로 만드는 역할.
           
   class Image(models.Model):
       file = models.ImageField()
       post = models.ForeignKey(Post, on_delete=models.CASCADE)
       
   class Comment(models.Model):
       content = models.TextField()
       post = models.ForeignKey(Post, on_delete=models.CASCADE)
       user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   ```

2. `posts/views.py`

   ```python
   def create(request):
       if request.method == 'POST':
           post_form = PostForm(request.POST)
           if post_form.is_valid():
               post = post_form.save(commit=False)
               post.user = request.user
               post.save()
   ```

   

3. `posts/urls.py`

   ```python
   urlpatterns = [
   	...
       
       path('<int:post_pk>/create_comment/', views.create_comment, name="create_comment"),
   ]
   
   ```

4. `posts/views.py`

   ```python
   def list(request):
       posts = Post.objects.order_by('-id')
       comment_form = CommentForm()
       for post in posts:
           post.comments = post.comment_set.all()
           print(post.comments)
       context = {'posts' : posts, 'comment_form' : comment_form}
       
       return render(request, 'posts/list.html', context)
   ```

   + list의 모달에 댓글을 달기 위해 댓글 폼 추가

   `posts/views.py`

   ```python
   def create_comment(request, post_pk):
       print(post_pk)
       post = Post.objects.get(pk = post_pk)
       # comment_form = CommentForm()
       if request.method == 'POST':
           comment_form = CommentForm(request.POST)
           if comment_form.is_valid():
               comment = comment_form.save(commit=False)
               comment.post = post
               comment.user = request.user
               comment.save()
   
       return redirect('posts:list')
   ```

   + CommentForm은 comment_form로 받아와야한다. 받아온 후 유효성 검사를 하고, 저장된 것을 comment로 저장한다.







![Untitled](C:\Users\student\Desktop\rain\rain-s_TIL\web\Django\img\Untitled.jpg)





## 08. 좋아요 기능 만들기

1. `posts/model.py`

   ```python
   # Create your models here.
   class Post(models.Model):
       content = models.TextField()
       user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
       # users = models.ManyToManyField(settings.AUTH_USER_MODEL)
       # 윗줄과 같이 작성을 하면
       # user.post_set.all() - 게시글? 좋아요 한 글? 확인할 수 없다.
       like_users = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='like_posts')
       # image = models.ImageField()
       
       def __str__(self):
           return f'Post : {self.pk} - {self.content}'
       
       def get_absolute_url(self):
           return reverse('posts:detail', args=[self.pk])
           # reverse : object가 가야하는데 뒤의 내용을 실제 path로 만드는 역할.
   
   ```

   + `users = models.ManyToManyField(settings.AUTH_USER_MODEL)` 와 같이 작성하면 N:M 관계를 사용하여 좋아요를 만들 수 있지만, 이렇게 작성하면 

     `user.post_set.all()` 이렇게 작성할 때 user가 작성한 게시글인지, 좋아요를 누른 글인지 확인할 수 없다.

   + 이것을 수정하기 위해서는 `like_users = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='like_posts')` 이렇게 작성을 해서 

     `user.like_posts`로 가져온다.

2. 마이그래이션, 마이그레이트 하기

3. `accounts/mypage.html`

   ```html
   <div class="col-4 d-flex justify-content-between">
       <!--좋아요-->
       {% if user in post.like_users.all %}
           <a href="{% url 'accounts:like' user post.pk%}" style="color: red;"><i class="fas fa-heart fa-lg"></i></a>
       {% else %}
           <a href="{% url 'accounts:like' user post.pk%}" style="color: red;"><i class="far fa-heart fa-lg"></i></a>
       {% endif %}
       <i class="far fa-comment fa-lg"></i>
       <i class="far fa-share-square fa-lg"></i>
   </div>
   <div class="footer m-0 p-0">
   	{{ post.like_users.count }}명이 좋아합니다
    </div>
   ```

4. `accounts/urls.py`

   ```python
   urlpatterns = [
       ...
       path('<int:post_pk>/like/', views.like, name='like'),
   ]
   ```

5. `accounts/views.py`

   ```python
   def like(request, user_name, post_pk):
       post = get_object_or_404(Post, pk=post_pk)
       user = request.user
       # user가 지금 해당 게시글에 좋아요를 한 적이 있는지?
       if user in post.like_users.all():
           post.like_users.remove(user)
       else:
           post.like_users.add(user)
       return redirect('accounts:mypage', user_name)
   ```

   + `if user in post.like_users.all()` 부분을 `post.like_users.filter(pk=user.id).exists()` 함수로 대체 가능하다.

6. `posts/models.py`

   좋아요 수를 체크!

   ```python
   class Post(models.Model):
       content = models.TextField()
       user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
       # users = models.ManyToManyField(settings.AUTH_USER_MODEL)
       # 윗줄과 같이 작성을 하면
       # user.post_set.all() - 게시글? 좋아요 한 글? 확인할 수 없다.
       like_users = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='like_posts')
       # image = models.ImageField()
       
       @property
       def like_count(self):
           return self.like_users.count()
           
   ```

   아래에 like_count 함수를 만들어준 후,

   

7. `accounts/mypage.html`

   ```html
   <div class="footer m-0 p-0">
   	{{ post.like_count }}명이 좋아합니다
   </div>
   ```

   









































