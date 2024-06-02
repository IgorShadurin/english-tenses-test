const tenses = {
    'Present Simple': ['subject + V/Vs', 'subject + don’t/doesn’t + V', 'Do/Does + subject + V'],
    'Present Continuous': ['am/is/are + Ving', 'am/is/are + not + Ving', 'Am/Is/Are + subject + Ving'],
    'Past Simple': ['subject + Ved/V2', 'subject + did not + V', 'Did + subject + V'],
    'Past Continuous': ['was/were + Ving', 'was/were + not + Ving', 'Was/Were + subject + Ving'],
    'Present Perfect': ['have/has + Ved/V3', 'have/has + not + Ved/V3', 'Have/Has + subject + Ved/V3'],
    'Past Perfect': ['had + Ved/V3', 'had + not + Ved/V3', 'Had + subject + Ved/V3'],
    'Future Simple': ['will + V', 'will not + V', 'Will + subject + V'],
    'Future Continuous': ['will be + Ving', 'will not be + Ving', 'Will + subject + be + Ving'],
    'Future Perfect': ['will have + Ved/V3', 'will not have + Ved/V3', 'Will + subject + have + Ved/V3'],
    'Present Perfect Continuous': ['have/has + been + Ving', 'have/has + not + been + Ving', 'Have/Has + subject + been + Ving'],
    'Past Perfect Continuous': ['had + been + Ving', 'had + not + been + Ving', 'Had + subject + been + Ving'],
    'Future Perfect Continuous': ['will have been + Ving', 'will not have been + Ving', 'Will + subject + have been + Ving']
}

const formulaContainer = document.getElementById('formula-container')
const optionsContainer = document.getElementById('options-container')
const emojiContainer = document.getElementById('emoji-container')

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

    const randomOptions = new Set()
    randomOptions.add(correctTenseKey)
    while (randomOptions.size < 6) {
        randomOptions.add(tensesKeys[getRandomInt(tensesKeys.length)])
    }

    const options = shuffleArray(Array.from(randomOptions))

    return {
        correctTense: correctTenseKey,
        correctFormula,
        options
    }
}

function showQuestion() {
    const { correctTense, correctFormula, options } = getNewQuestion()
    formulaContainer.innerHTML = `<h2 id="formula">${correctFormula}</h2>`
    optionsContainer.innerHTML = options.map(option => `
        <button class="btn btn-primary m-2 option-button col-5">${option}</button>
    `).join('')

    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', () => {
            const chosenTense = button.innerText
            if (chosenTense === correctTense) {
                addEmoji('✅', correctTense, correctFormula, chosenTense)
            } else {
                addEmoji('❌', correctTense, correctFormula, chosenTense)
            }
            showQuestion()
        })
    })
}

function addEmoji(emoji, correctTense, correctFormula, chosenTense) {
    if (emojiContainer.children.length >= 20) {
        emojiContainer.removeChild(emojiContainer.firstChild)
    }
    const emojiSpan = document.createElement('span')
    emojiSpan.classList.add('emoji')
    emojiSpan.textContent = emoji
    const tooltipContent = `Formula: ${correctFormula}<br>Chosen: ${chosenTense}<br>Correct: ${correctTense}`
    console.log('tooltipContent', tooltipContent)
    emojiSpan.setAttribute('data-bs-toggle', 'tooltip')
    emojiSpan.setAttribute('data-bs-html', 'true')
    emojiSpan.setAttribute('title', tooltipContent)
    emojiContainer.appendChild(emojiSpan)

    // Reinitialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

showQuestion()
