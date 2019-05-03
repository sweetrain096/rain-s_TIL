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



### 선택자 가져오기

+ 선택자. 태그를 가져올 때에는 `querySelector` 를 사용할 수 있다.

```js
let header = document.querySelector('h1')
```





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





조건문 줄이기

```js
const checkLongStr = string => {
    if (string.length > 10) return true
    else false
}
```

->

```js
const checkLongStr = string => {
    return string.length > 10 ? true : false
}
```

->

```js
const checkLongStr = string => (string.length > 10 ? true : false)
```









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



+ 복습

  1. 배열 반복하면서 출력

     ```js
     const avengers = ['캡틴아메리카', '토르', '헐크', '아이언맨', '블랙위도우', '블랙팬서', '앤트맨', '스파이더맨', '캡틴마블', '닥터스트레인지']
     ```

  2. for of

     ```js
         for (const a of avengers){
             console.log(a)
         }
     ```

  3. forEach

     ```js
         avengers.forEach( heroName => console.log(heroName))
     ```

  4. forEach

     ```js
         avengers.forEach( function (heroName){
             console.log(heroName)
         })
     ```

     



### map

+ 각각을 계산/함수식 해서 각각의 결과를 출력

```js
const numbers = [1, 2, 3]
```



1. 숫자를 문자열로 변환

   ```js
   const strNumbers = numbers.map(number => String(number))
   console.log(strNumbers)
   ```

2. 숫자 제곱

   ```js
   const squreNumbers = numbers.map(number => number**2)
   console.log(squreNumbers)
   ```



+ 거속시

  ```js
      const seulgi = [
          {'velocity': 40, 'time': 50},
          {'velocity': 100, 'time': 60},
          {'velocity': 20, 'time': 100}
      ]
      const distances = seulgi.map(function(one){
          result = one.velocity * one.time
          return result
      })
      console.log(distances)
      const distances2 = seulgi.map(obj => obj.velocity * obj.time)
      console.log(distances2)
  ```

+ 배열을 const로 사용하는 이유?

  + 배열 주소 자체는 일정하게 유지되나, 안의 메모리만 커졌다 줄어들었다 가능하기 때문에 const로 사용 가능하다.



### filter

+ 결과 중에서 특정한 값믄 뽑아내기

+ 짝수만 뽑기

  ```js
      const nums = [1, 5, 6, 8]
      const evenNums = nums.filter(num => num%2 === 0)
      console.log(evenNums)
  ```

+ 카페인 없는것만 뽑기

  ```js
      const drinks = [
          {type: 'caffeine', name: 'cold brew'},
          {type: 'caffeine', name: 'green tea'},
          {type: 'juice', name: 'orange'},
          {type: 'juice', name: 'mango'}
      ]
      const nonCaffeine = drinks.filter(drink => drink.type !=='caffeine')
      console.log(nonCaffeine)
  ```

  위의 결과는 오브젝트가 나오게 된다. 여기서 이름만 뽑으려면?

  ```js
  const nonCaffeine = drinks.filter(drink => drink.type !=='caffeine').map(obj => obj.name)
      console.log(nonCaffeine)
  ```

  이렇게 map을 연결해서 출력할 수 있다.



### reduce

+ 관리를 해서 줄여나가는것?
+ **여러가지를 계산해서 하나의 값을 만들고싶을 때. **
+ initial value를 지정해주지 않으면 시작이 1번 인덱스부터이다. 맨 끝에 ,0을 써서 지정해야지만 0번부터 시작
+ sum으로 묶는것. 계산한 값을 하나로 리턴. 
+ forEach와 다른 점? => 특정한 변수(let) 하나에 계속 값을 변화시키는 것이 아니라 하나의 값에 입력.



+ 배열의 값을 *10 한 값을 모두 sum

  ```js
      const reduceNum = [1, 5, 6]
      const reduceResult = reduceNum.reduce((acc, num) => acc += num*10, 0)
      console.log(reduceResult)
  => 120
  ```

  ```js
      const reduceNum = [1, 5, 6]
      const reduceResult = reduceNum.reduce(function(acc, num){
          return acc += num*10
      }, 0)
      console.log(reduceResult)
  ```

  

### find

+ 찾기 위한 것 중 첫번째 하나만 뽑아내기

+ 조커 찾아내기

  ```js
      const dc = ['슈퍼맨', '배트맨', '아쿠아맨', '조커']
      const badguy = dc.find(name => name === '조커')
      console.log(badguy)
  ```

  ```js
      const dc = ['슈퍼맨', '배트맨', '아쿠아맨', '조커']
      const badguy = dc.find(function(name){
          return name === '조커'
      })
      console.log(badguy)
  ```

  





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

+ 비동기 : 페이지 전체 중 우리가 원하는 일부만 요청을 받고 업데이트

![img](https://hudi.kr/wp-content/uploads/2018/03/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C3.png)

+ stack : 함수 - return 시 가장 안쪽(재귀로 치면 가장 마지막)에 있는 것을 먼저 실행
+ Queue : 콜백함수 - 실행되어야 하는 것을 순서대로 쌓고 먼저 쌓인것을 먼저 실행시킨다. 아래에서 axios에서 then에서 실행되는 것을 이 큐에 넣어놓고 실행시킨다.

[루프 돌려보는 사이트](<http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)





## EventListener

+ arrow function을 사용하지 않는다.
+ python의 self와 같은 역할을 event에서 사용할 수 없다. js에서는 view 또는 window 오브젝트를 가리키기 때문에 사용불가하다.

1. event.html

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Document</title>
       <style>
           .bg {
               background-color: #F7F7F7;
               display: flex;
               justify-content: center;
               align-items: center;
               min-height: 100vh;
           }
       </style>
   </head>
   <body>
       <div class="bg">
           <img id="dino" width="100px" heigth="100px" src="https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/88/e5/36/88e536d4-8a08-7c3b-ad29-c4e5dabc9f45/AppIcon-1x_U007emarketing-sRGB-85-220-0-6.png/246x0w.jpg" alt="dino">
       </div>
   
       <script>
       </script>
   </body>
   </html>
   ```

   

2. 공룡을 클릭할 때 알림 메세지

   ```js
   // 무엇을
   const dinoImage = document.querySelector('#dino')
   // 언제
   dinoImage.addEventListener('click', function(){
       // 실행
       alert('크앙!')
   })
   ```

3. 공룡 클릭 시 옆에 글자뜨기

   ```js
   // 무엇을
   const dinoImage = document.querySelector('#dino')
   // 언제
   dinoImage.addEventListener('click', function(e){
       // 실행
       console.log(e)
       const bgDiv = document.querySelector('.bg')
       bgDiv.append('크앙!')
   })
   ```

   ![1556677045015](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556677045015.png)

   + function이 실행될 때 e라는 로그를 확인해보면 어떤 이벤트와 관련된 내용이 나온다. callback 함수를 확인해보면 어떠한 오브젝트. 이벤트와 관련된 정보가 넘어오게 된다.

4. 키보드 조작

   ```js
           document.addEventListener('keydown', function(e){
               console.log(e)
           })
   ```

   + 키보드를 누르는 모든 상황을 log로 뽑아볼 수 있다.

     ![1556677588237](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556677588237.png)

     여기에서 keyCode로 내가 어디로 눌렀는지 확인 가능하다.

   1. 아래로 이동

      ```js
              document.addEventListener('keydown', function(e){
                  if (e.keyCode === 38){
                      console.log('위로갑니당')
                      dinoImage.style.marginBottom = '30px'
                  }
              })
      ```

      + 한번만 가능
      + 이동하는 것을 이미지의 css style을 준다.

      1. 계속 이동

         ```js
         let y = 0
         
         document.addEventListener('keydown', function(e){
             // console.log(e)
             if (e.keyCode === 38){
                 console.log('위로갑니당')
                 y -= 30
                 dinoImage.style.marginTop = `${y}px`
             }
         })
         ```

         + 위로 올라가며 체크

   2. 상하좌우 이동

      ```js
      document.addEventListener('keydown', function(e){
          console.log(e)
          if (e.keyCode === 38){
              console.log('위로갑니당')
              y -= 30
              dinoImage.style.marginTop = `${y}px`
          }
          else if (e.keyCode === 40){
              console.log('아래로갑니당')
              y += 30
              dinoImage.style.marginTop = `${y}px`
          }
          else if (e.keyCode === 39){
              console.log('오른쪽으로갑니당')
              x -= 30
              dinoImage.style.marginRight = `${x}px`
          }
          else if (e.keyCode === 37){
              console.log('왼쪽으로갑니당')
              x += 30
              dinoImage.style.marginRight = `${x}px`
          }
      })
      ```

      

5. 추가. 복사 금지

   ```js
   document.addEventListener('copy', function(e){
       console.log(e)
       e.preventDefault()
       alert('철컹철컹합니다 복사 금지!!!!')
   })
   ```

   `e.preventDefault()` : 복사를 하려고 할 때 이전에 복사한 것으로 남게된다.

   





## [엑시오스(axios)](<https://github.com/axios/axios>)

> axios : Promise based HTTP client for the browser and node.js
>
> > + 비동기적 : 정지된 사이트에서 원하는 부분만 갔다가 돌아오기
> > + 동기적 : 갔다가 새로운 곳으로 갔다가 돌아옴



+ 사용법 :

  + Using cdn 부분을 body 닫는태그 위에 넣기

    ```
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    ```

+ 요청을 보낼 곳 : [dog api](<https://dog.ceo/>)



console

+ ```js
  axios.get('https://dog.ceo/api/breeds/image/random')
  ```

  + ![1556685733508](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556685733508.png)
  + promise : 약속이 되면 정보를 받을것이라는 뜻(?)

+ 만약 약속된 대로 잘 들어오면 정보를 받는 방법

  ```js
  axios.get('https://dog.ceo/api/breeds/image/random').then(response => console.log(response))
  ```

  ![1556685792947](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556685792947.png)

  정보가 원하는대로 들어오게 되면 출력된다.

+ 이 경우 우리가 필요한 것은 data 안에 들어있는 message인데, 이것이 url의 주소이다.

  

+ **js의 순서** => [블로킹(blocking)과 논블로킹(non blocking)](<https://nodejs.org/ko/docs/guides/blocking-vs-non-blocking/>)

  ![blocking non blockingì ëí ì´ë¯¸ì§ ê²ìê²°ê³¼](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\building-a-nonblocking-rest-api-in-less-than-30-minutes-11-638.jpg)

  + ```js
    const dogImageUrl = axios.get('https://dog.ceo/api/breeds/image/random')
    		.then(response => response.data.message)
    		.then(url => console.log(1))
    console.log(2)
    console.log(dogImageUrl)
    console.log(3)
    ```

    + ![1556686343176](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556686343176.png)
    + 실행 결과를 보면 2번이 먼저 출력이 되는것을 확인 할 수 있다. `axios`에서 요청을 보내는 중에 promise가 리턴되면, 요청이 들어올 때 then으로 들어오는 것들을 순서대로 해주겠다는 것을 약속해준다.
    + 따라서 2가 출력된 후 dogImageUrl이 요청되어서 값이 생기게 되면 그것이 출력되고 3번이 출력된 후, promise로 약속된 내용을 하나씩 수행하는 것이다.
    + 위에서 볼 수 있듯 순서가 꼬일 수 있기 때문에, 우리가 원하는대로 순서를 지키기 위해서는 then안에서 순서대로 실행시키면 된다.

  + ```js
    const dogImageUrl = axios.get('https://dog.ceo/api/breeds/image/random')
    .then(response => response.data.message)
    .then(url => {
        //실행할 부분
    })
    ```

+ 함수로 만들기

  ```js
  const getDogImage = function() {
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => response.data.message)
      .then(url => {
          console.log(2)
          console.log(url)
          return url
      })
  } 
  ```

+ 이미지 띄우기

  ```js
  const getDogImage = function() {
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => response.data.message)
      .then(url => {
          const imageTag = document.createElement('img')
          imageTag.src = url
          const animal = document.querySelector('#animals')
          animal.append(imageTag)
      })
  } 
  ```

  + imageTag라는 상수에 img 태그인 요소를 생성한 후,

    imageTag의 src를 가져온 url로 넣어주기.

    이후 animals라는 id를  querySelector 가져와 그 부분에 imageTag를 넣어준다.

+ 버튼을 누를 때 이미지 띄우기(EventListener)

  ```html
  <button id='dog'>멍멍이 내놔!</button>
  ```

  ```js
  const dogButton = document.querySelector("#dog")
  const getDogImage = function() {
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => response.data.message)
      .then(url => {
          const imageTag = document.createElement('img')
          imageTag.src = url
          const animal = document.querySelector('#animals')
          animal.append(imageTag)
      })
  }
  dogButton.addEventListener('click', getDogImage)
  ```

  + 위와 같이 요청을 보내게 되는 요청은 `XHR` 요청이다.
  + ![1556688057504](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556688057504.png)
  + 버튼을 한 번 누를 때 마다 XHR 요청이 반복해서 쌓이게 되며, 이 방식은 구글 등에서 검색을 할 때 자동 추천 검색기능과 같은 방식으로 사용되게 된다.





## django 에서 사용하기 (좋아요/팔로우)

### 좋아요

1. `base.html`

   ```django
       <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
       {% block script %}
       {% endblock %}
   </body>
   ```

   body 닫는 태그 위에 block script 태그를 만들어주고 위에 [axios](<https://github.com/axios/axios>)의 cdn 코드를 적어준다.

2. `accounts/detail.html`

   ```html
   <i class="{% if user in post.like_users.all %} fas {% else %} far {% endif %} fa-heart fa-lg like-button" style="color: rgb(237, 73, 86);"></i>
   
   
   {% block script %}
   <script>
       
   </script>
   {% endblock %}
   ```

   좋아요 태그를 if 문부터 모두 제거한 후 하나로 만들어준다. 최하단에서 부르기 위해 클래스 안에 like-button으로 이름을 만들어준다. => id는 하나밖에 못가져오기 때문에 사용한다.

   이후 최하단에 base에서 만든 block을 적어준다.

3. `accounts/detail.html`의 js

   ```js
   const likeButtons = document.querySelectorAll('.like-button')
   likeButtons.forEach(function(button) {
       button.addEventListener('click', function(e){
           console.log(e)
           const userName = e.target.dataset.name
           const postId = e.target.dataset.id
           axios.get(`/accounts/${userName}/${postId}/like/`)
           .then(function(response){
               console.log(response)
           })
       })
   })
   ```

   + 여러개의 좋아요 버튼을 가져온 후 forEach로 하나씩 버튼을 가져와 이벤트리스너를 만들어준다.
   + 클릭을 하는 이벤트가 발생 시 리턴되는 상황을 e로 리턴시킨다.

   ![1556696087035](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556696087035.png)

   + 하트 클릭 시 이벤트 발생  => `console.log(e)`
   + 관련 데이터 출력 => `console.log(response)`

   

4. `accounts/views.py`

   ```python
   from django.http import JsonResponse
   
   
   def like:
       ...
       if post.like_users.filter(pk=user.id).exists():
           post.like_users.remove(user)
           is_like = False
       else:
           post.like_users.add(user)
           is_like = True
       return JsonResponse({'is_like': is_like, 'count': post.like_users.count()})
   ```

5. `accounts/detail.html`의 js

   ```js
   const likeButtons = document.querySelectorAll('.like-button')
   likeButtons.forEach(function(button) {
       button.addEventListener('click', function(e){
           console.log(e)
           const userName = e.target.dataset.name
           const postId = e.target.dataset.id
           axios.get(`/accounts/${userName}/${postId}/like/`)
           .then(function(response){
               console.log(response)
               if (response.data.is_like){
                   e.target.classList.remove('far')
                   e.target.classList.add('fas')
               }
               else{
                   e.target.classList.remove('fas')
                   e.target.classList.add('far')
               }
           })
       })
   })
   ```

6. 몇명 좋아요 했는지 표시

   `accounts/detail.html`

   ```django
   <strong>{{ post.like_users.first }}</strong>님 외 <strong><span id="like-count-{{post.pk}}">{{ post.like_count|add:"-1" }}</span>명</strong>이 좋아합니다
   
   ```

   부분에서 몇명인지 표시하는 부분을 span으로 묶어서 id 설정

7. `accounts/detail.html`의 js

   ```js
   const likeButtons = document.querySelectorAll('.like-button')
   likeButtons.forEach(function(button) {
       // 이벤트가 발생하면
       button.addEventListener('click', function(e){
           console.log(e)
           const userName = e.target.dataset.name
           const postId = e.target.dataset.id
           // 장고 서버로 요청을 보내고
           axios.get(`/accounts/${userName}/${postId}/like/`)
           // 성공하면, response에 장고에서 보낸 내용이 담겨있고, (JSON)
           .then(function(response){
               // 실제 모습처럼 그린다. 새롭게( 원래 있던 내용 위에 덮어씌우게 된다.)(실제 로딩되었을때의 화면과 동일)
               const likeCount = document.querySelector(`#like-count-${postId}`)
               
               likeCount.innerText = response.data.count - 1
               
               console.log(response)
               if (response.data.is_like){
                   e.target.classList.remove('far')
                   e.target.classList.add('fas')
               }
               else{
                   e.target.classList.remove('fas')
                   e.target.classList.add('far')
               }
           })
       })
   })
   ```

8. 'XX님 외' 몇 명 으로 수정하기

   `accounts/views.py`

   ```python
   @login_required
   def like(request, user_name, post_pk):
       post = get_object_or_404(Post, pk=post_pk)
       user = request.user
       if post.like_users.filter(pk=user.id).exists():
           post.like_users.remove(user)
           is_like = False
       else:
           post.like_users.add(user)
           is_like = True
       if post.like_users.count():
           first_user = f'{post.like_users.first()}님 외 '
       else:
           first_user = ''
       print(first_user)
       return JsonResponse({'is_like': is_like, 'count': post.like_users.count(), 'first_user': first_user})
   
   ```

   `accounts/detail.html`

   ```html
   <!--좋아요 수 표시-->
   <div class="footer m-0 p-0">
       
       <span id="like-user-{{post.pk}}">{% if post.like_count == False %}{% else %}<strong>{{ post.like_users.first }}</strong>님 외 {% endif %}</span><strong><span id="like-count-{{post.pk}}">{% if post.like_count == False %}{{ post.like_count }}{% else %}{{ post.like_count|add:"-1" }}{% endif %}</span>명</strong>이 좋아합니다
       
   </div>
   ```

   `accounts/detail.html/js`

   ```js
   const likeCount = document.querySelector(`#like-count-${postId}`)
   const likePerson = document.querySelector(`#like-user-${postId}`)
   if (response.data.count){
       likeCount.innerText = response.data.count - 1
   }
   else likeCount.innerText = response.data.count
   likePerson.innerText = response.data.first_user
   console.log(likePerson)
   ```



### 팔로우

1. `detail.html`

   ```django
   {% if user != user_info %}
   	<button data-name="{{user_info.username}}" class="follow-button" id="follow_check">
           	{% if user in user_info.followers.all%} unfollow {% else %} follow {% endif %}
   	</button>
   {% endif %}
   ```

   

   `detail.html/js`

   ```js
   followButton.addEventListener('click', function(e){
       
       console.log(e)
           const userName = e.target.dataset.name
           axios.get(`/accounts/${userName}/follow/`)
           .then(function(response){
               console.log(response)
               const followCheck = document.querySelector(`#follow_check`)
               const followerCnt = document.querySelector('#follower_cnt')
               followCheck.innerText = response.data.follow_check
               followerCnt.innerText = response.data.follow_count
               
           })
   })
   ```

   

   `accounts/views.py`

   ```python
   def follow(request, user_name):
       User = get_user_model()
       user = get_object_or_404(User, username = user_name)
       
       if request.user in user.followers.all():
           user.followers.remove(request.user)
           is_follow = False
           follow_check = 'follow'
       else:
           user.followers.add(request.user)
           is_follow = True
           follow_check = 'unfollow'
           
       return JsonResponse({'is_follow': is_follow, 'follow_check': follow_check, 'follow_count': user.followers.count()})
   
   ```

   + 받을 버튼 명을 follow_check로 보내준다.

   

   ​                           

2. 현재 버튼으로 사용했으나, a태그로도 사용할 수 있다.

   `accounts/detail.html`

   ```html
   {% if user != user_info %}
       {% if user in user_info.followers.all %}
       <a href="{% url 'accounts:follow' user_info %}" id="follow-button">unfollow</a>
       {% else %}
       <a href="{% url 'accounts:follow' user_info %}" id="follow-button">follow</a>
       {% endif %}
   {% endif %}
   ```

   

   ```django
   <div class="follow-count">
       <div class="col-4">팔로워 <span id='follower_cnt'>{{ user_info.followers.all.count}}</span></div>
   	<div class="col-4">팔로우 <span id='following_cnt'>{{ user_info.followings.all.count}}</span></div>
   </div>
   
   ```

   

   

   `accounts/detail.html/js`

   ```js
   const followButton = document.querySelector('#follow-button')
   followButton.addEventListener('click', function(e){
       e.preventDefault()	// a태그로 사용하게 되면 a태그의 움직임을 멈추게 한다.
       const url = e.target.getAttribute('href')// a 태그의 url을 가져온다.
       axios.get(url)
           .then(function(response){
           const followCountDiv = document.querySelector('.follow-count')
           followCountDiv.children[1].innerText = `팔로워: ${response.data.following_count}`
           followCountDiv.children[0].innerText = `팔로워: ${response.data.follower_count}`
           e.target.innerText = response.data.is_follow ? '언팔' : '팔로우'
       })
   }
   ```

   



### 모든 요청을 POST로 바꾸기

1. js

   ```js
   axios.post(`/accounts/${userName}/follow/`)
   ```

   로 만들게 되면 

   ![1556763297075](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556763297075.png)

   어마무시한 에러가 뜨는데 

   ![1556763311663](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556763311663.png)

   CSRF 토큰을 가져와야하는데 이것을 만들기 위해서 form을 만드는것은 너무 힘들다.

   이 때 쿠키를 보면 

   ![1556763341495](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556763341495.png)

   csrf 토큰이 존재하기 때문에 이것을 가져올것.

   ![1556763386902](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556763386902.png)

   여기에서 우리가 가져오고 싶은 것은 csrftoken. 가져오기

   => axios에는 이것을 가져오는 방법이 존재한다.

   ```js
   axios.defaults.xsrfCookieName = 'csrftoken'
   ```

   + 쿠키에 존재하는 csrf토큰을 가져오며, 이것을 header에 넣어야만 한다.

   ```js
   axios.defaults.xsrfHeaderName = 'X-CSRFToken'
   // Django에서 csrftoken을 Header에 담을 때 X-CSRFToken 으로 보내라고 했어용
   ```

   + 이렇게 header에 넣어준다.
   + 이렇게만 해도 팔로우/언팔로우는 된다

   

   `accounts/views.py`

   ```python
   @login_required
   @require_POST
   def follow(request, user_name):
       if request.is_ajax():
           User = get_user_model()
           user = get_object_or_404(User, username = user_name)
           
           if request.user in user.followers.all():
               user.followers.remove(request.user)
               is_follow = False
               follow_check = 'follow'
           else:
               user.followers.add(request.user)
               is_follow = True
               follow_check = 'unfollow'
           data = {'is_follow': is_follow, 'follow_check': follow_check, 
                   'follower_count': user.followers.count(),
                   'followingCount': user.followings.count()
                   }
           # return redirect('accounts:detail', user_name)
           return JsonResponse(data)
   ```

   require_POST를 해주자!

   [is_ajax](<https://docs.djangoproject.com/en/2.2/ref/request-response/#django.http.HttpRequest.is_ajax>): Returns `True` if the request was made via an `XMLHttpRequest`, by checking the `HTTP_X_REQUESTED_WITH` header for the string`'XMLHttpRequest'`. Most modern JavaScript libraries send this header. If you write your own `XMLHttpRequest` call (on the browser side), you’ll have to set this header manually if you want `is_ajax()` to work.

   => 위 설명에 맞게 js를 수정

   ```js
           console.log(e)
               const userName = e.target.dataset.name
               axios.defaults.headers.common['HTTP_X_REQUESTED_WITH'] = 'XMLHttpRequest'
               axios.defaults.xsrfCookieName = 'csrftoken'
               axios.defaults.xsrfHeaderName = 'X-CSRFToken' 
   
   ```

   common 부분을 넣어주기

   =>but 이건 버전문제? 때문에 안됩니다

   so, `axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'`

   이렇게 수정해주면 바뀝니당

   

   이후 ajax 가 아닌 다른 정보가 들어올 때 400 에러를 띄우기 위해

   `accounts/views.py`

   ```python
   from django.http import JsonResponse, HttpResponseBadRequest
   
   def follow(request, user_name):
       if request.is_ajax():
           ...
           return JsonResponse(data)
       else:
           return HttpResponseBadRequest
   ```

   이렇게 설정해준다.

   

   

   

   

   

   

## [django 에서 사용하기 (댓글 작성/삭제)](<https://www.zerocho.com/category/HTML&DOM/post/59465380f2c7fb0018a1a263>)

### 댓글 작성





## [Ajax?](<https://coding-factory.tistory.com/143>)

> Ajax : javaScript의 라이브러리 중 하나이며 Asynchronous Javascript And Xml(비동기식 자바스크립트와 xml)의 약자.
>
> 자바스크립트를 사용한 비동기 통신, 클라이언트와 서버간에 XML 데이터를 주고받는 기술.









## [Vue.js](<https://kr.vuejs.org/v2/guide/index.html>)

+ js와 가장 다른 점? : 명령형. (like django)

+ vue와 element와 연결을 한 후, 연결한 vue에서 data라는 object를 만들어 관리를 해준다.

+ MVVM 모델 : M / V / VM(view model)

  ​			M / T / V

  ​			M / V / C

+ this 쓸 때 약속!!!@!@!@!@!

  1. 모든 함수는 function 키워드로
  2. 메서드에서 쓰이는 함수 중에 콜백 함수는 arrow function
  3. 메서드 정의시에는 function 키워드



### 사용

```
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

부분을 body 닫는 태그 위에 작성





### hello, vue

`html`

```html
<div id='app'>
    {{message}}
</div>
```

`js`

```js
const app = new Vue({
    // element : 실제 Vue와 연결 할 element
    el: '#app',
    // app (vue 인스턴스)의 속성을 가지게 된다.
    data: {
        message: 'Hello, Vue!'
    }
})
```

+ element : 실제 Vue와 연결 할 element

  

이후 콘솔에서 

```
app.message = 'bye'
```

로 사용하면 값이 변경된다.



### methods 사용하기

+ methods는 함수와 유사하다. 이 때에는 값을 넣는것이 아니라 this 및 data에서 정의해준 변수(?)를 가져와 사용할 수 있다.
+ this라는 것을 사용하는데, 이 때의 this는 python의 self와 같은 역할을 한다. 이 때문에 arrow function을 사용할 수 없다.
  + 우리가 버튼을 누를 때 this가 가리키는 것은 그 버튼이 되길 원한다.
  + arrow function에서 가리기는 것은 자신의 위. 버튼이 붙어있는 곳. (윈도우가 될 수 도 있다)을 가리키게 된다.
  + arrow function => lexicial this : 문맥상에서 가져온다.
+ 함수를 만들때에 def 키워드를 사용하지 않는다.



1. 증가 함수 만들기

   `html`

   ```html
   <div id='app'>
       {{message}} - {{count}}
   
   </div>
   ```

   `js`

   ```js
   const app = new Vue({
       // element : 실제 Vue와 연결 할 element
       el: '#app',
       // app (vue 인스턴스)의 속성을 가지게 된다.
       data: {
           message: 'Hello, Vue!',
           count: 0
       },
       methods: {
           plus: function() {
               this.count ++
           }
       }
   })
   ```

2. 버튼을 눌러 만들기

   + v-on과 같은 방식으로 `addEventListener`와 같은 방식을 쉽게 사용할 수 있다.

     ```html
     <div id='app'>
         <button v-on:click="plus">Count 증가</button>
         {{message}} - {{count}}
     </div>
     ```

     button에 `v-on:click`을 설정. 



### todo list

1. to do list 만들어서 출력하기

   `html`

   ```html
       <div id="app">
           {{ todoList }}
       </div>
   ```

   `js`

   ```js
           // 시작은 새 앱을 만들기
           const app = new Vue({
               // 바라봐야 할 지점을 element에 넣기
               el: '#app',
               data: {
                   todoList: [
                       '쉬는 시간',
                       '11시 수업 듣기',
                       '밥먹기',
                       '취업특강.....',
                       '스타듀밸리로 귀농하기'
                   ]
               }
           })
   ```

   ![1556848160886](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556848160886.png)

2. 반복문 돌리기 => `v-for`

   ```html
       <div id="app">
           <ul>
               <li v-for="todo in todoList">
                   {{ todo }}
               </li>
           </ul>
       </div>
   ```

   ![1556848197949](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556848197949.png)

   

3. object로 변경하기

   ```js
   // 시작은 새 앱을 만들기
   const app = new Vue({
       // 바라봐야 할 지점을 element에 넣기
       el: '#app',
       data: {
           todoList: [
               {
                   content: '쉬는 시간',
                   completed: true
               },
               {
                   content: '11시 수업 듣기',
                   completed: false
               },
               {
                   content: '밥먹기',
                   completed: false
               },
               {
                   content: '취업특강.....',
                   completed: false
               },
               {
                   content: '스타듀밸리로 귀농하기',
                   completed: false
               }
               
           ]
       }
   })
   ```

   ![1556849190331](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556849190331.png)

   

4. 내용만 출력

   `html`

   ```html
   <div id="app">
       <ul>
           <li v-for="todo in todoList">
               {{ todo.content }}
           </li>
       </ul>
   </div>
   ```

   ![1556849261892](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556849261892.png)

5. 완료한 것은 출력하지 않기 => `v-if`

   `html`

   ```html
   <div id="app">
       <ul>
           <li v-for="todo in todoList" v-if="! todo.completed">
               {{ todo.content }}
           </li>
       </ul>
   </div>
   ```

6. > v-for 와 v-if가 있게 되면, v-for가 우선,  v-if 가 나중이다. 
   >
   > 이 경우 v-for 안에 v-if가 존재하게 된다.

7. v-else

   `html`

   ```html
   <div id="app">
       <ul>
           <!-- v-for가 우선,  v-if 가 나중이다.  -->
           <li v-for="todo in todoList" v-if="! todo.completed">
               {{ todo.content }}
           </li>
           <li v-else>완료했어요</li>
       </ul>
   </div>
   ```

   ![1556849446041](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556849446041.png)

   완료한 것을 완료했다고 띄울 수 있다.

   ```html
   <div id="app">
       <ul>
           <!-- v-for가 우선,  v-if 가 나중이다.  -->
           <li v-for="todo in todoList" v-if="! todo.completed">
               {{ todo.content }}
           </li>
           <li v-else><del>{{ todo.content}}</del></li>
       </ul>
   </div>
   ```

   ![1556849531178](C:\Users\student\Desktop\rain\rain-s_TIL\web\js\img\1556849531178.png)

   취소선으로 띄울수도 있다.

8. 완료 버튼을 만들어 한 것으로 체크하기

   `html`

   ```html
   <div id="app">
       <ul>
           <!-- v-for가 우선,  v-if 가 나중이다.  -->
           <li v-for="todo in todoList" v-if="! todo.completed">
               {{ todo.content }} <button v-on:click="complete(todo)">[완료]</button>
           </li>
           <li v-else><del>{{ todo.content}}</del></li>
       </ul>
   </div>
   ```

   + 버튼에 연결된 함수에 내가 한 것을 반환해준다.

   `js`

   ```js
   const app = new Vue({
       // 바라봐야 할 지점을 element에 넣기
       el: '#app',
       data: {
           todoList: [
               ...
           ]
       },
       methods: {
           complete: function(todo){
               todo.completed = true
           }
       }
   })
   ```

9. 완료한것도 취소하기

   `html`

   ```html
   <div id="app">
       <ul>
           <!-- v-for가 우선,  v-if 가 나중이다.  -->
           <li v-for="todo in todoList" v-if="! todo.completed">
               {{ todo.content }} <button v-on:click="complete(todo)">[완료]</button>
           </li>
           <li v-else><del>{{ todo.content}}</del><button v-on:click="complete(todo)">[취소]</button></li>
       </ul>
   </div>
   ```

   `js`

   ```js
   methods: {
       complete: function(todo){
           todo.completed = !todo.completed
       }
   ```

   + complete에서 받은 completed 값을 반대로 뒤집는다.

10. 새롭게 할 목록 추가받기

    1. 입력받은대로 출력하기

       `js`

       ```js
       const app = new Vue({
           // 바라봐야 할 지점을 element에 넣기
           el: '#app',
           data: {
               newTodo: '',
               ...
       ```

       `html`

       ```html
       <input type="text" v-model="newTodo"><br>
       {{ newTodo }}
       ```

       + v-model에서 new_Todo라는 값을 가져오는데, 이것은 js의 data에 있는 newTodo가 바뀌는 것이고 그것이 바뀔 때 마다 `{{ newTodo }}`가 계속해서 바뀌어 출력된다.

    2. 입력받은 것을 리스트에 추가하기( enter키 )

       `js`

       ```js
       methods: {
           complete: function(todo){
               todo.completed = !todo.completed
           },
           addNewTodo: function(){
               // this : vue object(app)
               // this.todoList : data's todoList
               
               this.todoList.push({
                   // this.newTodo : data's newTodo ( 사용자가 입력을 한 값 )
                   content: this.newTodo,
                   completed: false
               })
               this.newTodo = ''	// newTodo를 빈 문자열을 넘겨주면 입력창이 비워진다.
           }
       ```

       `html`

       ```html
       <div id="app">
           <!-- v-model : data의 newTodo 값이 사용자가 입력하는 값으로 변경됨 -->
           <input type="text" v-model="newTodo" v-on:keyup.enter="addNewTodo"><br>
           {{ newTodo }}
           <ul>
       ```

       + `v-on:keyup.enter=""` : 엔터 버튼을 누를 때 발생할 함수를 입력해준다.

11. 모두 다 한번에 완료

    + for

    `html`

    ```html
    <button v-on:click="allComplted">All complted</button>
    ```

    `js`

    ```js
    methods: {
        ...
        allComplted: function(){
            this.todoList.forEach(function(todo){
                todo.completed = true
            })
        }
    ```

    

    









### 댕댕이 가져오기

1. 가져오기

   `html`

   ```html
   <div id="app">
       <button v-on:click="getDogImage">댕댕이</button>
       <img v-bind:src="image">
   </div>
   ```

   + image를 그냥 출력하면 url이 뜨는데 이걸 img 태그의 src로 바인딩 시키기 위해서는 위와 같이 사용한다.

   `js`

   ```js
   const getDogImage = function() {
       axios.get('https://dog.ceo/api/breeds/image/random')
       .then(response => this.image = response.data.message)
       
   }
   const app = new Vue({
       el: '#app',
       data: {
           image: ''
       },
       methods: {
           getDogImage
       }
   })
   ```

2. 댕댕이 여러마리 가져오기

   `js`

   ```js
   const getDogImage = function() {
       axios.get('https://dog.ceo/api/breeds/image/random')
       .then(response => this.images.push(response.data.message))
       
   }
   const app = new Vue({
       el: '#app',
       data: {
           images: []
       },
       methods: {
           getDogImage
       }
   })
   ```

   `html`

   ```html
   <div id="app">
       <button v-on:click="getDogImage">댕댕이</button>
       <img 
           v-for="image in images"
           v-bind:src="image"
       >
   </div>
   ```

3. 댕댕이 마리수 체크하기

4. 



















