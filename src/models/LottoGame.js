class LottoGame {
  #lottos;
  #winningLotto;
  #bonusNumber;

  constructor(lottosArray, winningLotto, bonusNumber) {
    this.#validate();
    this.#lottos = lottosArray;
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  #validate() {}

  getWinningCountObject() {}

  getProfitRatio() {}

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
