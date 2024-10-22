'use client'
import { useState,useEffect } from "react"
export default function Home() {
    const [pogoda,setPogoda] = useState([])
    useEffect(()=>{
      const getData = async () =>{
        const lat = "52.17935"
        const lon = "21.57251"
        const apikey="393f78f1701047bbf006dcba4f7e38a7"
        try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`)
        const json = await data.json()
        console.log(json)
        setPogoda(json)
        }catch(err){
          console.log(err)
        }finally{}
      }
      getData()
    },[])
    return(
      <div>

      </div>
    )
}