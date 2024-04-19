import { AppShell, Burger, Group } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { FaHome, FaBook, FaArrowsAltH, FaUser } from "react-icons/fa";
import AdminRouter from "./AdminRouter";
import classes from './App.module.css';



function App() {
  const [opened, { toggle }] = useDisclosure(true);

  const data = [
    { link: '/admin/home', label: 'Home', icon: FaHome },
    { link: '/admin/livros', label: 'Livros', icon: FaBook },
    { link: '/admin/movimentos', label: 'Movimentos', icon: FaArrowsAltH },
    { link: '/admin/usuarios', label: 'Usuarios', icon: FaUser },
  ];

  const links = data.map((item) => (
    <NavLink
      className={({isActive}) => isActive ? classes.active : classes.link}
      to={item.link}
      key={item.label}
      
    >
      <item.icon className={classes.linkIcon}/>
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 300,
      breakpoint: 'sm',
      collapsed: { mobile: !opened, desktop: !opened },
    }}
    padding="md"
  >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <h1>Logo</h1>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className={classes.navbar}>
        {links}
      </AppShell.Navbar>
      <AppShell.Main>
        <AdminRouter />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;