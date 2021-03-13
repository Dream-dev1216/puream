import api from '@/api.js'
export default {
  /**
  * Get subject
  *
  * @param {}
  * @example
  *
  *     getSubject()
  */
  getSubject(id) {
    return api.get(`/subjects/${id}`)
  },

  /**
  * Submit answer
  *
  * @param {}
  * @example
  *
  *     submitAnswer(data)
  */
  submitAnswer(data) {
    return api.post('/subjects/submit-answer', data)
  },

  /**
  * Get topics
  *
  * @param {}
  * @example
  *
  *     getTopics()
  */
  getTopics() {
    return api.get('/subjects/topics')
  },

  /**
  * Get all topics
  *
  * @param {}
  * @example
  *
  *     getAllTopics()
  */
  getAllTopics() {
    return api.get('/subjects/all-topics')
  },

  getStartingPoint() {
    return api.get('/subjects/starting-point')
  },

  getAnswers() {
    return api.get('/subjects/answers')
  },

  getCompanyAnswers(id) {
    return api.get(`/subjects/company-answers/${id}`)
  }
}