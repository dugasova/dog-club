import "./Menu.scss";
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Menu() {
  const { t } = useTranslation();
  const routes = [
    {
      path: '/',
      title: t('menu.lessTalk'),
    },
    {
      path: "/services",
      title: t('menu.services'),
    },
    {
      path: "/happy-customer",
      title: t('menu.happyCustomer'),
    },
    {
      path: '/contact',
      title: t('menu.contact'),
    },
  ]
  return (
    <nav className="header-nav">
      <ul className="header-nav-items">
        {
          routes.map((route, index) => (
            <li
              className='header-nav-item'
              key={index}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive ? "header-nav-link active" : "header-nav-link"
                }
              >{route.title}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
