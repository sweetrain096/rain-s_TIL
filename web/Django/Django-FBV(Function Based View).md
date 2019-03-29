# Django-FBV(Function Based View)

## 0. FBV

+ FBV : Function Based view : 함수형 뷰



## 1. FBV 구현

### 사전작업

일반 index 및 create 구현은 동일하게 하되, create에서 받아온 내용을 수정할 예정.



### forms.py

+ form 내용을 비워두는 것과 같은 것을 막기 위한 검증 작업. 
+ form을 상속받는것.

```python
from django import forms

class BoardForm(forms.Form):
    title = forms.CharField()
    content = forms.CharField()
    
```



+ label 바꾸기

  ```python
  from django import forms
  from .models import Board
  
  class BoardForm(forms.Form):
      title = forms.CharField(label='제목', max_length=10)
      content = forms.CharField(label='내용')
      
  ```

  + `max_length=10`으로 글자수 제한 가능

  

+ 에러 메세지 및 placeholder

  ```python
  from django import forms
  from .models import Board
  
  class BoardForm(forms.Form):
      title = forms.CharField(label='제목', 
                          error_messages={'required' : '제목을 반드시 입력해주세요.'})
      content = forms.CharField(label='내용',
                          error_messages = {'required' : '내용을 반드시 입력해주세요.'},
                          widget=forms.Textarea(attrs={
                                  'placeholder' : '내용을 입력해줘~~',
                                  'class' : 'input-box'
                                  })
                          )
  ```

  + `error_messages={'required' : '제목을 반드시 입력해주세요.'}` :

    : form 형식에 있는 required를 억지로 지우고 제출할 때 html 파일에 다시 출력되는 메세지이다.







### views.py

```python
from .forms import BoardForm

def create(request):
    if request.method == 'POST':
        '''
        # 앞으로는 request.POST를 사용하지 않을것.
        # 검증이 안되기 때문
        title = request.POST.get('title')
        content = request.POST.get('content')
        board = Boad(title=title, content=content)
        board.save()
        '''
        board_form = BoardForm(request.POST)
        if board_form.is_valid():
            title = board_form.cleaned_data.get('title')
            content = board_form.cleaned_data.get('content')
            board = Boad(title=title, content=content)
            board.save()
            return redirect('boards:index')
    else:
        board_form = BoardForm()
    context = {'board_form' : board_form}
    return render(request, 'boards/create.html', context)
```

+ 앞으로는 `request.POST`를 사용하지 않을 것. 검증이 안되기 때문
+ `forms.py`에서 만든 함수를 불러와 `board_form = BoardForm(request.POST)` 로 불러와 사용할것.
+ 우선 get방식으로 들어와 아무것도 없을 경우에는 board_form을 생성하여 새로운 form을 만들게 되고, 이것을 create.html에서 정보를 받아온다. 
+ create 에서 받아온 정보기 POST로 들어온 후, board_form object를 생성하고, 생성한 후 이것이 valid 하면 값을 저장하여 index로 redirect 시킨다.



### create.html

```html
<form action="{% url 'boards:create' %}" method="POST">
    {% csrf_token %}
    {{ board_form.as_p }}
    <input type="submit">
</form>
```

+ `{{ board_form }}` : 우리가 만든 forms.py 내용으로 자동으로 form 형식을 만들어준다.
+ `{{ board_form.as_p }}` : 위의 내용을 p태그로 묶어준다.
+ `{{ board_form.as_table }}` : 위의 내용을 table로 묶어준다.
+ `{{ board_form.as_li }}` : 위의 내용을 리스트로 묶어준다.





### pk가 없는 오류 방지 (get_object_or_404)

+ 없는 페이지로 들어오는건 개발자 잘못이 아니에욧!! 아니라구욧!!!!

`views.py`

```python
from django.shortcuts import get_object_or_404

def detail(request, board_pk):
    # board = Board.objects.get(pk=board_pk)
    board = get_object_or_404(Board, pk=board_pk)
    board.hit += 1		# 조회수 증가시키기
    board.save()
    context = {'board' : board}
    return render(request, 'boards/detail.html', context)
```

`get_object_or_404(Board, pk=board_pk)` : Board 모델에서 pk가 board_pk인 내용을 가져오는데, 없으면 404를 보여줘.



### app name을 특정 위치로(get_absolute_url)

`models.py`

```python
from django.db import models
from django.urls import reverse

# Create your models here.
class Board(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
    hit = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'<Board ({self.id})> : {self.title}'
        
    def get_absolute_url(self):
        # 'self.pk/'
        return reverse('boards:detail', args=[self.pk])
```

+ 마지막 두줄이 board를 적용시키면 boards/detail로 가게 한다.

`views.py`

```python
def create(request):
    if request.method == 'POST':
        '''
        # 앞으로는 request.POST를 사용하지 않을것.
        # 검증이 안되기 때문
        title = request.POST.get('title')
        content = request.POST.get('content')
        board = Boad(title=title, content=content)
        board.save()
        '''
        board_form = BoardForm(request.POST)
        if board_form.is_valid():
            title = board_form.cleaned_data.get('title')
            content = board_form.cleaned_data.get('content')
            board = Board(title=title, content=content)
            board.save()
            # return redirect('boards:detail' board.pk)
            return redirect(board)
```

+ `return redirect(board)` 부분이 알아서 `return redirect('boards:detail' board.pk)`와 같이 동작한다.



### form.html

+ create.html과 update.html을 하나로 묶어서 사용하기 위함

`views.py`

```python
def update(request, board_pk):
    board = get_object_or_404(Board, pk=board_pk)
    # board_form = BoardForm(initial={'title' : board.title, 'content' : board.content})
    board_form = BoardForm(initial=board.__dict__)
    context = {'board_form' : board_form}
    return render(request, 'boards/form.html', context)
```



`form.html`

```html
{% extends 'boards/base.html' %}
{% block body %}
<form method="POST">
    {% csrf_token %}
    {{ board_form.as_p }}
    <input type="submit">
</form>
{% endblock %}
```





`views.py`

```python
def update(request, board_pk):
    # 1. board_pk에 해당하는 오브젝트를 가져온다.
    #   - 없으면, 404 에러
    #   - 있으면, board = Board.objects.get(pk=board_pk)와 동일
    board = get_object_or_404(Board, pk=board_pk)
    
    # 2. POST 요청이면 (사용자가 form을 통해 데이터를 보내 준 것.)
    if request.method == 'POST':
        # 사용자 입력 값(request.POST)을 BoardForm에 전달해주고,
        board_form = BoardForm(request.POST)
        # 그 값을 검증한다.(유효성 체크)
        if board_form.is_valid():
            board.title = board_form.cleaned_data.get('title')
            board.content = board_form.cleaned_data.get('content')
            board.save()
            return redirect(board)
    # 2-2. GET 요청이면, (수정하기 버튼을 눌렀을 때)
    else:
        # BoardForm을 초기화(사용자 입력값을 넣어준 상태)
        board_form = BoardForm(initial=board.__dict__)
        # board_form = BoardForm(initial={'title' : board.title, 'content' : board.content})
    # context에 담겨있는 board_form은 두 가지 상황이 있다.
    # 1 - POST 요청에서 검증에 실패하였을 때, 오류 메세지가 포함된 상태
    # 2 - GET 요청에서 초기화 된 상태
    context = {'board_form' : board_form}
    return render(request, 'boards/form.html', context)
```







### model form

1. `forms.py`

   + model에 있는 내용을 가져오기. model을 상속받는것

     ```python
     from django import forms
     from .models import Board
     
     # modelform
     class BoardForm(forms.ModelForm):
         class Meta:
             model = Board
             fields = '__all__'
     ```

   + content 부분이 지정하지 않아도 textarea로 된다.

   + hit이 표시된다.

   + `models.py`

     ```python
     from django import forms
     from .models import Board
     class BoardForm(forms.ModelForm):
         class Meta:
             model = Board
             fields = ['title', 'content']
     ```

   + 특정 부분만 가져오게 만드려면 list로 가져온다.

   

   + if fields = `'__all__'`로 가져오면, models.py를 수정하면 된다.

     `models.py`

     ```python
     class Board(models.Model):
         title = models.CharField(max_length=10)
         content = models.TextField()
         # editable = False를 수정하면 된다.
         hit = models.IntegerField(default=0, editable=False)
     ```

     

     

2. `forms.py`

   ```python
   from django import forms
   from .models import Board
   
   # modelform
   class BoardForm(forms.ModelForm):
       class Meta:
           model = Board
           fields = ['title', 'content']
           widgets = {'title' : forms.TextInput(attrs={
                                               'placeholder' : '제목을 입력해주세요.',
                                               'class' : 'title'}),
                       'content' : forms.Textarea(attrs={
                                               'placeholder' : '내용을 입력해주세요.',
                                               'class' : 'content'})
                       }
           error_messages = {'title' : {
                                       'required' : '제목을 반드시 입력해주세요.'
                                       },
                               'content' : {
                                   'required' : '내용을 반드시 입력해주세요.'
                                       }
                           }
   ```

   

3. `views.py`의 create 수정

   ```python
   def create(request):
       if request.method == 'POST':
           board_form = BoardForm(request.POST)
           if board_form.is_valid():
               # title = board_form.cleaned_data.get('title')
               # content = board_form.cleaned_data.get('content')
               # board = Board(title=title, content=content)
               # board.save()
               
               # 위의 4줄이 아래 한줄과 동일한 기능
               board = board_form.save()
               return redirect(board)
       else:
           board_form = BoardForm()
       context = {'board_form' : board_form}
       return render(request, 'boards/form.html', context)
   ```

   

4. `views.py`의 update 수정

   ```python
   def update(request, board_pk):
       # 1. board_pk에 해당하는 오브젝트를 가져온다.
       #   - 없으면, 404 에러
       #   - 있으면, board = Board.objects.get(pk=board_pk)와 동일
       board = get_object_or_404(Board, pk=board_pk)
       
       # 2. POST 요청이면 (사용자가 form을 통해 데이터를 보내 준 것.)
       if request.method == 'POST':
           # 사용자 입력 값(request.POST)을 BoardForm에 전달해주고,
           board_form = BoardForm(request.POST, instance=board)
           # 그 값을 검증한다.(유효성 체크)
           if board_form.is_valid():
               # board.title = board_form.cleaned_data.get('title')
               # board.content = board_form.cleaned_data.get('content')
               # board.save()
               board = board_form.save()
               return redirect(board)
       # 2-2. GET 요청이면, (수정하기 버튼을 눌렀을 때)
       else:
           # BoardForm을 초기화(사용자 입력값을 넣어준 상태)
           board_form = BoardForm(instance=board)
           # board_form = BoardForm(initial={'title' : board.title, 'content' : board.content})
       # context에 담겨있는 board_form은 두 가지 상황이 있다.
       # 1 - POST 요청에서 검증에 실패하였을 때, 오류 메세지가 포함된 상태
       # 2 - GET 요청에서 초기화 된 상태
       context = {'board_form' : board_form}
       return render(request, 'boards/form.html', context)
       
       
   ```

5. `form.html` 분기 나누기

   ```django
   {% extends 'boards/base.html' %}
   {% block body %}
   {% if request.resolver_match.url_name == 'create' %}
       <h1>글 생성</h1>
   {% else %}
       <h1>글 수정</h1>
   {% endif %}
   <form method="POST">
       {% csrf_token %}
       {{ board_form.as_p }}
       <input type="submit">
   </form>
   {% endblock %}
   ```

   url_name에 'create'가 존재하면, 글 생성. 아니면 글 수정이라는 내용을 입력

6. `forms.py`

   ```python
   from django import forms
   from .models import Board
   from crispy_forms.helper import FormHelper
   from crispy_forms.layout import Submit
   
   # modelform
   class BoardForm(forms.ModelForm):
       class Meta:
   		...
   
   
       def __init__(self, *args, **kwargs):
           super().__init__(*args, **kwargs)
           self.helper = FormHelper()
           self.helper.form_method = 'POST'
           self.helper.add_input(Submit('submit', '제출~!'))
           
   ```

   

