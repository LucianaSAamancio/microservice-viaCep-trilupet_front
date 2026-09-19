const API_URL = 'http://192.168.0.145:5000/api/agendamentos';
    let ufAtual = '';

    // Chamada à API Externa ViaCEP
    async function buscarEndereco() {
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        if (cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('localidade').value = `${data.localidade}/${data.uf}`;
                ufAtual = data.uf;
            } else {
                alert('CEP não encontrado!');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    }

    // Método POST para a API Principal
    async function salvarAgendamento() {
        const petNome = document.getElementById('petNome').value;
        const cep = document.getElementById('cep').value;
        const logradouro = document.getElementById('logradouro').value;
        const bairro = document.getElementById('bairro').value;
        const localidade = document.getElementById('localidade').value.split('/')[0] || '';

        if (!petNome || !cep) {
            alert('Preencha o nome do pet e o CEP!');
            return;
        }

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pet_nome: petNome, cep, logradouro, bairro, localidade, uf: ufAtual })
        });

        limparFormulario();
        carregarAgendamentos();
    }

    // Método GET para a API Principal
    async function carregarAgendamentos() {
        const response = await fetch(API_URL);
        const agendamentos = await response.json();

        const tbody = document.getElementById('tabelaAgendamentos');
        tbody.innerHTML = '';

        agendamentos.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.pet_nome}</td>
                <td>${item.logradouro}, ${item.bairro} - ${item.localidade}/${item.uf}</td>
                <td>
                    <button class="btn-edit" onclick="editarAgendamento(${item.id})">Editar</button>
                    <button class="btn-delete" onclick="deletarAgendamento(${item.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Método PUT para a API Principal
    async function editarAgendamento(id) {
        const novoNome = prompt("Digite o novo nome do Pet:");
        if (!novoNome) return;

        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pet_nome: novoNome })
        });

        carregarAgendamentos();
    }

    // Método DELETE para a API Principal
    async function deletarAgendamento(id) {
        if (!confirm("Deseja remover este agendamento?")) return;

        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        carregarAgendamentos();
    }

    function limparFormulario() {
        document.getElementById('petNome').value = '';
        document.getElementById('cep').value = '';
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('localidade').value = '';
    }

    // Carrega a lista ao abrir a página
    carregarAgendamentos();