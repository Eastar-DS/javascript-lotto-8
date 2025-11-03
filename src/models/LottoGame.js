import Lotto from './Lotto';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { LOTTO_CONFIG, PRIZE_MONEY, RANK } from '../constants/lottoConfig';

class LottoGame {
  #lottos;
  #winningLotto;
  #bonusNumber;

  constructor(lottosArray, winningLotto, bonusNumber) {
    LottoGame.#validate(lottosArray, winningLotto, bonusNumber);
    this.#lottos = lottosArray;
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  static #validate(lottosArray, winningLotto, bonusNumber) {
    LottoGame.#validateLottos(lottosArray);
    LottoGame.#validateWinningLotto(winningLotto);
    LottoGame.#validateBonusNumber(bonusNumber);
    LottoGame.#validateBonusNumberInWinningLotto(winningLotto, bonusNumber);
  }

  static #validateLottos(lottosArray) {
    if (!lottosArray.every((lotto) => lotto instanceof Lotto)) {
      throw new Error(ERROR_MESSAGES.GAME.INVALID_LOTTOS_TYPE);
    }
  }

  static #validateWinningLotto(winningLotto) {
    if (!(winningLotto instanceof Lotto)) {
      throw new Error(ERROR_MESSAGES.GAME.INVALID_WINNING_LOTTO_TYPE);
    }
  }

  static #validateBonusNumber(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.GAME.INVALID_BONUS_NUMBER_TYPE);
    }
    if (bonusNumber < LOTTO_CONFIG.MIN_NUMBER || bonusNumber > LOTTO_CONFIG.MAX_NUMBER) {
      throw new Error(ERROR_MESSAGES.GAME.INVALID_BONUS_NUMBER_RANGE);
    }
  }

  static #validateBonusNumberInWinningLotto(winningLotto, bonusNumber) {
    if (winningLotto.getNumbers().some((number) => number === bonusNumber)) {
      throw new Error(ERROR_MESSAGES.GAME.DUPLICATE_BONUS_NUMBER);
    }
  }

  getWinningCountObject() {
    const winningCountObject = {
      [RANK.FIRST]: 0,
      [RANK.SECOND]: 0,
      [RANK.THIRD]: 0,
      [RANK.FOURTH]: 0,
      [RANK.FIFTH]: 0,
      [RANK.NONE]: 0,
    };
    const winningNumbers = this.#winningLotto.getNumbers();
    this.#lottos.forEach((lotto) => {
      const rank = lotto.getRank(winningNumbers, this.#bonusNumber);
      winningCountObject[rank] += 1;
    });
    return winningCountObject;
  }

  getProfitRatio() {
    const initialCost = this.#lottos.length * LOTTO_CONFIG.TICKET_PRICE;
    const winningCountObject = this.getWinningCountObject();
    const winningMoney =
      PRIZE_MONEY.FIRST * winningCountObject[RANK.FIRST] +
      PRIZE_MONEY.SECOND * winningCountObject[RANK.SECOND] +
      PRIZE_MONEY.THIRD * winningCountObject[RANK.THIRD] +
      PRIZE_MONEY.FOURTH * winningCountObject[RANK.FOURTH] +
      PRIZE_MONEY.FIFTH * winningCountObject[RANK.FIFTH];
    const profitRatio = (winningMoney / initialCost) * 100;
    return profitRatio.toFixed(1);
  }

  getLottos() {
    return this.#lottos;
  }

  getWinningLotto() {
    return this.#winningLotto;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default LottoGame;
