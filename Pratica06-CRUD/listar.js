document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://proweb.leoproti.com.br/alunos';
  const alunosTabela = document.getElementById('alunosTabela');

  const fetchAlunos = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Não foi possível carregar os dados dos alunos.');

      const alunos = await response.json();
      alunosTabela.innerHTML = ''; // Limpa a tabela antes de preencher

      alunos.forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.matricula}</td>
                    <td>${aluno.curso}</td>
                    <td>${aluno.turma}</td>
                    <td>
                        <a href="form.html?id=${aluno.id}" class="btn btn-warning btn-sm">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="deleteAluno(${aluno.id})">Excluir</button>
                    </td>
                `;
        alunosTabela.appendChild(tr);
      });
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      alunosTabela.innerHTML = '<tr><td colspan="6" class="text-center">Falha ao carregar alunos. Tente novamente mais tarde.</td></tr>';
    }
  };

  window.deleteAluno = async (id) => {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Aluno excluído com sucesso!');
          fetchAlunos(); // Atualiza a tabela
        } else {
          throw new Error('Falha ao excluir o aluno.');
        }
      } catch (error) {
        console.error('Erro na exclusão:', error);
        alert('Ocorreu um erro ao tentar excluir o aluno.');
      }
    }
  };

  // Carrega os alunos ao iniciar a página
  fetchAlunos();
});
