import Lotto from '../../src/models/Lotto.js';

describe('Lotto 모델 테스트', () => {
  describe('로또 생성 및 검증', () => {
    test('로또 번호가 6개가 아닐 경우 에러가 발생한다', () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5]);
      }).toThrow('[ERROR]');

      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow('[ERROR]');
    });

    test('로또 번호에 중복된 숫자가 있을 경우 에러가 발생한다', () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 5]);
      }).toThrow('[ERROR]');
    });

    test('로또 번호가 1~45 범위를 벗어날 경우 에러가 발생한다', () => {
      expect(() => {
        new Lotto([0, 1, 2, 3, 4, 5]);
      }).toThrow('[ERROR]');

      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 46]);
      }).toThrow('[ERROR]');
    });
  });

  describe('로또 번호 조회', () => {
    test('로또 번호를 오름차순으로 정렬하여 반환한다', () => {
      const lotto = new Lotto([6, 3, 1, 5, 2, 4]);
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('당첨 번호 일치 확인', () => {
    test('주어진 당첨 번호와 일치하는 번호 개수를 반환한다', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

      expect(lotto.countMatches([1, 2, 3, 7, 8, 9])).toBe(3);
      expect(lotto.countMatches([1, 2, 3, 4, 8, 9])).toBe(4);
      expect(lotto.countMatches([1, 2, 3, 4, 5, 9])).toBe(5);
      expect(lotto.countMatches([1, 2, 3, 4, 5, 6])).toBe(6);
      expect(lotto.countMatches([7, 8, 9, 10, 11, 12])).toBe(0);
    });
  });

  describe('보너스 번호 포함 확인', () => {
    test('보너스 번호를 포함하는지 확인한다', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

      expect(lotto.hasBonus(1)).toBe(true);
      expect(lotto.hasBonus(6)).toBe(true);
      expect(lotto.hasBonus(7)).toBe(false);
      expect(lotto.hasBonus(45)).toBe(false);
    });
  });
});
