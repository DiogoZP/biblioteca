import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Modal,
    Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './styles.module.css';
import { useForm } from "react-hook-form";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

type formData = {
  email: string;
  senha: string;
}
  
function Login() {
const [opened, { open, close }] = useDisclosure(false);
const form = useForm<formData>();
const navigate = useNavigate();

async function submitLogin(formData: { email: string; senha: string })
{
  if(await login(formData.email, formData.senha))
  {
    navigate("/admin/livros");
    return;
  }
  open();
}

return (
  <>
    <Modal opened={opened} onClose={close} title={<Title fz={"h3"}>Login Inválido</Title>}>
      <Text>Usuário ou senha incorretos.</Text>
      <Flex justify={"flex-end"}>
        <Button onClick={close} variant="filled" mt="lg">
          Ok
        </Button>
      </Flex>
    </Modal>
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Bem-vindo de volta!
        </Title>
        <form onSubmit={form.handleSubmit(submitLogin)}>
          <TextInput label="Email:" placeholder="login@gmail.com" size="md" {...form.register("email")}/>
          <PasswordInput label="Senha:" placeholder="Sua senha" mt="md" size="md" {...form.register("senha")} />
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  </>
);
}
  
export default Login;
  