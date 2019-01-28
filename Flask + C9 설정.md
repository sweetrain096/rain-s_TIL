# [Flask](http://flask.pocoo.org/) + C9 설정

## 1. 설정하기 (파이썬 버전관리)

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



### 주소창에서 str, int 등 읽어오기



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
​    
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

![c9_1](C:\Users\student\Desktop\TIL\c9_1.PNG)





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













## requests & bs4

```
pip install requests
pip install bs4
```

