    // 1. 배열 반복하면서 출력
    const avengers = ['캡틴아메리카', '토르', '헐크', '아이언맨', '블랙위도우', '블랙팬서', '앤트맨', '스파이더맨', '캡틴마블', '닥터스트레인지']
    // for (const a of avengers){
    //     console.log(a)
    // }
    // avengers.forEach( heroName => console.log(heroName))
    avengers.forEach( function (heroName){
        console.log(heroName)
    })
    // 2. map
    const numbers = [1, 2, 3]
    const strNumbers = numbers.map(number => String(number))
    console.log(strNumbers)
    const squreNumbers = numbers.map(number => number**2)
    console.log(squreNumbers)

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


    // 3. filter
    const nums = [1, 5, 6, 8]
    const evenNums = nums.filter(num => num%2 === 0)
    console.log(evenNums)

    const drinks = [
        {type: 'caffeine', name: 'cold brew'},
        {type: 'caffeine', name: 'green tea'},
        {type: 'juice', name: 'orange'},
        {type: 'juice', name: 'mango'}
    ]
    const nonCaffeine = drinks.filter(drink => drink.type !=='caffeine').map(obj => obj.name)
    console.log(nonCaffeine)


    // 4. reduce
    const reduceNum = [1, 5, 6]
    const reduceResult = reduceNum.reduce((acc, num) => acc += num*10, 0)
    console.log(reduceResult)


    // 5. find
    const dc = ['슈퍼맨', '배트맨', '아쿠아맨', '조커']
    const badguy = dc.find(name => name === '조커')
    console.log(badguy)

