import conexao from "../conexao";


export default {
    async create(req, res) {
        const { nome, data_nascimento, data_cadastro, data_atualizacao, email, telefone, ativo } = req.body;

        try {
            const result = await conexao.client.query('INSERT INTO cad_pessoas (nome, data_nascimento, data_cadastro,'
                + ' data_atualizacao, email, telefone, ativo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING idpessoa',
                [nome, data_nascimento, data_cadastro, data_atualizacao, email, telefone, ativo]);

            return res.status(201).send(`${nome} inserido com sucesso!`);
        } catch (error) {
            console.log(error)
            return res.status(500).send('Erro ao realizar cadastro de pessoa.');
        }
    },

    async consultar(req, res) {
        try {
            const result = await conexao.client.query('SELECT * FROM cad_pessoas');

            return res.status(201).send('Busca por cadastro de pessoa realizada com sucesso!');
        } catch (error) {
            return res.status(500).send('Nenhuma pessoa encontrado!');
        }
    },

    async delete(req, res, next) {
        const { idpessoa } = req.params;

        try {
            const result = await conexao.client.query('DELETE FROM cad_pessoas WHERE idpessoa = $1',
            [idpessoa]);

            if (result.rowCount == 0) {
                return res.status(404).send('Cadastro de pessoa não encontrado');
            } else {
                return res.status(200).send(`Pessoa: ${nome} removido com sucesso!`);
            }
        } catch (error) {
            return res.status(500).send('Erro ao remover cadastro de pessoa!');
        }
    },

    async alterar(req, res, next) {
        const { idpessoa } = req.params;
        const { nome, email, telefone, data_nascimento, data_cadastro, data_atualizacao, ativo } = req.body;

        try {
            const result = await conexao.client.query('UPDATE cad_pessoas SET nome = $1, email = $2,' +
            'telefone = $3, data_nascimento = $4, data_cadastro = $5, data_atualizacao = $6, ativo = $7 WHERE idpessoa = $8',
                [nome, email, telefone, data_nascimento, data_cadastro, data_atualizacao, ativo, idpessoa]);
            
            if (result.rowCount == 0) {
                return res.status(404).send('Nenhúm usuário encontrado!');
            } else {
                return res.status(200).send(`Cadastro: ${nome} alterado com sucesso!`);
            }
        } catch (error) {
            return res.status(500).send('Erro ao atualizar cadastro de pessoa!');
        }
    }
}