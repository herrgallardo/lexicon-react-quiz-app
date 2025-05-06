import axios from "axios"

// Base configuration
const API_CONFIG = {
  BASE_URL: "https://opentdb.com",
  ENDPOINTS: {
    QUESTIONS: "/api.php",
    CATEGORIES: "/api_category.php",
    TOKEN: "/api_token.php",
    GLOBAL_COUNT: "/api_count_global.php",
    CATEGORY_COUNT: "/api_count.php",
  },
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000, // 1 second
}

// Create axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
})

// Add response interceptor for common error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network errors
    if (!error.response) {
      console.error("Network error:", error.message)
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      )
    }

    // Handle specific HTTP errors
    switch (error.response.status) {
      case 429:
        return Promise.reject(
          new Error("Too many requests. Please try again later.")
        )
      case 503:
        return Promise.reject(
          new Error("Open Trivia API is temporarily unavailable.")
        )
      default:
        return Promise.reject(error)
    }
  }
)

/**
 * Decode HTML entities using the DOM parser
 * Works in browser environments without external libraries
 */
const decodeHTML = (html) => {
  if (!html) return ""
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}

/**
 * Helper function to handle API retries
 */
const withRetry = async (apiCall, retries = API_CONFIG.MAX_RETRIES) => {
  try {
    return await apiCall()
  } catch (error) {
    if (retries <= 0 || error.response) {
      throw error
    }

    console.log(`Retrying API call. Attempts remaining: ${retries}`)
    await new Promise((r) => setTimeout(r, API_CONFIG.RETRY_DELAY))
    return withRetry(apiCall, retries - 1)
  }
}

/**
 * Enhanced function to fetch quiz questions
 */
export const fetchQuizQuestions = async ({
  amount = 10,
  category = "",
  difficulty = "",
  type = "multiple",
  token = "",
}) => {
  const params = { amount }

  // Add optional parameters
  if (category) params.category = category
  if (difficulty) params.difficulty = difficulty
  if (type) params.type = type
  if (token) params.token = token

  try {
    const response = await withRetry(() =>
      apiClient.get(API_CONFIG.ENDPOINTS.QUESTIONS, { params })
    )

    // Handle response codes
    switch (response.data.response_code) {
      case 0:
        return processQuizData(response.data.results)
      case 1:
        throw new Error(
          "Not enough questions available for your query. Try reducing filters."
        )
      case 2:
        throw new Error(
          "Invalid parameter in the API request. Please check your settings."
        )
      case 3:
        throw new Error(
          "Session token has expired. A new one will be generated."
        )
      case 4:
        throw new Error(
          "All available questions for these settings have been used. Try different settings."
        )
      default:
        throw new Error("Unknown error from Open Trivia API.")
    }
  } catch (error) {
    console.error("Error fetching quiz questions:", error)
    throw error
  }
}

/**
 * Enhanced function to fetch categories with caching
 */
export const fetchCategories = async () => {
  // Check for cached categories
  const cachedData = getCachedData("triviaCategories")
  if (cachedData) return cachedData

  try {
    const response = await withRetry(() =>
      apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES)
    )

    if (response.data && response.data.trivia_categories) {
      // Cache the categories
      setCachedData("triviaCategories", response.data.trivia_categories)
      return response.data.trivia_categories
    }

    throw new Error("Invalid category data received")
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

/**
 * Get global question count statistics
 */
export const fetchGlobalStats = async () => {
  try {
    const response = await withRetry(() =>
      apiClient.get(API_CONFIG.ENDPOINTS.GLOBAL_COUNT)
    )
    return response.data
  } catch (error) {
    console.error("Error fetching global stats:", error)
    throw error
  }
}

/**
 * Get question count by category
 */
export const fetchCategoryStats = async (categoryId) => {
  try {
    const response = await withRetry(() =>
      apiClient.get(API_CONFIG.ENDPOINTS.CATEGORY_COUNT, {
        params: { category: categoryId },
      })
    )
    return response.data
  } catch (error) {
    console.error("Error fetching category stats:", error)
    throw error
  }
}

/**
 * Request a new session token
 */
export const requestToken = async () => {
  try {
    const response = await withRetry(() =>
      apiClient.get(API_CONFIG.ENDPOINTS.TOKEN, {
        params: { command: "request" },
      })
    )

    if (response.data.response_code === 0) {
      // Save token to local storage
      localStorage.setItem("triviaToken", response.data.token)
      localStorage.setItem("triviaTokenTimestamp", Date.now().toString())
      return response.data.token
    }

    throw new Error("Failed to get session token")
  } catch (error) {
    console.error("Error requesting session token:", error)
    throw error
  }
}

/**
 * Reset an existing session token
 */
export const resetToken = async (token) => {
  if (!token) {
    token = localStorage.getItem("triviaToken")
    if (!token) {
      throw new Error("No token available to reset")
    }
  }

  try {
    const response = await withRetry(() =>
      apiClient.get(API_CONFIG.ENDPOINTS.TOKEN, {
        params: {
          command: "reset",
          token,
        },
      })
    )

    return response.data.response_code === 0
  } catch (error) {
    console.error("Error resetting session token:", error)
    throw error
  }
}

/**
 * Process and enhance quiz data
 */
export const processQuizData = (questions) => {
  return questions.map((question) => {
    // Decode HTML entities in strings
    const decodedQuestion = decodeHTML(question.question)
    const decodedCorrectAnswer = decodeHTML(question.correct_answer)
    const decodedIncorrectAnswers = question.incorrect_answers.map((answer) =>
      decodeHTML(answer)
    )

    // Create array of all answers and shuffle them
    const allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer].sort(
      () => Math.random() - 0.5
    )

    return {
      ...question,
      question: decodedQuestion,
      correct_answer: decodedCorrectAnswer,
      incorrect_answers: decodedIncorrectAnswers,
      allAnswers,
    }
  })
}

/**
 * Get a valid session token (creating or resetting as needed)
 */
export const getValidToken = async () => {
  const storedToken = localStorage.getItem("triviaToken")
  const storedTimestamp = localStorage.getItem("triviaTokenTimestamp")

  // Check if we have a stored token
  if (storedToken && storedTimestamp) {
    const tokenAge = Date.now() - parseInt(storedTimestamp, 10)

    // If token is less than 6 hours old, use it
    if (tokenAge < 6 * 60 * 60 * 1000) {
      return storedToken
    }

    // If token exists but is old, try to reset it
    try {
      const resetSuccess = await resetToken(storedToken)
      if (resetSuccess) {
        localStorage.setItem("triviaTokenTimestamp", Date.now().toString())
        return storedToken
      }
    } catch (error) {
      console.warn("Failed to reset token, requesting new one", error)
    }
  }

  // If no token or reset failed, request a new one
  return requestToken()
}

/**
 * Cache management utilities
 */
const setCachedData = (key, data) => {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  }
  localStorage.setItem(key, JSON.stringify(cacheItem))
}

const getCachedData = (key) => {
  const cachedItem = localStorage.getItem(key)
  if (!cachedItem) return null

  try {
    const { data, timestamp } = JSON.parse(cachedItem)
    const age = Date.now() - timestamp

    if (age < API_CONFIG.CACHE_DURATION) {
      return data
    }
  } catch (error) {
    console.warn("Error parsing cached data", error)
  }

  // Clear invalid or expired cache
  localStorage.removeItem(key)
  return null
}

/**
 * Check if the API is available
 */
export const checkApiStatus = async () => {
  try {
    // Just fetch categories as a lightweight check
    await apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES, { timeout: 5000 })
    return true
  } catch (error) {
    console.error("API status check failed:", error)
    return false
  }
}

/**
 * Quiz difficulty helper constants
 */
export const DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
}

export const QUESTION_TYPE = {
  MULTIPLE: "multiple",
  BOOLEAN: "boolean",
}

/**
 * Enhanced React hooks for the Trivia API
 */
export const useTriviaAPI = () => {
  return {
    fetchQuizQuestions,
    fetchCategories,
    fetchGlobalStats,
    fetchCategoryStats,
    requestToken,
    resetToken,
    getValidToken,
    checkApiStatus,
    DIFFICULTY,
    QUESTION_TYPE,
  }
}
