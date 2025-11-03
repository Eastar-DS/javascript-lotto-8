import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants/messages';
import { RANK } from '../constants/lottoConfig';

class OutputView {
  static printPurchaseCount(count) {
    Console.print(MESSAGES.OUTPUT.PURCHASE_COUNT(count));
  }

  static printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(MESSAGES.OUTPUT.LOTTO_NUMBERS(lotto.getNumbers()));
    });
  }

  static printWinningStatistics(winningCountObject) {
    Console.print(MESSAGES.OUTPUT.STATISTICS_TITLE);
    Console.print(MESSAGES.OUTPUT.STATISTICS_DIVIDER);
    Console.print(MESSAGES.OUTPUT.WINNING_RESULT_FIFTH(winningCountObject[RANK.FIFTH]));
    Console.print(MESSAGES.OUTPUT.WINNING_RESULT_FOURTH(winningCountObject[RANK.FOURTH]));
    Console.print(MESSAGES.OUTPUT.WINNING_RESULT_THIRD(winningCountObject[RANK.THIRD]));
    Console.print(MESSAGES.OUTPUT.WINNING_RESULT_SECOND(winningCountObject[RANK.SECOND]));
    Console.print(MESSAGES.OUTPUT.WINNING_RESULT_FIRST(winningCountObject[RANK.FIRST]));
  }

  static printProfitRatio(profitRatio) {
    Console.print(MESSAGES.OUTPUT.PROFIT_RATIO(profitRatio));
  }
}

export default OutputView;
