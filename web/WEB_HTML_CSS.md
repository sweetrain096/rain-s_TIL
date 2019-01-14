# WEB

인터넷에 연결된 컴퓨터들을 통해 사람들이 정보를 공유할 수 있는 전 세계적인 정보공간.



요청(request)과 응답(response)을 하여 필요한 정보를 받아올 수 있다.

클라이언트가 요청을 하고, 서버에서 응답을 해준 것을 받아온다.



url을 통해 요청을 하고, html 문서 한장을 받게된다. 동영상 등은 동영상이 있는 링크가 연결된 것 뿐이다.





IP :



8비트(0~255)까지의 숫자로 구성된 숫자의 집합



도메인

google.com

네트워크상의 컴퓨터를 식별하는 호스트명



URL

도메인

자원이 어디에 있는지 알려주기 위한 고유 규약

https://www.google.co.kr/search?q=구글





# html

hyper text markup languge

hyper text :

여러 위치의 문서들이 연결된 문서들.

하이퍼텍스트를 주고받는 규칙 : http(hyper text transfer protocol)



W3C - 웹 표준

HTML & CSS



HTML파일 : HTML로 작성된 파일



## 문서의 기본 구조 

### 사용하는 문서의 종류 선언부

### html요소

html 여는 부분과 닫는 부분까지

그 안에 head와 body가 구성



head = 문서의 제목, 인코딩 내용 등(문서의 정보를 갖고있다.) 브라우저에는 나타나지 않는다.

메타태그 : head 안에 존재. url에서 간단하게 보여줄 수 있는 정보가 들어있다. ex) 카톡에 링크를 보낼 경우 뜨는 이미지나 설명.



body = 



## Tag와 DOM TREE

### 요소(Element)

#### <여는(시작) 태그> 웹문서 내용 </닫는(종료)태그>

소문자로 작성하는것이 약속



#### 닫는 태그가 없는 태그도 존재한다.(내용이 필요없는 태그)

ex) 이미지 같은 경우 or 엔터나 줄을 긋는 태그 등

<img src="url"/>





#### 태그에는 속성 지정 가능

<a href="google.com"/>

속성명 "속성값"

id, class, style은 태그와 상관없이 모두 사용 가능.



#### DOM 트리

태그는 중첩되어 사용 가능하며, 이때 다음과 같은 관계를 갖는다.

body 태그와 h1 태그는 부모(parent)-자식(child)관계

같은 라인에 있는 태그는 형제 관계(sibling)(h1 & ul) (li & li)

```html
<body>
    
    <h1>
        웹문서
    </h1>
    <ul>
        <li>문서내용</li>
        <li>문서내용2</li>
    </ul>
</body>
```





#### 시맨틱태그

컨텐츠의 의미를 설명하는 태그로서 HTML5에 새롭게 추가된 시맨틱태그가 있다.

개발자 및 사용자 뿐만 아니라 검색엔진등에 ㅇ의미있는 정보의 그룹을 태그로 표현하여 단순히 보여주기 위한 것을 넘어서 __의미를 가지는 태그들을 활용__하기 위한 노력





header : gpej

nav : 내비게이션

aside : 사이드에 위치한 공간, 메인 콘텐츠와 관련성이 적은 콘텐츠에 사용

section 문서의 일반적인 구분으로 컨텐츠의 그룹을 표현하며 일반적으로 h1~h6를 가짐

article : 문서, 페이지, 사이트 안에서 독립적으로 구분되는 영역

footer 푸터 : 문서나 섹션의 하단에 존재







## html 파일 만들기

### index.html

: readme.md와 같이 맨 처음에 나타나는 화면



### 기본구조

html:5 엔터 치면 기본 구조 생성가능.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

```



<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta http-equiv="X-UA-Compatible" content="ie=edge">

​    <title>Document</title>

</head>

<body>

​    

</body>

</html>



### head

실제 화면에는 표시되지 않고, 상태나 정보를 제공.

```html
<head>
    <meta charset="utf-8">
    <title>HTML연습</title>
    <style>
        body {
            height: 10000px
        }
        table, tr, td{
            border: 1px solid darkgreen;
        }
    </style>
</head>
```



<head>

        <meta charset="utf-8">

​        <title>HTML연습</title>

        <style>

​        </style>

</head>



title : 맨위 상태표시창? 에 뜨는 내용



### body

```html
<!-- 여기는 주석입니다. -->
<h1 id="heading">heading1</h1>
<h2>2</h2>
<h6>6</h6>
<!-- lorem 엔터 치면 아무말이나 입력됨 -->
<!-- p태그는 문단을 나타낼 때 사용 -->
<p><b>Lorem ipsum</b> dolor sit amet consectetur adipisicing elit. Fuga reiciendis velit quis doloremque iusto porro veritatis repellendus omnis officia architecto quaerat exercitationem in ipsam at quia quam, rerum, quidem sint.</p>
<!-- br 태그는 엔터(줄바꿈) -->
<!-- hr 태그는 한줄-->
<br>
<hr>
<p>위에 작성한 것은 <strong>Lorem Ipsum</strong>으로 임의의 문자열을 나타냅니다.</p>

```

out

# heading1

## 2

###### 6

**Lorem ipsum** dolor sit amet consectetur adipisicing elit. Fuga reiciendis velit quis doloremque iusto porro veritatis repellendus omnis officia architecto quaerat exercitationem in ipsam at quia quam, rerum, quidem sint.

------

위에 작성한 것은 **Lorem Ipsum**으로 임의의 문자열을 나타냅니다.



```html
<strong> strong 태그와 b태그는 굵은 글씨체 다만, strong이 더 시맨틱한 의미를 가진다.</strong><br>
<em>이탤릭체도 작성 가능 : em태그.</em>
<i>i로도 작성 가능하다. 다만, em이 시맨틱한 의미를 가진다.</i>
<p><del>del로 취소선을 나타낸다.</del></p>
<p><mark>mark로 하이라이팅</mark>도 가능하다.</p>
<p>log<sub>10</sub>10</p>
<p>2<sup>3</sup></p>
<p>sub는 아래첨자, sup은 위첨자로 들어간다.</p>
<p>아                          아!!</p>
<p>아&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아!!</p>
<p>html 에서는 띄어쓰기가 기본 한칸이다.</p>
```

out

![1547442538533](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547442538533.png)



```html
<pre>
            이곳에서는 띄어쓰기나 줄바꿈이 자동으로 된다.
            import random
            random.sample(range(1, 46), 6)
            띄     어      쓰      기     
</pre>
<q id="q">안녕하세요, 인용문입니다. 짧을 때 사용해요. q태그입니다.</q>

<blockquote>인용문이지만 긴 문장입니다.
    들여쓰기가 기본적으로 적용됩니다.
    typora에서 > 와 같이 사용합니다.
</blockquote>
```

![1547442597903](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547442597903.png)



### 리스트 제작



```html
<ul>
    <li> 순서가 없습니다.</li>
    <li style="list-style-type: square"> 이재찬 </li>
    <li> 박성민 </li>
</ul>

<ol>
    <li>1교시</li>
    <li>2교시</li>
    <li>3교시</li>
    <li>4교시</li>
    <li>5교시</li>
    <li>li태그이름에*6하면 한번에 6개 생기지롱롱롱</li>
    <p>ctrl + alt를 누르고 원하는 위치에서 커서를 내리면 한번에 입력 가능</p>
</ol>
<!--reversed-->
<ol reversed>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ol>
<!--시작 정하기 start="", type="a"-->
<ol start="2">
    <li>1</li>
    <li value="10">2</li>
    <li>3</li>
</ol>
<!-- ul>li*3 아래와 같이 생긴다-->
<!-- emmet 기능 -->
<ul>
    <li>사과</li>
    <li>바나나</li>
    <li>청포도 먹고싶다</li>
</ul>
```

![1547442659857](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547442659857.png)



### 링크연결

```html
 <a href="https://google.com" target="_blank" id="a">새 창에서 구글로 가기</a>
<a href="https://google.com" target="_self">여기에서 구글로 가기(디폴트값)</a>
<a href="#heading">상단으로 가기</a>
<a href="#q">인용문으로 가기</a>
<a href="hello.html" target="_blank">hello, world!</a>
<a href="templates/test.html">test</a>
<a href="mailto:t@t.t">메일보내기</a>
```

out

[새 창에서 구글로 가기](https://google.com) [여기에서 구글로 가기(디폴트값)](https://google.com) [상단으로 가기](#heading) [인용문으로 가기](#q) [hello, world!](hello.html) [test](templates/test.html) [메일보내기](mailto:t@t.t)



### 테이블

```html
<head>
    <style>
        table, tr, td{
            border: 1px solid darkgreen;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <th colspan="2">표실습</th>
            <!-- <th>숫자</th> -->
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>

        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
        </tr>
        <tr>
            <td colspan="2">1</td>

        </tr>
        <tr>
            <td rowspan="2">1</td>
            <td>2</td>
        </tr>
        <tr>
            <td>2</td>
        </tr>
    </table>
</body>
```

![1547442779174](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547442779174.png)



### form 제작

```html
일반텍스트 : <input name="username" type="text" placeholder="이름을 입력해주세요" autofocus><br>
이메일 : <input type="email" placeholder="이메일을 입력해주세요" autocomplete="email"><br>
비밀번호 : <input type="password" placeholder="비밀번호를 입력해주세요"><br>
날짜 : <input type="date">
<input type="hidden" name="hidden" value="비밀~">
<input type="submit" value="전송~"><br>
```

![1547449830643](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547449830643.png)



```html
<!-- radio button -->
<input type="radio" name="gender" value="male"> 남자
<input type="radio" name="gender" value="female" checked> 여자<br>
<br>
<!-- check box -->
<input type="checkbox" name="option" value="1">SIA<br>
<input type="checkbox" name="option" value="2">QUEEN<br>
<input type="checkbox" name="option" value="3">hihi<br>
<!--dropdown-->
<br>
<select name="country">
    <option value="korea">한국</option>
    <option value="japan" disabled>일본</option>
    <option value="china" selected>중국</option>
</select>
<br>
<input name="number" type="range" min="0" max="100" step="10">!
```

![1547449979644](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547449979644.png)

### url으로 넘기기

```html
<form action="https://google.com/search">
    검색어 : <input name="q"><br>
    <input type="submit" value="구글검색">
</form>
```

![1547450035689](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547450035689.png)



### youtube 동영상 및 노래 자동재생

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/vlLSyc9dx1g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="30%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/551801490&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>

```

![1547450116650](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547450116650.png)



#### 유튜브 : 동영상-> 공유-> 퍼가기

#### [사운드클라우드](https://soundcloud.com/) : 음악 -> 공유 -> Embed -> Enable automatic play







list style type : https://www.w3schools.com/cssref/pr_list-style-type.asp



mdn 웹기술: https://developer.mozilla.org/ko/







# CSS





















[web developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=ko)

: css 사용한 것을 지워서 보여줄 수 있다.



















