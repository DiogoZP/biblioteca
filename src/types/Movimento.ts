import Livro from './Livro';
import Usuario from './Usuario';

type Movimento = {
    id: number;
    dataRetirada: Date;
    dataDevolucao?: Date;
    livro?: Livro;
    livroId: number;
    user?: Usuario;
    userId: number;
};

export default Movimento;