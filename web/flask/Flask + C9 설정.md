# [Flask](http://flask.pocoo.org/) + C9 설정

## 1. c9 설정하기 (파이썬 버전관리)

https://zzu.li/c9

### 파이썬 버전관리

C9 하나의 프로젝트에서 사용.

```
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc

source ~/.bashrc
pyenv install 3.6.7
pyenv global 3.6.7
python -V
pip install --upgrade pip
```

배쉬창(터미널)에 파이썬 버전 여러개 중 하나 설정해서 사용하기

2번줄 : pyenv path 설정

3번줄 : path 설정 한 것 알아서 불러오기 설정



다 하게되면 python 버전이 3.6.7로 설치된다.



### virtual env 가상환경 생성

설치

```
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
exec "$SHELL"
```



사용

```
pyenv virtualenv 3.6.7 flask-venv
pyenv local flask-venv
```

사용이 되면 앞에 (flask-venv)가 입력되어있다.





### flask 설치

: 요청과 응답을 처리해준다.

: 사용자로부터 정보를받거나보내는 과정

: variable routing : url 안에 내가 사용할 정보를 넣어서 보내는 것. (개발자가 편하기 위해)

:

```
pip install flask
```



```
pip freeze > req.txt
```

req.txt 파일이 생성된다.

```
<req.txt>


Click==7.0
Flask==1.0.2
itsdangerous==1.1.0
Jinja2==2.10
MarkupSafe==1.1.0
Werkzeug==0.14.1
```

사용하고 있는 버전 리스트 저장





## 2. 사용하기

모든 경우, 

### 1. @filename.route("가야할 경로")

### 2. def 안에서 정보 전달.

### 3. return 으로 (render_template으로 전달)

### 4. html에서 사용할 input값 전송(action)

### 5. action으로 전달된 route 새로 생성 및 정보 획득

### 6. return으로 정보 전달









```python
# app.py

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "hello, 안녕하세요."
```

저장 후 배쉬창에

```
flask run -h $IP -p $PORT
```

입력하면 http://0.0.0.0:8080/ 주소가 배쉬창에 뜨고 누르면 작성한 창이 뜨게된다.

이 부분을 매번 입력해주기 힘들기 때문에, 



```python
# app.py 
if __name__ == "__main__":
    app.run(host='0.0.0.0', port='8080', debug=True)
```

부분 하단에 뒤 코드를 입력해준다.





### ex)

```python
# a.py

def greeting():
    print('a.py')
    print(__name__)
    
if __name__ == "__main__":
    print(__name__)
    greeting()
    print('직접 실행 됨.')
else:
    print("a.py가 import 되어 실행됨.")
```



```python
# b.py

import a
a.greeting()
```



ouput

```
(flask-venv) sweetrain:~/workspace $ python a.py
__main__
a.py
__main__
직접 실행 됨.
(flask-venv) sweetrain:~/workspace $ python b.py
a.py가 import 되어 실행됨.
a.py
a
```



#### 실제로 실행 될 때 main파일이 되며, import 되어 불러와질 때에는 main이 아니게 된다



#### return은 str만으로만 됩니다!!!!!!.



### 주소창에서 str, int 등 읽어오기(variable routing)



```python
@app.route("/hi/<string:name>")
def greeting(name):
    return f"{name}아 안녕~~"
```

def greeting(네임 이름이 들어가야해요):

​	return name 

()가 비어있으면 이름공간안에 이름이 없어서 사용을 할 수 없다.



```python
# 세제곱의 결과를 출력해보자!
@app.route("/cube/<int:number>")
def tri(number):
    return f"{number}의 세 제곱은 {number**3} 입니다!"
```





### index.html 등 새로운 창으로 리턴하기

```html
<!--templates/index.html-->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>안녕안녕~~</h1>
</body>
</html>
```



```python
@app.route('/')
def hello():
    return render_template('index.html')
```






## 3. 반복문, 조건문 활용


```html
<!--templates/greeting.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <!--jinja2 템플릿 엔진을 사용하고 있음.-->
    {% if html_name == "단비" %}
        <h2>{{html_name}} 왔니?</h2>
    {% else %}
        <h2>{{html_name}}님 오셨습니까??</h2>
    {% endif %}
</body>
</html>
```



    {% if html_name == "단비" %}
        <h2>{{html_name}} 왔니?</h2>
    {% else %}
        <h2>{{html_name}}님 오셨습니까??</h2>
    {% endif %}

​    꼭 endif로 닫아야만 합니다!!! 확인할 수 있는 부분이 없기 때문에 endif로 끝난것을 확인해요

+ **주석처리 할 때에는 %를 #으로 바꿔서 앞뒤로 막는다!!**



+ variable routing

```python
@app.route("/hi/<string:name>")
def greeting(name='홍길동'):
    return render_template('greeting.html', html_name=name)

```



in :

http://hello-flask-danbi-sweetrain.c9users.io:8080/hi/단비단비

out :

## 단비단비님 오셨습니까??



in :

http://hello-flask-danbi-sweetrain.c9users.io:8080/hi/단비

out :

## 단비 왔니?





## 4. base.html

+ base.html을 만들어서 다른 페이지에서 공통적으로 나타나는 부분을 하나로 묶는다.

+ base.html

  ```html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>{% block title %}{% endblock %}</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">Main</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
      
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                      <a class="nav-link" href="/movies">영화 목록 <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/movies/new">영화 등록</a>
                  </li>
  
                  <li class="nav-item">
                      <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                  </li>
              </ul>
              <form action="/movies" class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
          </div>
      </nav>
      
      {% with messages = get_flashed_messages(with_categories=true) %}
          {% if messages %}
              {% for category, message in messages %}
              <div class="alert alert-{{category}}" role="alert">
                    {{ message }}
              </div>
              {% endfor %}
          {% endif %}
      {% endwith %}
      <div class="comtainer mt-5">
      
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

+ 적용되는 페이지

+ index.html

  ```html
  {% extends "base.html" %}
  {% block title %}영화 목록{% endblock %}
  
  
  {% block body %}
      <h1> 영화 목록</h1>
      <h2 class="mt-5 mb-5"><a href="/movies/new">새 영화 등록</a></h2>
      
      <ul>
          {% for movie in movies %}
              <p><a href="/movies/{{movie.id}}">{{movie.title}} ({{movie.title_en}}) : {{movie.score}}</a></p>
              <hr>
          {% endfor %}
      </ul>
  {% endblock %}
  ```

  + `{% extends "base.html" %}`을 사용하여 base.html 파일을 읽는다.
  + `{% block title %}영화 목록{% endblock %}`을  base.html 파일의 `{% block title %}`과 `{% endblock %}` 사이에 넣는다.



### 영화 추천 목록 만들기

```html
<!--movie.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <h1>영화목록</h1>
        <ul>
            {% for movie in movies %}
                <li>{{movie}}</li>
            {% endfor %}
        </ul>
        
        <div class="row">
            {% for movie in movies %}
                <div class="col-sm-6 col-md-4 my-3">
                    <div class="card" >
                        <img class="card-img-top" src="https://picsum.photos/200/300/?random" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{movie}}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            {% endfor %}
        </div>
        
            
           

    </div>
    
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
</body>
</html>
```



```python
@app.route("/movie")
def movie():
    movies = ["말모이", "극한직업", "국가부도의 날"]
    return render_template("movie.html", movies=movies)
```

![c9_1](https://github.com/sweetrain096/rain-s_TIL/blob/master/img/c9_1.PNG?raw=true)





### html form 만들기

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="https://search.naver.com/search.naver">
        <input type="text" name="query">
        <input type="submit" value="네이버로 검색!">
    </form>
</body>
</html>
```



body 사이에 form 을 생성한 후, 어디에 검색할 지, form 에서 입력받는 정보를 보낼 action부분에 주소 작성.

text로 받을 자료의 이름을 정해주어야 그 이름으로 url 주소에 넘어가며, type submit을 해야지만 넘어간다.





### 사용자에게 정보 받고 출력하기

+ 정보를 받는 페이지(route) 1개, 정보를 보여주는 페이지(route) 1개 총 2개가 필요

```python
# app.py


from flask import Flask, render_template, request




# 정보를 받는 페이지 1개, 받은 정보를 보여주는 페이지 1개 총 2개가 필요하다!
@app.route("/ping")
def ping():
    return render_template("ping.html")
    
    
@app.route("/pong")
def pong():
    name = request.args.get("name")
    msg = request.args.get("msg")
    return render_template("pong.html", name=name, msg=msg)
```



```html
<!--ping.html-->
<form action="/pong">
    <input type="text" name="name">
    <input type="text" name="msg">
    <input type="submit">
</form>
```



```html
<!--pong.html-->
<h1>{{name}}!!!</h1>
<h2>메세지입니다 {{msg}}</h2>
```



실행 순서

1. app.route("/ping")
2. ping.html 에서 name, msg 입력받음
3. app.route("/pong")
4. name에는 ping에서 받아온 name 의 밸류를 msg에는 ping 에서 받아온 msg의 밸류를 입력
5. return시 오른쪽 name과 msg가 ping.html에서 받아온 것이고, 왼쪽 내용이 pong.html로 전달될 것.
6. pong.html에서 name과 msg 출력





## 4. csv 생성 및 읽기, redirect



```python
# app.py
import csv

@app.route("/timeline")
def timeline():
    # 지금까지 기록되어있는방명록들('timeline2.csv')을 보여주자!
    with open("timeline2.csv", "r", encoding="utf-8", newline="") as f:
        read = csv.DictReader(f)
        timelines = []
        for row in read:
            timelines.append([row["username"]])
            timelines[-1].append(row["message"])

    
    return render_template('timeline.html',timelines=timelines)
    
    
@app.route("/timeline/create")
def timeline_create():
    username = request.args.get("username")
    message = request.args.get("message")
    
    with open("timeline2.csv", "a", encoding="utf-8", newline="") as f:
        write = csv.DictWriter(f, fieldnames=['username', 'message'])
        write.writerow({
            'username' : username,
            'message' : message
        })
        

    return redirect('/timeline')
```





```html
<!--timeline.html-->

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
    <form action="/timeline/create">
        <input type="text" name="username">
        <input type="text" name="message">
        <input type="submit" value="전송!">
        
    </form>
    
    <ul>
        {% for timeline in timelines %}
            <li>{{timeline[0]}} : {{timeline[1]}}</li>
        {% endfor %}
    </ul>
</body>
</html>
```



```html
<!--timeline_create.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul>
        <li>{{username}} : {{message}}</li>
        
    </ul>
</body>
</html>
```





## [HTTP 정보 전달 (get, post)](https://developer.mozilla.org/ko/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)

### get

+ 정보가 주소창에 사용된다. 민감한 정보가 url에 공개될 수 있음.
+ 정보를 요청받아서 전달



### post

+ 정보를 서버로 보낼 때 사용. 
+ 정보가 url에 남지 않는다.



+ app.py

  ```python
  app.secret_key = "qhshqhshqksksk"
  @app.route("/users/create", methods=["POST"])
  def create_user():
      username = request.form.get("username")     # name
      email = request.form.get("email")           # email
      user = User(username=username, email=email)     # 인스턴스
      db.session.add(user)
      db.session.commit()
      return render_template("create.html", username=user.username, email=user.email)
  ```

+ new.html

  ```python
      <form action="/users/create", method="POST">
          username : <input type="text" name="username"> <br>
          emali : <input type="email" name="email"> <br>
          <input type="submit" value="회원가입!">
      </form>
  ```

  







## requests & bs4

```
pip install requests
pip install bs4
```

