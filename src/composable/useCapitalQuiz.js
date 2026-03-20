import { ref, computed } from 'vue'

export default function useCapitalQuiz(allCountries) {
  const currentCountry = ref(null)
  const userAnswer = ref('')
  const score = ref(0)
  const bestScore = ref(parseInt(localStorage.getItem('bestScore') || '0'))
  const isAnswered = ref(false)
  const isCorrect = ref(null)

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function selectRandomCountry() {
    if (!allCountries.value || allCountries.value.length === 0) return

    const randomIdx = getRandomInt(allCountries.value.length)
    currentCountry.value = allCountries.value[randomIdx]
    userAnswer.value = ''
    isAnswered.value = false
    isCorrect.value = null
  }

  function compareAnswer(answer, correctCapital) {
    const normalizedAnswer = answer.trim().toLowerCase()
    const normalizedCapital = correctCapital.toLowerCase()
    return normalizedAnswer === normalizedCapital
  }

  function checkAnswer() {
    if (!currentCountry.value || !currentCountry.value.capital) {
      isCorrect.value = false
      isAnswered.value = true
      return
    }

    const capitals = Array.isArray(currentCountry.value.capital)
      ? currentCountry.value.capital
      : [currentCountry.value.capital]

    const isCorrectAnswer = capitals.some(cap => compareAnswer(userAnswer.value, cap))

    isCorrect.value = isCorrectAnswer

    if (isCorrectAnswer) {
      score.value += 1
      if (score.value > bestScore.value) {
        bestScore.value = score.value
        localStorage.setItem('bestScore', bestScore.value.toString())
      }
    } else {
      score.value = 0
    }

    isAnswered.value = true
  }

  function nextQuestion() {
    selectRandomCountry()
  }

  function resetQuiz() {
    score.value = 0
    selectRandomCountry()
  }

  return {
    currentCountry,
    userAnswer,
    score,
    bestScore,
    isAnswered,
    isCorrect,
    selectRandomCountry,
    checkAnswer,
    nextQuestion,
    resetQuiz,
  }
}
