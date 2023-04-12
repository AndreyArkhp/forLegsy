import {
  URL_BASE,
  URL_CARDS_DETAIL,
  URL_CARDS_FOTO,
  URL_SUPPLIER,
  URL_SUPPLIER_PARAM,
} from './constants';
import { ICard } from './types';

class Api {
  private readonly _address: string;
  constructor(url: string) {
    this._address = url;
  }

  private async _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const error = await res.json();
      throw error;
    }
  }

  getSupplierCards(id: string) {
    return fetch(this._address + URL_SUPPLIER + URL_SUPPLIER_PARAM + id)
      .then(this._checkResponse<number[]>)
      .catch((err) => {
        throw err;
      });
  }

  getCardsDetail(ids: number[]) {
    return fetch(this._address + URL_CARDS_DETAIL, {
      method: 'POST',
      body: JSON.stringify({
        nm_ids: ids,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse<ICard[]>)
      .catch((err) => {
        throw err;
      });
  }

  getCardsFoto(ids: number[]) {
    return fetch(this._address + URL_CARDS_FOTO, {
      method: 'POST',
      body: JSON.stringify({
        nm_ids: ids,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse<string[]>)
      .catch((err) => {
        throw err;
      });
  }
}

const api = new Api(URL_BASE);

export default api;
