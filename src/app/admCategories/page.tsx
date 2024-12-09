'use client';

import { MenuAdm } from "@/componets/menuAdm/menuAdm";
import { useEffect, useState } from "react";
import Image from "next/image";

import pencil from "@/app/assets/pencil.png";
import trash from "@/app/assets/delete.png"

if (process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error;
  
    console.error = (...args) => {
      // Checa se a mensagem de erro contém "Hydration"
      if (args[0] && args[0].includes('key', 'component')) {
        return; // Supressão: não mostra erros de hidratação
      }
      
      // Para qualquer outro erro, exibe normalmente
      originalConsoleError.apply(console, args);
    };
  }
  
interface ICategory {
    id: number,
    name: string
}

export default function admCategories() {

    const [modalCategory, setModalCategory] = useState(false);
    const [modalEditCategory, setModalEditCategory] = useState(false);
    const [dataCategories, setDataCategories] = useState<ICategory[]>([]);
    const [idCategory, setIdCategory] = useState<number>()
    const [name, setName] = useState<string>("");
    const [editName, setEditName] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>();
    const [isDisabled, setDisabled] = useState(false);

    useEffect(() => {
        if (modalCategory) {
            setModalEditCategory(false);
        }
    
        if (modalEditCategory) {
            setModalCategory(false);
        }

        if (selectedCategory) {
            setCategoryData(selectedCategory);
            setIdCategory(selectedCategory.id)
        }

        categories();
    }, [modalCategory, modalEditCategory,selectedCategory]);

    const [categoryData, setCategoryData] = useState<ICategory>({
        id: 0,
        name: ""
    });


    const categories = async () => {
        var dataCategory: ICategory[] = []

        try {
            const res = await fetch(`http://localhost:8080/category`);
            const dataCategory = await res.json();
            setDataCategories(dataCategory);
            console.log(dataCategory);

        } catch (error) {
            setDataCategories([{ "id": 0, "name": "ERRO AO CARREGAR CATEGORIAS" }]);
        }
    };

    const addCategory = async () => {
        try {
            if (name == "") {
                alert("Todos os campos devem ser preenchidos!")
                return
            }

            const response = await fetch('http://localhost:8080/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    name: name
                }),
            });


            if (response.status === 500) {
                setError(true);
            } else {
                alert("Categoria criada com sucesso!")
                setError(false)
                setModalCategory(false);
                setName("");
                categories();
            }
        }

        catch (error) {
            setError(true)
        };
    }

    const updateCategory = async () => {
        if (!categoryData) {
            alert("Nenhum dado encontrado para atualizar.");
            return;
        }

        console.log(idCategory)

        try {
            const response = await fetch(`http://localhost:8080/category/${categoryData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    name: categoryData.name
                }),
            });

            if (!response.ok) {
                alert(`Erro ao atualizar categoria`);
                setError(true);
            } else {
                alert("Categoria atualizada com sucesso!");
                setError(false);
                setModalEditCategory(false);
                categories();
            }
        } catch (error) {
            console.error("Erro ao atualizar os dados de categoria:", error);
            alert("Erro ao atualizar os dados.");
            setError(true);
        }
    }

    const deleteCategory = async (data: ICategory) => {

        console.log(data.id);

        try {
            const response = await fetch(`http://localhost:8080/category/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    id: categoryData.id,
                    name: categoryData.name
                }),
            });

            if (!response.ok) {
                alert(`Erro ao deletar categoria`);
                setError(true);
            } else {
                alert("Categoria deletada com sucesso!");
                setError(false);
                categories();
            }
        } catch (error) {
            console.error("Erro ao deletar os dados de categoria:", error);
            alert("Erro ao deletar os dados.");
            setError(true);
        }
    }


    const openEditCategoryModal = (data: ICategory) => {
        setSelectedCategory(data);
        setModalEditCategory(true);
        setDisabled(!isDisabled);
    }

    return (
        <>
            <MenuAdm op1=""></MenuAdm>
            <div className="mt-16">
                <div className="flex justify-end mr-28 gap-16">
                    <button onClick={() => setModalCategory(true)} className="bg-cyan-300/50 p-1 pl-6 pr-6 rounded-[5px]">Nova categoria</button>
                </div>

                <div className="mt-16 flex justify-center">
                    <div className={(modalCategory || modalEditCategory) ? "mt-4 overflow-x-auto max-h-[350px] w-[80%] m-8" : "mt-4 overflow-x-auto max-h-[350px] w-[100%] m-48"}>
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
                                            <td className="justify-center flex w-[25%] h-full border-b-2 p-2"><button onClick={() => { openEditCategoryModal(item)}}><Image src={pencil} alt="" className="w-4 h-4 cursor-pointer" /></button></td>
                                            <td className="justify-center flex w-[25%] h-full border-b-2 p-2"><button onClick={() => { deleteCategory(item)}}><Image src={trash} alt="" className="w-4 h-4 cursor-pointer"/></button></td>
                                        </tr>
                                    </tbody>
                                )
                            }
                            )}
                        </table>
                    </div>

                    <div className={(modalCategory || modalEditCategory) ? "w-[30%] !disabled" : "disabled"}>
                            {modalCategory ? 
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
                            :
                            modalEditCategory ?
                                <div className="p-6 flex flex-col w-96 fixed bg-opacity-50 z-50">
                                    <h2 className="text-xl font-semibold">Editar categoria</h2>
                                    <form className="flex flex-col">
                                        <label htmlFor="" className="mt-8">ID</label>
                                        <input type="text" placeholder="Id da categoria" readOnly value={selectedCategory?.id} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                        <label htmlFor="" className="mt-4">Nome</label>
                                        <input type="text" placeholder="Nome da categoria" value={categoryData.name} onChange={(e) => setCategoryData((prev) => ({ ...prev, name: e.target.value }))} disabled={!isDisabled} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                                    </form>
                                    <div className="flex justify-between">
                                        <button onClick={() => setModalEditCategory(false)} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                                        <button onClick={() => { updateCategory() }} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Salvar alterações</button>
                                    </div>
                                </div>
                            :
                            <></>
                            }
                            
                    </div>
                </div>
            </div>
        </>
    );
} 