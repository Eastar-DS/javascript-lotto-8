import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { LOTTO_CONFIG } from '../constants/lottoConfig';
import { MESSAGES } from '../constants/messages';

class InputView {
  static async readCost() {
    const costString = await Console.readLineAsync(MESSAGES.INPUT_PROMPT.COST);
    const cost = Number(costString.trim());
    if (Number.isNaN(cost)) {
      throw new Error(ERROR_MESSAGES.INPUT.INVALID_COST_TYPE);
    }
    if (cost < LOTTO_CONFIG.TICKET_PRICE) {
      throw new Error(ERROR_MESSAGES.INPUT.INVALID_COST_MINIMUM);
    }
    if (cost % LOTTO_CONFIG.TICKET_PRICE > 0) {
      throw new Error(ERROR_MESSAGES.INPUT.INVALID_COST_UNIT);
    }
    return cost;
  }

  static async readWinningNumbers() {
    const winningNumbersString = await Console.readLineAsync(MESSAGES.INPUT_PROMPT.WINNING_NUMBERS);
    return winningNumbersString
      .split(',')
      .filter((number) => number.length > 0)
      .map((number) => Number(number.trim()));
  }

  static async readBonusNumber() {
    const bonusNumberString = await Console.readLineAsync(MESSAGES.INPUT_PROMPT.BONUS_NUMBER);
    const bonusNumber = Number(bonusNumberString.trim());
    return bonusNumber;
  }
}

export default InputView;
