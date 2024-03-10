import React, { ReactElement } from 'react'


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
  total:number
}

interface CartPageProps {
  cartItem: Data[];
  productsData:Data[];
  setCartItem:React.Dispatch<React.SetStateAction<Data[]>>;
  setProductsData:React.Dispatch<React.SetStateAction<Data[]>>;
}



const CartPage:React.FC<CartPageProps> = (props:CartPageProps):ReactElement => {

  const arr:string[]=props.cartItem.map(it=>JSON.stringify(it));
  const dupArr:string[]=Array.from(new Set(arr));
  const res:Data[]=dupArr.map(item=>JSON.parse(item));

  function handleRemove(id:number):void{
    props.setCartItem(res.filter(item=>item.id!==id));
    props.setProductsData(props.productsData.map(it=>{
      if(it.id===id){
        return {...it,buttonText:"add to cart"}
      }
      return it
    }))
  }

  function handleIncrementRender(id:number):void{
    props.setCartItem(res.map(item=>{
      if(item.id===id){
        return {...item,choosedAmount:item.choosedAmount+1,total:item.total+Number(item.newPrice.slice(0,item.newPrice.length-1))}
      }
      return item
    }))
  }
  function handleDecrementRender(id:number):void{
    props.setCartItem(res.map(item=>{
      if(item.id===id){
        return {...item,choosedAmount:item.choosedAmount-1,total:item.total-Number(item.newPrice.slice(0,item.newPrice.length-1))}
      }
      return item
    }))
  }

  // const arr:string[]=props.cartItem.map(it=>JSON.stringify(it));
  // const dupArr:string[]=Array.from(new Set(arr));
  // const res:Data[]=dupArr.map(item=>JSON.parse(item));

  
  return ( 
    <div className='flex flex-col justify-evenly items-center gap-2'>

   {res.length!==0 && <div className='flex mt-[50px] items-center justify-center gap-4 flex-wrap'>
      {res.map((item,index)=>{
        return(<article className='flex flex-col border-[1px] border-black w-[300px] shadow-[0_0_5px_#5f6972]' key={index}>
        <div>
        <img className="h-[200px] w-[100%] border-b-2 border-red-400" src={item.img} alt="alternativeImage" />
        <div className='flex flex-col gap-y-3 mt-3 ml-2 mr-2 mb-3 text-sm'>
        <section className='ml-2'>Name: {item.title}</section>
        <section className='ml-2'>Category: {item.category}</section>
        <section className='ml-2'>Company: {item.company}</section>
        <section className='ml-2'>Color: {item.color}</section>
        <section className='ml-2'><span className='line-through text-orange-600'>Old Price: {item.prevPrice}</span>/<span className='text-green-600'>New Price: {item.newPrice}</span></section>

        <section className='ml-2'>Amount: 
        <span style={{color:item.amount==="2 pairs"?"#f29a02":item.amount==="1 pair"?"red":"#00a83e"}}> {item.amount}</span>
        </section>

        <section className='flex justify-between items-center w-[50%] ml-2 text-3xl'>
          <button className='bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-full hover:shadow-[0_0_10px_#5f6972] hover:bg-blue-700' onClick={()=>handleDecrementRender(item.id)} disabled={item.choosedAmount===1?true:false}>&#x2212;</button>
          <span>{item.choosedAmount}</span>
          <button onClick={()=>handleIncrementRender(item.id)} className='bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-full hover:shadow-[0_0_10px_#5f6972] hover:bg-blue-700' disabled={item.choosedAmount===Number(item.amount[0])?true:false}>&#x002B;</button>
        </section>
        <section className='ml-2'>total item sum: {item.total}$</section>
        </div>
        </div> 
        <button className='w-[100%] bg-blue-500 text-white p-4 hover:shadow-[0_0_10px_#5f6972] hover:bg-blue-700' onClick={()=>handleRemove(item.id)}>remove</button>
      </article>)
      })}
    </div>}
    {res.length===0 && <h1 className='mt-[150px] text-4xl italic'>Cart is empty</h1>}
    {res.length!==0 && <section className='mt-5 mb-3 text-2xl text-blue-900'>Total price: {res.reduce((acc,curr)=>acc+curr.choosedAmount*Number(curr.newPrice.slice(0,curr.newPrice.length-1)),0)}$</section>}

   {res.length!==0 && <button className="text-center w-[150px] bg-blue-400 p-3 text-white hover:shadow-[0_0_10px_#5f6972] hover:bg-blue-600" >Purchase all</button>}
    </div>
  )
}

export default CartPage