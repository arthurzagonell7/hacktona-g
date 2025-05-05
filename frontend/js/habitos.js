document.addEventListener('DOMContentLoaded', async () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      window.location.href = 'index.html';
      return;
    }
  
    await carregarHabitos(usuario.id);
  
    document.getElementById('formHabito').addEventListener('submit', async (e) => {
      e.preventDefault();
      const nome = document.getElementById('nomeHabito').value;
      const meta = document.getElementById('metaHabito').value;
  
      try {
        const response = await fetch('http://localhost:3000/habitos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id: usuario.id, nome, meta_diaria: meta })
        });
  
        if (response.ok) {
          document.getElementById('formHabito').reset();
          await carregarHabitos(usuario.id);
        }
      } catch (err) {
        console.error('Erro:', err);
      }
    });
  });
  
  async function carregarHabitos(usuarioId) {
    try {
      const response = await fetch(`http://localhost:3000/habitos/${usuarioId}`);
      const habitos = await response.json();
      
      const lista = document.getElementById('listaHabitos');
      lista.innerHTML = habitos.map(habito => `
        <div class="habito">
          <div>
            <h3>${habito.nome}</h3>
            <p>Meta: ${habito.meta_diaria}x/dia</p>
          </div>
          <button onclick="registrarProgresso(${habito.id})">Registrar</button>
        </div>
      `).join('');
    } catch (err) {
      console.error('Erro ao carregar hábitos:', err);
    }
  }
  
  function registrarProgresso(habitoId) {
    const hoje = new Date().toISOString().split('T')[0];
    fetch('http://localhost:3000/progresso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habito_id: habitoId, data: hoje })
    }).then(() => alert('Progresso registrado!'));
  }