# ORM(flask-sqlalchemy)

ORM(object-relationa-mapping) : 객체 조작만으로  DB에 접근(반영)한다.

파이썬 코드를 통해서 클래스 조작하는 것 처럼 db 조작

DB 종속성이 사라져서 유지 보수가 가능함.

플라스크 파이썬 코드를 사용하여 db 조작



flask에서 사용하는 ORM

[flask sqlalchemy](http://flask-sqlalchemy.pocoo.org/2.3/)-> [quickstart](http://flask-sqlalchemy.pocoo.org/2.3/quickstart/)

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_flask.sqlite3'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
```





+ sql 터미널 탈출 : ctrl + d





## 1. 기본 설정

1) bash

```bash
$ pip install flask_sqlalchemy flask_migrate
```



2) app.py 생성(터미널)

```
touch app.py
```



```python
# app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# 편하게 사용하기 위함

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_flask.sqlite3'
db = SQLAlchemy(app)		# db 설정(sqlalchemy라는 오브젝트 생성)

migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
```



위에서 두번째, 세번째  생성하기위해

```
pip install flask_sqlalchemy flask_migrate
```

터미널에 입력해서 설치하기.





뜯어보기

```
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
```

```
column 3개. id는 int, primary key
username은 unique
```





## 2. flask db 설정

+ 초기 설정(`migration` 폴더 생성)

```bash
$ flask db init
```

입력하게되면 폴더에 migrations 폴더가 생성된다.



+ migration 파일 생성

```bash
$ flask db migrate
```

+ db 반영

```bash
$ flask db upgrade
```

입력하게 되면 db_flask.sqlite3라는 이름으로 생성. (app.py의 app.config 이름과 같게 생성.)





## 3. 사용하기

1. Create

   ```python
   # user 인스턴스 생성
   user = User(username="단비", email="danbi@gmail.com")
   # db.session.add 명령어를 통해 추가
   # INSERT INTO user (username, email)
   # VALUES ("단비", "danbi@gmail.com");
   # 위 두줄과 동일
   db.session.add(user)
   # db에 반영
   db.session.commit()
   ```

2. READ

   ```python
   # SELECT * FROM user;
   users = User.query.all()
   # get 메소드는 primary key로 지정된 값을 통해 가져온다.
   user = User.query.get(primary Key)
   # 특정 컬럼의 값을 가진 것을 가져오려면 다음과 같이 쓴다. (where문 붙어있는것)
   user = User.query.filter_by(username="단비").all()		# 모두
   user = User.query.filter_by(username="단비").first()		# 맨 처음 하나만(limit)
   ```


3. UPDATE

   ```python
   user = User.query.get(1)
   user.username = "홍길동"
   db.session.commit()
   ```

4. DELETE

   ```python
   user = User.query.get(1)
   db.session.delete(user)
   db.session.commit()
   ```










터미널에 입력

```
sqlite3 db_flask.sqlite3 (만든 이름)
.tables
.schema user
```

입력하게 되면 



새로운 터미널 만들기

```
python
from app import *
User
```

위 터미널 이어서

```
>>> User
<class 'app.User'>
>>> user = User(username="단비", email="sweetrain96@gmail.com")
>>> user
<User '단비'>
>>> db.session.add(user)
>>> db.session.commit()
```

까지 입력하게되면



sqlite3 터미널에서

```
sqlite> SELECT * FROM user;
```

output

```
1|단비|sweetrain96@gmail.com
```



db에 값이 들어가게 된다.



### 순서대로 따라하기! 정리

1) app.py

```python
import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# 편하게 사용하기 위함

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_flask.sqlite3'
db = SQLAlchemy(app)

migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.String(80), nullable=False)
    
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.created_at = datetime.datetime.now().strftime("%D")
        

    def __repr__(self):
        # return '<User %r>' % self.username
        return f"{self.id}: {self.username}"
        
       
```



2) python  터미널 열기

```python
$ python
```



3) python 터미널에서 app.py 모두 불러오기 (메소드(클래스))

```
from app import *
```



4) python 터미널에서 새로운 인스턴스 생성

```
user = User("단비", "han@gmail.com")
```



5) python 터미널에서  add, commit(sql에서는 insert )

```
db.session.add(user)
db.session.commit()
```

이 부분이 되지 않으면 sql 터미널에서 select로 보려고 해도 저장되지 않아서 볼 수 없다.



6) 새로운 터미널에서 sqlite 터미널 열기

```
sqlite3 db_flask.sqlite3 (뒤에는 내가 만든 sqlite3파일 이름)
```



7) sqlite 터미널에서 저장된 것 확인하기

```
SELECT * FROM user;
```



8) 결과보기

output

```
1|단비|han@gmail.com|02/07/19
```



9) 다시 python 터미널에서

```
users = User.query.all()
```



10) user 확인

```
users
```

[1: 단비, 2: 시환]



11)

```
>>> type(users)
<class 'list'>
>>> users[0]
1: 단비
>>> users[0].username
'단비'
>>> users[0].email
'han@gmail.com'
>>> users[0].created_at
'02/07/19'
```



12) user 필터

```
User.query.filter_by(username="단비").all()
```

[1: 단비]



13) but primary key를 가져올때는 get명령어만 쓰면 된다.

```
>>> User.query.get(1)
1: 단비
>>> User.query.get(2)
2: 시환
```



14) python 터미널에서 db 하나 삭제?(인스턴스변수 이름으로 삭제한다.)

```
>>> db.session.delete(user)	# user는 생성된 인스턴스 변수이다. user2를 넣으면 시환이 삭제됨
>>> db.session.commit()
>>> users = User.query.all()
>>> users
[2: 시환]
```



15) python 터미널에서 db 수정

```
>>> u1 = User.query.get(2)
>>> u1
2: 시환
>>> u1.username = "단비"
>>> db.session.commit()
```









## migrations

### versions

app.py 가 수정된 후 

ex) 전

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
```



ex) 후

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(30))
```



새로운 터미널에 

```
flask db migrate
flask db upgrade
```

입력하게 되면 versions에 새로운 버전이 생성된다.



이후 터미널에

```
sqlite3 db_flask.sqlite3
.schema user
```

입력하게 되면 추가된다.







## app.py flask

```python
@app.route("/")
def index():
    users = User.query.all()        
    # type(users) : list
    # list element : user 인스턴스
    return render_template('index.html', users=users)
```



```html
<!--index.html-->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>회원 명부</title>
</head>
<body>
    <h1>회원 명부</h1>
    
    <ul>
    {% for user in users %}
            <p>{{user.id}} : {{user.username}}</p>
            <p>{{user.email}}</p>
            <a href="/users/read/{{user.id}}">상세보기</a>
            <a href="/users/delete/{{user.id}}">삭제하기</a>
            <a href="/users/edit/{{user.id}}">수정하기</a>
            <hr>
    
    {% endfor %}
    </ul>
</body> 
</html>
```

+ variable routing 으로 정보를 보낼 때 이러한 식으로 정보를 보낸다.

```html
            <a href="/users/read/{{user.id}}">상세보기</a>
            <a href="/users/delete/{{user.id}}">삭제하기</a>
            <a href="/users/edit/{{user.id}}">수정하기</a>
```



app.py

+ variable routing 으로 정보를 받는다. 양 꺾쇠 사이에 type:변수명

```python
@app.route("/users/read/<int:id>")
def read_user(id):
    user = User.query.get(id)
    return render_template("read.html", user=user)
```





## GET &  POST

+ get: app.py

```python
@app.route("/users/create", methods=["POST"])
def create_user():
    username = request.args.get("username")     # hi
    email = request.args.get("email")           # hi@naver.com
    user = User(username=username, email=email)     # 인스턴스
    db.session.add(user)
    db.session.commit()
    return render_template("create.html", username=user.username, email=user.email)
    
```

url에 정보가 남는다.







+ post: app.py

```python
# app.py 위쪽에
app.secret_key = "qhshqhshqksksk"
# 이런식으로 secret_key 입력


@app.route("/users/create", methods=["POST"])
def create_user():
    username = request.form.get("username")     # hi
    email = request.form.get("email")           # hi@naver.com
    user = User(username=username, email=email)     # 인스턴스
    db.session.add(user)
    db.session.commit()
    return render_template("create.html", username=user.username, email=user.email)
```

url에 정보가 남지 않는다.

+ post : new.html

```html
{% extends 'base.html' %}
{% block title %}
회원가입 폼
{% endblock %}
{% block body %}
    <!--기본은 method가 get-->
    <form action="/users/create", method="POST">
        username : <input type="text" name="username"> <br>
        emali : <input type="email" name="email"> <br>
        <input type="submit" value="회원가입!">
    </form>
{% endblock %}
```









+ create.thml

```html
<h2>{{username}}</h2>
<h2>{{email}}</h2>
```





## html의 모듈화

base.html

```html
<!--base.html-->
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
        {% block body %}
        {% endblock %}
    
    </div>


    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
</body>

</html>

```



    <title>{% block title %}{% endblock %}</title>
    (중략)
    	{% block body %}
        {% endblock %}


new.html

```html
<!--new.html-->

{% extends 'base.html' %}
{% block title %}
회원가입 폼
{% endblock %}
{% block body %}
    <!--기본은 method가 get-->
    <form action="/users/create", method="POST">
        username : <input type="text" name="username"> <br>
        emali : <input type="email" name="email"> <br>
        <input type="submit" value="회원가입!">
    </form>
{% endblock %}

```



`{% extends 'base.html' %}` : base.html 파일을 읽어온다.

`{% block title %}` : base.html 파일에서 {% block title %}이 있는 부분에서 걸리면 new.html파일의 {% block title %}의 아래 내용이 `{% endblock %}` 이 나오기 전 내용까지 들어간다.



`{% block body %}` : base.html 파일에서 {% block body %}이 있는 부분이 걸리면 new.html 파일의 {% block body %} 아래 내용이 `{% endblock %}` 이 나오기 전 내용까지 들어간다.











### 암호화

```bash
$ pip install werkzeug
$ python

```



```python
from werkzeug.security import generate_password_hash, check_password_hash
a = "hihi"
# 암호화
hash = generate_password_hash(a)
print(hash)
```

output :

'pbkdf2:sha256:50000$AipaA87v$091ae3b81d4fe3693abf0b75ba1e5babb6f0604429b2938ad1bb45e647f63a9f'

```bash
>>> check_password_hash("hihi", a)
False
>>> check_password_hash("hihi", hash)
False
>>> check_password_hash(hash, "hihi")
True
```

