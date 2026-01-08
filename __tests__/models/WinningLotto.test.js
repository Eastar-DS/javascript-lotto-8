import WinningLotto from '../../src/models/WinningLotto.js';
import Lotto from '../../src/models/Lotto.js';
import LottoRank from '../../src/models/LottoRank.js';

describe('WinningLotto 테스트', () => {
  describe('당첨 로또 생성', () => {
    test('당첨 번호와 보너스 번호로 WinningLotto를 생성한다', () => {
      const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
      expect(winningLotto).toBeInstanceOf(WinningLotto);
    });

    test('보너스 번호가 당첨 번호와 중복될 경우 에러가 발생한다', () => {
      expect(() => {
        new WinningLotto([1, 2, 3, 4, 5, 6], 1);
      }).toThrow('[ERROR]');
    });
  });

  describe('등수 판별', () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    test('6개 일치 시 1등을 반환한다', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const rank = winningLotto.judgeRank(lotto);
      expect(rank).toBe(LottoRank.FIRST);
    });

    test('5개 일치 + 보너스 일치 시 2등을 반환한다', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
      const rank = winningLotto.judgeRank(lotto);
      expect(rank).toBe(LottoRank.SECOND);
    });

    test('5개 일치 시 3등을 반환한다', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 8]);
      const rank = winningLotto.judgeRank(lotto);
      expect(rank).toBe(LottoRank.THIRD);
    });

    test('4개 일치 시 4등을 반환한다', () => {
      const lotto = new Lotto([1, 2, 3, 4, 8, 9]);
      const rank = winningLotto.judgeRank(lotto);
      expect(rank).toBe(LottoRank.FOURTH);
    });

    test('3개 일치 시 5등을 반환한다', () => {
      const lotto = new Lotto([1, 2, 3, 8, 9, 10]);
      const rank = winningLotto.judgeRank(lotto);
      expect(rank).toBe(LottoRank.FIFTH);
    });

    test('2개 이하 일치 시 null을 반환한다', () => {
      const lotto = new Lotto([1, 2, 8, 9, 10, 11]);
      const rank = winningLotto.judgeRank(lotto);
      expect(rank).toBeNull();
    });
  });
});
