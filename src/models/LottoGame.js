import Lotto from './Lotto';

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
      throw new Error('[ERROR] lottos의 모든 원소는 Lotto 모델의 인스턴스여야 합니다.');
    }
  }

  static #validateWinningLotto(winningLotto) {
    if (!(winningLotto instanceof Lotto)) {
      throw new Error('[ERROR] winningLotto는 Lotto 모델의 인스턴스여야 합니다.');
    }
  }

  static #validateBonusNumber(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error('[ERROR] bonusNumber는 정수여야 합니다.');
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error('[ERROR] bonusNumber는 1~45 사이의 숫자여야 합니다.');
    }
  }

  static #validateBonusNumberInWinningLotto(winningLotto, bonusNumber) {
    if (winningLotto.getNumbers().some((number) => number === bonusNumber)) {
      throw new Error('[ERROR] bonusNumber는 당첨번호와 중복될 수 없습니다.');
    }
  }

  getWinningCountObject() {
    const winningCountObject = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    const winningNumbers = this.#winningLotto.getNumbers();
    this.#lottos.forEach((lotto) => {
      const rank = lotto.getRank(winningNumbers, this.#bonusNumber);
      winningCountObject[rank] += 1;
    });
    return winningCountObject;
  }

  getProfitRatio() {
    const initialCost = this.#lottos.length * 1000;
    const winningCountObject = this.getWinningCountObject();
    const winningMoney =
      2000000000 * winningCountObject[1] +
      30000000 * winningCountObject[2] +
      1500000 * winningCountObject[3] +
      50000 * winningCountObject[4] +
      5000 * winningCountObject[5];
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
