function h(j, time) {
	console.log("h", j, time)
	if (document.getElementsByClassName(j)[0]!=undefined)
	document.getElementsByClassName(j)[0].style = " position:fixed; animation: move 10s infinite ; animation-fill-mode: forwards; "
}
function glam() {
	for (var i = 0; i < 47; i++) {
		al = document.createElement('span');
		al.className = i
		al.innerHTML = '<img src=card_back_large.png style="width:5%; position:fixed;bottom:2%;">'
		document.getElementsByClassName('cards')[0].appendChild(al)

	}
	setTimeout(() => {
		var time = 0



		console.log(time)


		let delay = 1000;

		setTimeout(() => h(46, 1000), delay);
		delay += 1000;
		setTimeout(() => h(45, 1000), delay);
		delay += 1000;
		setTimeout(() => h(44, 1000), delay);
		delay += 1000;
		setTimeout(() => h(43, 1000), delay);
		delay += 1000;
		setTimeout(() => h(42, 1000), delay);
		delay += 1000;
		setTimeout(() => h(41, 1000), delay);
		delay += 1000;
		setTimeout(() => h(40, 1000), delay);
		delay += 1000;
		setTimeout(() => h(39, 1000), delay);
		delay += 1000;
		setTimeout(() => h(38, 1000), delay);
		delay += 1000;
		setTimeout(() => h(37, 1000), delay);
		delay += 1000;

		setTimeout(() => h(36, 1000), delay);
		delay += 1000;
		setTimeout(() => h(35, 1000), delay);
		delay += 1000;
		setTimeout(() => h(34, 1000), delay);
		delay += 1000;
		setTimeout(() => h(33, 1000), delay);
		delay += 1000;
		setTimeout(() => h(32, 1000), delay);
		delay += 1000;
		setTimeout(() => h(31, 1000), delay);
		delay += 1000;
		setTimeout(() => h(30, 1000), delay);
		delay += 1000;
		setTimeout(() => h(29, 1000), delay);
		delay += 1000;
		setTimeout(() => h(28, 1000), delay);
		delay += 1000;
		setTimeout(() => h(27, 1000), delay);
		delay += 1000;
		setTimeout(() => h(26, 1000), delay);
		delay += 1000;
		setTimeout(() => h(25, 1000), delay);
		delay += 1000;
		setTimeout(() => h(24, 1000), delay);
		delay += 1000;
		setTimeout(() => h(23, 1000), delay);
		delay += 1000;
		setTimeout(() => h(22, 1000), delay);
		delay += 1000;
		setTimeout(() => h(21, 1000), delay);
		delay += 1000;
		setTimeout(() => h(20, 1000), delay);
		delay += 1000;
		setTimeout(() => h(19, 1000), delay);
		delay += 1000;
		setTimeout(() => h(18, 1000), delay);
		delay += 1000;
		setTimeout(() => h(16, 1000), delay);
		delay += 1000;
		setTimeout(() => h(17, 1000), delay);
		delay += 1000;
		setTimeout(() => h(15, 1000), delay);
		delay += 1000;
		setTimeout(() => h(14, 1000), delay);
		delay += 1000;
		setTimeout(() => h(13, 1000), delay);
		delay += 1000;
		setTimeout(() => h(12, 1000), delay);
		delay += 1000;
		setTimeout(() => h(11, 1000), delay);
		delay += 1000;
		setTimeout(() => h(10, 1000), delay);
		delay += 1000;
		setTimeout(() => h(9, 1000), delay);
		delay += 1000;
		setTimeout(() => h(8, 1000), delay);
		delay += 1000;
		setTimeout(() => h(7, 1000), delay);
		delay += 1000;
		setTimeout(() => h(6, 1000), delay);
		delay += 1000;
		setTimeout(() => h(5, 1000), delay);
		delay += 1000;
		setTimeout(() => h(4, 1000), delay);
		delay += 1000;
		setTimeout(() => h(3, 1000), delay);
		delay += 1000;
		setTimeout(() => h(2, 1000), delay);
		delay += 1000;
		setTimeout(() => h(1, time), delay);
		delay += 1000;
		setTimeout(() => h(0, time), delay);




	}, 1000)

}

        

function chkname() {
	document.cookie = `roomid=Null;`
	glam()
	if (!document.cookie.includes(`username`)) {
		document.cookie = `roomid=Null;`
		document.cookie = `username=Null;`

		fetch("/gen_name", {
			method: "GET",

		}).then(response => response.json())
			.then(res => {
				console.log(res.userId)
				document.cookie = `username=${res.userId};`

			})
	}
	console.log(document.cookie.split(';')[0])
	setInterval(chkserv, 500)
}


function nopl(n) {

	fetch("/", {
		method: "POST",
		body: JSON.stringify({
			userId: cokkie('username'),
			nopl: n,
			roomid: document.getElementsByClassName("room")[1].value
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then(response => response.json())
		.then(res => {

			var cards = ""
			for (let i = 1; i < 5; i++) {
				console.log(res.plcards["p" + i])
				if ((res.plcards["p" + i]).length < 52)
					cards = cards + ("player" + i + ": " + (res.plcards["p" + i]) + "<br>")

			}
			cards = cards + res.restdeck + "<br>" + res.firstcard
			cardsss = []
			for (let i = 0; i < res.plcards["p1"].length; i++) {
				cardsss.push(res.plcards["p1"][i])
			}
			cardsss.push(res.firstcard)
			console.log(cardsss)
			document.getElementsByClassName('plinv')[0].id = (cardsss)

			for (let i = 0; i < cardsss.length; i++) {
				card = cardsss
				console.log(card)
				let name = ""

				if (card[i][0] == '+') {
					if (card[i][1] == '4')
						name = "wild_pick_four_large.png"
					else {
						cas = card[i][2]
						console.log(cas)
						switch (cas) {
							case 'r':
								a = "red"
								break

							case 'g':
								a = "green"
								break
							case 'b':
								a = "blue"
								break
							case 'y':
								a = "yellow"
								break


						}
						name = a + "_picker_large.png"
					}

				}


				else if (card[i][0] == 'r') {
					cas = card[i][card[i].length - 1]
					switch (cas) {
						case 'r':
							name = "red"
							break

						case 'g':
							name = "green"
							break
						case 'b':
							name = "blue"
							break
						case 'y':
							name = "yellow"
							break

					}
					name = name + "_reverse_large.png"

				}

				else if (card[i][0] == 's') {
					cas = card[i][card[i].length - 1]
					switch (cas) {
						case 'r':
							name = "red"
							break

						case 'g':
							name = "green"
							break
						case 'b':
							name = "blue"
							break
						case 'y':
							name = "yellow"
							break

					}
					name = name + "_skip_large.png"

				}

				else if (card[i] == 'wild')
					name = "wild_colora_changer_large.png"

				else if (Number.isInteger(Number.parseInt(card[i][0]))) {
					switch (card[i][0]) {
						case '1':
							if (card[i][1] == 'r')
								name = "red_1_large.png";
							else if (card[i][1] == 'g')
								name = "green_1_large.png";
							else if (card[i][1] == 'b')
								name = "blue_1_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_1_large.png";
							break;
						case '2':
							if (card[i][1] == 'r')
								name = "red_2_large.png";
							else if (card[i][1] == 'g')
								name = "green_2_large.png";
							else if (card[i][1] == 'b')
								name = "blue_2_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_2_large.png";
							break;
						case '3':
							if (card[i][1] == 'r')
								name = "red_3_large.png";
							else if (card[i][1] == 'g')
								name = "green_3_large.png";
							else if (card[i][1] == 'b')
								name = "blue_3_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_3_large.png";
							break;
						case '4':
							if (card[i][1] == 'r')
								name = "red_4_large.png";
							else if (card[i][1] == 'g')
								name = "green_4_large.png";
							else if (card[i][1] == 'b')
								name = "blue_4_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_4_large.png";
							break;
						case '5':
							if (card[i][1] == 'r')
								name = "red_5_large.png";
							else if (card[i][1] == 'g')
								name = "green_5_large.png";
							else if (card[i][1] == 'b')
								name = "blue_5_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_5_large.png";
							break;
						case '6':
							if (card[i][1] == 'r')
								name = "red_6_large.png";
							else if (card[i][1] == 'g')
								name = "green_6_large.png";
							else if (card[i][1] == 'b')
								name = "blue_6_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_6_large.png";
							break;
						case '7':
							if (card[i][1] == 'r')
								name = "red_7_large.png";
							else if (card[i][1] == 'g')
								name = "green_7_large.png";
							else if (card[i][1] == 'b')
								name = "blue_7_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_7_large.png";
							break;
						case '8':
							if (card[i][1] == 'r')
								name = "red_8_large.png";
							else if (card[i][1] == 'g')
								name = "green_8_large.png";
							else if (card[i][1] == 'b')
								name = "blue_8_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_8_large.png";
							break;
						case '9':
							if (card[i][1] == 'r')
								name = "red_9_large.png";
							else if (card[i][1] == 'g')
								name = "green_9_large.png";
							else if (card[i][1] == 'b')
								name = "blue_9_large.png";
							else if (card[i][1] == 'y')
								name = "yellow_9_large.png";
							break;
						default:
							// Handle cases where the digit is not 1-9 or the character following it is not 'r', 'g', 'b', or 'y'
							break;
					}
				}

				console.log(name)
				if (i == 7)
					document.getElementsByClassName("firstcard")[0].innerHTML = "<img src = " + name + " style = 'width:15vh;'>"
				else
					document.getElementsByClassName("card")[i].innerHTML = "<img src = " + name + ">"
			}

		})
	document.getElementsByClassName("plinv")[0].style.display = 'flex'
	document.getElementsByClassName("game")[0].style.display = 'none'




}

function cokkie(srch) {
	cookiev = document.cookie.split(';')
	if (cookiev[0].includes(srch))
		return cookiev[0].split('=')[1]
	else if (cookiev[1].includes(srch))
		return cookiev[1].split('=')[1]


}
function gen() {

	n = document.getElementById("frm1").elements.no.value
	fetch("/gen_room",


		{
			method: "POST",
			body: JSON.stringify({
				userId: cokkie('username'),
				nopl: (n)

			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}



		}).then(response => response.json())
		.then(res => {
			document.cookie = `roomid=${res.roomid}`
			document.getElementsByClassName("cp")[0].innerHTML = document.getElementsByClassName("cp")[0].innerHTML+"Room Id:"+res.roomid
				document.getElementsByClassName("genorjoin")[0].innerHTML = res.roomid + '                     <input type="button" value="start" id="stargame" class="btngen" onclick="rungame()" style="display:none" />' 
			document.getElementById("stargame").style.display = "block"
		})
	//nopl(Number.parseInt(a))
	//document.getElementsByClassName("genorjoin")[0].style.display="none"
}


function join() {
   

	n = document.getElementById("frm2").elements.roomid.value
	document.getElementsByClassName("genorjoin")[0].innerHTML = ""
	document.getElementsByClassName("genorjoin")[0].style.display = 'none'


	document.getElementsByClassName("cards")[0].innerHTML = ""
	fetch("/join_room",


		{
			method: "POST",
			body: JSON.stringify({
				userId: cokkie('username'),
				rmid: Number.parseInt(n)

			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}



		}).then(response => response.json())
		.then(res => {
			document.cookie = `roomid=${res.rmid}`
			document.getElementsByClassName('genorjoin')[0].innerHTML = res.body 

		})

}


function gmover(arr)
{
console.log("heyo")
document.getElementsByClassName("gameovr")[0].style.display="flex";
		document.getElementsByClassName("deets")[0].innerHTML=`<center>🥇${arr[0]}<br>🥈${arr[1]}<br>🥉${arr[2]}<br>🏅${arr[3]}<br></center>`
}

function chkserv() {
	if (document.cookie.split(';').length == 2 && !(document.cookie.includes("Null")))

		fetch("/chkserv",
			{
				method: "POST",
				body: JSON.stringify({
					userId: cokkie('username'),
					rmid: cokkie('roomid')

				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(response => response.json())
			.then(res => {
				if (res.body.includes("good")) 
				{
					document.getElementsByClassName('cp')[0].style = "display: block; font - family: fantasy; border: solid white; border - radius: 5px; padding: 5px; width: fit - content; position: absolute; top: 2vh; right: 1vh;"



					cardsss = JSON.parse(res.p1)


					document.getElementsByClassName('ccppcc')[0].innerHTML =  "<br>No of cards<hr>p1 p2 p3 p4 <br />"
					if(res.p1c<51)
								   {

									if (res.p1c<10)
								   res.p1c="0"+res.p1c

						document.getElementsByClassName('ccppcc')[0].innerHTML = document.getElementsByClassName('ccppcc')[0].innerHTML + res.p1c+" "
}

					if (res.p2c < 51)
					{

						if (res.p2c < 10)

							res.p2c = "0" + res.p2c

						document.getElementsByClassName('ccppcc')[0].innerHTML = document.getElementsByClassName('ccppcc')[0].innerHTML + res.p2c + " "
					}

					if (res.p3c < 51)
					{ 
						if (res.p3c < 10)
							res.p3c = "0" + res.p3c


						document.getElementsByClassName('ccppcc')[0].innerHTML = document.getElementsByClassName('ccppcc')[0].innerHTML + res.p3c + " "
					}
					if (res.p4c < 51)
					{ 

						if (res.p4c < 10)

							res.p4c = "0" + res.p4c


						document.getElementsByClassName('ccppcc')[0].innerHTML = document.getElementsByClassName('ccppcc')[0].innerHTML + res.p4c
}

document.getElementsByClassName('ccp')[0].innerHTML = res.currentp
					document.getElementsByClassName('ccpp')[0].innerHTML = res.nextp
					document.getElementsByClassName('plinv')[0].innerHTML = ""
					console.log((cardsss))
					cardsss.push(res.firstcard)
					document.getElementsByClassName('plinv')[0].id = (cardsss)
					//  document.body.innerHTML=cards
					name572 = ''
					for (let i = 0; i < cardsss.length; i++) {
						card = cardsss
						console.log(card)
						let name = ""

						if (card[i][0] == '+') {
							if (card[i][1] == '4')
								name = "wild_pick_four_large.png"
							else {
								cas = card[i][2]
								console.log(cas)
								switch (cas) {
									case 'r':
										a = "red"
										break

									case 'g':
										a = "green"
										break
									case 'b':
										a = "blue"
										break
									case 'y':
										a = "yellow"
										break


								}
								name = a + "_picker_large.png"
							}

						}


						else if (card[i][0] == 'r') {
							cas = card[i][card[i].length - 1]
							switch (cas) {
								case 'r':
									name = "red"
									break

								case 'g':
									name = "green"
									break
								case 'b':
									name = "blue"
									break
								case 'y':
									name = "yellow"
									break

							}
							name = name + "_reverse_large.png"

						}

						else if (card[i][0] == 's') {
							cas = card[i][card[i].length - 1]
							switch (cas) {
								case 'r':
									name = "red"
									break

								case 'g':
									name = "green"
									break
								case 'b':
									name = "blue"
									break
								case 'y':
									name = "yellow"
									break

							}
							name = name + "_skip_large.png"

						}

						else if (card[i] == 'wild')
							name = "wild_colora_changer_large.png"

						else if (Number.isInteger(Number.parseInt(card[i][0]))) {
							switch (card[i][0]) {
								case '1':
									if (card[i][1] == 'r')
										name = "red_1_large.png";
									else if (card[i][1] == 'g')
										name = "green_1_large.png";
									else if (card[i][1] == 'b')
										name = "blue_1_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_1_large.png";
									break;
								case '2':
									if (card[i][1] == 'r')
										name = "red_2_large.png";
									else if (card[i][1] == 'g')
										name = "green_2_large.png";
									else if (card[i][1] == 'b')
										name = "blue_2_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_2_large.png";
									break;
								case '3':
									if (card[i][1] == 'r')
										name = "red_3_large.png";
									else if (card[i][1] == 'g')
										name = "green_3_large.png";
									else if (card[i][1] == 'b')
										name = "blue_3_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_3_large.png";
									break;
								case '4':
									if (card[i][1] == 'r')
										name = "red_4_large.png";
									else if (card[i][1] == 'g')
										name = "green_4_large.png";
									else if (card[i][1] == 'b')
										name = "blue_4_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_4_large.png";
									break;
								case '5':
									if (card[i][1] == 'r')
										name = "red_5_large.png";
									else if (card[i][1] == 'g')
										name = "green_5_large.png";
									else if (card[i][1] == 'b')
										name = "blue_5_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_5_large.png";
									break;
								case '6':
									if (card[i][1] == 'r')
										name = "red_6_large.png";
									else if (card[i][1] == 'g')
										name = "green_6_large.png";
									else if (card[i][1] == 'b')
										name = "blue_6_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_6_large.png";
									break;
								case '7':
									if (card[i][1] == 'r')
										name = "red_7_large.png";
									else if (card[i][1] == 'g')
										name = "green_7_large.png";
									else if (card[i][1] == 'b')
										name = "blue_7_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_7_large.png";
									break;
								case '8':
									if (card[i][1] == 'r')
										name = "red_8_large.png";
									else if (card[i][1] == 'g')
										name = "green_8_large.png";
									else if (card[i][1] == 'b')
										name = "blue_8_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_8_large.png";
									break;
								case '9':
									if (card[i][1] == 'r')
										name = "red_9_large.png";
									else if (card[i][1] == 'g')
										name = "green_9_large.png";
									else if (card[i][1] == 'b')
										name = "blue_9_large.png";
									else if (card[i][1] == 'y')
										name = "yellow_9_large.png";
									break;
								default:
									// Handle cases where the digit is not 1-9 or the character following it is not 'r', 'g', 'b', or 'y'
									break;
							}
						}
						// document.getElementsByClassName('plinv')[0].innerHTML = ""


						if (i == cardsss.length - 1) {
							document.getElementsByClassName("firstcard")[0].innerHTML = "<img src = " + name + " style = 'width:15%;'>"

						}
						else {
							if (document.getElementsByClassName('ccp')[0].innerHTML == cokkie('username')) {

								div = document.createElement('div');
								div.className = "card"
								div.innerHTML = `<img src =` + name + ` onclick='btnclik(${i})' >`
								element = document.getElementsByClassName('plinv')[0]
								element.appendChild(div)

							}
							else {

								let div = document.createElement('div');
								div.className = "card"
								let img = document.createElement('img');
								img.src = name
								img.style = 'filter:opacity(50%);'
								div.appendChild(img);
								element = document.getElementsByClassName('plinv')[0]

								element.appendChild(div)




							}


						}



						console.log(name)
						name572 = name






						document.getElementsByClassName('plinv')[0].style.display = "flex"
					}


				}
			
			else if(res.body.includes("finished")){
				gmover(res.ranks)

			}
			})
}


function btnclik(i) {

	fetch("/btnclik", {

		method: "POST",
		body: JSON.stringify({
			userId: cokkie('username'),
			rmid: cokkie('roomid'),
			card: (document.getElementsByClassName('plinv')[0].id).split(',')[i]

		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})

	document.getElementsByClassName('cp')[0].style = "display: block; font - family: fantasy; border: solid white; border - radius: 5px; padding: 5px; width: fit - content; position: absolute; top: 2vh; right: 1vh;"




}

function rungame() {
	document.getElementsByClassName("genorjoin")[0].innerHTML = ""
	document.getElementsByClassName("genorjoin")[0].style.display = 'none'


	document.getElementsByClassName("cards")[0].innerHTML = ""

	fetch("/strt",

		{
			method: "POST",
			body: JSON.stringify({
				userId: cokkie('username'),
				rmid: cokkie('roomid'),

			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})

	document.getElementsByClassName('cp')[0].style = "display: block; border-radius:5px;font - family: fantasy; border: solid white; border - radius: 5px; padding: 5px; width: fit - content; position: absolute; top: 2vh; right: 1vh;"
}


