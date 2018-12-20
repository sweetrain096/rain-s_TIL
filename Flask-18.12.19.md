# Flask



[flask 공식 홈페이지](http://flask.pocoo.org/)

#### flask를 사용하는 이유?

: 언듯 보기에는 html과 크게 다를바가 없어 보이지만, **flask에서는 python에서 사용하는 여러 코드들이 들어 갈 수 있다.** 3번 오늘이 크리스마스일까? 부분만 보아도 서버를 생성하고  오늘의 날짜를 받아 조건문을 동작시킬 수 있다.



## 1. flask 설치하기

git bash에서 설치

```powershell
$ pip install flask
```



## 2. 시작하기

```python
#hello.py 
from flask import Flask #모듈 불러오기

app = Flask(__name__)   #flask 만들기

# "/" : 루트디렉토리를 뜻하며, www.naver.com
@app.route("/")     #경로 설정
def hello():
    return "Hello World!"

@app.route("/ssafy")     #경로 설정
def ssafy():
    return "ssafy중입니다~!"
```

서버 실행하기 :

```powershell
 $ FLASK_APP=hello.py flask run
 * Serving Flask app "hello.py"
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)

```

크롬으로 `http://localhost:5000`, `http://192.0.0.1:5000`을 열어본다

![1545197258829](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1545197258829.png)



#### 주의점!

bash 창이 돌아가고 있어야지만 서버가 생성된 것이다. ctrl+C를 눌러 종료하지 않게 주의하자!

## 3. 오늘이 크리스마스일까?

```python
from flask import Flask #모듈 불러오기
from datetime import datetime

app = Flask(__name__)   #flask 만들기

today = f"{datetime.today().month}.{datetime.today().day}"
print(today)
@app.route("/isitchristmas")
def christmas():
    if today == "12.25" :
        return "네!"
    else :
        return "아니오"
```

![1545197337581](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1545197337581.png)



## 4. Variable Routing

* url의 값들이 서버에서는 변수로 사용될 수 있다. 그 값을 가지고 와서 함수의 인자로 넘겨준다.

```python
from flask import Flask #모듈 불러오기
from datetime import datetime

app = Flask(__name__)   #flask 만들기

@app.route("/greeting/<string:name>")
def greeting(name):
    return f"{name} 안녕~"

@app.route("/cube/<int:num>")
def cube(num) :
    return f"{num**3}"
```

![1545198581902](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1545198581902.png)

![1545198598273](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1545198598273.png)

![1545198610548](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1545198610548.png)

## 5. flask render_template

* `render_template`을 활용하기 위해서는 `import`해줘야 한다.

html문서를 페이지에 연결시켜서 보여준다.

```python
#hello.py
from flask import Flask, render_template
app = Flask(__name__)   #flask 만들기

@app.route("/")     #경로 설정
def hello():
    return render_template("index.html")
@app.route("/dinner")
def dinner() :
    menus = ["치맥", "해물찜", "초밥"]
    menu = random.choice(menus)

    return render_template("dinner.html", menu=menu, dinner = menus)
    # 왼쪽글씨 :dinner.html에서 사용, 오른쪽 menu는 여기서 사용되는 변수
```

index.html

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>flask 프로젝트</title>
</head>
<body>
    <h1>Welcom!</h1>
    <a href = "/dinner">저녁 메뉴 추천받기</a>
</body>
</html>
```

![1545202555756](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1545202555756.png)

* `render_template`을 사용하면, html문서에서 python 조건문 및 반복문 사용 가능
* `jinja2` 라고 하는 템플릿 엔진을 활용하기 때문





``` python
@app.route('/denner')
def dinner() :
    menu = "엽떡"
    return render_template("dinner.html", menu=menu)
```



```python
#hello.py
from flask import Flask, render_template 
from datetime import datetime
import random

app = Flask(__name__)   #flask 만들기

@app.route("/")     #경로 설정
def hello():
    return render_template("index.html")

today = f"{datetime.today().month}.{datetime.today().day}"
print(today)
@app.route("/isitchristmas")
def christmas():
    if today == "12.25" :
        return "네!"
    else :
        return "아니오"

@app.route("/dinner")
def dinner() :
    menus = ["치맥", "해물찜", "초밥"]
    img_url = {
        "치맥" :"치맥 이미지 주소.확장자",
        "해물찜" : "해물찜 이미지 주소.확장자",
        "초밥" : "초밥 이미지 주소.확장자"
    }
    #주소를 가져온다.
    menu = random.choice(menus)
    menus_url = img_url[menu]
    return render_template("dinner.html", menu=menu, dinner = menus, menus_url = menus_url)
```



``` html
<!-- 출력을 하고 싶을 때 {{여기에 표현}} -->
<!-- 로직을 구현하고 싶을 때 {%여기에 구현%} -->

{{menu}}

{% if ____ %}
	<h1>True이면</h1>
	<h1>보인다</h1>
{% else %}
{% endif %}

{%for i in menus %}
	<p>{{i}}</p>
{% endfor %}
```

```html
<!-- dinner.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>{{menu}} 먹어!</h1>
    <img src = "{{menus_url}}">
    <!-- 이미지 출력 -->
    <!-- 출력을 하고 싶을 때 -->
    {% if menu == "초밥" %}
        <h2>오늘은 행복한날 ㅎㅎㅎㅎ</h2>
    {% else %}
        <h2>맛저합시당</h2>
    {% endif %}
    <!-- 로직을 구현하고 싶을 때 -->
    <hr>
    저녁 리스트는 이거였어.
    {% for food in dinner %}
        <p>{{food}}</p>
    {% endfor %}
    
</body>
</html>
```





## 6. 사용자로부터 정보 받기

사용자로부터 정보를 받기 위해서 HTML의 `form` 태그를 활용한다.

실제로 네이버/구글 등 모든 사이트에서 사용자(클라이언트)가 제출하는 내용들은 `<form>` 태그 안에 있다.



### 1. `<form>` 보여주는 페이지(메뉴 등록 페이지)

```python
#app.py
#flask run --host=$ip --port=$port
#flask run --host=0.0.0.0 --port=8080
@app.route("/menu/add")
def menu_add() :
    retrun rener_template("menu_add.html")
```

```html
<!-- templates/menu_add.html" -->
<form action = "/menu/create"> 
    메뉴를 입력하세요 : <input type = "text" name = "menu">
    <input type = "submit">
</form>
```

* form 태그 작성 시 반드시 중요한 것들!!
  - 1. 입력받을 `input` 태그
    2. 변수명 :  `input` 태그의 `name`
    3. 정보를 받아서 처리할 경로 : `form` 태그의 `action`

#### 검색할 때 웹페이지에 몇 번을 요청해야할까?

2번!

1번 : 검색창(입력창)을 요청

2번 : 



### 2. 정보를 받아서 처리할 경로(txt 파일에 저장)

```python
# "menu/creat"는 form 태그에서 action에 정의한 url
#flask run --host=$ip --port=$port
#flask run --host=0.0.0.0 --port=8080
from flask import request
@app.rout("/menu/create")
def menu_crate():
    # "menu"는 input 태그에서 name 에 정의한 내용
    request.args.get("menu")
    with open("menu.txt", "a") as file :
        file.write(menu)
    return f"{menu}가 등록되었습니다."

```



