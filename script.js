class Calculator { //created a calculator class for rest of the functionality of my calC
    constructor(previousOperandTextElement,currentOperandTextElement){

    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}
clear() {
this.currentOperand = ''
this.previousOperand = ''
this.operation = undefined
}  //Clearing The Full screen by setting the value of the operands to null string

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}
appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return //c4 //c4e
    // this.currentOperand = number  //c2  //just because c2 solve korar jonno new line
    this.currentOperand = this.currentOperand.toString() + number.toString() //c3
}

chooseOperation(operation) {
    
    if(this.currentOperand === '') return
    if(this.previousOperand !==''){
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = '' //c5


}

compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+': 
        computation = prev + current
        break
        case '-': 
        computation = prev - current
        break
        case '*':
         computation = prev * current
        break
        case '÷': 
        computation = prev / current
        break
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

updateDisplay() {

    this.currentOperandTextElement.innerText = this.currentOperand //c2
    this.previousOperandTextElement.innerText = this.previousOperand //c6

}

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement) //created a calculator object, New Calculator defines the class of our calC

//adding Number.Buttons 
numberButtons.forEach(button => { //for each button 
    button.addEventListener('click', () => { //we added eventListR 
        calculator.appendNumber(button.innerText) //which will take the text as input
        calculator.updateDisplay() //obviously updating my display
    })
}) //c1: now we need to update our updateDisplay() and then also appendNumbers so that our calC can actually take inputs

//adding Operation.Buttons 
operationButtons.forEach(button => { //for each button 
    button.addEventListener('click', () => { //we added eventListR 
        calculator.chooseOperation(button.innerText) //which will take the text as input
        calculator.updateDisplay() //obviously updating my display
    })
})

//adding equals.Button
// equalsButton.forEach(button => { //for each button 
//     button.addEventListener('click', () => { //we added eventListR 
//         calculator.compute() //we called compute func
//         calculator.updateDisplay() //obviously updating my display
//     })
// })
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

//allClearButton
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})