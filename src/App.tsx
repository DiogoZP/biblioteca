import { AppShell, Burger, Group, Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconBook2, IconArrowsCross, IconUser, IconLogout } from '@tabler/icons-react';
import AdminRouter from "./AdminRouter";
import classes from './App.module.css';
import { useNavigate } from "react-router-dom";
import { logout } from "./services/auth";


function App() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(true);

  const data = [
    { link: '/admin/livros', label: 'Livros', icon: IconBook2 },
    { link: '/admin/movimentos', label: 'Movimentos', icon: IconArrowsCross },
    { link: '/admin/usuarios', label: 'Usuarios', icon: IconUser },
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
    header={{height: 50}}
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
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className={classes.navbar}>
        {links}
        <div className={classes.footer}>
          <Button 
            fullWidth 
            variant="subtle" 
            className={classes.link} 
            leftSection={<IconLogout className={classes.linkIcon} />}
            onClick={() => {
              logout();
              navigate("/login");
            }}
            >
            Sair
          </Button>
        </div>
        
      </AppShell.Navbar>
      <AppShell.Main>
        <AdminRouter />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;