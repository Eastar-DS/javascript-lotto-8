import {
  ERROR_PREFIX,
  LOTTO_PRICE,
  LOTTO_NUMBER_COUNT,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from '../constants/constants.js';

class InputValidator {
  static validatePurchaseAmount(amount) {
    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount)) {
      throw new Error(`${ERROR_PREFIX} 구입 금액은 숫자여야 합니다.`);
    }

    if (numericAmount <= 0) {
      throw new Error(`${ERROR_PREFIX} 구입 금액은 0보다 커야 합니다.`);
    }

    if (numericAmount % LOTTO_PRICE !== 0) {
      throw new Error(`${ERROR_PREFIX} 구입 금액은 ${LOTTO_PRICE}원 단위여야 합니다.`);
    }
  }

  static validateWinningNumbers(numbers) {
    if (numbers.length !== LOTTO_NUMBER_COUNT) {
      throw new Error(`${ERROR_PREFIX} 당첨 번호는 ${LOTTO_NUMBER_COUNT}개여야 합니다.`);
    }

    if (numbers.some((num) => Number.isNaN(Number(num)))) {
      throw new Error(`${ERROR_PREFIX} 당첨 번호는 모두 숫자여야 합니다.`);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(`${ERROR_PREFIX} 당첨 번호는 중복될 수 없습니다.`);
    }

    if (numbers.some((num) => num < MIN_LOTTO_NUMBER || num > MAX_LOTTO_NUMBER)) {
      throw new Error(
        `${ERROR_PREFIX} 당첨 번호는 ${MIN_LOTTO_NUMBER}부터 ${MAX_LOTTO_NUMBER} 사이의 숫자여야 합니다.`,
      );
    }
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    const numericBonus = Number(bonusNumber);

    if (Number.isNaN(numericBonus)) {
      throw new Error(`${ERROR_PREFIX} 보너스 번호는 숫자여야 합니다.`);
    }

    if (numericBonus < MIN_LOTTO_NUMBER || numericBonus > MAX_LOTTO_NUMBER) {
      throw new Error(
        `${ERROR_PREFIX} 보너스 번호는 ${MIN_LOTTO_NUMBER}부터 ${MAX_LOTTO_NUMBER} 사이의 숫자여야 합니다.`,
      );
    }

    if (winningNumbers.includes(numericBonus)) {
      throw new Error(`${ERROR_PREFIX} 보너스 번호는 당첨 번호와 중복될 수 없습니다.`);
    }
  }
}

export default InputValidator;
