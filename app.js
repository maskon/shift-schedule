let nowDate = new Date(),
    nowDateNumber = nowDate.getDate(),
    nowMonth = nowDate.getMonth(),
    nextMonth = nowMonth + 1,
    nowYear = nowDate.getFullYear(),
    container = document.getElementById('month-calendar'),
    monthContainer = container.getElementsByClassName('month-name')[0],
    yearContainer = container.getElementsByClassName('year-name')[0],
    daysContainer = container.getElementsByClassName('days')[0],
    prev = container.getElementsByClassName('prev')[0],
    next = container.getElementsByClassName('next')[0],
    monthName = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']

const daysTotal = document.getElementById('days-total')
const daysNight = document.getElementById('days-night')

// Создаем массив для хранения состояния графика по месяцам
let shiftsByMonth = []
let curDate = nowDate.setMonth(nowDate.getMonth() - 1)


function setMonthCalendar(year,month) {
    let monthDays = new Date(year, month + 1, 0).getDate(),
        monthPrefix = new Date(year, month, 0).getDay(),
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

    daysContainer.innerHTML = monthDaysText

    if (month == nowMonth && year == nowYear){
        days = daysContainer.getElementsByTagName('li')
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now')
    }
    
    let count1
    let count2
    let count3
    let countSum
    
    let colorIndex
    
    let lastDay = days[days.length - 1]
    
    const daysElement = daysContainer.querySelectorAll('li')
    
    daysElement.forEach(function(item) {
        item.addEventListener('click', generateShifts)
    })
    
    
    function generateShifts(e) {
        const day = Number(e.target.textContent)
        const index = Array.from(days).indexOf(e.target)
            
            if (!isNaN(day)) {
                
                count1 = 0
                count2 = 0
                count3 = 0
                countSum = 0
               
               for (let i = 0; i < days.length; i++) {
                   
                   days[i].style.backgroundColor = '#eeeeee'
                   
                   let distance = Math.abs(i - index);
                   let isRelevant = (distance - 1) % 4 < 3
                   
                   if (!isNaN(parseInt(days[i].textContent))) {
                    if (i >= index && (i - index) % 4 < 3) {
                        let colorIndex = Math.floor((i - index) / 4) % 3
                        days[i].style.backgroundColor = ['rgb(255, 255, 255)', 'rgb(80, 80, 80)', 'rgb(75, 227, 255)'][colorIndex]
                    } else if (i < index) {
                        if ((distance - 1) % 4 === 1 || (distance - 1) % 4 === 2 || (distance - 1) % 4 === 3) {
                            let colorIndex = Math.floor((distance - 1) / 4) % 3
                            days[i].style.backgroundColor = ['rgb(75, 227, 255)', 'rgb(80, 80, 80)', 'rgb(255, 255, 255)'][colorIndex]
                        }
                    }
                }
                   
                if (days[i].style.backgroundColor === 'rgb(255, 255, 255)') {
                    count1++
                    }
                if (days[i].style.backgroundColor === 'rgb(75, 227, 255)') {
                    count2++
                    }
                if (days[i].style.backgroundColor === 'rgb(80, 80, 80)') {
                    count3++
                    }
                
                countSum = count1 + count2 + count3
                
                }
            }
        
        // Сохраняем состояние графика в массив
          shiftsByMonth[nowMonth] = {
            day: day,
            lastDay: lastDay,
              days: days
            // и другие данные, которые вам нужны для сохранения состояния
          }

        // Обновляем отображение графика
        updateShiftsDisplay()
        
    }
    
    // Функция для обновления отображения графика
    function updateShiftsDisplay() {
      // Обновляем отображение графика смен согласно сохраненному состоянию в shiftsByMonth
      daysNight.innerHTML = `Ночных смен в этом месяце - ${count3}`
      daysTotal.innerHTML = `Всего смен в этом месяце - ${countSum}`
    }    
}

setMonthCalendar(nowYear,nowMonth)

prev.onclick = function () {
    let curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent))

    curDate.setMonth(curDate.getMonth() - 1)

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth()

    setMonthCalendar(curYear,curMonth)
}

next.onclick = function () {

    let lastDay = days[days.length - 1]
    let prevLastDay = days[days.length - 2]
    let prevPrevLastDay = days[days.length - 3]

    let curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent))

    curDate.setMonth(curDate.getMonth() + 1)

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth(),
        index

    setMonthCalendar(curYear,curMonth)
    
    count1 = 0
    count2 = 0
    count3 = 0
    countSum = 0
    
    const daysArray = Array.from(days); // Преобразование HTMLCollection в массив
    const daysWithNumbers = daysArray.filter(item => /\d/.test(item.textContent)); // Фильтрация элементов
    
    let daySum = daysArray.length - daysWithNumbers.length
    
    if (lastDay.style.backgroundColor === 'rgb(75, 227, 255)' && 
        prevLastDay.style.backgroundColor === 'rgb(75, 227, 255)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(75, 227, 255)') {
            index = 1 + daySum
        }
            
    if (lastDay.style.backgroundColor === 'rgb(75, 227, 255)' && 
        prevLastDay.style.backgroundColor === 'rgb(75, 227, 255)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(238, 238, 238)') {
            index = 2 + daySum
        }
            
    if (lastDay.style.backgroundColor === 'rgb(75, 227, 255)' && 
        prevLastDay.style.backgroundColor === 'rgb(238, 238, 238)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(80, 80, 80)') {
            index = 3 + daySum
        }

            
    if (lastDay.style.backgroundColor === 'rgb(238, 238, 238)' && 
        prevLastDay.style.backgroundColor === 'rgb(80, 80, 80)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(80, 80, 80)') {
            index = 4 + daySum
        }
            
    if (lastDay.style.backgroundColor === 'rgb(80, 80, 80)' && 
        prevLastDay.style.backgroundColor === 'rgb(80, 80, 80)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(80, 80, 80)') {
            index = 5 + daySum
        }

    if (lastDay.style.backgroundColor === 'rgb(80, 80, 80)' && 
        prevLastDay.style.backgroundColor === 'rgb(80, 80, 80)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(238, 238, 238)') {
            index = 6 + daySum
        }

    if (lastDay.style.backgroundColor === 'rgb(80, 80, 80)' && 
        prevLastDay.style.backgroundColor === 'rgb(238, 238, 238)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(255, 255, 255)') {
            index = 7 + daySum
        }

    if (lastDay.style.backgroundColor === 'rgb(238, 238, 238)' && 
        prevLastDay.style.backgroundColor === 'rgb(255, 255, 255)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(255, 255, 255)') {
            index = 8 + daySum
        }

    if (lastDay.style.backgroundColor === 'rgb(255, 255, 255)' && 
        prevLastDay.style.backgroundColor === 'rgb(255, 255, 255)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(255, 255, 255)') {
            index = 9 + daySum
        }

    if (lastDay.style.backgroundColor === 'rgb(255, 255, 255)' && 
        prevLastDay.style.backgroundColor === 'rgb(255, 255, 255)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(238, 238, 238)') {
            index = 10 + daySum
        }

    if (lastDay.style.backgroundColor === 'rgb(255, 255, 255)' && 
        prevLastDay.style.backgroundColor === 'rgb(238, 238, 238)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(75, 227, 255)') {
            index = 11 + daySum
        }

    if (lastDay.style.backgroundColor === 'rgb(238, 238, 238)' && 
        prevLastDay.style.backgroundColor === 'rgb(75, 227, 255)' && 
        prevPrevLastDay.style.backgroundColor === 'rgb(75, 227, 255)') {
            index = 12 + daySum
        }
    
    for (let i = 0; i < days.length; i++) {
                   
        days[i].style.backgroundColor = '#eeeeee'
                  
        let distance = Math.abs(i - index)
                   
        if (!isNaN(parseInt(days[i].textContent))) {
 
            if (i >= index && (i - index) % 4 < 3) {
                let colorIndex = Math.floor((i - index) / 4) % 3
                days[i].style.backgroundColor = ['rgb(255, 255, 255)', 'rgb(80, 80, 80)', 'rgb(75, 227, 255)'][colorIndex]
                } else if (i < index) {
                    if ((distance - 1) % 4 === 1 || (distance - 1) % 4 === 2 || (distance - 1) % 4 === 3) {
                        let colorIndex = Math.floor((distance - 2) / 4) % 3
                        days[i].style.backgroundColor = ['rgb(75, 227, 255)', 'rgb(80, 80, 80)', 'rgb(255, 255, 255)'][colorIndex]
                    }
                }
            }
        
        if (days[i].style.backgroundColor === 'rgb(255, 255, 255)') {
            count1++
            }
        if (days[i].style.backgroundColor === 'rgb(75, 227, 255)') {
            count2++
            }
        if (days[i].style.backgroundColor === 'rgb(80, 80, 80)') {
            count3++
            }
                
        countSum = count1 + count2 + count3

    }
  
    updateShiftsDisplay()
}
 

// Функция для обновления отображения графика
    function updateShiftsDisplay() {
      // Обновляем отображение графика смен согласно сохраненному состоянию в shiftsByMonth
      daysNight.innerHTML = `Ночных смен в этом месяце - ${count3}`
      daysTotal.innerHTML = `Всего смен в этом месяце - ${countSum}`
    }        











