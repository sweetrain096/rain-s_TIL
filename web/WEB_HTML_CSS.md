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



확장프로그램 



[web developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=ko)

: css 사용한 것을 지워서 보여줄 수 있다.







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



## [마크업(Markup)](https://brunch.co.kr/@coveryou/14)

'마크업'이란 어딘가에 Mark, 즉 표시를 해두는 것. 

**마크업 언어를 통해 구조적으로 표현이 가능**



**예 1)** 표시가 없을 때 

> 양말 노점 노하우 전수 30년 노점 장사를 통해 쌓은 노하우를 직접 전수해드립니다. 하루 매출 100만 원 보장! 대전 서구 XX카페 010-8XX2-XX21

**예 2) 표시가 있을 때**

> \- 제목: 양말 노점 노하우 전수
> \- 내용: 30년 노점 장사를 통해 쌓은 노하우를 직접 전수해드립니다. 하루 매출 100만 원 보장!
> \- 주소 및 연락처: 대전 서구 XX카페 010-8XX2-XX21

 **예 1)** 보다는 **예 2)가** 보기에 편함. 왜냐하면 제목이 어떤 것인지, 내용이 어떤 것인지. 단락 구분까지 되어있음.

**문서를 구조적으로 표시하기 위한 것이 마크업의 개념**.



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





## style 적용

1. inline 적용 : h나 p태그에 style=""로 적용

2. 내부참조 : head 안에 <style>내용이 있어용<

   으로 사용

3. 외부참조 : css파일을 새로 만들어 href로 링크를 연결하여 사용한다.

```html
<!--00_css.html-->
<!DOCTYPE html>
<html lang="ko">
<head>
    <style>
        h2{
            color: burlywood;
        }
    </style>
    <link rel="stylesheet" href="style.css">
</head>
    
<body>
    <h1 style="color: palevioletred">inline css 적용</h1>
    <h2>내부참조, embedding</h2>
    <h3>외부참조, 파일 link</h3>
</body>
</html>
```



```css
/* style.css */
h3{
    color: skyblue;
}
```



![1547514038997](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547514038997.png)



## 사용하는 내용

### 키워드



### 단위

1. px	

   거의 같은 값을 갖는다. 


2. %

   전체 비율에 따라 값을 갖게된다.

3. em

   부모에 따라 값을 갖게된다. 부모의 몇배수의 값을 갖는다.

   <ul>
       <li>2em</li>
   </ul>
   2em이 자식으로 들어가면 부모도 그 배수를 갖게되고, 그 자식은 부모의 배수를 갖는다.
   html이 2이면, ul은 4, li는 8을 갖게 된다.


4. rem

   html의 배수를 갖는다.

5. viewport(vh, vw, vmin)

   `vh` : 화면의 높이 비율에 따라 달라짐

   `vw` : 화면의 가로 비율에 따라 달라짐

   `vmin` : 가로 세로 중 작은 것의 비율에 따라 달라짐.


```html
<!-- 01_unit.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="01.css">
</head>
<body>
    <p>20px</p>
    <ol>
        <!-- li : html*1.2 == 20*1.2 -->
        <li>1.2rem</li>
    </ol>
    <ul>
        <p>안녕?</p>
        <!-- ul : 20px*1.2 -->
        <!-- li : ul*1.2 == 20*1.2*1.2 -->
        <li>2em</li>
    </ul>
    <p class="vh">5vh</p>
    <p class="vw">5vw</p>
    <!-- vimin은 높이와 너비의 최솟값중에서 골라 유동적으로 변한다. -->
    <p class="vmin">10vmin</p>
</body>
</html>
```

```css
/* 01.css */

html{
    font-size: 20px;
}
ol, ol li {
    font-size: 1.2rem;
}
ul, ul li {
    font-size: 2em;
}
.vh {
    font-size: 5vh;
}
.vw {
    font-size: 5vw;
}
.vmin {
    font-size: 10vmin;
}
```

![1547514433512](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547514433512.png)



### 색상

* 컬러명(ex, black)
* 헥사코드(#000000)
* rgb값 & rgba(r, g, b, alpha(투명도))







## 선택자

선택자 종류에는 `tag`, `class`, `id` 등이 있다.

id가 가장 높고, class, tag순으로 우선순위가 높다.

id는 보통 문서에서 하나, class는 여러개 있을 수 있으며, tag는 문서 전체에 적용 가능하다.

```
id > class > Tag
```





### 마크업 

태그들을 사용하는 과정

css를 적용시키기 위해서는 마크업을 하고 선택자를 부여한다.

span, div 태그는 의미는 없지만 css 적용을 위해서 활용한다.

span태그 : 아무 의미 없이 특정한 것을 `마크업`하기 위하여 사용한다.

```html
<p><span class="pink">핑크색</span>, <span id="yellow">노란색</span></p>
```



```css
* {
    color: red;
}

.pink {
    color: pink;
}
#yellow {
    color: yellowgreen;
}
```

![1547515079948](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547515079948.png)



### 클래스 동시사용

클래스가 여러개 올 때 css 순서가 뒤에 있는것이 앞에 있는 것을 덮어쓴다.

**css 코드 순서에 영향을 받는다!!**

```html
<p class="bold purple pink">볼드체</p>
```

```css
.pink {
    color: pink;
}
.bold {
    font-weight: bold;
}
.purple {
    color: purple;
}
```

![1547516003037](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547516003037.png)



```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="02.css">
</head>
<body>
    <p>빨간색</p>
    <h1>Tag(요소) 선택자</h1>
    <h2 class="pink">클래스 선택자</h2>
    <h3 id="yellow">아이디 선택자</h3>
    <h3 class="pink" id="yellow">id > class</h3>
    <h2 class="pink"> class > tag</h2>
    <!-- css를 적용시키기 위해서는 마크업을 하고 선택자를 부여한다.
    span, div 태그는 의미는 없지만 css 적용을 위해서 활용한다.-->
    <p><span class="pink">핑크색</span>, <span id="yellow">노란색</span></p>
    <p class="bold purple pink">볼드체</p>
    <p><strong>볼드체 특정 강조 부분만 쓰려고 하면 strong을 쓰세요</strong></p>
    <p><b>볼드체 주로 b태그를 쓰세요</b></p>
</body>
</html>
```



```css
* {
    color: red;
}

h1 {
    color: blue;
}

.pink {
    color: pink;
}
#yellow {
    color: yellowgreen;
}

.purple {
    color: purple;
}
.bold {
    font-weight: bold;
}
```





















## display

### block

항상 새로운 라인에서 시작

div, h1~h6, p, ol, ul, li, br, hr, ...



### inline

새로운 라인에서 시작하지 않으며 문장의 중간에 들어갈 수 있다. 

span, a, strong, img, button, input, select, textarea, ...



### inline-block

block과 inline 레벨 요소의 특징을 모두 갖는다.

inline 레벨 요소처럼 한 줄에 표시되면서 block의 마진 등을 사용할 수 있다.



### none

요소를 표현하지 않는다.

태그는 있지만 보여지지 않는다.

특정 너비가 넘어가거나 너비보다 작으면 안보이게 하는것으로 주로 사용된다.





## ㅇ

### hidden

안보이게 하는것. 그러나 공간은 존재한다.





## 위치

### 1. static (기본위치)

기본적인 요소의 배치순서에 따른다.

부모가 있을 때 부모 요소에 따른다.



### 2. relative (상대위치)

기본 위치 **(static 기준)**으로 좌표(top, right, bottom, left), 를 따라 이동

**적용 전 (static일 때) 원래 있던 위치에서 이동한다.**

움직이고 원래 있었던 공간이 유지된다.

원래 (0, 100)이면 (300, 200)이동할 때 (300, 300)이 된다.





### 3. absolute (절대위치)

부모요소, 또는 가장 가까이 있는 조상 요소**(static제외)** 기준으로 좌표 프로퍼티(top, right, bottom, left)만큼 이동

가장 가까운 조상 중에  static이 아닌 것의 위치에서 이동.

조상을 탈출할 수 있다.





### 4. fixed (고정위치)

부모 요소와 관계 없이 브라우저의 viewport를 기준으로 위치를 고정.

fixed로 bottom, top, left, right를 정해서 특정 위치에 고정시킨다.

bottom: 0;

left: 0;

으로 하면 왼쪽 아래에 달라붙는다.









## css font

### [font family](https://fonts.google.com/?selection.family=Nanum+Myeongjo)

### 웹폰트를 왜 사용할까요????

=> 다른 사람들의 컴퓨터에 설치 되지 않은 폰트를 웹폰트로 불러오면 어디서든 그 폰트로 볼 수 있다.

1. 원하는 폰트 우상단 +
2. EMBED -> @IMPORT
3. @import url 내용을 css style을 복사 후 css style 상단에 붙여넣기
4. 사용하고 싶은 부분의 css 내용에 specify in css를 붙여넣기



### [font awesome](https://fontawesome.com/)

웹에서 가장 많이 사용하는 것

1. [start](https://fontawesome.com/start)의 CDN 내용에서 webfont나 svg를 사용가능

   svg : 그림 그리는 태그까지 가능. html 페이지에 넣는것

   web font : font-family에서 사용



### [font awesom animation](http://l-lin.github.io/font-awesome-animation/)

font및 아이콘에 애니메이션 효과를 넣는다.





### [Animate.css](https://daneden.github.io/animate.css/)

그냥 우리가 만든 css 파일에 애니메이션 효과를 넣기 위해서 사용.



[github page](https://github.com/daneden/animate.css)에 들어가서 사용. link부분을 헤드 안에 집어넣기.

```
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
</head>
```

사용할 때에는 animated "애니메이션명" 으로 사용.