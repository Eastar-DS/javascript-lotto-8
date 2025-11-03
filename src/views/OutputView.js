import { Console } from '@woowacourse/mission-utils';

class OutputView {
  static printPurchaseCount(count) {
    Console.print(`${count}개를 구매했습니다.`);
  }

  static printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
  }

  static printWinningStatistics(winningCountObject) {
    Console.print('당첨 통계');
    Console.print('---');
    Console.print(`3개 일치 (5,000원) - ${winningCountObject[5]}개`);
    Console.print(`4개 일치 (50,000원) - ${winningCountObject[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningCountObject[3]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningCountObject[2]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${winningCountObject[1]}개`);
  }

  static printProfitRatio(profitRatio) {
    Console.print(`총 수익률은 ${profitRatio}%입니다.`);
  }
}

export default OutputView;
