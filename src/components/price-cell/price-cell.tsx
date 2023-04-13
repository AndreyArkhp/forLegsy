import { FC } from 'react';

const Price: FC<{ price: number }> = ({ price }) => {
  return <>{price / 100}</>;
};

export default Price;
