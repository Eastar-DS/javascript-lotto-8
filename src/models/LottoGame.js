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
}

export default LottoGame;
