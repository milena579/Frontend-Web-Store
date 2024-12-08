
import { Card } from "@/componets/card/card"
import { Footer } from "@/componets/footer/footer"
import { Menu } from "@/componets/menu/menu"
import { useState } from "react"

    
interface IProduto{
    id: number
    title: string, 
    price: number,
    status: boolean
    category: number
}
interface ICart {
    quantidade: number 
    produto: number
}

const [userData, setUserData] = useState<ICart>();
const [error, setError] = useState<boolean>();


const addNoCarrinho =  async () => {
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
            quantity: userData.quantidade,
            product: userData.produto
            
          }),
        });
    
        if (!response.ok) {
          alert(`Erro ao atualizar cadastro`);
          setError(true);
        } else {
          alert("Cadastro atualizado com sucesso!");
          setError(false);
        }
      } catch (error) {
        console.error("Erro ao atualizar os dados do usuário:", error);
        alert("Erro ao atualizar os dados.");
        setError(true);
      }
}

const verProdutos = async () => {
    var data:IProduto[] = []

    try {
        const res = await fetch(`http://localhost:8080/product`)
        data = await res.json()

    } catch (error) {
        data = [{"id":0,"title":"ERRO AO CARREGAR PRODUTOS","price":0,"status":false, "category": 0}]
    }
    return(
        <>
            <Menu op1="" ></Menu>
            <div className="py-36 flex px-4 flex-row w-full flex-wrap gap-10 items-center justify-center ">
                {data.map((item) => {
                    return(
                        <Card key={item.id} imagem={"https://images.tcdn.com.br/img/img_prod/1117770/colar_coracao_pequeno_personalizado_folheado_em_prata_ate_duas_letras_corrente_veneziana_527_2_4a276b18647953a1030527405f826141.jpg"} titulo={item.title} preco={item.price} status={item.status} onAdd={addNoCarrinho}></Card>
                    )
                }
                )}
            </div>
            <Footer/>    

        </>
    )
}

export default verProdutos;


