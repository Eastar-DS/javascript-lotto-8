class LottoGame {
  #lottos;
  #winningNumbers;
  #bonusNumber;

  constructor(lottosArray, sixNumbers, bonusNumber) {
    this.#validate();
    this.#lottos = lottosArray;
    this.#winningNumbers = sixNumbers;
    this.#bonusNumber = bonusNumber;
  }

  #validate() {}

  getWinningCountObject() {}

  getProfitRatio() {}
}

export default LottoGame;
