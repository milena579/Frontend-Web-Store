"use client"
import Link from 'next/link';
import './login.css';
import { ROUTES } from "@/constants/routes"
import { useState } from 'react';
import { Menu } from '@/componets/menu/menu';

export default function Login(){

    const [email, setEdv] =  useState<string>("")
    const [senha, setSenha] =  useState<string>("")



    const Logar = async () => {
    }

    const Cadastrar = async () => {
        
    }

    return(
        <>
            <div className='flex items-center w-full justify-center gap-40'>
                <div className="bg-cover bg-center flex h-screen items-center justify-center" style={{backgroundImage: "url('/fundo-colorido.png')"}}>
                    <div className="flex flex-col items-center bg-white h-[550px] w-[430px] justify-around p-14 text-black border">
                        <div className="flex flex-col gap-5 w-full">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" className="w-full h-8 border p-2" value={email} onChange={(event) => {setEdv(event.target.value)}} />
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" name="senha" className="w-full h-8 border p-2" value={senha} onChange={(event) => {setSenha(event.target.value)}} />
                        </div>
                        <button className="bg-sky-600 p-2 w-32 text-white rounded-md" onClick={() => {Logar()}}> <Link href={ROUTES.products}>Entrar</Link></button>
                    </div>
                </div>

                <div className="bg-cover bg-center flex h-screen items-center justify-center" style={{backgroundImage: "url('/fundo-colorido.png')"}}>
                    <div className="flex flex-col items-center bg-white h-[550px] w-[430px] justify-around p-14 text-black border">
                        <div className="flex flex-col gap-5 w-full">
                            <label htmlFor="nome">Nome Completo</label>
                            <input type="text" name="nome" className="w-full h-8 border p-2" value={email} onChange={(event) => {setEdv(event.target.value)}} />
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <label htmlFor="dataNasc">Data Nascimento</label>
                            <input type="text" name="dataNasc" className="w-full h-8 border p-2" value={email} onChange={(event) => {setEdv(event.target.value)}} />
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" className="w-full h-8 border p-2" value={email} onChange={(event) => {setEdv(event.target.value)}} />
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" name="senha" className="w-full h-8 border p-2" value={senha} onChange={(event) => {setSenha(event.target.value)}} />
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <label htmlFor="confirmsenha"> Confirmar Senha:</label>
                            <input type="password" name="confirmsenha" className="w-full h-8 border p-2" value={senha} onChange={(event) => {setSenha(event.target.value)}} />
                        </div>
                        <button className="bg-sky-600 p-2 w-32 text-white rounded-md" onClick={() => {Logar()}}> <Link href={ROUTES.products}>Entrar</Link></button>
                    </div>
                </div>
            </div>
        </>
    );
}