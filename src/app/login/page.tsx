"use client"
import Link from 'next/link';
import { useState } from 'react';
import { Menu } from '@/componets/menu/menu';
import { useRouter } from 'next/navigation';
import {ROUTES} from "@/constants/routes";

export default function Login(){

    const [email, setEdv] =  useState<string>("")
    const [senha, setSenha] =  useState<string>("")

    const [cadNome, setCadNome] =  useState<string>("")
    const [cadCpf, setCpf] =  useState<string>("")
    const [cadEmail, setCadEmail] =  useState<string>("")
    const [cadSenha, setCadSenha] =  useState<string>("")
    const [cadConfiSenha, setConfiSenha] =  useState<string>("")

    const [error,setError] = useState<boolean>(false)

    const router = useRouter();


    const Logar = async () => {
        try {
            const response =  await fetch('http://localhost:8080/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: email,
                    password: senha
                }),
            });

            const result = await response.json();
            
            if(response.status === 500){
                setError(true)
            }else{
                sessionStorage.setItem("Token", "Bearer " + result.token)
                sessionStorage.setItem("id", result.id)
                setError(false);
                router.push("/products")
            }
            console.log(result)

        } catch (error) {
            setError(true)
        }
    }

    const Cadastrar = async () => {
        try {
            const response =  await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cadNome,
                    email: cadEmail,
                    cpf: cadCpf,
                    password: cadSenha,
                    actvAccount: "true"
                }),
            });

            if(cadNome == "" || email == "" || cadCpf == "" || cadSenha == ""){
                alert("Todos os campos devem ser preenchidos!")
            }

            if(cadConfiSenha != cadSenha){
                alert("A senhas devem ser iguais")
            }

            const result = await response.json();
            if(response.status === 500){
                setError(true)
            }else{
                setError(false)
                alert("Cadastro criado com sucesso!")
            }
            console.log(result)
        } 
        
        catch (error) {
            setError(true)
        };
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
                        <button className="bg-teal-500 p-2 w-32 text-white rounded-md" onClick={() => {Logar()}}>Entrar</button>
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
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" name="cpf" className="w-full h-8 border p-2" value={cadCpf} onChange={(event) => {setCpf(event.target.value)}} />
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
                    <button className="bg-teal-500 p-2 w-32 text-white rounded-md" onClick={() => {Cadastrar()}}> Cadastrar</button>
                </div>
            </div>
        </>
    );
}