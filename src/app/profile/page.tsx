import React from "react";

const Profile = () => {
  return (
    <div className="w-11/12 max-w-3xl bg-white rounded-lg shadow-md p-5 mx-auto mt-10">
      {/* Cabeçalho */}
      <header className="border-b-2 border-teal-700 pb-4 mb-5">
        <h1 className="text-center text-teal-700 font-bold text-xl">Meu Perfil</h1>
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
              <a href="#atualizar" className="text-teal-700 font-bold hover:text-red-400">
                Atualizar cadastro
              </a>
            </li>
            <li>
              <a href="#alterar-senha" className="text-teal-700 font-bold hover:text-red-400">
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
          <h2 className="text-teal-700 text-center text-lg font-bold mb-4">Minhas Informações</h2>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="nome" className="text-gray-700 text-sm">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Seu nome"
                className="p-2 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="endereco" className="text-gray-700 text-sm">Endereço</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                placeholder="Seu endereço"
                className="p-2 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                className="p-2 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="cpf" className="text-gray-700 text-sm">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                className="p-2 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Profile;
