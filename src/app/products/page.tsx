"use client"

import { Card } from "@/componets/card/card"
import { Footer } from "@/componets/footer/footer"
import { Menu } from "@/componets/menu/menu"

export default function Products(){

    return(
        <>
            <Menu op1=""></Menu>
        
            <div className="w-full p-20">
                <Card imagem=""  titulo="Teste" preco="20,90" status=""></Card>

            </div>
        
            <Footer/>    
        </>
    )
}