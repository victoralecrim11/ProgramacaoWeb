document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://proweb.leoproti.com.br/alunos';
    const alunoForm = document.getElementById('alunoForm');
    const alunoIdInput = document.getElementById('alunoId');
    const formTitle = document.getElementById('form-title');

    // Pega o ID da URL para verificar se é modo de edição
    const params = new URLSearchParams(window.location.search);
    const alunoId = params.get('id');

    // Se houver um ID na URL, estamos em modo de edição
    if (alunoId) {
        formTitle.textContent = 'Editar Aluno';
        // Busca os dados do aluno e preenche o formulário
        fetch(`${apiUrl}/${alunoId}`)
            .then(response => response.json())
            .then(aluno => {
                alunoIdInput.value = aluno.id;
                document.getElementById('nome').value = aluno.nome;
                document.getElementById('matricula').value = aluno.matricula;
                document.getElementById('curso').value = aluno.curso;
                document.getElementById('turma').value = aluno.turma;
            })
            .catch(error => console.error('Erro ao buscar dados do aluno:', error));
    }

    // Evento de envio do formulário (para criar ou atualizar)
    alunoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const alunoData = {
            nome: document.getElementById('nome').value,
            matricula: document.getElementById('matricula').value,
            curso: document.getElementById('curso').value,
            turma: document.getElementById('turma').value,
        };

        const method = alunoId ? 'PUT' : 'POST';
        const endpoint = alunoId ? `${apiUrl}/${alunoId}` : apiUrl;

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alunoData)
            });

            if (response.ok) {
                alert(`Aluno ${alunoId ? 'atualizado' : 'cadastrado'} com sucesso!`);
                window.location.href = 'index.html'; // Redireciona para a lista
            } else {
                throw new Error('Falha ao salvar os dados do aluno.');
            }
        } catch (error) {
            console.error('Erro ao salvar aluno:', error);
            alert('Ocorreu um erro ao salvar o aluno.');
        }
    });
});
