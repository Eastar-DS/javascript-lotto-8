import { ERROR_MESSAGES } from '../constants/errorMessages';
import { LOTTO_CONFIG, RANK, MATCH_COUNT } from '../constants/lottoConfig';

class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers;
  }

  static #validate(numbers) {
    if (numbers.length !== LOTTO_CONFIG.NUMBERS_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO.INVALID_LENGTH);
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBERS);
    }
    if (
      numbers.some((number) => number < LOTTO_CONFIG.MIN_NUMBER || number > LOTTO_CONFIG.MAX_NUMBER)
    ) {
      throw new Error(ERROR_MESSAGES.LOTTO.INVALID_RANGE);
    }
  }

  getRank(winningNumbers, bonusNumber) {
    const matchCount = this.#numbers.filter((number) => winningNumbers.includes(number)).length;
    if (matchCount === MATCH_COUNT.SIX) {
      return RANK.FIRST;
    }
    if (matchCount === MATCH_COUNT.FIVE) {
      return this.#getRankTwoOrThree(bonusNumber);
    }
    if (matchCount === MATCH_COUNT.FOUR) {
      return RANK.FOURTH;
    }
    if (matchCount === MATCH_COUNT.THREE) {
      return RANK.FIFTH;
    }
    return RANK.NONE;
  }

  #getRankTwoOrThree(bonusNumber) {
    if (this.#numbers.includes(bonusNumber)) {
      return RANK.SECOND;
    }
    return RANK.THIRD;
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
