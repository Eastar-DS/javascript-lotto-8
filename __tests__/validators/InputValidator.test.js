import InputValidator from '../../src/validators/InputValidator.js';

describe('InputValidator 테스트', () => {
  describe('구입 금액 검증', () => {
    test('구입 금액이 숫자가 아닐 경우 에러가 발생한다', () => {
      expect(() => {
        InputValidator.validatePurchaseAmount('abc');
      }).toThrow('[ERROR]');
    });
  });
});
