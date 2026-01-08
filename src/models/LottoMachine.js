import { Random } from '@woowacourse/mission-utils';
import { LOTTO_PRICE, MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER, LOTTO_NUMBER_COUNT } from '../constants/constants.js';
import Lotto from './Lotto.js';

class LottoMachine {
  static generateLottos(purchaseAmount) {
    const lottoCount = purchaseAmount / LOTTO_PRICE;
    const lottos = [];

    for (let i = 0; i < lottoCount; i += 1) {
      const numbers = Random.pickUniqueNumbersInRange(
        MIN_LOTTO_NUMBER,
        MAX_LOTTO_NUMBER,
        LOTTO_NUMBER_COUNT,
      );
      lottos.push(new Lotto(numbers));
    }

    return lottos;
  }
}

export default LottoMachine;
