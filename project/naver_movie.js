const trs = document.querySelectorAll("#old_content > table > tbody > tr")

trs.forEach(movie => {
	if (movie.querySelector('td.title')){
		movie_one = movie.querySelector('td.title > div.tit5 > a')
		//console.log(movie_one.title)
		console.log(movie_one.href)
    }
	
})



trs.forEach(movie => {
	if (movie.querySelector('td.title')){
		movie_one = movie.querySelector('td.title > div.tit5 > a')
		console.log(movie_one.title)
		//console.log(movie_one.href)
    }
	
})



const enTitle = document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > strong")
enTitle.title.slice(0, -6)

const genre = document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1) > a").text
genre

year = document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(4)")
as = year.querySelectorAll("a")
const date = []
as.forEach(a => date.push(a.text))
date.join("")





const director = document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(4) > p > a").text
director

actor1 = document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p > a:nth-child(1)").text

actor2 = document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p > a:nth-child(2)").text

grade = document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a:nth-child(1)").text

story1 = document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div.story_area > h5").textContent

story2 = document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div.story_area > p").textContent

imageUrl = document.querySelector("#content > div.article > div.mv_info_area > div.poster > a > img").src

