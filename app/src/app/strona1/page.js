'use client'
import { useState,useEffect } from "react"
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Home() {
    const [news,setNews] = useState([])

    useEffect(()=>{
      const getData = async () =>{
        try{
        const data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=78fb31cdc14f4691825c284f26745947`)
        const json = await data.json()
        console.log(json)
        setNews(json.articles)
        }catch(err){
          console.log(err)
        }finally{}
      }
      getData()
    },[])
    return(
        <div className="w-full h-screen flex flex-row flex-wrap gap-4">
            
            {news && news.map((item,idx)=>(
                    item.author?(
                        <Card key={idx} className="border w-[450px] h-auto flex flex-col justify-between">
                            <CardContent className="relative w-full h-[250px] flex flex-col justify-center items-center">
                            <Image className="p-5" src={item.urlToImage ?(item.urlToImage) : (`/bruh.jpg`)} objectFit="contein" layout="fill" alt={item.title}/>
                            </CardContent>
                        <CardHeader>
                        
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.source.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{item.description}</p>
                        </CardContent>
                        <CardFooter className="gap-10 w-full flex items-end justify-end">
                          <p className="flex justify-start">{item.author}</p><Button className="" asChild><Link href={item.url}>Zobacz więcej</Link></Button>
                        </CardFooter>
                      </Card>
                    ):("")
                    
               
            ))}
        </div>
    )
}