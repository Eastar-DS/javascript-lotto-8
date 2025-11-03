import { Console, Random } from '@woowacourse/mission-utils';
import InputView from './views/InputView';
import OutputView from './views/OutputView';
import Lotto from './models/Lotto';
import LottoGame from './models/LottoGame';

class App {
  async run() {
    try {
      const cost = await InputView.readCost();
      const count = parseInt(cost / 1000, 10);

      OutputView.printPurchaseCount(count);
      const lottos = [];
      for (let i = 0; i < count; i += 1) {
        const randomNumbersArray = Random.pickUniqueNumbersInRange(1, 45, 6);
        lottos.push(new Lotto(randomNumbersArray));
      }
      OutputView.printLottos(lottos);

      const winningNumbers = await InputView.readWinningNumbers();
      const winningLotto = new Lotto(winningNumbers);

      const bonusNumber = await InputView.readBonusNumber();

      const lottoGame = new LottoGame(lottos, winningLotto, bonusNumber);

      const winningCountObject = lottoGame.getWinningCountObject();
      const profitRatio = lottoGame.getProfitRatio();

      OutputView.printWinningStatistics(winningCountObject);
      OutputView.printProfitRatio(profitRatio);
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default App;
