import { Card } from "@/componets/card/card";
import { Menu } from "@/componets/menu/menu";

export default function Products(){
        
    interface IProduto{
        id: number
        title: string, 
        price: number,
        status: boolean
        category: number
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
                <Menu op1=""></Menu>
                <div className="py-36 flex px-4 flex-row w-full flex-wrap gap-10 items-center justify-center ">
                    {data.map((item) => {
                        return(
                            <Card key={item.id} imagem="" titulo={item.title} preco={item.price} status={item.status}></Card>
                        )
                    }
                    )}
                </div>
            </>
        )
    }
}