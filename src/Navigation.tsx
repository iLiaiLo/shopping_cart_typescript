import React ,{ MouseEventHandler }from 'react'

type NavigationProps = {
  showPage: MouseEventHandler<HTMLDivElement>;
  showCartPage: MouseEventHandler<HTMLDivElement>;
};

const Navigation:React.FC<NavigationProps> = (props) => {
  return (
    <nav className='bg-blue-500 text-white text-xl flex items-center justify-evenly p-2 fixed w-[100%] top-0 '>
      <div className='hover:underline cursor-pointer' onClick={props.showPage}>return to the store</div>
      <div className='hover:underline cursor-pointer' onClick={props.showCartPage}>cart page</div>
    </nav>
  )
}

export default Navigation