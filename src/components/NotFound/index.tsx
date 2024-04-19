import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './styles.module.css';

function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Página não encontrada.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
      A página que você está buscando não existe. 
      Você pode ter digitado o endereço incorreto ou a página foi movida para outra URL. 
      Se você acha que isso é um erro, entre em contato com o suporte.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Voltar ao início
        </Button>
      </Group>
    </Container>
  );
}

export default NotFound;