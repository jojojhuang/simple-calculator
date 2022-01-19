export type Operator = '÷' | '×' | '+' | '-'
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | '%'

export const DIGITS: Digit[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%']
export const OPERATORS: Operator[] = ['÷', '×', '+', '-']

const isInclde = (arr: string[]) => (s: string) => arr.includes(s)

export const lastChar = (s: string) => s.at(-1) || ''

export const isDigit = isInclde(DIGITS)
export const isOperator = isInclde(OPERATORS)

export const lastCharIsOperator = (s: string) => isOperator(lastChar(s))

import {
  create,
  evaluateDependencies,
  addDependencies,
  subtractDependencies,
  divideDependencies,
  multiplyDependencies,
  formatDependencies
} from 'mathjs'

const { evaluate, format } = create({
  evaluateDependencies,
  addDependencies,
  subtractDependencies,
  divideDependencies,
  multiplyDependencies,
  formatDependencies
})

export const evalFormat = (e: string) => format(evaluate(e), { upperExp: 6, precision: 10 })
