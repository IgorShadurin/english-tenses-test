const tenses = {
    'Present Simple': ['subject + V/Vs', 'subject + don’t/doesn’t + V', 'Do/Does + subject + V'],
    'Present Continuous': ['subject + am/is/are + Ving', 'subject + am/is/are + not + Ving', 'Am/Is/Are + subject + Ving'],
    'Past Simple': ['subject + Ved/V2', 'subject + did not + V', 'Did + subject + V'],
    'Past Continuous': ['subject + was/were + Ving', 'subject + was/were + not + Ving', 'Was/Were + subject + Ving'],
    'Present Perfect': ['subject + have/has + Ved/V3', 'subject + have/has + not + Ved/V3', 'Have/Has + subject + Ved/V3'],
    'Past Perfect': ['subject + had + Ved/V3', 'subject + had + not + Ved/V3', 'Had + subject + Ved/V3'],
    'Future Simple': ['subject + will + V', 'subject + will not + V', 'Will + subject + V'],
    'Future Continuous': ['subject + will be + Ving', 'subject + will not be + Ving', 'Will + subject + be + Ving'],
    'Future Perfect': ['subject + will have + Ved/V3', 'subject + will not have + Ved/V3', 'Will + subject + have + Ved/V3'],
    'Present Perfect Continuous': ['subject + have/has + been + Ving', 'subject + have/has + not + been + Ving', 'Have/Has + subject + been + Ving'],
    'Past Perfect Continuous': ['subject + had + been + Ving', 'subject + had + not + been + Ving', 'Had + subject + been + Ving'],
    'Future Perfect Continuous': ['subject + will have been + Ving', 'subject + will not have been + Ving', 'Will + subject + have been + Ving']
}

const formulaContainer = document.getElementById('formula-container')
const optionsContainer = document.getElementById('options-container')
const emojiContainer = document.getElementById('emoji-container')
const tenseContainer = document.getElementById('tense-container')
const formulaDisplay = document.getElementById('formula-display')

let currentFormula = []
let currentTense = ""
let currentFormulaType = ""

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function getNewQuestion() {
    const tensesKeys = Object.keys(tenses)
    const correctTenseKey = tensesKeys[getRandomInt(tensesKeys.length)]
    const correctFormulaIndex = getRandomInt(tenses[correctTenseKey].length)
    const correctFormula = tenses[correctTenseKey][correctFormulaIndex]

    return {
        correctTense: correctTenseKey,
        correctFormulaIndex,
        correctFormula
    }
}

function showQuestion() {
    const { correctTense, correctFormulaIndex, correctFormula } = getNewQuestion()
    const tenseTypes = ['+', '-', '?']
    currentTense = correctTense
    currentFormulaType = tenseTypes[correctFormulaIndex]
    tenseContainer.innerHTML = `<h2 id="tense">(${tenseTypes[correctFormulaIndex]}) ${correctTense}</h2>`
    currentFormula = []
    formulaDisplay.innerHTML = ''
    formulaDisplay.setAttribute('data-correct', correctFormula)
}

function resetFormula() {
    currentFormula = []
    formulaDisplay.innerHTML = ''
}

function updateFormulaDisplay() {
    formulaDisplay.innerHTML = currentFormula.join(' ')
}

document.querySelectorAll('.formula-button').forEach(button => {
    button.addEventListener('click', () => {
        currentFormula.push(button.innerText)
        updateFormulaDisplay()
    })
})

function cleanFormula(formula) {
    return formula.replace(/\+/g, '').replace(/’/g, "'").replace(/\s+/g, ' ').trim().toLowerCase()
}

function checkAnswer() {
    const userFormula = cleanFormula(currentFormula.join(' '))
    const correctFormula = cleanFormula(formulaDisplay.getAttribute('data-correct'))

    console.log('User Formula:', userFormula)
    console.log('Correct Formula:', correctFormula)

    if (userFormula === correctFormula) {
        addEmoji('✅', correctFormula, userFormula, currentTense, currentFormulaType)
    } else {
        addEmoji('❌', correctFormula, userFormula, currentTense, currentFormulaType)
    }
    showQuestion()
}

function addEmoji(emoji, correctFormula, userFormula, tense, formulaType) {
    if (emojiContainer.children.length >= 20) {
        emojiContainer.removeChild(emojiContainer.firstChild)
    }
    const emojiSpan = document.createElement('span')
    emojiSpan.classList.add('emoji')
    emojiSpan.textContent = emoji
    const tooltipContent = `Tense: ${tense} (${formulaType})<br>Entered: ${userFormula}<br>Correct: ${correctFormula}`
    emojiSpan.setAttribute('data-bs-toggle', 'popover')
    emojiSpan.setAttribute('data-bs-html', 'true')
    emojiSpan.setAttribute('data-bs-content', tooltipContent)
    emojiContainer.appendChild(emojiSpan)

    // Reinitialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
}

showQuestion()
