document.addEventListener('DOMContentLoaded', () => {
    // 게임 변수 초기화
    let randomNumber;
    let attempts = 0;
    const maxAttempts = 10;
    
    // DOM 요소
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const resetButton = document.getElementById('reset-button');
    const messageDiv = document.getElementById('message');
    const historyDiv = document.getElementById('history');
    const attemptsSpan = document.getElementById('attempts');
    
    // 게임 초기화 함수
    function initGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        attemptsSpan.textContent = attempts;
        messageDiv.textContent = '';
        messageDiv.className = '';
        historyDiv.textContent = '';
        historyDiv.style.display = 'none';
        guessInput.value = '';
        guessInput.disabled = false;
        guessButton.disabled = false;
        console.log('정답:', randomNumber); // 디버깅용, 실제 게임에서는 제거
    }
    
    // 숫자 확인 함수
    function checkGuess() {
        const userGuess = parseInt(guessInput.value);
        
        // 입력값 검증
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            messageDiv.textContent = '1부터 100 사이의 숫자를 입력해주세요!';
            messageDiv.className = 'too-high';
            return;
        }
        
        // 시도 횟수 증가
        attempts++;
        attemptsSpan.textContent = attempts;
        
        // 기록 표시
        if (historyDiv.style.display === 'none') {
            historyDiv.style.display = 'block';
        }
        
        // 결과 확인
        if (userGuess === randomNumber) {
            messageDiv.textContent = `정답입니다! ${attempts}번 만에 맞추셨습니다!`;
            messageDiv.className = 'correct';
            historyDiv.innerHTML += `<p>${attempts}번째 시도: ${userGuess} - 정답!</p>`;
            guessInput.disabled = true;
            guessButton.disabled = true;
        } else if (userGuess > randomNumber) {
            messageDiv.textContent = '너무 큰 숫자입니다!';
            messageDiv.className = 'too-high';
            historyDiv.innerHTML += `<p>${attempts}번째 시도: ${userGuess} - 너무 큼</p>`;
        } else {
            messageDiv.textContent = '너무 작은 숫자입니다!';
            messageDiv.className = 'too-low';
            historyDiv.innerHTML += `<p>${attempts}번째 시도: ${userGuess} - 너무 작음</p>`;
        }
        
        // 최대 시도 횟수 확인
        if (attempts >= maxAttempts && userGuess !== randomNumber) {
            messageDiv.textContent = `게임 오버! 정답은 ${randomNumber}였습니다.`;
            messageDiv.className = 'too-high';
            guessInput.disabled = true;
            guessButton.disabled = true;
        }
        
        // 입력 필드 초기화 및 포커스
        guessInput.value = '';
        guessInput.focus();
    }
    
    // 이벤트 리스너
    guessButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', initGame);
    
    // Enter 키로 제출
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    // 게임 시작
    initGame();
});