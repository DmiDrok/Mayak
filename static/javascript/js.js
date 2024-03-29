//Функция для выпадающих списков

try{
	//Алгоритм для выпадающих списков
	let menu = document.querySelector("#dots_header");
	let	menuList = document.querySelector("#menu_social");
	let	navLink = document.querySelector(".nav_element");
	let	navServices = document.querySelector("#services_menu");
	let	burgerBlock = document.querySelector("#burger_mobile");
	let	burgerList = document.querySelector('.burger_list');
	
	//Для трёхточечного меню
	menu.addEventListener("mouseover", function(){
		menuList.style.display = "block";
	})

	menu.addEventListener("mouseout", function(){
		menuList.style.display = "none";
	})

	//Для списка услуг
	navLink.addEventListener("mouseover", function(){
		navServices.style.display = "block";
	})

	navLink.addEventListener("mouseout", function(){
		navServices.style.display = "none"
	})

	//Для меню мобильных устройств
	burgerBlock.addEventListener("mouseover", function(){
		burgerList.style.display = "block";
	})

	burgerBlock.addEventListener("mouseout", function(){
		burgerList.style.display = "none";
	})
}
catch(err){

}

//Слайдер третьего блока
try{
	
	const sliderLineThird = document.querySelector('.container_line');
	sliderLineThird.style.width = document.querySelector(".wrapper_third .container_line .block").offsetWidth * document.querySelectorAll(".wrapper_third .container_line .block").length + "px";
	const MAX = Number(sliderLineThird.clientWidth) - Number(document.querySelector(".wrapper_third .container_line .block").clientWidth)
	const MIN = 0;

	let sliderLeft = document.querySelector("#blue_slider_left");
	let sliderRight = document.querySelector("#blue_slider_right");

	let leftOff = 0;
	let next = document.querySelector('#next');
	let prev = document.querySelector('#prev');

	next.addEventListener("click", function(){
		leftOff = leftOff + document.querySelector(".wrapper_third .container_line .block").offsetWidth;
		if(leftOff > MAX){
			leftOff = MIN;
		}
		sliderLineThird.style.left = -leftOff + "px";
	})

		prev.addEventListener("click", function(){
		leftOff = leftOff - document.querySelector(".wrapper_third .container_line .block").offsetWidth;
		if(leftOff < MIN){
			leftOff = MAX;
		}
		sliderLineThird.style.left = -leftOff + "px";
	})

	/*sliderLeft.addEventListener("touchstart", function(e){
		leftOff = leftOff - document.querySelector(".wrapper_third .container_line .block").offsetWidth;
		if(leftOff < MIN){
			leftOff = MAX;
		}
		sliderLineThird.style.left = -leftOff + "px";
	})

	sliderRight.addEventListener("touchstart", function(e){
		leftOff = leftOff + document.querySelector(".wrapper_third .container_line .block").offsetWidth;
		if(leftOff > MAX){
			leftOff = MIN;
		}
		sliderLineThird.style.left = -leftOff + "px";
	})*/

}
catch(err){
	
}

//Слайдер первого блока
try{
const sliderWrapFirst = document.querySelector('.slider');
const sliderLine = document.querySelector('.slider_line');

let firstButton = document.querySelector("#first_button_bar");
let secondButton = document.querySelector("#second_button_bar");
let btn_args = [firstButton, secondButton];

let toLeft = document.querySelector("#slider_to_left");
let toRight = document.querySelector("#slider_to_right");

function saveOne(btn_args, save_btn){

	for (let i=0; i<btn_args.length; i++) {
		if (btn_args[i] != save_btn){
			btn_args[i].classList.remove("active");
		}

		save_btn.classList.add("active");
	}
}

firstButton.classList.add("active");

//Основной код слайдера
function sliderScroll(){
	firstButton.addEventListener("click", function(){
		sliderLine.style.left = document.querySelector(".slider_element").offsetWidth - document.querySelector(".slider_element").offsetWidth; + "px";
		saveOne(btn_args, firstButton);
	})
	secondButton.addEventListener("click", function(){
		sliderLine.style.left = -document.querySelector(".slider_element").offsetWidth + "px";
		saveOne(btn_args, secondButton);
	})


	toLeft.addEventListener("touchstart", function(){
		sliderLine.style.left = document.querySelector(".slider_element").offsetWidth - document.querySelector(".slider_element").offsetWidth; + "px";
		saveOne(btn_args, firstButton);
	})
	toRight.addEventListener("touchstart", function(){
		sliderLine.style.left = -document.querySelector(".slider_element").offsetWidth + "px";
		saveOne(btn_args, secondButton);
	})
}

// function sliderAuto(){
// 	//Число смещения для автопрокрутки
// 	let numberOff = 0;
// 		leftOff = 0;
// 	//Проверка разрешения монитора
// 	let monitor = setInterval(function monitorXmonitor(){
// 		if(window.screen.width < 420){
// 			numberOff = 750;
// 		}else if(window.screen.width < 1600){
// 			numberOff = 660;
// 		}else if(window.screen.width >= 1600){
// 			numberOff = 850;
// 		}
// 	}, 1000)

// 	//Автопрокрутка слайдера на первом блоке
// 	let autoscroll = setInterval(function forX(){
// 		leftOff = leftOff + numberOff;
// 		//Анимация кнопок
// 		if(leftOff == 0){
// 			firstButton.classList.add("active");
// 			secondButton.classList.remove("active");
// 		}else if(leftOff == numberOff){
// 			firstButton.classList.remove("active");
// 			secondButton.classList.add("active");
// 		}
// 		//Возвращение слайдера на первый блок
// 		sliderLine.style.left = -leftOff + "px";
// 		if(leftOff >= numberOff){
// 			leftOff = -numberOff;
// 		}
// 	}, 15000)

// 	//Сброс таймера по нажатию 
// 	firstButton.addEventListener("click", function(){
// 		clearInterval(autoscroll)
// 		console.log("Интервал Очищен!")
// 	})
// }

sliderScroll()
// sliderAuto()
}catch(err){
	//console.warn("Слайдер первого блока не обнаружен")
}
/////Код ПопАпа
const popupActive = document.querySelector(".telefon_children");

let popupWindow = document.querySelector("#popup");
let popupContent = document.querySelector(".popup_content");
let close = document.querySelector("#close");

	//Код вызова
	popupActive.addEventListener("click", function(){
		popupWindow.style.top = "0";
		popupWindow.style.left = "0";
		document.body.style.overflowY = "hidden"
	})

	//Код закрытия
	close.addEventListener("click", function(){
		popupWindow.style.top = "";
		document.body.style.overflowY = "scroll";
	})

	window.onclick = function(event){
		if(event.target == popup){
			popupWindow.style.position = "";
			popupWindow.style.top = "";
			document.body.style.overflowY = "scroll";
		}
	}


//Прогрузка блоков на странице с отзывами(Юристы)
if(window.screen.width > 1024){
	try{
	let buttonShow = document.querySelector("#button_load_more button");


		buttonShow.addEventListener("click", function(){
			let blocks = document.querySelectorAll(".hidden")
			for(let i = 0; i < 3 && i < blocks.length; i = i + 1){
				blocks[i].classList.remove("hidden");
			}

			if(document.querySelectorAll(".hidden").length == 0){
				buttonShow.style.display = "none";
			}
		})
	}catch(err){
		//console.warn("Блок с отзывами не обнаружен")
	}
}else{
	try{
	let buttonShow = document.querySelector("#button_load_more button");


		buttonShow.addEventListener("click", function(){
			let blocks = document.querySelectorAll(".hidden")

			for(let i = 0; i < 2 && i < blocks.length; i = i + 1){
				blocks[i].classList.remove("hidden");
			}

			if(document.querySelectorAll(".hidden").length == 0){
				buttonShow.style.display = "none";
			}
		})
	}catch(err){
		//console.warn("Блок с отзывами не обнаружен")
	}
}
//Прогрузка блоков с отзывами на странице психологической помощи
try{
	const buttonDisplay = document.querySelector(".more");
	const containerReviews = document.querySelector(".psiholog__wrapper_third .container");
	const blockHeight = document.querySelector(".psiholog__wrapper_third .container .block").clientHeight;

	containerReviews.style.height = (blockHeight + 20) + "px";

	let inRow = window.screen.width > 420 ? 3 : 2;
	let flag = true;


	buttonDisplay.addEventListener("click", function(){
		let hideBlocks = document.querySelectorAll(".psiholog__wrapper_third .container .block.hide");
		let move = Number(containerReviews.style.height.slice(0, -2));

		if (flag) {
			if (hideBlocks.length <= 0){
				flag = false;
				buttonDisplay.children[0].innerHTML = "Скрыть отзывы?";
				buttonDisplay.children[0].style.textDecoration = "underline";
			}
			else{
				try{
					for (let i=0; i<inRow; ++i){
						hideBlocks[i].classList.remove("hide");
					}
				}
				catch(err) {
					for (let i=0; i<hideBlocks.length; ++i){
						hideBlocks[i].classList.remove("hide");
					}
					flag = false;
					buttonDisplay.children[0].innerHTML = "Скрыть отзывы?";
					buttonDisplay.children[0].style.textDecoration = "underline";
				}
				hideBlocks = document.querySelectorAll(".psiholog__wrapper_third .container .block.hide");
				move += blockHeight + 20;
				containerReviews.style.height = move + "px";
			}
		}
		else {
			let allBlocks = document.querySelectorAll(".psiholog__wrapper_third .container .block");
			for (let block=3; block<allBlocks.length; ++block){
				allBlocks[block].classList.add("hide");
				containerReviews.style.height = (blockHeight + 20) + "px";
				buttonDisplay.children[0].innerHTML = "Больше отзывов";
				buttonDisplay.children[0].style.textDecoration = "none";
				flag = true;
			}
		}
	})
}
catch(err){
	console.error(err);
}



//Попапы на странице Школы Танцев
try{
	const dancePop = document.querySelectorAll(".dance_popup");
	const popWaltz = document.querySelector(".pop_waltz");
	const popSalza = document.querySelector(".pop_salza");
	const popTango = document.querySelector(".pop_tango");
	const popYoga = document.querySelector(".pop_yoga");

	let	closeDance = document.querySelector(".dance_close"),
		closeWaltz = document.querySelector(".waltz_close"),
		closeSalza = document.querySelector(".salza_close"),
		closeTango = document.querySelector(".tango_close"),
		closeYoga = document.querySelector(".yoga_close");

	let buttonPop = document.querySelectorAll(".dance_pop"),
		buttonWaltz = document.querySelector(".waltz"),
		buttonSalza = document.querySelector(".salza"),
		buttonTango = document.querySelector(".tango"),
		buttonYoga = document.querySelector(".yoga");

	let pops = {
		"Waltz": [buttonWaltz, popWaltz, closeWaltz],
		"Salza": [buttonSalza, popSalza, closeSalza],
		"Tango": [buttonTango, popTango, closeTango],
		"Yoga": [buttonYoga, popYoga, closeYoga]
	};

	//Функция которая покажет попап
	function showPopup(popup){
		popup.style.zIndex = "100000";
		popup.style.position = "fixed";
		popup.style.top = "0";
		popup.style.opacity = "1";

		document.body.style.overflowY = "hidden";
	}

	//Функция которая закроет попап
	function closePopup(popup){
		popup.style.opacity = "0";
		popup.style.position = "";
		popup.style.top = "";
		popup.style.zIndex = "-100";

		document.body.style.overflowY = "scroll";
	}

	for (let btn in pops){
		let showBtn = pops[btn][0];
		let popup = pops[btn][1];
		let closeBtn = pops[btn][2];

		showBtn.addEventListener("click", function(){
			showPopup(popup);
		})

		closeBtn.addEventListener("click", function(){
			closePopup(popup);
		})

		window.addEventListener("click", function(event){
			if(popup.style.position == "fixed" && event.target == popup){
				closePopup(popup);
			}
		})

	}
}
catch(err){
	
}

//Определяем устройство пользователя
try{
	let reg =  /(iPhone|Android|iPad|RIM)/;

	if (!navigator.userAgent.match(reg)){
		let slideBlockIndex1 = document.querySelector("#slider_to_left");
		let sliderBlockIndex2 = document.querySelector("#slider_to_right");

		let sliderBlockDom1 = document.querySelector("#dom_slider_left");
		let sliderBlockDom2 = document.querySelector("#dom_slider_right");

		slideBlockIndex1.style.display = "none";
		sliderBlockIndex2.style.display = "none";

		sliderBlockDom1.style.display = "none";
		sliderBlockDom2.style.display = "none";
	}
}
catch(err){

}

//Плавная прокрутка к форме
try{
	const anchors = document.querySelectorAll("a[href='#scroll_here_feedback']");

	for (let anchor of anchors){
		anchor.addEventListener("click", function(event){
			event.preventDefault();
			const blockFeedback = anchor.getAttribute("href");
			document.querySelector("" + blockFeedback).scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}
}
catch(err){

}

//Отступы первого блока
try{
	if (window.screen.width <= 1024){
		const header = document.querySelector("header");
		const firstWrapper = document.querySelector(".wrapper_first");

		firstWrapper.style.marginTop = header.clientHeight + "px";
	}
}
catch(err){

}

//Слайдер с отзывами на странице юристов
try{
	const accessSize = window.screen.width > 420 ? true : false;
	
	const leftBtn = document.querySelector("#left_reviews_btn");
	const rightBtn = document.querySelector("#right_reviews_btn");
	const slider = document.querySelector(".slider_reviews");
	const sliderLine = document.querySelector(".line_reviews");
	const sliderBlocks = document.querySelectorAll(".line_reviews > .review");
	const sliderNav = document.querySelector("#nav_reviews");
	const sliderTexts = document.querySelectorAll(".line_reviews > .review > .text_review");

	let navBtns = document.querySelectorAll(".nav_rev");

	let leftOff = 0;
	let move = sliderBlocks[0].clientWidth;

	sliderLine.style.width = sliderBlocks[0].clientWidth * sliderBlocks.length + "px";
	console.log(sliderBlocks[0].clientWidth);
	navBtns[0].classList.add("active");
	//sliderNav.style.bottom = slider.clientHeight - sliderTexts[0].clientHeight - 200 + "px";
	controlMargin(0);

	function controlMargin(number){
		if (accessSize){
			console.log(document.querySelector(".review").style.padding);
			sliderNav.style.bottom = slider.clientHeight - sliderTexts[number].clientHeight - 200 + "px";
		}
	}

	function controlInds(){

		for (let i=0; i<navBtns.length; i++){
			if (leftOff == -move*i){
				saveOne(navBtns[i]);
				controlMargin(i);
			}
		}

	}

	function saveOne(save){
		for (let btn of navBtns){
			btn.classList.remove("active");
		}
		save.classList.add("active");
	}

	for (let i=0; i<navBtns.length; i++){
		navBtns[i].addEventListener("click", function(){
			leftOff = -move * i;

			sliderLine.style.left = leftOff + "px";
			controlInds();
		})
	}

	leftBtn.addEventListener("click", function(){
		leftOff += move;
		if (leftOff > 0){
			leftOff = -move * (sliderBlocks.length-1);
		}

		sliderLine.style.left = leftOff + "px";
		controlInds();
	})

	rightBtn.addEventListener("click", function(){
		leftOff += -move;
		if (leftOff < -move * (sliderBlocks.length-1)){
			leftOff = 0;
		}

		sliderLine.style.left = leftOff + "px";
		controlInds();
	})

}
catch(err){
	console.error(err);
}