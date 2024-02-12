

let randomNumber = 0 //★★★★★랜덤번호 저장해줄 변수
let $resultArea = document.getElementById('result-area');
let $userInput = document.getElementById('user-input'); //input
let $playButton = document.getElementById('play-button'); //button
let $chanceArea = document.getElementById('chance-area'); // chance count
let $resetButton = document.getElementById('reset-button'); //reset button
let chances  = 5;
let history = [];
let gameOver = false;

$playButton.addEventListener('click', playButton); //Go버튼 클릭할 경우
$userInput.addEventListener('focus', function() {
	$userInput.value = '';
}); //input에 focus할 경우
$resetButton.addEventListener('click', reset); //reset버튼 클릭할 경우

function pickRandomNum(){
	randomNumber = Math.floor(Math.random() * 10) + 1; //컴퓨터 랜덤 숫자 1 ~ 10
	console.log(randomNumber);
}

function playButton(){
	inputValue = parseInt($userInput.value); //input value
	console.log(inputValue);

	if(inputValue < 1 || inputValue > 10) {
		$resultArea.textContent = '1 ~ 10까지 숫자를 입력하세요!!'
		return
	}

	if(history.includes(inputValue)) {
		$resultArea.textContent = '이미 입력한 숫자입니다 다른 숫자를 입력해 주세요';
		return;
	}
	
	if(randomNumber !== inputValue){
		chances -- ;
		$chanceArea.textContent = `남은기회 ${chances}번`;
		console.log('chanceArea' + chances);
	}

	if(randomNumber < inputValue){
		$resultArea.textContent ='Down!!';
	} else if(randomNumber > inputValue) {
		$resultArea.textContent ='up!!';
	} else if(randomNumber === inputValue){
		$resultArea.textContent = '아이구 맞췄네!!'
		//play버튼 활성화
		$playButton.disabled = true;
	};

	history.push(inputValue);

	if(chances < 1) {
		$resultArea.textContent = '안타깝네요! 다시 도전 하시겠습니까?'
		$playButton.disabled = true;
	}
}

function reset() {
	//user input창이 깨끗하게 정리되고
	$userInput.value = '';
	//play버튼 활성화
	$playButton.disabled = false;
	//새로운 번호가 생성되고
	//히스토리 리셋
	history = [];
	//랜덤번호 리셋
	pickRandomNum();
	//결과값 리셋	
	$resultArea.textContent = '준비하시고 시작!!'
	//찬스 카운트 리셋
	chances = 5;
	//남은기회 리셋
	$chanceArea.innerHTML = `남은 기회:${chances}`;
}

const $animateNumber = document.getElementById('animate-number');

function animateNumber() {
	setInterval(() => {
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        $animateNumber.textContent = i;
      }, (i - 1) * 600); //1초마다 숫자 변경
    }
  }, 1000); // 10초마다 애니메이션 반복
}

pickRandomNum();
animateNumber();
