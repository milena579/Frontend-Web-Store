"use client"

import Image from "next/image"
import banner from "/public/banner.jpg"


export const Carousel = () =>{
    
    return (
        <>
            <div className="flex">
                <Image className="flex  w-16 h-16"  alt="banner" src={banner} width={10000} height={10000} priority></Image>
            </div>
        </>
    )
}