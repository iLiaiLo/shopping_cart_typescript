import React ,{ ChangeEventHandler, MouseEventHandler } from 'react'

type SearchBarProps = {
  Title: string;
  Category: string;
  Company: string;
  setTitle:ChangeEventHandler<HTMLInputElement> ;
  setCategory:ChangeEventHandler<HTMLInputElement> ;
  setCompany: ChangeEventHandler<HTMLInputElement>;
  FilterData: MouseEventHandler<HTMLButtonElement>;
  OriginalData: MouseEventHandler<HTMLButtonElement>;
};

const SearchBar:React.FC<SearchBarProps> = (props) => {
  return (
    <section className='flex w-fit flex-col flex-wrap  items-center justify-center mt-14 mb-10 gap-y-3'>
        
        <input className="border-2 border-gray-700 w-[400px] p-3 outline-none rounded-lg focus:shadow-[0_0_7px_#5f6972] focus:border-gray-800" type="text"
         value={props.Title} onChange={props.setTitle} placeholder='Find products by product name' />
        <input className="border-2 border-gray-700 w-[400px] p-3 outline-none rounded-lg focus:shadow-[0_0_7px_#5f6972] focus:border-gray-800" type="text" value={props.Category}
         onChange={props.setCategory}  placeholder='Find products by category'/>
        <input className="border-2 border-gray-700 w-[400px] p-3 outline-none rounded-lg focus:shadow-[0_0_7px_#5f6972] focus:border-gray-800" type="text" value={props.Company}
         onChange={props.setCompany} placeholder='Find products by company name'/>
        <div className='flex  justify-between w-[400px]'>
        <button className=' p-2 w-[150px] cursor-pointer bg-blue-500 text-white rounded-lg hover:shadow-[0_0_10px_#5f6972] hover:bg-blue-700' onClick={props.FilterData}>Find products</button>
        <button className=' p-2 w-[150px] cursor-pointer bg-blue-500 text-white rounded-lg hover:shadow-[0_0_10px_#5f6972] hover:bg-blue-700' onClick={props.OriginalData}>Show all products</button>
        </div>
      </section>
  )
}

export default SearchBar