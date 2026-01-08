import LottoRank from '../../src/models/LottoRank.js';

describe('LottoRank 테스트', () => {
  describe('등수 판별', () => {
    test('6개 일치 시 1등을 반환한다', () => {
      const rank = LottoRank.getRank(6, false);
      expect(rank).toBe(LottoRank.FIRST);
      expect(rank.prize).toBe(2000000000);
    });

    test('5개 일치 + 보너스 일치 시 2등을 반환한다', () => {
      const rank = LottoRank.getRank(5, true);
      expect(rank).toBe(LottoRank.SECOND);
      expect(rank.prize).toBe(30000000);
    });

    test('5개 일치 시 3등을 반환한다', () => {
      const rank = LottoRank.getRank(5, false);
      expect(rank).toBe(LottoRank.THIRD);
      expect(rank.prize).toBe(1500000);
    });

    test('4개 일치 시 4등을 반환한다', () => {
      const rank = LottoRank.getRank(4, false);
      expect(rank).toBe(LottoRank.FOURTH);
      expect(rank.prize).toBe(50000);
    });

    test('3개 일치 시 5등을 반환한다', () => {
      const rank = LottoRank.getRank(3, false);
      expect(rank).toBe(LottoRank.FIFTH);
      expect(rank.prize).toBe(5000);
    });

    test('2개 이하 일치 시 null을 반환한다', () => {
      expect(LottoRank.getRank(2, false)).toBeNull();
      expect(LottoRank.getRank(1, false)).toBeNull();
      expect(LottoRank.getRank(0, false)).toBeNull();
    });
  });
});
