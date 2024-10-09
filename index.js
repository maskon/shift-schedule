let nowDate = new Date()
let nowDateNumber = nowDate.getDate()
let nowMonth = nowDate.getMonth()
let nextMonth = nowMonth + 1
let nowYear = nowDate.getFullYear()
let container = document.getElementById('month-calendar')
let monthContainer = container.getElementsByClassName('month-name')[0]
let yearContainer = container.getElementsByClassName('year-name')[0]
let daysContainer = container.getElementsByClassName('days')[0]
let prev = container.getElementsByClassName('prev')[0]
let next = container.getElementsByClassName('next')[0]
let monthName = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']

const daysTotal = document.getElementById('days-total')
const daysNight = document.getElementById('days-night')

const blue = 'rgb(75, 227, 255)'
const black = 'rgb(80, 80, 80)'
const white = 'rgb(255, 255, 255)'
const transparent = 'rgb(221, 221, 221)'

const discharge5 = 500
const discharge4 = 440
const discharge3 = 370

const calcZP = document.getElementById('calcZP')

let shiftsByMonth = []
let curDate = nowDate.setMonth(nowDate.getMonth() - 1)

let monthDay, monthPrefix, daysAfterMonth, monthDaysText

let lastDay, prevLastDay, prevPrevLastDay, curYear, curMonth, index, daySum, distance, colorIndex

let count1, count2, count3, countSum, sum

let startX = 0, startY = 0, isSwiped = false

// if (localStorage.getItem('HTML')) {
//     container.innerHTML = localStorage.getItem('HTML')
// }

function setMonthCalendar(year,month) {
    monthDays = new Date(year, month + 1, 0).getDate(),
    monthPrefix = new Date(year, month, 0).getDay(),
    daysAfterMonth = 7 - ( (monthDays + monthPrefix) % 7 ), // li после последней даты месяца
    monthDaysText = '' 
    monthContainer.textContent = monthName[month]
    yearContainer.textContent = year
    daysContainer.innerHTML = ''
    if (monthPrefix > 0){
        for (let i = 1  ; i <= monthPrefix; i++){
            monthDaysText += '<li></li>'
        }
    }
    for (let i = 1; i <= monthDays; i++){
        monthDaysText += '<li>' + i + '</li>'
    }
    if(daysAfterMonth === 7) {
        daysAfterMonth = 0
    }
    if (daysAfterMonth > 0) {
        for (let i = 1; i <= daysAfterMonth; i++) {
            monthDaysText += '<li></li>';
        }
    }
    daysContainer.innerHTML = monthDaysText
    if (month == nowMonth && year == nowYear){
        days = daysContainer.getElementsByTagName('li')
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now')
    }
    let colorIndex
    let lastDay = days[days.length - 1]
    const daysArray = Array.from(days); // Преобразование HTMLCollection в массив
    const daysWithNumbers = daysArray.filter(item => /\d/.test(item.textContent)); // Фильтрация элементов
    daysWithNumbers.forEach(function(item) {
        item.addEventListener('click', generateShifts)
    })
}

setMonthCalendar(nowYear,nowMonth)

prev.addEventListener('click', prenClick)
    function prenClick () {
        lastDay = days[(days.length - days.length) + monthPrefix]
        prevLastDay = days[(days.length - days.length) + monthPrefix + 1]
        prevPrevLastDay = days[(days.length - days.length) + monthPrefix + 2]
        curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent))
        curDate.setMonth(curDate.getMonth() - 1)
        curYear = curDate.getFullYear()
        curMonth = curDate.getMonth()
        setMonthCalendar(curYear,curMonth)
        count1 = 0
        count2 = 0
        count3 = 0
        countSum = 0
        const daysArray = Array.from(days); // Преобразование HTMLCollection в массив
        const daysWithNumbers = daysArray.filter(item => /\d/.test(item.textContent)); // Фильтрация элементов
        calcZP.innerHTML = '' // Очищаем отображение ЗП
        daySum = daysArray.length - daysWithNumbers.length
        if (lastDay.style.backgroundColor === blue && prevLastDay.style.backgroundColor === blue && prevPrevLastDay.style.backgroundColor === blue) {
                index = daysWithNumbers.length + 4  + monthPrefix
            }            
        if (lastDay.style.backgroundColor === blue && prevLastDay.style.backgroundColor === blue && prevPrevLastDay.style.backgroundColor === transparent) {
                index = daysWithNumbers.length + 3  + monthPrefix
            }            
        if (lastDay.style.backgroundColor === blue && prevLastDay.style.backgroundColor === transparent && prevPrevLastDay.style.backgroundColor === white) {
                index = daysWithNumbers.length + 2  + monthPrefix
            }    
        if (lastDay.style.backgroundColor === transparent && prevLastDay.style.backgroundColor === white && prevPrevLastDay.style.backgroundColor === white) {
                index = daysWithNumbers.length + 1 + monthPrefix
            }          
        if (lastDay.style.backgroundColor === white && prevLastDay.style.backgroundColor === white && prevPrevLastDay.style.backgroundColor === white) {
                index = daysWithNumbers.length - 0 + monthPrefix
            }
        if (lastDay.style.backgroundColor === white && prevLastDay.style.backgroundColor === white && prevPrevLastDay.style.backgroundColor === transparent) {
                index = daysWithNumbers.length - 1  + monthPrefix
            }
        if (lastDay.style.backgroundColor === white && prevLastDay.style.backgroundColor === transparent && prevPrevLastDay.style.backgroundColor === black) {
                index = daysWithNumbers.length - 2  + monthPrefix
            }
        if (lastDay.style.backgroundColor === transparent && prevLastDay.style.backgroundColor === black && prevPrevLastDay.style.backgroundColor === black) {
                index = daysWithNumbers.length - 3  + monthPrefix
            }
        if (lastDay.style.backgroundColor === black && prevLastDay.style.backgroundColor === black && prevPrevLastDay.style.backgroundColor === black) {
                index = daysWithNumbers.length - 4  + monthPrefix
            }
        if (lastDay.style.backgroundColor === black && prevLastDay.style.backgroundColor === black && prevPrevLastDay.style.backgroundColor === transparent) {
                index = daysWithNumbers.length - 5  + monthPrefix
            }
        if (lastDay.style.backgroundColor === black && prevLastDay.style.backgroundColor === transparent && prevPrevLastDay.style.backgroundColor === blue) {
                index = daysWithNumbers.length - 6  + monthPrefix
            }
        if (lastDay.style.backgroundColor === transparent && prevLastDay.style.backgroundColor === blue && prevPrevLastDay.style.backgroundColor === blue) {
                index = daysWithNumbers.length - 7  + monthPrefix
            }
        for (let i = 0; i < days.length; i++) {              
            days[i].style.backgroundColor = transparent                  
            distance = Math.abs(i - index)                  
            if (!isNaN(parseInt(days[i].textContent))) { 
                if (i >= index && (i - index) % 4 < 3) {
                    colorIndex = Math.floor((i - index) / 4) % 3
                    days[i].style.backgroundColor = [white, black, blue][colorIndex]
                    } else if (i < index) {
                        if ((distance - 1) % 4 === 1 || (distance - 1) % 4 === 2 || (distance - 1) % 4 === 3) {
                            colorIndex = Math.floor((distance - 2) / 4) % 3
                            days[i].style.backgroundColor = [blue, black, white][colorIndex]
                        }
                    }
                }       
                bgCalc(i)
        }
        updateShiftsDisplay()
        calc(5, discharge5)
        calc(4, discharge4)
        calc('2-3', discharge3)

        // saveHTML() // Сохраняем в localStorage
    }

next.addEventListener('click', nextClick) 
    function nextClick() {   
        lastDay = days[(days.length - 1) - daysAfterMonth]
        prevLastDay = days[(days.length - 2) - daysAfterMonth]
        prevPrevLastDay = days[(days.length - 3) - daysAfterMonth]
        curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent))
        curDate.setMonth(curDate.getMonth() + 1)
        curYear = curDate.getFullYear()
        curMonth = curDate.getMonth()
        setMonthCalendar(curYear,curMonth)  
        count1 = 0
        count2 = 0
        count3 = 0
        countSum = 0   
        const daysArray = Array.from(days); // Преобразование HTMLCollection в массив
        const daysWithNumbers = daysArray.filter(item => /\d/.test(item.textContent)); // Фильтрация элементов
        calcZP.innerHTML = '' // Очищаем отображение ЗП
        daySum = daysArray.length - daysWithNumbers.length   
        if (lastDay.style.backgroundColor === blue && prevLastDay.style.backgroundColor === blue && prevPrevLastDay.style.backgroundColor === blue) {
                index = 1 + daySum - daysAfterMonth
            }            
        if (lastDay.style.backgroundColor === blue && prevLastDay.style.backgroundColor === blue && prevPrevLastDay.style.backgroundColor === transparent) {
                index = 2 + daySum - daysAfterMonth
            }            
        if (lastDay.style.backgroundColor === blue && prevLastDay.style.backgroundColor === transparent && prevPrevLastDay.style.backgroundColor === black) {
                index = 3 + daySum - daysAfterMonth
            }   
        if (lastDay.style.backgroundColor === transparent && prevLastDay.style.backgroundColor === black && prevPrevLastDay.style.backgroundColor === black) {
                index = 4 + daySum - daysAfterMonth
            }          
        if (lastDay.style.backgroundColor === black && prevLastDay.style.backgroundColor === black && prevPrevLastDay.style.backgroundColor === black) {
                index = 5 + daySum - daysAfterMonth
            }
        if (lastDay.style.backgroundColor === black && prevLastDay.style.backgroundColor === black && prevPrevLastDay.style.backgroundColor === transparent) {
                index = 6 + daySum - daysAfterMonth
            }
        if (lastDay.style.backgroundColor === black && prevLastDay.style.backgroundColor === transparent && prevPrevLastDay.style.backgroundColor === white) {
                index = 7 + daySum - daysAfterMonth
            }
        if (lastDay.style.backgroundColor === transparent && prevLastDay.style.backgroundColor === white && prevPrevLastDay.style.backgroundColor === white) {
                index = 8 + daySum - daysAfterMonth
            }
        if (lastDay.style.backgroundColor === white && prevLastDay.style.backgroundColor === white && prevPrevLastDay.style.backgroundColor === white) {
                index = 9 + daySum - daysAfterMonth
            }
        if (lastDay.style.backgroundColor === white && prevLastDay.style.backgroundColor === white && prevPrevLastDay.style.backgroundColor === transparent) {
                index = 10 + daySum - daysAfterMonth
            }
        if (lastDay.style.backgroundColor === white && prevLastDay.style.backgroundColor === transparent && prevPrevLastDay.style.backgroundColor === blue) {
                index = 11 + daySum - daysAfterMonth
            }
        if (lastDay.style.backgroundColor === transparent && prevLastDay.style.backgroundColor === blue && prevPrevLastDay.style.backgroundColor === blue) {
                index = 12 + daySum - daysAfterMonth
            }   
        for (let i = 0; i < days.length; i++) {                   
            days[i].style.backgroundColor = transparent                 
            distance = Math.abs(i - index)                  
            if (!isNaN(parseInt(days[i].textContent))) {
                if (i >= index && (i - index) % 4 < 3) {
                    colorIndex = Math.floor((i - index) / 4) % 3
                    days[i].style.backgroundColor = [white, black, blue][colorIndex]
                    } else if (i < index) {
                        if ((distance - 1) % 4 === 1 || (distance - 1) % 4 === 2 || (distance - 1) % 4 === 3) {
                            colorIndex = Math.floor((distance - 2) / 4) % 3
                            days[i].style.backgroundColor = [blue, black, white][colorIndex]
                        }
                    }
                }        
                bgCalc(i)
        }
        updateShiftsDisplay()
        calc(5, discharge5)
        calc(4, discharge4)
        calc('2-3', discharge3)

        // saveHTML() // Сохраняем в localStorage
    }

function generateShifts(e) {
    calcZP.innerHTML = '' // Очищаем отображение ЗП
    const day = Number(e.target.textContent)
    const index = Array.from(days).indexOf(e.target)
        if (!isNaN(day)) {              
            count1 = 0
            count2 = 0
            count3 = 0
            countSum = 0 
            for (let i = 0; i < days.length; i++) {
                days[i].style.backgroundColor = transparent
                let distance = Math.abs(i - index);
                let isRelevant = (distance - 1) % 4 < 3 
                if (!isNaN(parseInt(days[i].textContent))) {
                if (i >= index && (i - index) % 4 < 3) {
                    let colorIndex = Math.floor((i - index) / 4) % 3
                    days[i].style.backgroundColor = [white, black, blue][colorIndex]
                } else if (i < index) {
                    if ((distance - 1) % 4 === 1 || (distance - 1) % 4 === 2 || (distance - 1) % 4 === 3) {
                        let colorIndex = Math.floor((distance - 1) / 4) % 3
                        days[i].style.backgroundColor = [blue, black, white][colorIndex]
                        }
                    }
                }
                bgCalc(i)
            }
        }
    updateShiftsDisplay() // Обновляем отображение графика   
    calc(5, discharge5) // Считаем ЗП на 5 разряде
    calc(4, discharge4) // Считаем ЗП на 4 разряде
    calc('2-3', discharge3) // Считаем ЗП на 2 и 3 разряде

    // saveHTML()  // Сохраняем в localStorage
}

// Считаем кол-во смен
function bgCalc(i) {
    if (days[i].style.backgroundColor === white) {
        count1++
        }
    if (days[i].style.backgroundColor === blue) {
        count2++
        }
    if (days[i].style.backgroundColor === black) {
        count3++
        }       
    countSum = count1 + count2 + count3
}

// Выводим на страницу кол-во смен
function updateShiftsDisplay() {
    daysNight.innerHTML = `Ночных смен в этом месяце - <span class="days-text_num">${count3}</span>`
    daysTotal.innerHTML = `Всего смен в этом месяце - <span class="days-text_num">${countSum}</span>`
    // localStorage.setItem('count3', count3)
    // localStorage.setItem('countSum', countSum)
    // console.log(localStorage.getItem('count3'))
    // console.log(localStorage.getItem('countSum'))
}

// Расчет ЗП по разряду
function calc(num, col) {
    sum = ((countSum * col * 8) + (count3 * col * 8 * 40 / 100)) + (countSum * 40)
    Array.from(daysContainer.getElementsByTagName('li')).forEach(item => {
        if (monthContainer.innerHTML === 'февраль' && item.innerHTML === '23' || 
            monthContainer.innerHTML === 'март' && item.innerHTML === '8' || 
            monthContainer.innerHTML === 'май' && item.innerHTML === '1' || 
            monthContainer.innerHTML === 'май' && item.innerHTML === '9' || 
            monthContainer.innerHTML === 'июнь' && item.innerHTML === '12' || 
            monthContainer.innerHTML === 'ноябрь' && item.innerHTML === '4') {
            if (item.style.backgroundColor === 'rgb(255, 255, 255)') {
                sum += (col * 8)
                // console.log('1 смена (8 часов)')
            }
            if (item.style.backgroundColor === 'rgb(75, 227, 255)') {
                sum += (col * 8)
                // console.log('2 смена (8 часов)')
            }
            if (item.nextSibling.style.backgroundColor === blue && 
                    item.nextSibling.nextSibling.style.backgroundColor === blue) {
                        sum += (7 * ((col * 40 / 100) + col))
                }
            if (item.style.backgroundColor === 'rgb(80, 80, 80)') {
                sum += ((col * 40 / 100) + col)
                // console.log('3 смена (1 час)')
                if (item.nextSibling.style.backgroundColor === 'rgb(80, 80, 80)' && 
                    item.nextSibling.nextSibling.style.backgroundColor === 'rgb(80, 80, 80)') {
                        // console.log('0 часов')
                } else {
                    sum += (7 * ((col * 40 / 100) + col))
                    // console.log('+7 часов')
                }
            }
            else if (item.style.backgroundColor === 'rgb(221, 221, 221)') {
                // console.log('Выходной')
            }
        }
    })
    const sumPercent = sum * 13 / 100
    const sumResult = sum - sumPercent
    const sumLocal = sum.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    })
    const sumPercentLocal = sumResult.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    })
    calcZP.innerHTML += `
        <div class="days-text">ЗП на ${num} разряде - 
            <span class="ZP-clean">${sumPercentLocal} ₽</span>
            <span class="ZP-dirty">${sumLocal} ₽<span>
        </div>
    `
}

// Свайп вправо-влево
document.addEventListener('touchstart', handleTouchStart)
document.addEventListener('touchmove', handleTouchMove)

function handleTouchStart(event) {
    // Убедитесь, что есть хотя бы один палец на экране
    if (event.touches.length > 0) {
        // Получите начальные координаты первого пальца
        startX = event.touches[0].clientX
        startY = event.touches[0].clientY
        isSwiped = false
    }
}
function handleTouchMove(event) {
    // Если свайп уже произошел, выходим из функции
    if (isSwiped) return
    // Убедитесь, что есть хотя бы один палец на экране
    if (event.touches.length > 0) {
        // Получите текущие координаты первого пальца
        const currentX = event.touches[0].clientX
        const currentY = event.touches[0].clientY
        // Вычислите разницу в позициях
        const diffX = currentX - startX
        const diffY = currentY - startY
        // Определим направление свайпа, если разница по горизонтали больше разницы по вертикали
        if (Math.abs(diffX) > Math.abs(diffY)) {
            diffX > 0 ? swipeRight() : swipeLeft()
            isSwiped = true
        }
    }
}

function swipeRight() { prenClick() }
function swipeLeft() { nextClick() }

// function saveHTML() {
//     localStorage.setItem('HTML', container.innerHTML)
// }

