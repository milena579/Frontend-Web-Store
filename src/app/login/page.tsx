"use client"
import Link from 'next/link';
import { useState } from 'react';
import { Menu } from '@/componets/menu/menu';
import { useRouter } from 'next/navigation';
import {ROUTES} from "@/constants/routes";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login(){

    const [email, setEmail] =  useState<string>("")
    const [senha, setSenha] =  useState<string>("")

    const [cadNome, setCadNome] =  useState<string>("")
    const [cadCpf, setCadCpf] =  useState<string>("")
    const [cadEmail, setCadEmail] =  useState<string>("")
    const [cadSenha, setCadSenha] =  useState<string>("")
    const [cadConfiSenha, setConfiSenha] =  useState<string>("")

    const [senhaVisible, setSenhaVisible] = useState<boolean>(false) // Novo estado para controlar a visibilidade da senha
    const [cadSenhaVisible, setCadSenhaVisible] = useState<boolean>(false) 
    const [confiSenhaVisible, setConfiSenhaVisible] = useState<boolean>(false) 
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
            
            if(response.status > 400 && response.status < 500 ){
                setError(true)
                setEmail("")
                setSenha("")
                alert(result.message);
            }else{
                sessionStorage.setItem("Token", "Bearer " + result.token)
                setError(false);
                setEmail("")
                setSenha("")

                if (result.message === "Bem-vindo, Administrador!") {
                    router.push(ROUTES.admProducts); // ARRUMAR ROTA DPS
                } else {
                    router.push(ROUTES.products); 
                }
            }
            console.log(result)

        } catch (erro) {
            setError(true)
        }
    }

    const Cadastrar = async () => {
        if(cadConfiSenha != cadSenha){
            alert("A senhas devem ser iguais")
        }

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
                    actvAccount: true
                }),
            });

            console.log(response);
            const result = await response.text();

            if(response.status >= 400 && response.status < 500){
                alert(result)
                response.status
                setError(true)
            }else{
                setError(false)
                alert("Cadastro criado com sucesso!")
                setCadNome("");
                setCadEmail("");
                setCadCpf("");
                setCadSenha("");
                setConfiSenha("");
            }
        } 
        
        catch (erro) {
            setError(true)
        };
    }

    return(
        <>
            <Menu op1="" ></Menu>
            <div className='flex items-center w-full justify-center gap-40'>
                <div className="bg-cover bg-center flex h-screen items-center justify-center ">
                    <div className="flex flex-col items-center bg-white h-[600px] w-[430px] gap-12 justify-center p-10 text-black rounded-lg shadow-lg shadow-cyan-500/50">
                        <div className='p-2'>
                            <h1 className='text-lg font-bold'>Login</h1>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" placeholder='usuario@email.com' className="w-full h-8 border p-2" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="senha">Senha:</label>
                            <div className='flex flex-row items-center gap-1'>
                                <div onClick={() => setSenhaVisible(!senhaVisible)}>
                                    {senhaVisible ? <FaEyeSlash /> : <FaEye />} {/* Ícone de olho */}
                                </div>
                                <input type={senhaVisible ? "text" : "password"} name="senha" className="w-full h-8 border p-2" value={senha} onChange={(event) => {setSenha(event.target.value)}} />
                            </div>
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
                        <input type="text" name="nome" placeholder='nome completo' className="w-full h-8 border p-2" value={cadNome} onChange={(event) => {setCadNome(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" name="cpf" placeholder='xxx.xxx.xxx-xx' className="w-full h-8 border p-2" value={cadCpf} onChange={(event) => {setCadCpf(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" placeholder='usuario@email.com' className="w-full h-8 border p-2" value={cadEmail} onChange={(event) => {setCadEmail(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="senha">Senha:</label>
                        <div className='flex flex-row items-center gap-1'>
                            <div
                                onClick={() => setCadSenhaVisible(!cadSenhaVisible)} // Alterna a visibilidade
                            >
                                {cadSenhaVisible ? <FaEyeSlash /> : <FaEye />} {/* Ícone de olho */}
                            </div>
                            <input type={cadSenhaVisible ? "text" : "password"} name="senha" className="w-full h-8 border p-2" value={cadSenha} onChange={(event) => {setCadSenha(event.target.value)}}  />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="confirmsenha"> Confirmar Senha:</label>
                        <div className='flex flex-row items-center gap-1'>
                            <div
                                onClick={() => setConfiSenhaVisible(!confiSenhaVisible)} // Alterna a visibilidade
                            >
                                {confiSenhaVisible ? <FaEyeSlash /> : <FaEye />} {/* Ícone de olho */}
                            </div>
                            <input type={confiSenhaVisible ? "text" : "password"} name="confirmsenha" className="w-full h-8 border p-2" value={cadConfiSenha} onChange={(event) => {setConfiSenha(event.target.value)}} />
                        </div>
                        
                    </div>
                    <button className="bg-teal-500 p-2 w-32 text-white rounded-md" onClick={() => {Cadastrar()}}> Cadastrar</button>
                </div>
            </div>
        </>
    );
}