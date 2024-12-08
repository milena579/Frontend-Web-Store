'use client';

import { ROUTES } from "@/constants/routes"
import { Card } from "@/componets/card/card";
import { Menu } from "@/componets/menu/menu";
import { Modal } from "@/componets/modal/modal";
import { useEffect, useState } from "react";
import Image from "next/image";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import pencil from "@/app/assets/pencil.png";
import trash from "@/app/assets/delete.png"
import { title } from "process";

interface IProduto {
    id: number,
    title: string,
    price: number,
    status: boolean,
    category: number
}

interface ICategory {
    id: number,
    name: string
}

export default function adm() {

    const [modalCategory, setModalCategory] = useState(false);
    const [modalEditCategory, setModalEditCategory] = useState(false);
    const [modalProduct, setModalProduct] = useState(false);
    const [modalEditProduct, setModalEditProduct] = useState(false);
    
    const [data, setData] = useState<IProduto[]>([]);
    const [idProduct, setIdProduct] = useState<number>()
    const [dataCategories, setDataCategories] = useState<ICategory[]>([]);
    const [idCategory, setIdCategory] = useState<number>()

    const [selectedCategory, setSelectedCategory] = useState<ICategory>();
    const [selectedProduct, setSelectedProduct] = useState<IProduto>();

    const [title, setTitle] = useState<string>("");
    const [status, setStatus] = useState<boolean>(true);
    const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState<number>();
    const [name, setName] = useState<string>("");
    const [imagem, setImagem] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const products = async () => {
        var data: IProduto[] = []

        try {
            const res = await fetch(`http://localhost:8080/product`);
            const data = await res.json();
            setData(data);
            console.log(data);

        } catch (error) {
            setData([{ "id": 0, "title": "ERRO AO CARREGAR PRODUTOS", "price": 0, "status": false, "category": 0 }]);
        }
    };

    const getProduct = async () => {
        var data: IProduto[] = []

        try {
            const res = await fetch(`http://localhost:8080/product/?id=${idProduct}`);
            const data = await res.json();
            setData(data);
            console.log(data);

        } catch (error) {
            setData([{ "id": 0, "title": "ERRO AO CARREGAR PRODUTOS", "price": 0, "status": false, "category": 0 }]);
        }
    };

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
                closeCategoryModal();
            }
            console.log(result)
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
                closeCategoryModal();
            }
            console.log(result)
        } 
        
        catch (error) {
            setError(true)
        };
    }


    const addProduct = async () => {
        try {
            const response =  await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    price: price,
                    status: true,
                    imagem: imagem
                }),
            });

            if(title == "" || price == null || category == null || status == null || imagem == ""){
                alert("Todos os campos devem ser preenchidos!")
                return
            }

            const result = await response.json();
            if(response.status === 500){
                setError(true)
            }else{
                setError(false)
                alert("Produto criado com sucesso!")
                closeProductModal();
            }
            console.log(result)
        } 
        
        catch (error) {
            setError(true)
        };
    }

    useEffect(() => {
        products();
        categories();
    }, []);

    
    const closeCategoryModal = () => setModalCategory(false);
    const openCategoryModal = () => setModalEditCategory(true);
    const closeEditCategoryModal = () => setModalEditCategory(false);
    
    const openEditCategoryModal = (data: ICategory) => {
        setSelectedCategory(data);
        setModalCategory(true);
    }

    const openProductModal = () => setModalProduct(true);
    const closeProductModal = () => setModalProduct(false);
    
    const openEditProductModal = (data: IProduto) => {
        setSelectedProduct(data);
        setModalEditProduct(true);
    }

    const closeEditProductModal = () => setModalEditProduct(false);

    return (
        <>
            <Menu op1="" op2=""></Menu>
            <div className="mt-16">
                <div className="flex justify-end mr-28 gap-16">
                    <button onClick={openProductModal} className="bg-cyan-300/50 p-1 pl-6 pr-6 rounded-[5px]">Novo produto</button>
                    <button onClick={openCategoryModal} className="bg-cyan-300/50 p-1 pl-6 pr-6 rounded-[5px]">Nova categoria</button>
                </div>

                <div className="mt-24 flex justify-center">
                    <div className="mt-4 overflow-x-auto max-h-[350px] w-[60%] m-8">
                        <table className="w-full bg-gray-50">
                            <thead className="w-full items-center flex-col flex ">
                                <tr className="p-5 border-b-2 w-full flex justify-center">
                                    <th>PRODUTOS</th>
                                </tr>
                                <tr className="flex w-full">
                                    <th className="justify-center flex w-[25%] p-5">ID</th>
                                    <th className="justify-start flex w-[35%] p-5">Título</th>
                                    <th className="justify-center flex w-[25%] p-5">Categoria</th>
                                    <th className="justify-center flex w-[25%] p-5">Preço</th>
                                    <th className="justify-center flex w-[25%] p-5">Status</th>
                                    <th className="justify-center flex w-[25%] p-5">Editar</th>
                                    <th className="justify-center flex w-[25%] p-5">Deletar</th>
                                </tr>
                            </thead>
                                {data.map((item) => {
                                    return (
                                        <tbody className="overflow-y-auto">
                                            <tr key={item.id} className="flex w-full h-14">
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.id}</td>
                                                <td className="justify-start flex w-[25%] h-full border-b-2 p-2">{item.title}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.category}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.price}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.status ? "Disponível" : "Indisponível"}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2"><Image src={pencil} onClick={() => {openEditProductModal(item)}} alt="" className="w-4 h-4 cursor-pointer"/></td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2"><Image src={trash} alt="" className="w-4 h-4 cursor-pointer"/></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                                )}
                        </table>
                    </div>
                    <div className="mt-4 overflow-x-auto max-h-[350px] w-[30%] m-8">
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
                </div>




                {/* Modais */}

                <Modal isOpen={modalCategory} children={
                    <div className="p-6 flex flex-col w-96 inset-0 bg-opacity-50 z-50">
                        <h2 className="text-xl font-semibold">Nova categoria</h2>
                        <form className="flex flex-col">
                            <label htmlFor="" className="mt-8">Nome</label>
                            <input type="text" placeholder="Nome da categoria" value={name} onChange={(e) => { setName(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                        </form>
                        <div className="flex justify-between">
                            <button onClick={closeCategoryModal} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                            <button onClick={() => { addCategory() }} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Adicionar categoria</button>
                        </div>
                    </div>
                }>
                </Modal>

                <Modal isOpen={modalEditCategory} children={
                    <div className="p-6 flex flex-col w-96 inset-0 bg-opacity-50 z-50">
                        <h2 className="text-xl font-semibold">Editar categoria</h2>
                        <form className="flex flex-col">
                            <label htmlFor="" className="mt-8">ID</label>
                            <input type="text" placeholder="Id da categoria" readOnly value={selectedCategory?.id} onChange={(e) => { setIdCategory(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Nome</label>
                            <input type="text" placeholder="Nome da categoria" value={selectedCategory?.name} onChange={(e) => { setName(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                        </form>
                        <div className="flex justify-between">
                            <button onClick={closeEditCategoryModal} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                            <button onClick={closeEditCategoryModal} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Salvar alterações</button>
                        </div>
                    </div>
                }>
                </Modal>

                <Modal isOpen={modalProduct} children={
                    <div className="p-6 flex flex-col w-96 inset-0 bg-opacity-50 z-50">
                        <h2 className="text-xl font-semibold">Novo produto</h2>
                        <form className="flex flex-col">
                            <label htmlFor="" className="mt-8">Título</label>
                            <input type="text" placeholder="Título do produto" value={title} onChange={(e) => { setTitle(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Preço</label>
                            <input type="number" placeholder="Preço do produto" value={price} onChange={(e) => { setPrice(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Categoria</label>
                            <input type="number" placeholder="Categoria do produto" value={category} onChange={(e) => { setCategory(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Link da imagem</label>
                            <input type="string" placeholder="Link da imagem do produto" value={imagem} onChange={(e) => { setImagem(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                        </form>
                        <div className="flex justify-between">
                            <button onClick={closeProductModal} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                            <button onClick={() => { addProduct() }} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Adicionar produto</button>
                        </div>
                    </div>
                }>
                </Modal>

                <Modal isOpen={modalEditProduct} children={
                    <div className="p-6 flex flex-col w-96 inset-0 bg-opacity-50 z-50">
                        <h2 className="text-xl font-semibold">Editar produto</h2>
                        <form className="flex flex-col">
                            <label htmlFor="" className="mt-8">ID</label>
                            <input type="text" placeholder="Id do produto" readOnly value={selectedProduct?.id} onChange={(e) => { setIdProduct(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Título</label>
                            <input type="text" placeholder="Título do produto" value={selectedProduct?.title} onChange={(e) => { setTitle(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Preço</label>
                            <input type="number" placeholder="Preço do produto" value={selectedProduct?.price} onChange={(e) => { setPrice(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Categoria</label>
                            <input type="number" placeholder="Categoria do produto" value={selectedProduct?.category} onChange={(e) => { setCategory(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                            <label htmlFor="" className="mt-4">Link da imagem</label>
                            <input type="string" placeholder="Link da imagem do produto" value={imagem} onChange={(e) => { setImagem(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                        </form>
                        <div className="flex justify-between">
                            <button onClick={closeEditProductModal} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                            <button onClick={closeEditProductModal} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Salvar alterações</button>
                        </div>
                    </div>
                }>
                </Modal>
            </div>
        </>
    );
} 