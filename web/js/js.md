# JavaScript

+ 브라우저에서 실행되는 언어. os에서 실행되지 않는 언어로 탄생했다. 
+ 수많은 파편화가 진행되었음. 
+ 우리가 사용할 버전은 ES6+ ?
+ 



크롬을 쓰는 이유? : V8 이라는 엔진이 실행속도가 빨라서 사용하게 된다. 

윈도우보다 상위에 있는것이 document

JavaScript (ES6) code snippets 설치





## 1. 사용하기

script는 body 태그 위에서 사용.

1. html 파일 생성 후 body나 css를 건드리지 않은 채 body 끝나는 태그 위에 script를 사용한다.
2. `;` 를 사용하지 않아도 되나요? => 거의 에러가 없기 때문에 사용하지 않습니다. 
3. 주석은 c와 사용이 같다.
4. 초기화하기 clear()



### 1.

1. 프린트하기.(알림창)

   ```html
   <script>
   alert('자바 스크립트 안녕!')
   </script>
   ```

2. 프린트하기 (콘솔)

   ```html
   <script>
   console.log('안녕?')
   </script>
   ```

   `clg` 를 쓴 뒤 tap 키를 하면 자동으로 입력. 

   이 때의 결과는 크롬의 개발자도구의 console에 뜨게 된다.

   ![1556584963831](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556584963831.png)

   

3. html 창에 프린트

   ```html
   <script>
   document.write('<h1>SSAFY </h1>')
   </script>
   ```

   이 때, h 태그 등을 모두 사용할 수 있다.

   하지만 우리가 document.write를 사용하지는 않을것.





### 돔 조작

![1556585278460](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556585278460.png)

변수를 사용하기 위해서는 var 변수명 = 변수내용

**변수를 나중에 지정해도 위에서 사용할 수 있다**

**변수 hoisting**

`html`

```html
console.log(name)
var name = 'rain'
=> undefined
```

+ hoisting : 끌어올리기 사용.

+ 자바스크립트는 선언되어있는 것들을 모두 끌어 올린다. 

+ 여기서는

  ```html
  1) var name
  2) console.log(name)
  3) name = 'rain'
  ```

  과 같이 읽히는 것으로 보인다.

  만약 이렇게 되지 않았다면 `(ReferenceError) name is not defined` 라는 에러를 띄울것이다. 

+ 변수는 1) 선언단계 2) 초기화 단계 3) 할당 단계를 거치게 된다. 





### 변수

+ 이제 var는 사용하지 않는다. var가 없으면 전역변수.

  + var의 치명적 단점 : 재선언 가능.

    + 중간에 선언하는 경우는 위에서 사용하는 변수에서 새롭게 선언할 때 에러가 났으면 좋겠는데 에러가 안 나는 경우가 발생.

    + ```
      var a = 100
      var a = 30
      ```

      이게 가능했다.

  + 상수, 정수 구분 불가

+ let, const 키워드(ES6+에서 등장)를 사용한다.

  + const : 상수

    + const는 재할당이 불가하다.

  + let은 재선언 불가(변수), 재할당 가능(변수에 값을 새로 넣는것 가능.)

    + ```
      let a = 30
      let a = 10
      => 재선언 불가 에러
      ```

    + 재할당이 가능

+ var vs let

  ```html
  for (var i = 0; i < 3; i++){
      console.log(i)
  }
  console.log('==================')
  console.log(i)
  ```

  ![1556587386033](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556587386033.png)

  

  ```html
  for (let j = 0; j < 3; j++){
      console.log(j)
  }
  console.log('==================')
  console.log(j)
  ```

  ![1556587417060](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556587417060.png)

  

  let으로 사용하면 for 밖에서 사용할 수 없다.

  => var와 let은 스코프가 다르다. => 나중에 다시 설명

  

  

+ 변수끼리 합치기 가능.

  ```javascript
  const firstName = 'happy'
  const lastName = 'hacking'
  const name = firstName + lastName
  document.write('<h1>' + name + '</h1>')
  // ES6+ : Template literal(템플릿 문자열)
  document.write(`<h1>${name}</h1>`)
  ```

  위 두개의 document.write를 사용.  그러나 아래것은 ES6+ 에서 사용할 수 있다.

+ input 가능

  ```js
  let userName = prompt('너 누구니?')
  let message = `<h1>${userName}</h1>`
  document.write(message)
  ```

  `prompt`는 input값을 받는다.



### 조건문



```js
let userName = prompt('너 누구니?')
let message = `<h1>${userName}</h1>`

if (userName === '성민'){
    message = `<h1>${userName}이는 나가있어.</h1>`
} else if (userName === '슬기'){
    message = `<h1>${userName}는 일하자!</h1>`
} else{
    message = `<h1>${userName}은 수업듣자</h1>`
}
document.write(message)

```

+ 조건문의 비교는 `===`를 사용한다. 그러나 `==`를 사용해도 가능하기는 하다. 하지만 차이는 존재한다.
  + `===` : 정확하게 같은것. 일치함을 비교. (값, type)
    + `!==` : `===`의 부정
  + `==` : 비슷한 느낌. 동등함을 비교. (값) 만을 비교. 타입이 변화할 수 있다.
    + 123 == '123' : true
    + `!=` : `==`의 부정
+ 자바스크립트에서는 비교 연산자는 `===`이다. _이 지옥같은 공간...._

![img](https://img.devrant.com/devrant/rant/r_273520_4QWW4.jpg)





### 반복문

1. while

   ```js
   let i = 0;
   while(i<10){
       console.log(i)
       i++
   }
   ```

2. for

   ```js
   for (let j = 0; j<10; j++){
       console.log(j)
   }
   ```

3.  for of (list)

   ```js
   let myArray = [1, 2, 3]
   for (let k of myArray){
       console.log(k)
   }
   ```

   ```js
   let myArray = [1, 2, 3]
   for (const k of myArray){
       console.log(k)
   }
   ```

   let 과 const는 같은 결과를 리턴하지만, let은 값을 변경 가능하고, const는 불가하다.





### 배열(Array)

+ numbers[-1] : 불가능

+ ![1556590769256](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556590769256.png)

+ length 가능

+ 슬라이싱 불가

+ push 가능. => type이 설정 안되어도 섞여서 만들 수 있음. => 동적타이핑? 언어.

+ pop 가능. numbers.pop() => 가장 마지막거 하나만 빠져나온다.

+ pop에는 무엇을 넣어도 맨 뒤에거 하나만 빠진다.

+ ![1556591056664](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556591056664.png)

+ 

+ | shift : 앞에서 빼는 것                | pop : 뒤에서 빼는것               |
  | ------------------------------------- | --------------------------------- |
  | unshift : 앞에서 넣는것 : 리턴 : 길이 | push : 뒤에서 넣는 것. 리턴. 위치 |

+ ![1556591211138](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556591211138.png)

+ 정렬 : sort()

+ slice : 시작값, 끝 인덱스

+ numbers.slice(-2) : 가능.  슬라이스에서만 마이너스가 가능. 이 경우 ["push", "push"] 가 리턴.

+ numbers.slice() : 이 경우 그냥 복사.







## json

+ json : javascript object notation
+ 자바스크립트 object 표기법
  + 자바스크립트 데이터 타입 : 원시타입(primitive type)
  + Boolean(true, false), null, undefined, number, string



+ ```js
  let rain = {
      name: 'rain',
      age: 24,
      number : '010-3700-0000'
  }
  ```

+ ES6+

  ```js
  let name = 'rain'
  let stuffs = ['텀블러', '안경']
  let sweet = {
      name,
      stuffs
  }
  ```

  

+ ![1556592368521](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556592368521.png)

+ ![1556592421379](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556592421379.png)

+ json으로 넘겨줬던 데이터를 사용하기 위해 다시 만지려면 json parse를 사용하여 원래 만들어 놓은 let 형식으로 돌려놓는다.

+ json <-> object

  ```js
  let jsonData = JSON.stringify(sweet)
  let jsonParse = JSON.parse(jsonData)
  ```

  



## 함수(function)

+ 자바스크립트의 함수는 일급 객체이다.
+ <조건>
  1. 변수나 특정한 오브젝트에(배열) 함수를 저장할 수 있다.
  2. 함수의 인자로 전달할 수가 있어야 한다.
  3. 함수 자체를 return 할 수 있어야 한다.
  4. 이름과 상관없이 구별이 가능하다.(익명으로 표현 가능)
  5. 동적으로 속성값(proerty) 할당이 가능하다.

### 기본 함수 선언

+ 더하기 함수

  ```js
  function add(num1, num2){
      return num1 + num2
  }
  console.log(add(1, 3))
  ```

+ 함수도 hoisting 이 된다.

  ```js
  // 1. 함수 선언식
  let result = add(1, 3)
  function add(num1, num2){
      return num1 + num2
  }
  console.log(result)
  ```

  + 이런식으로 출력해도 콘솔에 잘 출력되기는 하나, 이렇게 사용하는것을 권장하지는 않는다. 

+ 함수 표현식

  ```js
  // 2. 함수 표현식
  let add2 = function add3(num1, num2) {
      return num1+num2
  }
  console.log(add2(1, 3))
  console.log(add3(1, 3))
  ```

  + 이 경우, add 3은 존재하지 않는다고 나온다.

    ![1556600072792](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556600072792.png)

    따라서 add3 부분을 없애버릴 수 있다.

    

  ```js
  // 2. 함수 표현식
  let add2 = function(num1, num2) {
      return num1+num2
  }
  console.log(add2(1, 3))
  
  ```

  + 이 경우 오른쪽의 function은 익명함수라고 불린다.
  + python의 lamda와 비슷하다.

+ Arrow Function : ES6+ => **가장 많이 사용합니다**

  ```js
  // 3. ES6+ Arrow Function
  let sub = (num1, num2) => {return num1-num2}
  ```

  다른 예제

  ```js
  let greeting = name => `${name}, 안녕!`
  ```

  ![1556600319511](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556600319511.png)

  + 인자가 하나인 경우 () 생략 가능
  + 단순 리턴인 경우, {} 및 리턴 키워드 생략 가능

  다른 예제

  ```js
  let hello = () => 'hello, world!'
  ```

  + 인자가 없는 경우에는 ()를 작성한다.

  

  object 리턴 시

  ```js
  let me = (name, age) => ({name, age})
  console.log(me('hi', 3))
  ```

  + 반드시 소괄호 `()`로 묶어서 작성

+ 익명함수를 직접 만들고 즉시 실행시킨 뒤 삭제

  ```js
  ((a, b) => a * b)(4, 5)
  => 20
  ```

  a, b를 a * b로 정의하고, 이것을 (4, 5)로 실행시킨다.

+ default args

  ```js
  let bonjour = (name = '동명') => `${name}, bonjour`
  ```

+ 익명함수

  ```js
  (function (num) {return num * num})
  ```

+ 즉시 실행 함수(익명함수 + 호출) == IIFE

  + 즉시 실행 함수는 무조건 소괄호로 묶는다.

  ```js
  (function (num) {return num * num})(5)
  => 25
  ```

  ```js
  let myNum2 = (num => num * num)(5)
  myNum2
  => 25
  ```

  



### 콜백 함수 사용

+ 배열을 받아서 다 더해주는 함수를 작성

  ```js
  const numberAddEach = numbers =>{
      let sum = 0
      for (const number of numbers){
          sum += number
      }
      return sum
  }
  ```

  ```js
  function numberAddEach(numbers) {
      let sum = 0
      for (let i of numbers){
          sum += i
      }
      return sum
  }
  ```

+ 위와 같은 더하기/빼기/곱하기 함수를 하나로 묶어버리기



1. 전체적으로 사용할 숫자 읽는 함수

   ```js
   const numberEach = (numbers, calc) => {
       let result
       for (const num of numbers){
           result = calc(num, result)
       }
       return result
   }
   ```

2. 각각의 역할을 하는 addEach, subEach, mulEach 함수 생성

   ```js
   const addEach = (num, result = 0) => result + num
   const subEach = (num, result = 0) => result - num
   const mulEach = (num, result = 1) => result * num
   ```

   

3. 실행

   ```js
   //콜백
   console.log(numberEach([10, 20, 30], addEach))
   console.log(numberEach([10, 20, 30], subEach))
   console.log(numberEach([10, 20, 30], mulEach))
   => 60
   => -60
   => 6000
   ```

   + 콜백은 쉽게 생각하면 python 의 map 함수와 비슷한 역할이다.

     `map(str, 12421)` 로 사용하면 '12421'로 리턴되는것과 비슷하게 str 대신에 함수, 들어갈 내용 대신에 함수.

   + 위 addEach와 같이 사용할 수 있는 방법

     ```js
     // 익명함수 + 콜백
     console.log(numberEach([10, 20, 30], (num, result = 0) => result + num))
     console.log(numberEach([10, 20, 30], function(num, result = 0) {
         return result + num
     }))
     ```

     위와 비슷한 구조

     ```js
     let foods = ['메로나', '돼지바', '쿠앤크']
     foods.forEach(function(ice){
     	console.log(ice)
     })
     => 메로나
     => 돼지바
     => 쿠앤크
     
     //위와 같은 역할
     foods.forEach(ice => console.log(ice))
     
     foods.forEach(function(element, idx, foods){
     	console.log(element, idx, foods)
     })
     => 메로나 0 (3) ["메로나", "돼지바", "쿠앤크"]
     => 돼지바 1 (3) ["메로나", "돼지바", "쿠앤크"]
     => 쿠앤크 2 (3) ["메로나", "돼지바", "쿠앤크"]
     ```

   + arr.forEach(callback[, thisArg])

     callback이 있는 경우 function이 들어가야한다.

     

```python
def negative(num):
    return -1*num

def gutenTag():
    return 'Guten Tag'

def vietnam(member):
    member_base = '황여진'
    return f'{member_base}와 {member}가 베트남에 가요'
```



```js
let negative = num => -1 * num
negative(3)
=> -3

let gutenTag = () => 'Guten Tag'
gutenTag()
=>"Guten Tag"

let vietnam = member => {
    let member_base = '황여진'
    return `${member_base}와 ${member}가 베트남에 가요`}
vietnam('민지')
=> "황여진와 민지가 베트남에 가요"
```









### 비동기적

[비동기적 자바스크립트](<https://hudi.kr/%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81-javascript-%EC%8B%B1%EA%B8%80%EC%8A%A4%EB%A0%88%EB%93%9C-%EA%B8%B0%EB%B0%98-js%EC%9D%98-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC-%EB%B0%A9%EB%B2%95/>)





