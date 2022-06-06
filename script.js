const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const inputColor = document.querySelector('.color')
const inputSize = document.querySelector('.number')
const clearBtn = document.querySelector('.clear')
const undoBtn = document.querySelector('.undo')
const forwardBtn = document.querySelector('.future')
const eraseBtn = document.querySelector('.erase')

canvas.width = 300
canvas.height = 400
context.fillStyle = 'white'
context.fillRect(0,0,canvas.width,canvas.height)

let drawing = false
let erase = false
let past = []
let database = []
let index = -1

const clear = () => {
    context.clearRect(0,0,canvas.width,canvas.height)
    past = []
    database = []
    index = -1

}

clearBtn.addEventListener('click',clear)



const draw = (x,y) => {
    
    if(drawing === true){
    context.beginPath()
    context.fillStyle = inputColor.value
    context.arc(x,y,inputSize.value,0,Math.PI*2)
    context.fill()
    }
    if(erase === true){
    context.beginPath()
    context.arc(x,y,inputSize.value,0,Math.PI*2)
    context.fill()
    }
}

canvas.addEventListener('mousedown',()=>{
    drawing = true
   
})

canvas.addEventListener('mouseup',(event)=>{
    drawing = false
    erase = false
    if(event.type !== 'mouseout'){
        past.push(context.getImageData(0,0,canvas.width,canvas.height))
        database.push(context.getImageData(0,0,canvas.width,canvas.height))
        index++
    }
 
    event.preventDefault()
   
  
})

canvas.addEventListener('mousemove',(event)=>{
    x = event.offsetX
    y = event.offsetY
    draw(x,y)   
})




undoBtn.addEventListener('click',()=>{
    
    if(index <=0){
        clear()
    }else{
        index = index -1
    past.pop()
    context.putImageData(past[index],0,0)
    
    }
})

forwardBtn.addEventListener('click',()=>{

    
    if(index < database.length-1){
    index = index + 1
    context.putImageData(database[index],0,0)
    past.push(context.getImageData(0,0,canvas.width,canvas.height))
    }
  
})


eraseBtn.addEventListener('click',()=>{
    context.fillStyle = 'white'
    erase = true
  
})

