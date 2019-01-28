# Bootstrap

**반응형(responsiveness)**, 모바일에서 잘 사용할 수 있는 웹 빌드.



+ tmi : alt + shift + f 누르면 자동 탭정렬
+ role : 역할. 좀더 시멘틱한 의미.
+ alt : 이미지에서 alt값을 무조건 넣어야한다!!!!!! (이미지가 안나올 때 나올 글씨...)





### HTML, CSS, JS 등을 사용할 수 있는 front-end library.

좀 더 예쁘게, 좀 더 많은 기능을, 좀 더 쉽게 사용할 수 있게 정리(?) 해놓은것





## bootstrap vs html

<html >

h1 : 자동 마진이 들어간다.



<bootstrap>

h1 자동 마진 이 작다. 

px이 rem으로 들어가서 좀 더 반응형

### **아무튼!!!! 차이가 존재한다**





## [bootstrap 설치](https://getbootstrap.com/)

### BootstrapCDN

##### CDN : 컨텐츠(css, js, image, text)등을 효율적으로 전달하기 위해 여러 노드에 가진 네트워크에 데이터를 제공하는 시스템. 아무튼!!! 빠르게 받아오기위한 장치. 

##### CDN을 사용하지 않으면!!!! 구글에 들어갔을 때 들어간 bootstrap 정보를 네이버에서 들어가게 되면 다시 bootstrap 정보를 가져오게된다. 

CDN을 사용하게 되면 관련 내용을 빠르게 받아올 수 있다. 가장 가까운 서버에서 정보를 가져오기 때문.

외부서버를 사용하기 때문에 내부 서버(본인 서버)의 부하가 적어진다.

=> 속도가 빨라지게 된다.



##### CSS only

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
```

줄 복사 -> head의 닫는 태그 위에 복사 붙여넣기



##### JS, Popper.js, and jQuery

body의 닫는 태그 위에 복사 붙여넣기

```html
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
```







이제, 클래스를 사용해서 조작을 할 것.

## [utilities](https://getbootstrap.com/docs/4.2/utilities/borders/)

### sapcing

마진

```
.m-0     //마진 0
.mr-0	//마진 right 0
.mx-0	//마진 left-right 0
.py-0	//padding top, bottom 0
.mt-1 	//마진 top : 0.25rem == 1rem * 0.25 == 16px*0.25 == 4px
.mt-2	//0.5	== 8px
.mt-3	//1	== 16px
.mt-4	//1.5 == 24px
.mt-5	//3 == 48px
.mx-auto	//마진 중앙정렬
```

+ 음수 가능.

  + padding 안됨
  + margin은 됨.


### color

```-색상```으로 주로 사용한다!!!



```bg-색상```으로 많이 사용한다.

```.text-색상```으로 글자에 사용한다.







```
bg-primary : 파란색
<div class="mt-3 bg-secondary">secondary</div>
    <div class="p-2 mt-2 bg-success"><p>p-2, success</p></div>
    <div class="mt-2 mx-auto bg-danger">mx-auto, 가운데정렬, danger</div>
    <div class="mt-2 mr-auto bg-warning">mr-auto, 왼쪽정렬, warning</div>
    <div class="mt-2 ml-auto bg-info">ml-auto, 오른쪽정렬, info</div>
    <div class="mt-2 ml-auto bg-light">ml-auto, 오른쪽정렬, light</div>
    <div class="mt-2 ml-auto bg-dark text-light">ml-auto, 오른쪽정렬, dark, text-light</div>
    <div class="mt-2 ml-auto bg-white">ml-auto, 오른쪽정렬, white</div>

```





### .border

```
border : 기본 1px solid 회색
// 아래만
border-bottom
색상을 넣으려면
border border-primary **border를 두번 써야한다**
```





### display

```
.d-block
.d-inline /// 한개의 블럭으로 보지 않고 라인으로 끌어올릴 수 있다.
.d-none 	/// 안보이게 만든다 (공간도 없다)
```

```
<div class="m-2 bg-danger d-sm-none">보이나 안보이나?</div>
<div class="m-2 bg-warning d-md-none">보이나요 안보이나요??</div>
```

사이즈(화면사이즈)(모바일, pc, 모니터 크기)에 따라 달라진다.

이 크기를 break point라고 정한다.



+ display none : 안보이며, 공간도 없다.
+ visibility none : 안보이지만 공간은 차지한다.



### position

```
.position-static		//위치 고정
<div class="sticky fixed-top bg-dark"></div>
<div class="sticky fixed-bottom bg-info"></div>
```

여기서 sticky라는 붙어있는 스타일(?)을 새로 만들어준 것 뿐. 실제 사용할 때에는 fixed-top(or bottom ...)만 사용해주면 된다.

z-index속성

``` z-index속성
 z-index=1030
```

누가 위로 올것인가 정하기.





### text

```
.text-right
.text-center
```

text를 정렬하기



font-weight

```
.font-weight-bold		//폰트 굵게
.font-weight-i
```







### [flex](https://getbootstrap.com/docs/4.2/utilities/flex/)

flex연습: [froggy](https://flexboxfroggy.com/#ko)

`d-flex` : 세로로 길게 늘리게 된다. ( 기본값이 row 이기 때문)



`flex-column` : item을 행으로 배치한다.

`flex-row`: item을 열으로 배치한다.

`row-reverse`, `column-reverse` 로 배치를 뒤집을 수 있다. (순서 뒤집기 가능)



**flex의 방향은 기본적으로 row** 그러나 이 방향이 **column**으로 바뀌게 되면 justify-content의 방향이 세로로(열배치), align-items의 방향이 가로로 바뀐다.

#### justify-content

행을 배치(왼쪽, 가운데, 오른쪽)

기본적으로 행을 조정한다. (가로정렬)

`justify-content-first`

`justify-content-center`

`justify-content-end`

`justify-content-between` : 각 item들의 간격을 동일하게 설정한다.

`justify-content-around` : item들 주위에 동일한 간격.



#### align-items

열로 배치. (위, 중앙, 아래)

기본적으로 열을 조정. (세로정렬)

`align-items-start`

`align-items-center`

`align-items-end`

`align-items-stretch` : 부모의 크기만큼 길게 늘리는것. 기본 디폴트값.



#### align-content

열을 배치.

한번에 여러줄의 아이템을 위, 아래, 중앙 등으로 정렬이 가능하다.

기본적으로 정렬을 할 경우 간격 설정을 안하면 자신(아이템)의 크기만큼만 공간을 차지한다.





#### wrap

부모를 넘쳐 나오게 되는것을 방지. 

`flex-wrap` 

`flex-wrap-reverse` : wrap이 반대로 된다.

`flex-flow-wrap-row`, `flex-flow-wrap-column` 으로 한번에 정렬 가능하다.





#### direction

`flex-direction-`

`flex-direction-row` : 텍스트의 방향과 동일하게 정렬

`flex-direction-row-reverse` : 텍스트의 방향과 반대방향으로 정렬

`flex-direction-column` : 위에서 아래로 정렬

`flex-direction-column-reverse` : 아래에서 위로 정렬



- reverse를 하게되면 요소들의 start와 end의 순서가 바뀐다.
- 원래 왼쪽이 start일 때 row-reverse를 한 후에는 end가 왼쪽이 된다.









#### 아이템만 갖는 속성

##### align-self

`align-self-center`

와 같이 center만 변경해서 사용할 수 있다.



##### flex-grow

`flex-grow-1`과 같이 사용하면 남은 여백? 을 적용한 item이 다 가져가게된다.



##### order

item들 사이에 순서를 정해주는것.

일반적으로 모든 item이 순서가 0

`order-3` 을 하게되면 순서가 3으로 바뀐다.

순서가 음수도 가능하다.



특정 클래스? 전체 적용이 가능.







## [Components](https://getbootstrap.com/docs/4.2/components/alerts/)

form 등의 class 가 모두 정해져있기 때문에 그것을 모두 확인하기.





### [Alert](https://getbootstrap.com/docs/4.2/components/alerts/)

```
alert 			//alert창
alert alert-primary		//alert창으로 만든 후 색상 지정


<div class="alert alert-primary" role="alert">	//role : 의미적 사용
  A simple primary alert—check it out!
</div>
```



alert창에서 링크 걸기 가능

```
<div class="alert alert-warning" role="alert">
A simple warning <a href="#">alert—check it out!</a>
</div>
<div class="alert alert-warning" role="alert">
A simple warning <a href="#" class="alert-link">alert—check it out!</a>
<hr>
</div>
```

class를 "alert-link"로 주게 되면 좀 더 자연스럽게 만들어질 수 있다.

hr태그는 위에서 사용된(적용된) 색상과 어울리게 들어간다.



### Badge

작은 표시(ex 좋아요표시 등)





### Bredcrumb 

디렉토리 표시 등을 할 때 C: / user/ python36

이렇게 표시를 좀 더 보기 쉽게 표시





### [Button](https://getbootstrap.com/docs/4.2/components/buttons/)

내가 아는 그 버튼

**버튼은 인라인이다**

버튼 크기 만들 수 있다.



outline button

```
<button type="button" class="btn btn-outline-success">Success</button>
```



크기 조절 시 `btn-sm` or `btn-lg`

```
<button type="button" class="btn btn-outline-success btn-sm">Success</button>
```



button에 disabled를 사용 할 수 있다.

이 경우 버튼 사용 불가.

```
<button type="button" class="btn btn-lg btn-primary" disabled>Primary button</button>
```





### Button Group

버튼이 여러 개 있을때 묶어주는 것





### [Card](https://getbootstrap.com/docs/4.2/components/card/)

like 인스타그램

위에 이미지 아래에 내용





### Carousel

사진이 넘어가게 하는 content



### colloapse

누르면 펼쳐지는 것들.

아코디언효과.



### Dropdowns

버튼 안에 여러 선택 종류 있을 때 사용.

ex) 컴퓨터 종료 설정 시다시시작, 종료, 절전 선택 가능



### [Forms](https://getbootstrap.com/docs/4.2/components/forms/)

이메일 및 로그인 창 같은 것들.

하이라이팅 효과나, 멀티플 선택(drop down) 등 선택 가능(select tag)

내용 작성 가능한 text area



read only 같은 경우는 타이핑 불가

range input 가능

check box, radio button, inline속성 가능

보통은 check box나 radio 등은 id가 설정되어서 뭘 선택했는지 확인 가능



### input group

인풋으로 넣을 부분들의 그리드 및 정렬 등 활용 가능



### jumbotron

영역을 나누는데 사용.

보통 자주 사용하지는 않고 다른 것을 많이 활용한다.



###  [modal](https://getbootstrap.com/docs/4.2/components/modal/)

화면 뒤가 회색으로 바뀌면서 팝업창 형식으로 사용.







### [Navbar](https://getbootstrap.com/docs/4.2/components/navbar/)

네비게이션바.

상단 바 처럼 생김.

+ sticky top : section 공간 위에 따로 공간 있음
+ fixed top : section 공간과 함께 시작.



### [Pagination](https://getbootstrap.com/docs/4.2/components/pagination/)

하단에 페이지 넘기는 선택부분.



### [progress ](https://getbootstrap.com/docs/4.2/components/progress/)

진행상황 바

like 막대그래프





### [scrollspy](https://getbootstrap.com/docs/4.2/components/scrollspy/)

스크롤을 하는 것에 따라서 현재 위치를 알려주는 창.



### [spinners](https://getbootstrap.com/docs/4.2/components/spinners/)

로딩하는 빙글빙글 도는 표시

=> 이건 font awesome으로도 사용할 수 있다.



### [Toasts](https://getbootstrap.com/docs/4.2/components/toasts/)

알림 메시지 같은 것을 띄우는 창



### [Tooltips](https://getbootstrap.com/docs/4.2/components/tooltips/)

가까이 가져다대면 관련 설명을 표기해주는 창



## content

### [table](https://getbootstrap.com/docs/4.2/content/tables/)





### Grid System  vs  반응형

나뉘어져있는 규격화 : grid system

화면 크기에 따라 다르게 표시 : 반응형





### [Grid System](https://getbootstrap.com/docs/4.2/layout/grid/)

bootstrap에서 grid는 12등분 가능.(약수가 가장 많기 때문.)

총 12를 몇개로 나눠도 괜찮아용.

```
    <div class="container">
        <!-- div.row -->
        <div class="row">
            <!-- div.col-4*3 -->
            <div class="square col-4"></div>
            <div class="square col-4"></div>
            <div class="square col-4"></div>

        </div>
    </div>
```

한 줄을 4씩 3등분



```
<div class="container">
    <!-- div.row -->
    <div class="row">
        <!-- div.col-4*3 -->
        <div class="square col-4"></div>
        <div class="square col-4"></div>
        <div class="square col-5"></div>

    </div>
</div>
```

한 줄을 12로 나누는게 넘어가면 아래줄으로 내려가게됩니당.



```
<div class="container">
    <div class="row">
        <div class="square col-2 offset-5"></div>
    </div>
</div>
```

중앙배열!

`offset-숫자`로 원하는만큼 띄울 수 있습니다.







| Extra small <576px  | Small ≥576px | Medium ≥768px | Large ≥992px | Extra large ≥1200px |            |
| ------------------- | ------------ | ------------- | ------------ | ------------------- | ---------- |
| Max container width | None (auto)  | 540px         | 720px        | 960px               | 1140px     |
| Class prefix        | `.col-`      | `.col-sm-`    | `.col-md-`   | `.col-lg-`          | `.col-xl-` |

<!-- col 1개, sm 2개, md 3개, lg 4개, xl 6개 -->

```
<div class="row">
    <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">md 배치</div>
    <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">md 배치</div>
    <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">md 배치</div>
    <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">md 배치</div>
    <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">md 배치</div>
    <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">md 배치</div>
</div>
```





### 반응형

css파일의 media 태그를 조작.

```
@media (min-width: 600px) {
    h1 {
        color: red;
    }
}
```

600px 이상이면 h1태그가 빨간색 글씨



```
p.orientation::after {
    content: "가로입니다."
}
@media(orientation: portrait) {
    p.orientation::after {
        content: "세로입니다."
    }
}
```

핸드폰 등 화면이 가로, 세로인지 확인.



```
@media (width: 500px) {
    h1 {
        color: blueviolet;
    }
}
```

특정 픽셀(500px)에서만 보라색이 된다.



```
@media(max-height: 500px) {
    h2 {
        color: gray;
    }
}
```

특정 픽셀(500px) 이하에서 회색이 된다.



```
@media print {
    h1 {
        color: darkcyan;
    }
}
```

프린트 시에만 보인다.



```
@media(max-height: 500px) and (max-width: 500px) {
    h3 {
        color: palevioletred;
    }
}
```

높이와 너비가 둘 다 500px 이하면 분홍색.

`and`는 `and`.

`or`는 `,` 로 표시한다.