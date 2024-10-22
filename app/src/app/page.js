'use client'
import { useState,useEffect } from "react"
import { Sun, CloudSun, CloudRain, Cloud, CloudLightning } from 'lucide-react';
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
        setPogoda([json])
        }catch(err){
          console.log(err)
        }finally{}
      }
      getData()
    },[])
   
    return(
      
      <div className="w-full h-screen">
        {pogoda.length>0 && pogoda.map((item,idx)=>(
          <div className="flex flex-row flex-wrap gap-4 justify-center" key={idx}>
            {item.list.map((item,idx)=>{
              if(idx%8==0){
                return(
                <div className={`${idx==0 ? 'flex flex-col flex-wrap items-center  w-full h-[200px] ':'flex flex-col flex-wrap items-center border-2 border-slate-700 w-[300px] h-[200px]'}`}  key={idx}>
                  <h1>{(item.main.temp - 273.15).toFixed(1)}°C</h1>
                  <h1>{item.dt_txt}</h1>
                  {item.weather[0].main == "Clouds" ? <Cloud color="gray" size={50}/>:null}
                  {item.weather[0].main == "Clear" ? <Sun color="gray" size={50}/>:null}
                  {item.weather[0].main == "Rain" ? <CloudRain color="gray" size={50}/>:null}
                  <p>{item.wind.speed}m/s  |  {item.main.pressure}hPa  |  Temp Odcz: {(item.main.feels_like  - 273.15).toFixed(1)}°C  |  Wilgotność powietrza: {item.main.humidity}%</p>
                </div>
                )
              }
            })}
          </div>
        ))}
            
          

      </div>
    )
}