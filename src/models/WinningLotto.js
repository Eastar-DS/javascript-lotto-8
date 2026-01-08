import { ERROR_PREFIX } from '../constants/constants.js';
import LottoRank from './LottoRank.js';

class WinningLotto {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#validateBonusNumber(winningNumbers, bonusNumber);
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(`${ERROR_PREFIX} 보너스 번호는 당첨 번호와 중복될 수 없습니다.`);
    }
  }

  judgeRank(lotto) {
    const matchCount = lotto.countMatches(this.#winningNumbers);
    const bonusMatch = lotto.hasBonus(this.#bonusNumber);

    return LottoRank.getRank(matchCount, bonusMatch);
  }
}

export default WinningLotto;
