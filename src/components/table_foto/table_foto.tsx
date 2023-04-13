import { FC } from 'react';
import { cardsApi } from '../../api/supplierCardsService';
import styles from './table_foto.module.css';

const TableFoto: FC<{ id: number }> = ({ id }) => {
  const { data } = cardsApi.useGetCardsFotoQuery([id]);

  const url = data && data[id];

  return (
    <div className={styles.wrapper}>
      <img src={url ?? ''} alt='' className={styles.image} />
    </div>
  );
};

export default TableFoto;
