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

    test('bonusNumber가 숫자가 아니면 에러 발생', () => {
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
});
