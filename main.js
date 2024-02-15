/**
 * innerHTML은 요소(element)내에 포함 된 HTML 또는 XML 마크업을 가져오거나 설정한다.
 * click 이벤트 2가지 방법
 * 	1. onclick="toggleComplete()"
 *  2. addEventListener('click', 함수명)
 * 
 *  고유한 id 가져오는 방법
 *  검색어 : generate random id javascript
 * 
 * 	배열 아이템 삭제 방법
 *  how to remove item from array javascript
 * 
 *  ★★★값을 업데이트 해주면 ui도 업데이트 해줘야한다
 */

//유저가 값을 입력한다.
//+버튼을 클릭하면 할일이 추가된다.
//유저가 delete 버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
	//1.check 버튼을 클릭하는 순간 true false
	//2. true이면 끝난걸로 간주하고 밑줄 보여주기
	//3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면 언버바가 이동한다
//끝남탭은, 끝난 아이템만 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let taskList = []; // 할일 아이템을 배열로 추가
let mode = 'all'; //mode는 전역변수로 처음 초기값은 all로 한다.
let filterList = []; //진행중 아이템 필터하여 배열로 추가
let tabsUnderLine = document.getElementById('under-line');

//+버튼 클릭하면 addTask 함수실행
addButton.addEventListener('click', addTask);

//탭 메뉴 클릭하면 tabsIndicatore 함수실행
tabs.forEach(menu => menu.addEventListener('click',(e) => tabsIndicatore(e)));

//탭 메뉴 클릭하면 언더라인 위치 설정
function tabsIndicatore(e) {
	tabsUnderLine.style.left = e.currentTarget.offsetLeft + 'px';
	tabsUnderLine.style.width = e.currentTarget.offsetWidth + 'px';
	tabsUnderLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight -4 + 'px';

	//현재 클릭한 탭에만 'on' 클래스를 추가한다.
	e.currentTarget.classList.add('on');
	//다른 탭에 'on' 클래스를 제거한다.
	tabs.forEach(tab => {
		if(tab !== e.currentTarget) {
			tab.classList.remove('on');
		}
	})
}


//Enter버튼 클릭하면 자동으로 아이템 추가하기 (참조 검색어:How to add enter event javascript)
taskInput.addEventListener('keypress', (event) => {
	if(event.key == 'Enter'){
		event.preventDefault(); // 폼 제출 방지
		addTask(); //enter 키를 눌렸을 때 실행할 동작
	}
});

for(let i = 1; i < tabs.length; i++) {
	tabs[i].addEventListener('click', function(event){
		filter(event);
	});
}

//할일 추가할 정보
function addTask() {
	if(taskInput.value === ''){
		alert('할일을 입력해주세요');	
		return; // 빈 값이면 함수 종료
	}
	//let taskContent = taskInput.value;
	let task = {
		id: randomIDGenerate(),
		taskContent: taskInput.value,
		isComplete: false
	}
	//console.log(task);
	taskList.push(task);
	render();
}

function render() {
	//할일 입력 후 입력창 자동으로 비워지게
	taskInput.value = '';

	//1. 내가 선택한 탭에 따라서
	let list = [];
	if(mode === 'all'){
		//all taskList의 보여준다.
		list = taskList;
	} else if(mode === 'ongoing' || mode ==='done') {
		//ongoing, done의 filterList 보여준다.
		list = filterList;
	}

	let resultHtml = '';
	for(let i = 0; i < list.length; i++) { //할일 아이템을 하나하나 꺼내서 무엇을 하려고 하는구나!
		if(list[i].isComplete == true){
			resultHtml += `<div class="task on">
			<div class="task-text task-done">${list[i].taskContent}</div>
			<div class="task-button-wrap">
				<button onclick="toggleComplete('${list[i].id}')" class="check-button"></button>
				<button onclick="deleteTask('${list[i].id}')" class="delete-button"></button>
			</div>
		</div>`;
		} else {
			resultHtml += `<div class="task">
				<div class="task-text">${list[i].taskContent}</div>
				<div class="task-button-wrap">
					<button onclick="toggleComplete('${list[i].id}')" class="check-button"></button>
					<button onclick="deleteTask('${list[i].id}')" class="delete-button"></button>
				</div>
			</div>`;
		}
	}

	//<div id="task-board">resultHtml를 추가한다.</div>
	document.getElementById('task-board').innerHTML = resultHtml;
}

//어떤 아이템을 선택했는지 알려주는 함수실행
function toggleComplete(id) {
	console.log('id:', id);
	for(let i = 0; i < taskList.length; i++){
		if(taskList[i].id == id) { //taskList의 i번째 있는 id가 매개변수로 받은 id와 같다면
			//taskList[i].isComplete = true; //isComplete의 값을 true로 변경해준다.
			taskList[i].isComplete = !taskList[i].isComplete; //현재 가지고 있는 값의 반대값
			break; //찾는 순간 for문을 중단한다.
		}
	}
	render();
}

//삭제 버튼 클릭 함수
function deleteTask(id) {
	//할일 배열에서 아이템 삭제
	for(let i = 0; i < taskList.length; i++) {
		if(taskList[i].id == id){ //만약 taskList에i번째 있는 id가 내가 뽑은 id와 같다면
			taskList.splice(i, 1) //taskList에 i번째 있는 아이템에 1개만 삭제하겠다.
			break; //탈출
		}
	}

	//필터된 배열에서 아이템 삭제
	for(let i = 0; i < filterList.length; i++) {
		if(filterList[i].id == id){ //만약 filterList에i번째 있는 id가 내가 뽑은 id와 같다면
			filterList.splice(i, 1) //filterList에 i번째 있는 아이템에 1개만 삭제하겠다.
			break; //탈출
		}
	}
	console.log('삭제',deleteTask);
	render(); //★값을 업데이트 해주면 ui도 업데이트 해줘야한다
}

function filter(event){
	//console.log(event.target);
	//console.log("filter", event.target.className); //class로 target 하는 방법
	mode = event.target.id;
	filterList = [];

	if(mode === 'all') {
		//전체 리스트를 보여준다.
		render();
	} else if(mode === 'ongoing') {
		//진행중인 아이템을 보여준다.
		//task.isComplete = false
		for(let i = 0; i < taskList.length; i++){
			if(taskList[i].isComplete === false){
				filterList.push(taskList[i]);
			}
		}
		render();
		console.log('진행중', filterList);
	} else if (mode === 'done'){
		//끝나는 케이스
		//task.isComplete = true
		for(let i =0; i < taskList.length; i++){
			if(taskList[i].isComplete === true){
				filterList.push(taskList[i]);
			}
		}
		render();

	}
}

//id값 부여 함수
function randomIDGenerate(){
	//함수의 결과물이 다른곳에서 사용할 경우 return이 필요하다.
	return '_' + Math.random().toString(36).substr(2, 9)
}

