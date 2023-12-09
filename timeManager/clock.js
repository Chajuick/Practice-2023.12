const secHands = document.getElementById("clock_sec_hand");
const minHands = document.getElementById("clock_min_hand");
const hourHands = document.getElementById("clock_hour_hand");
const clockContainer = document.getElementById("clock_container");
const timeText = document.getElementById("time_text");
const dayText = document.getElementById("day_text");
const clockText = document.getElementById("clock_text");
const dayArr = ["일", "월", "화", "수", "목", "금", "토"];

const hourConvert = (hour) => {
    return hour > 12 ? hour - 12 : hour;
};
const dayConvert = (num) => {
    return dayArr[num];
};

function updateTime() {
    const current = new Date();
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1;
    const currentDate = current.getDate();
    const currentDay = dayConvert(current.getDay());
    const currentHour = current.getHours();
    const currentMin = current.getMinutes();
    const currentSec = current.getSeconds();
    currentHour > 12? clockContainer.classList.add('night') : clockContainer.classList.remove('night');

    timeText.innerText = `${currentHour > 12? "오후" : "오전"} ${hourConvert(currentHour).toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
    dayText.innerText = `${currentYear}년 ${currentMonth}월 ${currentDate}일 (${currentDay})`;
    // 각 손의 회전 각도 계산
    const secRotate = currentSec * 6 ;
    const minRotate = currentMin * 6 + currentSec * 0.1;  // 초에 따른 추가 회전
    const hourRotate = hourConvert(currentHour) * 30 + currentMin * 0.5 + currentSec * (0.5 / 60);  // 분에 따른 추가 회전
    
    // 각 손에 회전 값을 적용
    secHands.style.transform = `rotate(${secRotate}deg)`;
    minHands.style.transform = `rotate(${minRotate}deg)`;
    hourHands.style.transform = `rotate(${hourRotate}deg)`;

    setTimeout(updateTime, 1);
    if (window.innerHeight < 620) {
        clockText.style.opacity = 0;
    } else {
        clockText.style.opacity = 1;
    }
}

updateTime();
