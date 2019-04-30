// 배열을 받아서 다 더해주는 함수를 작성
// numberAddEach(numbers)

const numberAddEach = numbers =>{
    let sum = 0
    for (const number of numbers){
        sum += number
    }
    return sum
}
console.log(numberAddEach([1, 2, 3]))
/*function numberAddEach(numbers) {
    let sum = 0
    for (let i of numbers){
        sum += i
    }
    return sum
}*/


const numberSubEach = numbers =>{
    let sum = 0
    for (const number of numbers){
        sum-= number
    }
    return sum
}
console.log(numberSubEach([1, 2, 3]))


const numberMulEach = numbers =>{
    let sum = 1
    for (const number of numbers){
        sum *= number
    }
    return sum
}
console.log(numberMulEach([1, 2, 3]))


const numberEach = (numbers, calc) => {
    let result
    for (const num of numbers){
        result = calc(num, result)
    }
    return result
}
const addEach = (num, result = 0) => result + num
const subEach = (num, result = 0) => result - num
const mulEach = (num, result = 1) => result * num

console.log(numberEach([10, 20, 30], addEach))
console.log(numberEach([10, 20, 30], subEach))
console.log(numberEach([10, 20, 30], mulEach))
console.log(numberEach([10, 20, 30], (num, result = 0) => result + num))
console.log(numberEach([10, 20, 30], function(num, result = 0) {
    return result + num
}))