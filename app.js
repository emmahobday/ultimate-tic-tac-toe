document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const turnText = document.querySelector('.turn')
  const bigArr = []
  let turn = true
  let nextDiv

  for (let i = 0; i < 9; i++) {
    const smallArr = []
    const bigCell = document.createElement('div')
    for (let j = 0; j < 9; j++) {
      const smallCell = document.createElement('div')
      smallCell.classList.add('smallCell')
      smallCell.style.width = 100 / 3 + '%'
      smallCell.style.height = 100 / 3 + '%'
      smallCell.addEventListener('click', click)
      smallCell.setAttribute('id', String(i) + String(j))
      bigCell.appendChild(smallCell)
      smallArr.push(null)
    }
    bigCell.classList.add('bigCell')
    bigCell.style.width = 100 / 3 + '%'
    bigCell.style.height = 100 / 3 + '%'
    grid.appendChild(bigCell)
    bigArr.push(smallArr)
  }

  const arrBigDivs = Array.from(document.querySelectorAll('.bigCell'))

  const arrSmallDivs = []
  arrBigDivs.forEach(bigDiv => {
    arrSmallDivs.push((Array.from(bigDiv.children)))
  })

  
  function click(event) {
    if (turn) {
      if (event.target.classList.contains('X') || event.target.classList.contains('O') || event.srcElement.parentElement.classList.contains('xwon') || event.srcElement.parentElement.classList.contains('owon')) {
        return
      } else {
        event.target.classList.add('X', 'xwon')
        event.target.innerHTML = 'X'
      }

    } else {
      if (event.target.classList.contains('X') || event.target.classList.contains('O') || event.srcElement.parentElement.classList.contains('xwon') || event.srcElement.parentElement.classList.contains('owon')) {
        return
      } else {
        event.target.classList.add('O', 'owon')
        event.target.innerHTML = 'O'
      }
    }

    arrBigDivs.forEach(div => {
      div.style.backgroundColor = 'transparent'
      div.classList.remove('no')
      Array.from(div.children).forEach(littleDiv => {
        littleDiv.classList.remove('no')
      })
    })

    nextDiv = event.target.id.split('')[1]

    checkMiniWin(event.target.id)
    const inPlayDivs = arrBigDivs.filter(div => !div.classList.contains('xwon') && !div.classList.contains('owon'))
    
    if (arrBigDivs[Number(nextDiv)].classList.contains('xwon') || arrBigDivs[Number(nextDiv)].classList.contains('owon')) {
      inPlayDivs.forEach(bigDiv => {
        bigDiv.classList.remove('no')
        if (!bigDiv.classList.contains('xwon') && !bigDiv.classList.contains('owon')) {
          Array.from(bigDiv.children).forEach(littleDiv => {
            littleDiv.addEventListener('click', click)
            littleDiv.classList.remove(turn ? 'xhover' : 'ohover')
            littleDiv.classList.add(turn ? 'ohover' : 'xhover')
          })
        }
      })
    } else {
      arrBigDivs.forEach((div, index) => {
        if (index === Number(nextDiv)) {
          Array.from(div.children).forEach(littleDiv => {
            littleDiv.addEventListener('click', click)
            littleDiv.classList.remove('no')
            littleDiv.classList.remove(turn ? 'xhover' : 'ohover')
            littleDiv.classList.add(turn ? 'ohover' : 'xhover')
          })
        } else {
          div.style.backgroundColor = 'gainsboro'
          Array.from(div.children).forEach(littleDiv => {
            littleDiv.removeEventListener('click', click)
            littleDiv.classList.add('no')
          })
        }
      })
    }
    turn = !turn
    turnText.innerHTML = turn ? '<p>X turn</p>' : '<p>O turn</p>'
    turnText.classList.add(turn ? 'xturn' : 'oturn')
    turnText.classList.remove(turn ? 'oturn' : 'xturn')
    checkWin()
  }

  function checkMiniWin(id) {
    const bigArrInd = id.split('')[0]
    const situation = []
    arrSmallDivs[bigArrInd].forEach(elem => {
      situation.push(elem.innerText)
    })
    const winPositions = []
    winPositions.push(situation[0] + situation[1] + situation[2])
    winPositions.push(situation[3] + situation[4] + situation[5])
    winPositions.push(situation[6] + situation[7] + situation[8])
    winPositions.push(situation[0] + situation[3] + situation[6])
    winPositions.push(situation[1] + situation[4] + situation[7])
    winPositions.push(situation[2] + situation[5] + situation[8])
    winPositions.push(situation[0] + situation[4] + situation[8])
    winPositions.push(situation[2] + situation[4] + situation[6])
    if (winPositions.includes('XXX')) {
      arrBigDivs[bigArrInd].classList.add('xwon')
      Array.from(arrBigDivs[bigArrInd].children).forEach(miniDiv => {
        miniDiv.innerText = ''
        miniDiv.classList.remove('xwon', 'owon')
        miniDiv.classList.remove('xhover', 'ohover')
      })
    } else if (winPositions.includes('OOO')) {
      arrBigDivs[bigArrInd].classList.add('owon')
      Array.from(arrBigDivs[bigArrInd].children).forEach(miniDiv => {
        miniDiv.innerText = ''
        miniDiv.classList.remove('owon', 'xwon')
        miniDiv.classList.remove('xhover', 'ohover')
      })
    }
  }

  function checkWin() {
    const bigWins = []
    arrBigDivs.forEach(elem => {
      if (elem.classList.contains('owon')) {
        bigWins.push('O')
      } else if (elem.classList.contains('xwon')) {
        bigWins.push('X')
      } else {
        bigWins.push(null)
      }
    })
    const bigWinCheck = []
    bigWinCheck.push(bigWins[0] + bigWins[1] + bigWins[2])
    bigWinCheck.push(bigWins[3] + bigWins[4] + bigWins[5])
    bigWinCheck.push(bigWins[6] + bigWins[7] + bigWins[8])
    bigWinCheck.push(bigWins[0] + bigWins[3] + bigWins[6])
    bigWinCheck.push(bigWins[1] + bigWins[4] + bigWins[7])
    bigWinCheck.push(bigWins[2] + bigWins[5] + bigWins[8])
    bigWinCheck.push(bigWins[0] + bigWins[4] + bigWins[8])
    bigWinCheck.push(bigWins[2] + bigWins[4] + bigWins[6])
    if (bigWinCheck.includes('XXX')) {
      turnText.innerHTML = '<p>X WINS!</p>'
      confetti.start()
      setTimeout(() => {
        confetti.stop()
      }, 2000)
      arrSmallDivs.forEach(arrEl => {
        arrEl.forEach(elem => {
          elem.removeEventListener('click', click)
        })
      })
    } else if (bigWinCheck.includes('OOO')) {
      turnText.innerHTML = '<p>O WINS!</p>'
      confetti.start()
      setTimeout(() => {
        confetti.stop()
      }, 2000)
      arrSmallDivs.forEach(arrEl => {
        arrEl.forEach(elem => {
          elem.removeEventListener('click', click)
          elem.classList.add('no')
        })
      })
      arrBigDivs.forEach(game => {
        if (!game.classList.contains('xwon') && !game.classList.contains('owon')) {
          game.style.backgroundColor = 'transparent'
        }
      })
    }
  }
})

window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)