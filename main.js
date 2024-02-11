//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜던 번호가 < 유저번호 Down!!
//랜던 번호가 > 유저번호 Up!!
//Rest버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다.(더 이상 추측 불가, 버튼이 disable)
//유저가 1 ~ 100 범위 밖에 숫자를 입력하면 알려준다. + 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. + 기회를 깍지 않는다.

let computerNum = 0; //랜덤번호 저장해줄 변수
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 10;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = [];


playButton.addEventListener('click', play); //함수도 매개변수로 넘길 수 있다.
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function() {
	userInput.value = '';
})

function pickRandomNum(){
	//1부터 100까지 랜덤숫자 뽑기 
	//Math.random()은 0부터 1까지 랜덤하게 숫자 출력 But!! 1은 포함이 안돼는 1에 가까운 숫자를 반환
	//0 ~ 99까지 출력되는데 1 ~ 100까지 출력하기 위해 +1 을 해준다.
	computerNum = Math.floor(Math.random() * 10) + 1;
	console.log('정답', computerNum);
}

function play() {
	let userValue = userInput.value;

	if(userValue < 1 || userValue > 10) {
		resultArea.textContent = '1과 10사이 숫자를 입력해 주세요';
		return; //해당 블록에서 실행을 끝낸다.
	}

	if(history.includes(userValue)) {
		resultArea.textContent = '이미 입력한 숫자입니다 다른 숫자를 입력해 주세요';
		return;
	}

	chances -- ;
	chanceArea.textContent = `남은기회: ${chances}번`;
	console.log('chances', chances);
	
	if(userValue < computerNum) {
		resultArea.textContent = 'Up!!!';
	} else if (userValue > computerNum) {
		resultArea.textContent = 'Down!!!';
	} else {
		resultArea.textContent = '맞췄습니다!!!';
		gameOver = true;
	}
	
	history.push(userValue)
	console.log(history);

	if(chances < 1) {
		gameOver = true;
	}

	if(gameOver) {
		playButton.disabled = true;
	}
}

//리셋
function reset() {
	//user input창이 깨끗하게 정리되고
	userInput.value = '';
	//새로운 번호가 생성되고
	pickRandomNum();
	resultArea.textContent = '결과값이 여기 나옵니다.'

	gameOver = false;
	playButton.disabled = false;
	chances = 10;
	chanceArea.innerHTML = `남은 기회:${chances}`;
	userValueList = [];
}

pickRandomNum();