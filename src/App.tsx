import React, { ReactElement} from 'react';
import data from './productData';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import { useState } from 'react';
import './App.css';
import CartPage from './CartPage';

interface Data{
  id:number,
  img:string,
  title:string,
  prevPrice:string,
  newPrice:string,
  company:string,
  color:string,
  amount:string,
  category:string,
  choosedAmount:number,
  buttonText:string,
  total:number,
}


function App():ReactElement{
  const [productsData,setProductsData]=useState(data)
  const [Title,setTitle]=useState<string>("");
  const [Company,setCompany]=useState<string>("");
  const [Category,setCategory]=useState<string>("");
  const [cartToggle,setCartToggle]=useState<boolean>(false);
  const [cartItem,setCartItem]=useState<Data[]>([]);


  function FilterData():void{
    setProductsData(data.filter(item=>{
      const state1:boolean=item.title.toLowerCase().includes(Title.toLowerCase());
      const state2:boolean=item.category.toLowerCase().includes(Category.toLowerCase());
      const state3:boolean=item.company.toLowerCase().includes(Company.toLowerCase())
      if(state1 && state2 && state3){
        return true
      }
      return false
  }))
  console.log(data)
  
}


  function OriginalData():void{
    setCompany("")
    setCategory("")
    setTitle("")
    setProductsData(data)
  }
  function showPage():void{
    setCartToggle(false)
  }
  function showCartPage():void{
    setCartToggle(true)
  }

  function titleSetter(e:React.ChangeEvent<HTMLInputElement>):void{
    return setTitle(e.target.value)
  }

  function companySetter(e:React.ChangeEvent<HTMLInputElement>):void{
    return setCompany(e.target.value)
  }
  function categorySetter(e:React.ChangeEvent<HTMLInputElement>):void{
    return setCategory(e.target.value)
  }

  function AddElement(id:number){
    setProductsData(productsData.map(item=>{
      if(item.id===id){
        setCartItem([...cartItem,item])
        return {...item,buttonText:"added"}
      }
      return item
    }))
    
  }

  

 
  return (
    <div className='flex flex-col justify-center items-center'>
      <Navigation showPage={showPage} showCartPage={showCartPage} />

      {!cartToggle?
      <div className='flex flex-col items-center justify-center'>
       <SearchBar Title={Title} Company={Company} Category={Category} 
       setTitle={titleSetter} setCompany={companySetter} setCategory={categorySetter} FilterData={FilterData} OriginalData={OriginalData} />
       
      {productsData.length!==0?
      <section className='flex flex-wrap justify-center gap-5'>
      {productsData.map((item,index)=>{
        return (
        <article className='flex flex-col border-[1px] border-black w-[400px] shadow-[0_0_10px_#5f6972]' key={index}>
          <div>
          <img className=" h-[250px] w-[100%] border-b-2 border-red-400" src={item.img} alt="alternativeImage" />
          <div className=' flex flex-col gap-y-3 mt-3 ml-2 mr-2 mb-3 text-lg'>
          <section className='ml-2'>Name: {item.title}</section>
          <section className='ml-2'>Category: {item.category}</section>
          <section className='ml-2'>Company: {item.company}</section>
          <section className='ml-2'>Color: {item.color}</section>
          <section className='ml-2'><span className='line-through text-orange-600'>Old Price: {item.prevPrice}</span>/<span className='text-green-600'>New Price: {item.newPrice}</span></section>
          <section className='ml-2'>Amount: 
          <span style={{color:item.amount==="2 pairs"?"#f29a02":item.amount==="1 pair"?"red":"#00a83e"}}> {item.amount}</span>
          </section>
          </div>
          </div> 
          <button className='w-[100%] bg-blue-500 text-white p-4 hover:shadow-[0_0_10px_#5f6972] hover:bg-blue-700' onClick={()=>AddElement(item.id)} disabled={item.buttonText==="added"?true:false}>{item.buttonText}</button>
        </article>
        )
      })}
      </section>:<h1 className='text-2xl italic'>No items were found</h1>}
      </div>:<CartPage cartItem={cartItem} setCartItem={setCartItem} productsData={productsData} setProductsData={setProductsData}/>}

  </div>
  );
}

export default App;
