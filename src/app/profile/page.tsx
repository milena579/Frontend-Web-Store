"use client"

import { Menu } from "@/componets/menu/menu";
import React, { useEffect, useState } from "react";

interface IUser{
  id: string;
  name: string;
  email: string;
  cpf: string;
}
const Profile = () => {
  const [userData, setUserData] = useState<IUser>();
  const [error, setError] = useState<boolean>();
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(false);


  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    const token = sessionStorage.getItem("Token");

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      setError(true)
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data: IUser = await response.json();

      // Validação adicional para os dados do usuário
      if (!data || !data.id || !data.name || !data.email || !data.cpf) {
        throw new Error("Dados do usuário incompletos ou inválidos.");
      }

      setUserData(data);
      setError(false);
    } 
    catch (err: any) {
      console.error("Erro ao buscar os dados do usuário:", err);
      setError(true);
    }
  };

  // useEffect para buscar os dados quando o componente é montado
  useEffect(() => {
    fetchUserData();
  }, []);

  const atualizarCad = async () => {
    if (!userData) {
      alert("Nenhum dado encontrado para atualizar.");
      return;
    }
  
    try {
      const token = sessionStorage.getItem("Token");

      if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        return;
      }
  
      const response = await fetch("http://localhost:8080/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          cpf: userData.cpf,
        }),
      });
  
    
      if (!response.ok) {
        alert(`Erro ao atualizar cadastro`);
        setError(true);
      } else {
        alert("Cadastro atualizado com sucesso!");
        setError(false);
        setDisabled(true);
        setIsVisible(true); 
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
      alert("Erro ao atualizar os dados.");
      setError(true);
    }
}
  return (
    <>
    <Menu op1=""></Menu>
    <div className="w-11/12 max-w-3xl bg-white rounded-lg shadow-md p-5 mx-auto mt-10">
      {/* Cabeçalho */}
      <header className="border-b-2 border-teal-700 pb-4 mb-5">
        <h1 className="text-center text-teal-500 font-bold text-xl">Meu Perfil</h1>
      </header>

      <div className="flex flex-wrap gap-5">
        {/* Foto de perfil e opções */}
        <div className="flex-1 min-w-[200px] text-center bg-teal-50 rounded-lg shadow-md p-5">
          <img
            src="https://catking.in/wp-content/uploads/2017/02/default-profile-1.png"
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-teal-700"
          />
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#atualizar" className="text-teal-600 font-bold hover:border-b-2" onClick={() => {setIsVisible(!isVisible); setDisabled(!isDisabled);}}>
                Editar cadastro
              </a>
            </li>
            <li>
              <a href="#alterar-senha" className="text-teal-600 font-bold hover:border-b-2">
                Alterar senha
              </a>
            </li>
            <li>
              <a href="#deletar" className="text-red-500 font-bold">
                Deletar conta
              </a>
            </li>
            <li>
              <a href="#sair" className="text-gray-700 font-bold">
                Sair
              </a>
            </li>
          </ul>
        </div>

        {/* Formulário de informações */}
        <section className="flex-1 min-w-[400px]">
          <h2 className="text-teal-500 text-center text-lg font-bold mb-4">Minhas Informações</h2>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="nome" className="text-gray-700 text-sm">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={userData?.name}
                className="p-2 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={!isDisabled}
                onChange={(e) => setUserData((prev) => ({ ...prev!, name: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData?.email}
                className="p-2 border border-teal-700 rounded-md focus:outline-none"
                disabled={!isDisabled}
                onChange={(e) => setUserData((prev) => ({ ...prev!, email: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="cpf" className="text-gray-700 text-sm">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={userData?.cpf}
                className="p-2 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={!isDisabled}
                onChange={(e) => setUserData((prev) => ({ ...prev!, cpf: e.target.value }))}
              />
            </div>
            <button className={`bg-teal-400 rounded p-2 text-white hover:bg-green-500  ${isVisible ? "block" : "hidden"}`}  onClick={() => {atualizarCad()}}>Atualizar Cadastro</button>
          </form>
        </section>
      </div>
    </div>
    </>
  );
};

export default Profile;
