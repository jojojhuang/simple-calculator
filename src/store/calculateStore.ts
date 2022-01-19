import { defineStore } from 'pinia'
import { ref, readonly, reactive } from 'vue'
import { Operator, Digit, lastChar, lastCharIsOperator, evalFormat } from '@/utils/'

interface exprHistory {
  id: number
  expression: string
  ans: string
}

export const useCalculateStore = defineStore('calculate', () => {
  const expression = ref('0')
  const ans = ref('0')
  const error = ref(false)
  const history = reactive<exprHistory[]>([])
  let idCount = 0
  let isDoted = false
  let afterCaclute = false

  const cacluteResult = () => {
    if (!expression.value) return
    if (afterCaclute) return

    // simple format before evalute
    if (lastCharIsOperator(expression.value))
      expression.value = expression.value.slice(0, expression.value.length - 1)

    let mathExpression = expression.value

    mathExpression = mathExpression.replace('×', '*')
    mathExpression = mathExpression.replace('÷', '/')

    try {
      ans.value = `${evalFormat(mathExpression)}`
      if (ans.value.includes('Infinity')) {
        throw new Error('')
      }
      addHistory(expression.value, ans.value)
    } catch (_) {
      ans.value = '0'
      error.value = true
    } finally {
      afterCaclute = true
    }
  }

  const addDigit = (digit: Digit) => {
    // Cannot dot twice in one number
    if (digit === '.' || digit === '%') {
      if (isDoted) return
      isDoted = true
    }

    if (afterCaclute) clear()
    afterCaclute = false

    // If the only digit is 0 just replace it
    const lastDigit = lastChar(expression.value)
    if (digit !== '.' && lastDigit === '0' && expression.value.length === 1) {
      expression.value = `${digit}`
      return
    }

    expression.value += `${digit}`
  }

  const addOperator = (operator: Operator) => {
    // Negative operator
    const lastDigit = lastChar(expression.value)
    if (operator === '-' && expression.value.length === 1 && lastDigit === '0') {
      expression.value = '-'
      return
    }

    // Enable dot after operator
    if (isDoted) isDoted = false

    // Continue with previous ans
    if (afterCaclute) {
      expression.value = ans.value
    }

    // Cannot operator twice
    if (lastCharIsOperator(expression.value)) eraseLast()

    afterCaclute = false
    expression.value += `${operator}`
  }

  const eraseLast = () => {
    if (expression.value.length === 1) expression.value = '0'
    else expression.value = expression.value.slice(0, expression.value.length - 1)
    afterCaclute = false
  }

  const clear = () => {
    expression.value = '0'
    ans.value = '0'
    error.value = false
    isDoted = false
    afterCaclute = false
  }

  const addHistory = (expression: string, ans: string) => {
    history.push({ id: idCount++, expression, ans })
  }

  const removeHistory = (index: number) => {
    history.splice(index, 1)
  }

  const clearHistory = () => {
    history.splice(0, history.length)
  }

  const assignFromHistory = (idx: number) => {
    clear()
    expression.value = history[idx].expression
    ans.value = history[idx].ans
    afterCaclute = true
  }

  return {
    expression: readonly(expression),
    ans: readonly(ans),
    error: readonly(error),
    history: readonly(history),
    addDigit,
    addOperator,
    eraseLast,
    cacluteResult,
    clear,
    removeHistory,
    clearHistory,
    assignFromHistory
  }
})
