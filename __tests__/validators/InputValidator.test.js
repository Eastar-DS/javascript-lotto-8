import InputValidator from '../../src/validators/InputValidator.js';

describe('InputValidator 테스트', () => {
  describe('구입 금액 검증', () => {
    test('구입 금액이 숫자가 아닐 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validatePurchaseAmount('abc');
      }).toThrow('[ERROR]');
    });

    test('구입 금액이 1,000원 단위가 아닐 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validatePurchaseAmount('1500');
      }).toThrow('[ERROR]');
    });

    test('구입 금액이 0원 이하일 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validatePurchaseAmount('0');
      }).toThrow('[ERROR]');

      expect(() => {
        InputValidator.validatePurchaseAmount('-1000');
      }).toThrow('[ERROR]');
    });
  });

  describe('당첨 번호 검증', () => {
    test('당첨 번호가 6개가 아닐 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5]);
      }).toThrow('[ERROR]');
    });

    test('당첨 번호에 중복된 숫자가 있을 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5, 5]);
      }).toThrow('[ERROR]');
    });

    test('당첨 번호에 숫자가 아닌 값이 포함될 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5, 'a']);
      }).toThrow('[ERROR]');
    });

    test('당첨 번호가 1~45 범위를 벗어날 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validateWinningNumbers([1, 2, 3, 4, 5, 46]);
      }).toThrow('[ERROR]');

      expect(() => {
        InputValidator.validateWinningNumbers([0, 1, 2, 3, 4, 5]);
      }).toThrow('[ERROR]');
    });
  });

  describe('보너스 번호 검증', () => {
    test('보너스 번호가 숫자가 아닐 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validateBonusNumber('abc', [1, 2, 3, 4, 5, 6]);
      }).toThrow('[ERROR]');
    });

    test('보너스 번호가 1~45 범위를 벗어날 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validateBonusNumber('46', [1, 2, 3, 4, 5, 6]);
      }).toThrow('[ERROR]');

      expect(() => {
        InputValidator.validateBonusNumber('0', [1, 2, 3, 4, 5, 6]);
      }).toThrow('[ERROR]');
    });

    test('보너스 번호가 당첨 번호와 중복될 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validateBonusNumber('1', [1, 2, 3, 4, 5, 6]);
      }).toThrow('[ERROR]');
    });
  });
});
