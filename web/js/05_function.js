// 1. 함수 선언식
let result = add(1, 3)
function add(num1, num2){
    return num1+num2
}
console.log(result)

// 2. 함수 표현식
let add2 = function (num1, num2) {
    return num1+num2
}
console.log(add2(1, 3))


// 3. ES6+ Arrow Function
let sub = (num1, num2) => {return num1-num2}

// 인자가 하나인 경우, () 생략 가능
// 단순 리턴인 경우, {} 및 리턴 키워드 생략 가능
let greeting = name => `${name}, 안녕!`
console.log(greeting('rain'))
let mul = (num1, num2) => num1 * num2
console.log(mul(1, 4))

// 인자가 없는 경우에는 () 작성
let hello = () => 'hello, world!'

//object 리턴시 : 반드시 소괄호 `()`로 묶어서 작성
let me = (name, age) => ({name, age})
console.log(me('hi', 3))

// 만약, default args(기본인자) 존재한다면?
let bonjour = (name = '동명') => `${name}, bonjour`

// 4. 익명함수
(function (num) {return num * num})

// 5. 즉시 실행 함수(익명함수 + 호출) = IIFE
(function (num) {return num * num})(5)