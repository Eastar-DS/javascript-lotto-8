import {
  ERROR_PREFIX,
  LOTTO_NUMBER_COUNT,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from '../constants/constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  static #validate(numbers) {
    if (numbers.length !== LOTTO_NUMBER_COUNT) {
      throw new Error(`${ERROR_PREFIX} 로또 번호는 ${LOTTO_NUMBER_COUNT}개여야 합니다.`);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(`${ERROR_PREFIX} 로또 번호는 중복될 수 없습니다.`);
    }

    if (numbers.some((num) => num < MIN_LOTTO_NUMBER || num > MAX_LOTTO_NUMBER)) {
      throw new Error(
        `${ERROR_PREFIX} 로또 번호는 ${MIN_LOTTO_NUMBER}부터 ${MAX_LOTTO_NUMBER} 사이의 숫자여야 합니다.`,
      );
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  countMatches(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
