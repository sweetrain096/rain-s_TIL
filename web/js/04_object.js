    //자바스크립트 데이터 타입 : 원시타입(primitive type)
    //Boolean(true, false), null, undefined, number, string
    let rain = {
        name: 'rain',
        age: 24,
        number : '010-3700-0000'
    }
    console.log(rain.name)
    console.log(rain.age)
    console.log(typeof rain)
    console.log(typeof [1, 2, 3])
    
    
    // ES6+ 추가 오브젝트 표현법
    // 변수를 그대로 넣으면, 변수명: 값
    let name = 'rain'
    let stuffs = ['텀블러', '안경']
    let sweet = {
        name,
        stuffs
    }
    
    // json <->object
    let jsonData = JSON.stringify(sweet)
    let jsonParse = JSON.parse(jsonData)