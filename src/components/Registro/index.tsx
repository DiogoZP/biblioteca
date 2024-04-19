import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Container,
    Button,
    Text
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
  
function Registro() {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Crie sua conta!
        </Title>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email:" placeholder="registro@gmail.com" required />
          <PasswordInput label="Senha:" placeholder="Sua senha" required mt="md" />
          <Button fullWidth mt="xl">
            Cadastrar
          </Button>
          <Text ta="center" mt="md">
            Já tem uma conta?{' '}
            <Link to="/" className={classes.link}>
              Login
            </Link>
          </Text>
        </Paper>
      </Container>
    );
}

export default Registro;