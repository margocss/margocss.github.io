var mdScreen = 750, lgScreen = 1000


function forEach(oLikeArr, cb){
  var a = Array.prototype.slice.call(oLikeArr)
  a.forEach(cb)
}

function setGrids(els){
  var currentScreenRange = 'sm'

  if ( window.innerWidth > mdScreen){  currentScreenRange =  'md' }
  if ( window.innerWidth > lgScreen){  currentScreenRange =   'lg' }

  forEach(els, function(el, i, arr){
    if ( el.dataset.scr === currentScreenRange ){
      el.className="grid-sz active"
    }else {
      el.className="grid-sz"
    }      

  })
}

function debouncer(interval, cb){
  var currentTimeoutIndex
  return function(){
    if (typeof currentTimeoutIndex === 'undefined' || !currentTimeoutIndex ){
      currentTimeoutIndex = setTimeout(function(){
        cb()
        currentTimeoutIndex = null
      }, interval)
    }else {
      return   
    }
  }
}

function app(){
  "use strict"
  var gridEls = document.querySelectorAll('.grid-sz')

  setGrids(gridEls)

  window.onresize = debouncer(100, function(){
    setGrids(gridEls)
  })


  
}


console.log('heyyy....')
window.onload = app