import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ContractContext } from '../../contexts/ContractContext';
import useEth from '../../hooks/useEth';
import IMenu from '../../interfaces/menu.interface';
import MenuItem from './MenuItem';

const MENU_ITEMS = [
  {
    name: 'Vote',
    url: '/',
  },
  {
    name: 'Administration',
    url: '/admin',
    onlyAdmin: true
  },
] as IMenu[]

const Menu = () => {
  const router = useRouter()
  const { state: { contract, accounts } } = useEth()
  const { isAdmin } = useContext(ContractContext)

  if (!contract || !accounts || !accounts.length) return null
  if (!isAdmin) return null

  return (
    <div className="flex gap-6">
      {
        MENU_ITEMS
          .filter(menu => menu.url !== router.pathname)
          .map(
            (menu, index) => (
              <MenuItem menu={menu} key={index} />
            )
          )
      }
    </div>
  );
};

export default Menu;
