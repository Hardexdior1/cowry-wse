
"use client";

import Image from "next/image";
import { CiSearch } from "react-icons/ci";

import React, {useState,useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function Home() {
  

  const router=useRouter()
  const [query,setQuery]=useState('')

  const [images, setImages] = useState([]);

   


      const fetchImages = async (searchQuery) => {

        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=8`,
            {
              headers: {
                Authorization: `Client-ID 0IOFduQTURC7OLhOcHJKeTt3Y7nsfUFEckK3iUox64o`,
              },
            }
          );
  
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
          const data = await response.json();
          setImages(data.results);
          // console.log(data.results)

          // localStorage.setItem("africaImages", JSON.stringify(data.results)); 
        } catch (error) {
          console.log("Error fetching Unsplash images:", error);
        }
       
      };
  
      useEffect(() => {
        fetchImages("africa");
      }, []);
     

    
    const handleSearchChange=(e)=>{
      setQuery(e.target.value)
    }

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (query.trim() !== "") {
        fetchImages(query);
        router.push(`/search?query=${query}`)
      }
      setQuery('')
    };
 
    const [popUp,setPopUp]=useState(null)
    const [showModal,setShowModal]=useState(false)

const showPopUp=(item)=>{
setShowModal(true)
  setPopUp(item)
}
  return (
    <main className="relative">

          <section className="flex flex-col items-center justify-center container py-5 bg-gray-300 h-70 md:py-20">
  <form className="relative w-full" onSubmit={handleSearchSubmit}>
    <div   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
    <CiSearch size={20} className="cursor-pointer"/>

    </div>
    <input
      type="search"
      className="w-full py-3 pl-10 pr-3 rounded-lg bg-white text-blue-900"
      placeholder="Search for photo"
      onChange={handleSearchChange}
    />
  </form>
</section>

      {images.length > 0 ? (
    <section className='w-full mb-10 container py-5 grid gap-6  md:py-0 '>
    <div className="grid gap-6 md:-mt-8 md:grid-cols-2  lg:grid-cols-3  md:container">
    {images?.map((item) => (
        <div key={item.id} className='rounded' onClick={(()=>{
          showPopUp(item)
        })}>
          <div className='relative rounded overflow-hidden cursor-pointer transition hover:opacity-40'>
                <div className="h-[250px] overflow-hidden">
              <Image
                height={200}
                width={300}
                src={item.urls.regular}
                alt={item.alt_description}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Dark Overlay */}
            <div className='absolute inset-0 bg-black opacity-30'></div>

            {/* Text on Image */}
            <div className='absolute inset-0 flex flex-col justify-end p-4 text-white'>
              <p className='text-lg font-semibold'>{item.user.name}</p>
              <p className='text-sm'> {item.user.location|| "location not provided"} </p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </section>
  ) : (
    <div className="container">
<div className="grid gap-6 md:-mt-8 md:grid-cols-2  lg:grid-cols-3 md:container">

       
{Array.from({length:6}).map((_,index)=>{
 return <div className="bg-gray-200 animate-pulse rounded-lg p-4 w-full pt-10" key={index}>
  <div className="h-24 w-full rounded-md"></div>
  <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
  <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>

</div>
})}
</div>
</div>
  )}
  {/* modal pop-up */}
{showModal && popUp && 
<div 
 
  className={`fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center z-30 transition-all duration-300 ${
    showModal ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
  }`}
  
  >


  
  <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

  <div className="transition z-20 max-w-2xl w-full px-5 relative md:px-0">
  <button
              className="mt-4 px-4 text-gray-200 bg-transparent text-lg text-white absolute right-4 mb-6 -top-5 md:-right-10  md:top-3 lg:-right-20"
              onClick={() => setShowModal(false)}
            >
             x
            </button>

    <Image
      height={200} 
      width={700}  
      src={popUp?.urls?.regular}
      alt={popUp?.alt_description}
      className="w-full object-cover rounded-tr-lg rounded-tl-lg max-h-[500px] shadow-xl mt-5 mb:mt-8"
    />

    <div className=" p-4 bg-white mb-5 rounded-br-lg rounded-bl-lg">
      <h3 className=" font-semibold text-black">{popUp?.user.name}</h3>
      <p className="text-sm text-black">
        {popUp?.user?.location || "Location not provided"}
      </p>
    </div>
  </div>
</div>}

      





    </main>
  );
}
