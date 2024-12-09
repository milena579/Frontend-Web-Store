'use client';

import { ROUTES } from "@/constants/routes"
import { Card } from "@/componets/card/card";
import { MenuAdm } from "@/componets/menuAdm/menuAdm";
import { Modal } from "@/componets/modal/modal";
import { useEffect, useState } from "react";
import Image from "next/image";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import pencil from "@/app/assets/pencil.png";
import trash from "@/app/assets/delete.png"
import { title } from "process";

const imgPadrao = "https://www.goiania.go.leg.br/imagens/sem-foto/image";

if (process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error;
  
    console.error = (...args) => {
      // Checa se a mensagem de erro contém "Hydration"
      if (args[0] && args[0].includes('key')) {
        return; // Supressão: não mostra erros de hidratação
      }
      
      // Para qualquer outro erro, exibe normalmente
      originalConsoleError.apply(console, args);
    };
  }

interface IProduto {
    id: number,
    title: string,
    price: number,
    status: boolean,
    category: number,
    image: string
}

export default function admProducts() {

    const [modalProduct, setModalProduct] = useState(false);
    const [modalEditProduct, setModalEditProduct] = useState(false);
    const [idProduct, setIdProduct] = useState<number>()
    const [dataProducts, setDataProducts] = useState<IProduto[]>([]);

    const [title, setTitle] = useState<string>("");
    const [status, setStatus] = useState<boolean>(true);
    const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState<number>();
    const [image, setImage] = useState<string>("");
    
    const [error, setError] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduto>();
    const [isDisabled, setDisabled] = useState(false);

    useEffect(() => {
        if (modalProduct) {
            setModalEditProduct(false);
        }
    
        if (modalEditProduct) {
            setModalProduct(false);
        }

        if (selectedProduct) {
            setProductData(selectedProduct);
            setIdProduct(selectedProduct.id)
        }

        products();
    }, [modalProduct, modalEditProduct,selectedProduct]);

    const [productData, setProductData] = useState<IProduto>({
        id: 0,
        title: "",
        category: 0,
        price: 0,
        status: true,
        image: ""
    });

    const products = async () => {
        var data: IProduto[] = []

        try {
            const res = await fetch(`http://localhost:8080/product`);
            const data = await res.json();
            setDataProducts(data);
            console.log(data);

        } catch (error) {
            setDataProducts([{ "id": 0, "title": "ERRO AO CARREGAR PRODUTOS", "price": 0, "status": false, "category": 0, "image": "undefined" }]);
        }
    };


    const addProduct = async () => {
        try {
            if(title == "" || price == null || category == null || status == null || image == ""){
                alert("Todos os campos devem ser preenchidos!")
                return
            }

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
                    image: image
                }),
            });

            if(response.status === 500){
                response.status;
                setError(true);
            }else{
                setError(false);
                alert("Produto criado com sucesso!");
                setModalProduct(false);
                setTitle("");
                setPrice(0);
                setCategory(0);
                setImage("");
                products();
            }

        } 
        
        catch (error) {
            setError(true)
        };
    }

    const updateProduct = async () => {
        if (!productData) {
            alert("Nenhum dado encontrado para atualizar.");
            return;
        }

        console.log(idProduct)

        try {
            const response = await fetch(`http://localhost:8080/product/${productData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    title: productData.title,
                    category: productData.category,
                    price: productData.price,
                    status: productData.status,
                    image: productData.image
                }),
            });

            if (!response.ok) {
                alert(`Erro ao atualizar produto`);
                setError(true);
            } else {
                alert("Produto atualizado com sucesso!");
                setError(false);
                setModalEditProduct(false);
                products();
            }
        } catch (error) {
            console.error("Erro ao atualizar os dados de produto:", error);
            alert("Erro ao atualizar os dados.");
            setError(true);
        }
    }

    const deleteProduct = async (data: IProduto) => {

        console.log(data.id);

        try {
            const response = await fetch(`http://localhost:8080/product/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    id: productData.id,
                    title: productData.title,
                    category: productData.category,
                    price: productData.price,
                    status: productData.status,
                    imagem: productData.image
                }),
            });

            if (!response.ok) {
                alert(`Erro ao deletar produto`);
                setError(true);
            } else {
                alert("Produto deletado com sucesso!");
                setError(false);
                products();
            }
        } catch (error) {
            console.error("Erro ao deletar os dados de produto:", error);
            alert("Erro ao deletar os dados.");
            setError(true);
        }
    }
    
    const openEditProductModal = (data: IProduto) => {
        setSelectedProduct(data);
        setModalEditProduct(true);
        setDisabled(!isDisabled);
    }

    return (
        <>
            <MenuAdm op1=""></MenuAdm>
            <div className="mt-16">
                <div className="flex justify-end mr-28 gap-16">
                    <button onClick={() => setModalProduct(true)} className="bg-cyan-300/50 p-1 pl-6 pr-6 rounded-[5px]">Novo produto</button>
                </div>

                <div className="mt-16 flex justify-center">
                    <div className={(modalProduct || modalEditProduct) ? "mt-4 overflow-x-auto max-h-[450px] w-[70%] m-8" : "mt-4 overflow-x-auto max-h-[350px] w-[100%] m-48"}>
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
                                {dataProducts.map((item) => {
                                    return (
                                        <tbody className="overflow-y-auto">
                                            <tr key={item.id} className="flex w-full h-14">
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.id}</td>
                                                <td className="justify-start flex w-[25%] h-full border-b-2 p-2">{item.title}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.category}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.price}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2">{item.status ? "Disponível" : "Indisponível"}</td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2"><button onClick={() => { openEditProductModal(item)}}><Image src={pencil} alt="" className="w-4 h-4 cursor-pointer"/></button></td>
                                                <td className="justify-center flex w-[20%] h-full border-b-2 p-2"><button onClick={() => { deleteProduct(item)}}><Image src={trash} alt="" className="w-4 h-4 cursor-pointer"/></button></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                                )}
                        </table>
                    </div>
                    <div className={(modalProduct || modalEditProduct) ? "w-[30%] !disabled" : " hidden disabled"}>
                        {modalProduct ?
                            <div className="p-6 flex flex-col w-96 bg-opacity-50 z-50">
                                <h2 className="text-xl font-semibold">Novo produto</h2>
                                <form className="flex flex-col">
                                    <label htmlFor="" className="mt-8">Título</label>
                                    <input type="text" placeholder="Título do produto" value={title} onChange={(e) => { setTitle(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                    <label htmlFor="" className="mt-4">Preço</label>
                                    <input type="number" placeholder="Preço do produto" value={price} onChange={(e) => { setPrice(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                    <label htmlFor="" className="mt-4">Categoria</label>
                                    <input type="number" placeholder="Categoria do produto" value={category} onChange={(e) => { setCategory(Number(e.target.value)) }} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                    <label htmlFor="" className="mt-4">Link da imagem</label>
                                    <input type="string" placeholder="Link da imagem do produto" value={image} onChange={(e) => { setImage(e.target.value) }} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                                </form>
                                <div className="flex justify-between">
                                    <button onClick={() => setModalProduct(false)} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                                    <button onClick={() => { addProduct() }} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Adicionar produto</button>
                                </div>
                            </div>
                        :
                        modalEditProduct ?
                        <div className="p-6 flex flex-col w-96 bg-opacity-50 z-50">
                            <h2 className="text-xl font-semibold">Editar produto</h2>
                            <form className="flex flex-col">
                                <label htmlFor="" className="mt-8">ID</label>
                                <input type="text" placeholder="Id do produto" readOnly value={selectedProduct?.id} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                <label htmlFor="" className="mt-4">Título</label>
                                <input type="text" placeholder={selectedProduct?.title} value={productData.title} onChange={(e) => setProductData((prev) => ({ ...prev, title: e.target.value }))} disabled={!isDisabled} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                <label htmlFor="" className="mt-4">Preço</label>
                                <input type="number" placeholder="Preço do produto" value={productData.price} onChange={(e) => setProductData((prev) => ({ ...prev, price: Number(e.target.value) }))} disabled={!isDisabled} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                <label htmlFor="" className="mt-4">Status</label>
                                <input type="number" placeholder="Status do produto" value={productData.status? 1 : 0} onChange={(e) => setProductData((prev) => ({ ...prev, status: Boolean(e.target.value) }))} disabled={!isDisabled} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                <label htmlFor="" className="mt-4">Categoria</label>
                                <input type="number" placeholder="Categoria do produto" value={productData.category} onChange={(e) => setProductData((prev) => ({ ...prev, category: Number(e.target.value) }))} disabled={!isDisabled} className="border-2 rounded-[5px] p-1 mt-2"></input>
                                <label htmlFor="" className="mt-4">Link da imagem</label>
                                <input type="string" placeholder="Link da imagem do produto" value={productData.image} onChange={(e) => setProductData((prev) => ({ ...prev, image: e.target.value }))} disabled={!isDisabled} className="border-2 rounded-[5px] p-1 mt-2 mb-10"></input>
                            </form>
                            <div className="flex justify-between">
                                <button onClick={() => setModalEditProduct(false)} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                                <button onClick={() => { updateProduct() }} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Salvar alterações</button>
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