<script setup>
import { ref, watch, onUnmounted } from 'vue'
import useFetch from '../composable/userFetch.js'
import useCapitalQuiz from '../composable/useCapitalQuiz.js'

const { data: allCountries, loading } = useFetch(
  'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,cca2'
)

const {
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
} = useCapitalQuiz(allCountries)

const timeLeft = ref(15)
let timerInterval = null

function startTimer() {
  timeLeft.value = 15
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value === 0) {
      clearInterval(timerInterval)
      if (!isAnswered.value) {
        checkAnswer()
      }
    }
  }, 1000)
}

function handleSubmit() {
  if (!isAnswered.value) {
    checkAnswer()
    if (timerInterval) clearInterval(timerInterval)
  }
}

function handleNextQuestion() {
  nextQuestion()
  startTimer()
}

function handleReset() {
  resetQuiz()
  startTimer()
}

watch(allCountries, (newCountries) => {
  if (newCountries && newCountries.length > 0 && !currentCountry.value) {
    selectRandomCountry()
    startTimer()
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div class="capital-quiz-page">
    <div class="quiz-header">
      <h1> Quiz Capitales</h1>
      <div class="scores">
        <div class="current-score">Score: <strong>{{ score }}</strong></div>
        <div class="best-score">Meilleur: <strong>{{ bestScore }}</strong></div>
      </div>
    </div>

    <div v-if="loading" class="loading">Chargement des pays...</div>

    <div v-else-if="currentCountry" class="quiz-container">
      <div class="flag-container">
        <img :src="currentCountry.flags.png" :alt="currentCountry.name.common" class="flag" />
      </div>

      <div class="country-name">
        <h2>{{ currentCountry.name.common }}</h2>
      </div>

      <div :class="['timer', { warning: timeLeft <= 5 }]">
        ⏱️ {{ timeLeft }}s
      </div>

      <div v-if="!isAnswered" class="answer-section">
        <div class="input-group">
          <input
            v-model="userAnswer"
            type="text"
            placeholder="Entrez le nom de la capitale..."
            class="answer-input"
            @keyup.enter="handleSubmit"
            :disabled="isAnswered"
          />
        </div>
        <button @click="handleSubmit" class="submit-btn" :disabled="!userAnswer.trim()">
          Valider
        </button>
      </div>

      <div v-else class="feedback-section">
        <div :class="['feedback', { correct: isCorrect, wrong: !isCorrect }]">
          <span v-if="isCorrect" class="feedback-text">✓ Bien joué!</span>
          <span v-else class="feedback-text">✗ Perdu!</span>
        </div>

        <div v-if="!isCorrect" class="correct-answer">
          La bonne réponse était: <strong>{{ currentCountry.capital?.join(', ') || 'N/A' }}</strong>
        </div>

        <div class="user-answer">
          Votre réponse: <strong>{{ userAnswer }}</strong>
        </div>

        <div class="action-buttons">
          <button v-if="isCorrect" @click="handleNextQuestion" class="next-btn">
            Question suivante →
          </button>
          <button v-else @click="handleReset" class="replay-btn">
            Rejouer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.capital-quiz-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.quiz-header h1 {
  margin: 0;
  font-size: 28px;
}

.scores {
  display: flex;
  gap: 20px;
  font-size: 16px;
}

.current-score strong,
.best-score strong {
  font-size: 20px;
  font-weight: bold;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #555;
}

.quiz-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.flag-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flag {
  width: 100%;
  max-width: 300px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.country-name {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.country-name h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.timer {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
  background: #ecf0f1;
  border-radius: 8px;
  color: #333;
  transition: all 0.3s;
}

.timer.warning {
  background: #f8d7da;
  color: #e74c3c;
  animation: pulse 0.5s infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.answer-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.answer-input {
  padding: 15px;
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.answer-input:focus {
  border-color: #2980b9;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
}

.answer-input:disabled {
  background: #ecf0f1;
  cursor: not-allowed;
}

.submit-btn {
  padding: 12px 30px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #229954;
}

.submit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.feedback-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.feedback {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.feedback.correct {
  background: #d5f4e6;
  color: #27ae60;
  border: 2px solid #27ae60;
}

.feedback.wrong {
  background: #fadbd8;
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.feedback-text {
  font-size: 20px;
}

.correct-answer {
  padding: 15px;
  background: #e8f5e9;
  border-left: 4px solid #27ae60;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
}

.user-answer {
  padding: 15px;
  background: #f5f5f5;
  border-left: 4px solid #3498db;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.next-btn,
.replay-btn {
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.next-btn {
  background: #27ae60;
  color: white;
}

.next-btn:hover {
  background: #229954;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.replay-btn {
  background: #3498db;
  color: white;
}

.replay-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}
</style>
