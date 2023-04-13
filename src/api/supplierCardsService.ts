import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  URL_BASE,
  URL_CARDS_DETAIL,
  URL_CARDS_FOTO,
  URL_SUPPLIER,
  URL_SUPPLIER_PARAM,
} from '../utils/constants';
import { ICard, IFotoUrls } from '../types';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_BASE }),
  endpoints: (build) => ({
    getSupplierCards: build.query<number[], string>({
      query: (id) => ({
        url: URL_SUPPLIER + URL_SUPPLIER_PARAM + id,
      }),
    }),
    getCardsDetail: build.query<ICard[], number[]>({
      query: (ids: number[]) => ({
        url: URL_CARDS_DETAIL,
        method: 'POST',
        body: { nm_ids: ids },
      }),
    }),
    getCardsFoto: build.query<IFotoUrls, number[]>({
      query: (ids: number[]) => ({
        url: URL_CARDS_FOTO,
        method: 'POST',
        body: { nm_ids: ids },
      }),
    }),
  }),
});
