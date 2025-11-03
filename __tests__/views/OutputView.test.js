import { Console } from '@woowacourse/mission-utils';
import OutputView from '../../src/views/OutputView';
import Lotto from '../../src/models/Lotto';

describe('OutputView 모델 테스트', () => {
  let printSpy;

  beforeEach(() => {
    printSpy = jest.spyOn(Console, 'print');
  });

  afterEach(() => {
    printSpy.mockRestore();
  });

  describe('printPurchaseCount() 메소드로 구매한 로또 개수 출력', () => {
    test('1개 구매시 출력', () => {
      // given
      const count = 1;

      // when
      OutputView.printPurchaseCount(count);

      // then
      expect(printSpy).toHaveBeenCalledWith('1개를 구매했습니다.');
    });
  });

  describe('printLottos() 메소드로 구매한 로또번호들 출력', () => {
    test('로또 번호들을 배열 형태로 출력', () => {
      // given
      const lottos = [new Lotto([8, 21, 23, 41, 42, 43]), new Lotto([3, 5, 11, 16, 32, 38])];

      // when
      OutputView.printLottos(lottos);

      // then
      expect(printSpy).toHaveBeenCalledWith('[8, 21, 23, 41, 42, 43]');
      expect(printSpy).toHaveBeenCalledWith('[3, 5, 11, 16, 32, 38]');
      expect(printSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('printWinningStatistics() 메소드로 구매한 로또들의 당첨 등수 통계 출력', () => {
    test('당첨 통계 제목 출력', () => {
      // given
      const winningCountObject = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

      // when
      OutputView.printWinningStatistics(winningCountObject);

      // then
      expect(printSpy).toHaveBeenCalledWith('당첨 통계');
      expect(printSpy).toHaveBeenCalledWith('---');
    });

    test('5등 통계를 출력한다', () => {
      // given
      const winningCountObject = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 0 };

      // when
      OutputView.printWinningStatistics(winningCountObject);

      // then
      expect(printSpy).toHaveBeenCalledWith(expect.stringContaining('3개 일치 (5,000원) - 1개'));
    });

    test('4등 통계를 출력한다', () => {
      // given
      const winningCountObject = { 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 0 };

      // when
      OutputView.printWinningStatistics(winningCountObject);

      // then
      expect(printSpy).toHaveBeenCalledWith(expect.stringContaining('4개 일치 (50,000원) - 2개'));
    });

    test('3등 통계를 출력한다', () => {
      // given
      const winningCountObject = { 1: 0, 2: 0, 3: 1, 4: 0, 5: 0, 6: 0 };

      // when
      OutputView.printWinningStatistics(winningCountObject);

      // then
      expect(printSpy).toHaveBeenCalledWith(
        expect.stringContaining('5개 일치 (1,500,000원) - 1개')
      );
    });

    test('2등 통계를 출력한다', () => {
      // given
      const winningCountObject = { 1: 0, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0 };

      // when
      OutputView.printWinningStatistics(winningCountObject);

      // then
      expect(printSpy).toHaveBeenCalledWith(
        expect.stringContaining('5개 일치, 보너스 볼 일치 (30,000,000원) - 1개')
      );
    });

    test('1등 통계를 출력한다', () => {
      // given
      const winningCountObject = { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

      // when
      OutputView.printWinningStatistics(winningCountObject);

      // then
      expect(printSpy).toHaveBeenCalledWith(
        expect.stringContaining('6개 일치 (2,000,000,000원) - 1개')
      );
    });
  });

  describe('printProfitRatio() 메소드 테스트', () => {
    test('수익률을 퍼센트로 출력한다', () => {
      // given
      const profitRate = '62.5';

      // when
      OutputView.printProfitRatio(profitRate);

      // then
      expect(printSpy).toHaveBeenCalledWith('총 수익률은 62.5%입니다.');
    });
  });
});
