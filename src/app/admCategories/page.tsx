'use client';

import { Menu } from "@/componets/menu/menu";
import { useEffect, useState } from "react";
import Image from "next/image";

import pencil from "@/app/assets/pencil.png";
import trash from "@/app/assets/delete.png"

interface ICategory {
    id: number,
    name: string
}

export default function admCategories() {

    const [modalCategory, setModalCategory] = useState(false);
    const [modalEditCategory, setModalEditCategory] = useState(false);
    const [dataCategories, setDataCategories] = useState<ICategory[]>([]);
    const [idCategory, setIdCategory] = useState<number>()

    const [selectedCategory, setSelectedCategory] = useState<ICategory>();
    const [name, setName] = useState<string>("");

    const [editName, setEditName] = useState<string>("");

    const [error, setError] = useState<boolean>(false);

    const categories = async () => {
        var dataCategory: ICategory[] = []

        try {
            const res = await fetch(`http://localhost:8080/category`);
            const dataCategory = await res.json();
            setDataCategories(dataCategory);
            console.log(dataCategory);

        } catch (error) {
            setDataCategories([{ "id": 0, "name": "ERRO AO CARREGAR CATEGORIAS"}]);
        }
    };

    const addCategory = async () => {
        try {
            if(name == ""){
                alert("Todos os campos devem ser preenchidos!")
                return
            }

            const response =  await fetch('http://localhost:8080/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    name: name
                }),
            });

        
            if(response.status === 500){
                setError(true);
            }else{
                alert("Categoria criada com sucesso!")
                setError(false)
                setModalCategory(false);
                setName("");
                categories();
            }
            categories();
        } 
        
        catch (error) {
            setError(true)
        };

        
    }

    const updateCategory = async () => {
        try {
            const response =  await fetch(`http://localhost:8080/category/?id=${idCategory}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    name: name
                }),
            });

            if(name == ""){
                alert("Todos os campos devem ser preenchidos!")
                return
            }

            const result = await response.json();
            if(response.status === 500){
                setError(true)
            }else{
                setError(false)
                alert("Categoria criada com sucesso!")
                setModalCategory(false);
            }
            console.log(result)
        } 
        
        catch (error) {
            setError(true)
        };
    }

    useEffect(() => {
        categories();
    }, []);

    const closeEditCategoryModal = () => setModalEditCategory(false);
    
    const openEditCategoryModal = (data: ICategory) => {
        setSelectedCategory(data);
        setModalEditCategory(true);
    }

    return (
        <>
            <Menu op1=""></Menu>
            <div className="mt-16">
                <div className="flex justify-end mr-28 gap-16">
                    <button onClick={() => setModalCategory(true)} className="bg-cyan-300/50 p-1 pl-6 pr-6 rounded-[5px]">Nova categoria</button>
                </div>

                <div className="mt-16 flex justify-center">
                    <div className={modalCategory ? "mt-4 overflow-x-auto max-h-[350px] w-[80%] m-8" : "mt-4 overflow-x-auto max-h-[350px] w-[100%] m-48"}>
                        <table className="w-full bg-gray-50">
                            <thead className="w-full items-center flex-col flex ">
                                <tr className="p-5 border-b-2 w-full flex justify-center">
                                    <th>CATEGORIAS</th>
                                </tr>
                                <tr className="flex w-full">
                                    <th className="justify-center flex w-[25%] p-5">ID</th>
                                    <th className="justify-start flex w-[25%] p-5">Nome</th>
                                    <th className="justify-center flex w-[25%] p-5">Editar</th>
                                    <th className="justify-center flex w-[25%] p-5">Deletar</th>
                                </tr>
                            </thead>
                                {dataCategories.map((item) => {
                                    return (
                                        <tbody className="overflow-y-auto">
                                            <tr key={item.id} className="flex w-full h-14">
                                                <td className="justify-center flex w-[25%] h-full border-b-2 p-2">{item.id}</td>
                                                <td className="justify-start flex w-[25%] h-full border-b-2 p-2">{item.name}</td>
                                                <td className="justify-center flex w-[25%] h-full border-b-2 p-2"><button onClick={() => {openEditCategoryModal(item)}}><Image src={pencil} alt="" className="w-4 h-4 cursor-pointer"/></button></td>
                                                <td className="justify-center flex w-[25%] h-full border-b-2 p-2"><Image src={trash} alt="" className="w-4 h-4 cursor-pointer"/></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                                )}
                        </table>
                    </div>

                    <div className={modalCategory ? "w-[50%] !disabled" : "disabled"}>
                        <div className="p-6 flex flex-col w-96 fixed bg-opacity-50 z-50">
                            <h2 className="text-xl font-semibold">Nova categoria</h2>
                            <form className="flex flex-col">
                                <label htmlFor="" className="mt-8">Nome</label>
                                <input type="text" placeholder="Nome da categoria" value={name} onChange={(e) => { setName(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                            </form>
                            <div className="flex justify-between">
                                <button onClick={() => setModalCategory(false)} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                                <button onClick={() => { addCategory() }} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Adicionar categoria</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 