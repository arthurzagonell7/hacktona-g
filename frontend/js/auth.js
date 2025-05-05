document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
  
      if (response.ok) {
        const usuario = await response.json();
        localStorage.setItem('usuario', JSON.stringify(usuario));
        window.location.href = 'habitos.html';
      } else {
        alert('Email ou senha incorretos');
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao conectar com o servidor');
    }
  });
  
  document.getElementById('cadastroForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });
  
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao cadastrar');
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao conectar com o servidor');
    }
  });