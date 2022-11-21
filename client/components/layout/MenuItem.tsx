import Link from 'next/link';
import React, { FC } from 'react';
import IMenu from '../../interfaces/menu.interface';

interface Props {
  menu: IMenu
}

const MenuItem: FC<Props> = ({ menu }) => {
  return (
    <Link href={menu.url} className="text-white">
      {menu.name}
    </Link>
  );
};

export default MenuItem;
