const firstName = 'happy'
const lastName = 'hacking'
const name = firstName + lastName
//document.write('<h1>' + name + '</h1>')
// ES6+ : Template literal(템플릿 문자열)
document.write(`<h1>${name}</h1>`)

let userName = prompt('너 누구니?')
let message = `<h1>${userName}</h1>`
// document.write(message)

if (userName === '성민'){
    message = `<h1>${userName}이는 나가있어.</h1>`
} else if (userName === '슬기'){
    message = `<h1>${userName}는 일하자!</h1>`
} else{
    message = `<h1>${userName}은 수업듣자</h1>`
}
document.write(message)