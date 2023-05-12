const tableBodyRows=document.querySelectorAll('.dataRows')

const savedTheme=localStorage.getItem('theme')
if (!savedTheme) {
    console.log('Hello')
  const defaultTheme = 'dark';
  localStorage.setItem('theme', defaultTheme);
}

// else if (localStorage.getItem('theme') === 'dark') {
//     document.querySelector('.toggle').classList.remove('active');
//     document.querySelector('body').classList.remove('themeChange');
//     document.querySelector('.buy-link').classList.remove('themeChange');
//     document.documentElement.style.setProperty("--bg-color", "#191d28")
//     document.querySelector('td').classList.remove('themeChange');
// }
if(localStorage.getItem('theme') === 'light'){
    document.querySelector('.toggle').classList.add('active');
    document.querySelector('body').classList.add('themeChange');
    document.querySelector('.buy-link').classList.add('themeChange');
    document.documentElement.style.setProperty("--bg-color", "#ffffff")
    document.querySelector('td').classList.add('themeChange');
}

setInterval(()=>{
    fetch('/timer-update')
    .then(response => response.json())
    .then(data => {
        data.forEach((d,ind)=>{
            const cells=tableBodyRows[ind].querySelectorAll('td')
            cells[1].textContent=d.name;
            cells[2].textContent=d.last;
            cells[3].textContent=d.buy;
            cells[4].textContent=d.sell;
            cells[5].textContent=d.volume;
            cells[6].textContent=d.base_unit;
        })
    })
},60000)

//Timer functionality
let circularProgress = document.querySelector(".circular-progress"),
progressValue = document.querySelector(".progress-value");

let progressStartValue = 60,    
progressEndValue = 0
speed = 1000;

function startTimer(){
const progress=  setInterval(() => {
progressStartValue--;

if(progressStartValue == progressEndValue){
    clearInterval(progress);
    progressStartValue = 60;
    startTimer()
}
progressValue.textContent = `${progressStartValue}`
circularProgress.style.background = `conic-gradient(#3dc6c1 ${progressStartValue * 6}deg, #ededed 0deg)`

}, speed);

}

startTimer()


//theme toggling functionality
function animatedToggle(){
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('body').classList.toggle('themeChange');
    const isThemeLight = document.querySelector('body').classList.contains('themeChange');
    
    document.querySelector('.buy-link').classList.toggle('themeChange');
    document.documentElement.style.setProperty("--bg-color", isThemeLight?"#ffffff":"#191d28")
    document.querySelector('td').classList.toggle('themeChange');

    localStorage.setItem('theme', isThemeLight ? 'light' : 'dark');
}