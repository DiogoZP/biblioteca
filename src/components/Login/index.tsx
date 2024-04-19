import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text
  } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
  
function Login() {
  return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Bem-vindo de volta!
          </Title>
  
          <TextInput label="Email:" placeholder="login@gmail.com" size="md" />
          <PasswordInput label="Senha:" placeholder="Sua senha" mt="md" size="md" />
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>
  
          <Text ta="center" mt="md">
            Não tem uma conta?{' '}
            <Link to="/registro" className={classes.link}>
              Registre-se
            </Link>
          </Text>
        </Paper>
      </div>
  );
}
  
export default Login;
  