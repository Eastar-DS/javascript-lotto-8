import { Console, Random } from '@woowacourse/mission-utils';
import InputView from './views/InputView';
import OutputView from './views/OutputView';
import Lotto from './models/Lotto';
import LottoGame from './models/LottoGame';

class App {
  async run() {
    try {
      const lottos = await App.#purchaseLottos();
      const { winningLotto, bonusNumber } = await App.#readWinningInfo();
      App.#printResults(lottos, winningLotto, bonusNumber);
    } catch (error) {
      Console.print(error.message);
    }
  }

  static async #purchaseLottos() {
    const cost = await InputView.readCost();
    const count = parseInt(cost / 1000, 10);

    OutputView.printPurchaseCount(count);
    const lottos = [];
    for (let i = 0; i < count; i += 1) {
      const randomNumbersArray = Random.pickUniqueNumbersInRange(1, 45, 6);
      lottos.push(new Lotto(randomNumbersArray));
    }
    OutputView.printLottos(lottos);
    return lottos;
  }

  static async #readWinningInfo() {
    const winningNumbers = await InputView.readWinningNumbers();
    const winningLotto = new Lotto(winningNumbers);
    const bonusNumber = await InputView.readBonusNumber();
    return { winningLotto, bonusNumber };
  }

  static #printResults(lottos, winningLotto, bonusNumber) {
    const lottoGame = new LottoGame(lottos, winningLotto, bonusNumber);
    const winningCountObject = lottoGame.getWinningCountObject();
    const profitRatio = lottoGame.getProfitRatio();

    OutputView.printWinningStatistics(winningCountObject);
    OutputView.printProfitRatio(profitRatio);
  }
}

export default App;
