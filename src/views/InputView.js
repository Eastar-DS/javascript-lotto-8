import { Console } from '@woowacourse/mission-utils';

class InputView {
  static async readCost() {
    const costString = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
    const cost = Number(costString.trim());
    if (Number.isNaN(cost)) {
      throw new Error('[ERROR] 유효한 숫자를 입력해 주세요.');
    }
    if (cost < 1000) {
      throw new Error('[ERROR] 1,000원 이상의 금액을 입력해주세요.');
    }
    if (cost % 1000 > 0) {
      throw new Error('[ERROR] 금액은 1,000원 단위로 입력해주세요.');
    }
    return cost;
  }

  static async readWinningNumbers() {
    const winningNumbersString = await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
    return winningNumbersString
      .split(',')
      .filter((number) => number.length > 0)
      .map((number) => Number(number.trim()));
  }

  static async readBonusNumber() {
    const bonusNumberString = await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
    const bonusNumber = Number(bonusNumberString.trim());
    return bonusNumber;
  }
}

export default InputView;
