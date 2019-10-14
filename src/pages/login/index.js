import React, { useState } from 'react';

import api from '../../services/api';

export default function Login({ history }) {

  // getter and setter do state e-mail
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    // previne o comportamento padrão do evento (no caso o submit)
    event.preventDefault();

    const response = await api.post('/users', { email });
    const { _id } = response.data;

    // salva o id do usuário no local storage do navegador
    localStorage.setItem('user', _id);
    
    history.push('/dashboard');
  }

  return (
    // fragment (como se fosse uma div, porém não aparece na árvore de elementos)
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail *</label>
        <input 
          id="email" 
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  );
}