"use client"
import Link from 'next/link';
import { ROUTES } from "@/constants/routes"
import { useState } from 'react';
import { Menu } from '@/componets/menu/menu';

export default function Login(){

    const [email, setEdv] =  useState<string>("")
    const [senha, setSenha] =  useState<string>("")

    const [cadNome, setCadNome] =  useState<string>("")
    const [cadDataNasc, setCadData] =  useState<string>("")
    const [cadEmail, setCadEmail] =  useState<string>("")
    const [cadSenha, setCadSenha] =  useState<string>("")
    const [cadConfiSenha, setConfiSenha] =  useState<string>("")

    const Logar = async () => {
    }

    const Cadastrar = async () => {
        
    }

    return(
        <>
            <div className='flex items-center justify-center p-4 bg-teal-500 text-branco'><h1 className='font-bold'>PRATA REAL</h1></div>

            <div className='flex items-center w-full justify-center gap-40'>
                <div className="bg-cover bg-center flex h-screen items-center justify-center ">
                    <div className="flex flex-col items-center bg-white h-[600px] w-[430px] gap-12 justify-center p-10 text-black rounded-lg shadow-lg shadow-cyan-500/50">
                        <div className='p-2'>
                            <h1 className='text-lg font-bold'>Login</h1>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" className="w-full h-8 border p-2" value={email} onChange={(event) => {setEdv(event.target.value)}} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" name="senha" className="w-full h-8 border p-2" value={senha} onChange={(event) => {setSenha(event.target.value)}} />
                        </div>
                        <button className="bg-teal-500 p-2 w-32 text-white rounded-md" onClick={() => {Logar()}}> <Link href={ROUTES.products}>Entrar</Link></button>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-white h-[600px] w-[430px] justify-between p-10 text-preto shadow-lg gap-4 rounded-lg shadow-cyan-500/50">
                    <div className='p-2'>
                        <h1 className='text-lg font-bold'>Cadastro</h1>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" name="nome" className="w-full h-8 border p-2" value={cadNome} onChange={(event) => {setCadNome(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="dataNasc">Data Nascimento</label>
                        <input type="date" name="dataNasc" className="w-full h-8 border p-2" value={cadDataNasc} onChange={(event) => {setCadData(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="w-full h-8 border p-2" value={cadEmail} onChange={(event) => {setCadEmail(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" name="senha" className="w-full h-8 border p-2" value={cadSenha} onChange={(event) => {setCadSenha(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="confirmsenha"> Confirmar Senha:</label>
                        <input type="password" name="confirmsenha" className="w-full h-8 border p-2" value={cadConfiSenha} onChange={(event) => {setConfiSenha(event.target.value)}} />
                    </div>
                    <button className="bg-teal-500 p-2 w-32 text-white rounded-md" onClick={() => {Cadastrar()}}> <Link href={ROUTES.products}>Cadastrar</Link></button>
                </div>
            </div>
        </>
    );
}