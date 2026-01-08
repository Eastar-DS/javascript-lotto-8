import LottoMachine from '../../src/models/LottoMachine.js';

describe('LottoMachine 테스트', () => {
  test('구입 금액에 따라 올바른 개수의 로또를 생성한다', () => {
    const lottos = LottoMachine.generateLottos(3000);
    expect(lottos.length).toBe(3);
  });

  test('생성된 각 로또가 1~45 범위의 중복되지 않는 6개 숫자를 가진다', () => {
    const lottos = LottoMachine.generateLottos(5000);

    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      expect(numbers.length).toBe(6);

      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(6);

      numbers.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(45);
      });
    });
  });

  test('생성된 로또 번호가 오름차순으로 정렬되어 있다', () => {
    const lottos = LottoMachine.generateLottos(2000);

    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      expect(numbers).toEqual(sortedNumbers);
    });
  });
});
