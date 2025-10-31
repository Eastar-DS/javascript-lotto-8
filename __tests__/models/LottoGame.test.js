import Lotto from '../../src/models/Lotto';
import LottoGame from '../../src/models/LottoGame';

describe('LottoGame 모델 테스트', () => {
  describe('유효성 검사', () => {
    const validLottosArray = [new Lotto([1, 2, 3, 4, 5, 6])];
    const validWinningLotto = new Lotto([1, 2, 3, 4, 5, 6]);

    test('lottos어레이의 원소가 Lotto 인스턴스가 아니면 에러 발생', () => {
      // given
      const lottosArray = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      // when & then
      expect(() => new LottoGame(lottosArray, validWinningLotto, bonusNumber)).toThrow('[ERROR]');
    });

    test('winningLotto가 Lotto 인스턴스가 아니면 에러 발생', () => {
      // given
      const winningLotto = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      // when & then
      expect(() => new LottoGame(validLottosArray, winningLotto, bonusNumber)).toThrow('[ERROR]');
    });

    test('bonusNumber가 숫자타입의 정수가 아니면 에러 발생', () => {
      // given
      const bonusNumber = '1';

      // when & then
      expect(() => new LottoGame(validLottosArray, validWinningLotto, bonusNumber)).toThrow(
        '[ERROR]'
      );
    });

    test('bonusNumber가 1~45 안의 숫자가 아니면 에러 발생', () => {
      // given
      const bonusNumber = -1;

      // when & then
      expect(() => new LottoGame(validLottosArray, validWinningLotto, bonusNumber)).toThrow(
        '[ERROR]'
      );
    });

    test('bonusNumber가 당첨 번호에 포함되어 있으면 에러 발생', () => {
      // given
      const bonusNumber = 1;

      // when & then
      expect(() => new LottoGame(validLottosArray, validWinningLotto, bonusNumber)).toThrow(
        '[ERROR]'
      );
    });

    test('유효한 입력으로 LottoGame이 정상적으로 생성된다', () => {
      // given
      const bonusNumber = 7;

      // when
      const game = new LottoGame(validLottosArray, validWinningLotto, bonusNumber);

      // then
      expect(game).toBeInstanceOf(LottoGame);
    });
  });

  describe('getWinningCountObject() 메소드 테스트', () => {
    test('1등 당첨 테스트', () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;
      const game = new LottoGame(lottos, winningLotto, bonusNumber);

      // when
      const winningCountObject = game.getWinningCountObject();

      // then
      expect(winningCountObject[1]).toBe(1);
    });

    test('2등 당첨 테스트', () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 7]);
      const bonusNumber = 6;
      const game = new LottoGame(lottos, winningLotto, bonusNumber);

      // when
      const winningCountObject = game.getWinningCountObject();

      // then
      expect(winningCountObject[2]).toBe(1);
    });

    test('3등 당첨 테스트', () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 8]);
      const bonusNumber = 7;
      const game = new LottoGame(lottos, winningLotto, bonusNumber);

      // when
      const winningCountObject = game.getWinningCountObject();

      // then
      expect(winningCountObject[3]).toBe(1);
    });

    test('4등 당첨 테스트', () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningLotto = new Lotto([1, 2, 3, 4, 8, 9]);
      const bonusNumber = 7;
      const game = new LottoGame(lottos, winningLotto, bonusNumber);

      // when
      const winningCountObject = game.getWinningCountObject();

      // then
      expect(winningCountObject[4]).toBe(1);
    });

    test('5등 당첨 테스트', () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 8, 9, 10])];
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;
      const game = new LottoGame(lottos, winningLotto, bonusNumber);

      // when
      const winningCountObject = game.getWinningCountObject();

      // then
      expect(winningCountObject[5]).toBe(1);
    });

    test('당첨 안됐을 때 테스트', () => {
      // given
      const lottos = [new Lotto([11, 12, 13, 8, 9, 10])];
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;
      const game = new LottoGame(lottos, winningLotto, bonusNumber);

      // when
      const winningCountObject = game.getWinningCountObject();

      // then
      expect(winningCountObject[1]).toBe(0);
      expect(winningCountObject[2]).toBe(0);
      expect(winningCountObject[3]).toBe(0);
      expect(winningCountObject[4]).toBe(0);
      expect(winningCountObject[5]).toBe(0);
    });
  });

  describe('getProfitRatio() 메소드 테스트', () => {
    test('8개 구입, 5,000원 수익 시 62.% 수익률 출력', () => {
      // given
      const lottos = [
        new Lotto([8, 21, 23, 41, 42, 43]),
        new Lotto([3, 5, 11, 16, 32, 38]),
        new Lotto([7, 11, 16, 35, 36, 44]),
        new Lotto([1, 8, 11, 31, 41, 42]),
        new Lotto([13, 14, 16, 38, 42, 45]),
        new Lotto([7, 11, 30, 40, 42, 43]),
        new Lotto([2, 13, 22, 32, 38, 45]),
        new Lotto([1, 3, 5, 14, 22, 45]),
      ];
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;

      // when
      const game = new LottoGame(lottos, winningLotto, bonusNumber);

      // then
      expect(game.getProfitRatio()).toBe('62.5');
    });
  });
});
