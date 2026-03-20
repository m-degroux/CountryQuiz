<script setup>
import { ref, watch } from 'vue'
import useFetch from '../composable/userFetch.js'

const { data: allCountries, loading } = useFetch(
  'https://restcountries.com/v3.1/all?fields=name,flags,region,cca2,cca3'
)

const score = ref(0)
const currentCountry = ref(null)
const choices = ref([])
const feedback = ref(null) 
const isAnswering = ref(false)

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function getCountriesFromRegion(region, excludeCode) {
  return allCountries.value.filter(c => c.region === region && c.cca2 !== excludeCode)
}

function generateQuestion() {
  if (!allCountries.value || allCountries.value.length === 0) return
  const randomIdx = getRandomInt(allCountries.value.length)
  currentCountry.value = allCountries.value[randomIdx]
  const sameRegion = getCountriesFromRegion(currentCountry.value.region, currentCountry.value.cca2)
  const otherChoices = []
  while (otherChoices.length < 3 && sameRegion.length > 0) {
    const randomChoice = sameRegion.splice(getRandomInt(sameRegion.length), 1)[0]
    otherChoices.push(randomChoice)
  }

  choices.value = [currentCountry.value, ...otherChoices]
    .sort(() => Math.random() - 0.5)

  feedback.value = null
  isAnswering.value = false
}

function handleAnswer(selectedCountry) {
  if (isAnswering.value) return

  isAnswering.value = true

  if (selectedCountry.cca2 === currentCountry.value.cca2) {
    feedback.value = 'correct'
    score.value += 1
  } else {
    feedback.value = 'wrong'
    score.value = 0
  }

  setTimeout(() => {
    generateQuestion()
  }, 1000)
}

function getChoiceClass(country) {
  if (!feedback.value || isAnswering.value) return ''

  if (country.cca2 === currentCountry.value.cca2) {
    return feedback.value === 'correct' ? 'correct' : 'correct-answer'
  }

  if (feedback.value === 'wrong') {
    return 'wrong-answer'
  }

  return ''
}

watch(allCountries, (newCountries) => {
  if (newCountries && newCountries.length > 0 && !currentCountry.value) {
    generateQuestion()
  }
})
</script>

<template>
  <div class="quiz-page">
    <div class="quiz-header">
      <h1>Quiz Drapeaux</h1>
      <div class="score">Score: <strong>{{ score }}</strong></div>
    </div>

    <div v-if="loading" class="loading">Chargement des pays...</div>

    <div v-else-if="currentCountry" class="quiz-container">
      <div class="flag-container">
        <img :src="currentCountry.flags.png" :alt="currentCountry.name.common" class="flag" />
      </div>

      <div class="question">
        <p>Quel est ce pays ?</p>
      </div>

      <div class="choices">
        <button
          v-for="country in choices"
          :key="country.cca2"
          @click="handleAnswer(country)"
          :disabled="isAnswering"
          :class="['choice-btn', getChoiceClass(country)]"
        >
          {{ country.name.common }}
        </button>
      </div>

      <div v-if="feedback" :class="['feedback', feedback]">
        <span v-if="feedback === 'correct'">✓ Correct!</span>
        <span v-else>✗ Mauvaise réponse! La bonne réponse est: {{ currentCountry.name.common }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-page {
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

.score {
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
  gap: 30px;
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

.question {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.choice-btn {
  padding: 15px 20px;
  background: #3498db;
  color: white;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.choice-btn:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.choice-btn:disabled {
  cursor: not-allowed;
}

.choice-btn.correct {
  background: #27ae60;
  border-color: #27ae60;
}

.choice-btn.correct-answer {
  background: #27ae60;
  border-color: #27ae60;
}

.choice-btn.wrong-answer {
  background: #e74c3c;
  border-color: #e74c3c;
}

.feedback {
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  min-height: 20px;
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
</style>