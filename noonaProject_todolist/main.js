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
let taskList = []; // 할일 아이템을 배열로 추가
addButton.addEventListener('click', addTask);

function addTask() {
	//let taskContent = taskInput.value;
	let task = {
		id: randomIDGenerate(),
		taskContent: taskInput.value,
		isComplete: false
	}
	console.log(task);
	taskList.push(task);
	render();
}

function render() {
	let resultHtml = '';
	for(let i = 0; i < taskList.length; i++) { //할일 아이템을 하나하나 꺼내서 무엇을 하려고 하는구나!
		if(taskList[i].isComplete == true){
			resultHtml += `<div class="task on">
			<div class="task-text task-done">${taskList[i].taskContent}</div>
			<div class="task-button-wrap">
				<button onclick="toggleComplete('${taskList[i].id}')" class="check-button"></button>
				<button onclick="deleteTask('${taskList[i].id}')" class="delete-button"></button>
			</div>
		</div>`;
		} else {
			resultHtml += `<div class="task">
				<div class="task-text">${taskList[i].taskContent}</div>
				<div class="task-button-wrap">
					<button onclick="toggleComplete('${taskList[i].id}')" class="check-button"></button>
					<button onclick="deleteTask('${taskList[i].id}')" class="delete-button"></button>
				</div>
			</div>`;
		}
	}

	//<div id="task-board">resultHtml를 추가한다.</div>
	document.getElementById('task-board').innerHTML = resultHtml;
}

function toggleComplete(id) {
	//어떤 아이템을 선택했는지 알려줘야함
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
	for(let i = 0; i < taskList.length; i++) {
		if(taskList[i].id == id){ //만약 taskList에i번째 있는 id가 내가 뽑은 id와 같다면
			taskList.splice(i, 1) //taskList에 i번째 있는 아이템에 1개만 삭제하겠다.
			break; //탈출
		}
	}
	render(); //★★★값을 업데이트 해주면 ui도 업데이트 해줘야한다
}

//id값 부여 함수
function randomIDGenerate(){
	//함수의 결과물이 다른곳에서 사용할 경우 return이 필요하다.
	return '_' + Math.random().toString(36).substr(2, 9)
}