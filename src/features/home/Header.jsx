import image from '../../assets/1_5lyavS59mazOFnb55Z6znQ.png'
function Header() {
  return (
    <header
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="md:h-[calc(100vh_-_76px)] h-[700px]  bg-cover bg-no-repeat header-img relative flex items-center ">
      <div className="bg-gradient-to-l from-stone-900 to-red-800 opacity-60 absolute top-0 right-0 w-full h-full"></div>
      <div className=" relative z-10 px-5 md:text-start text-center w-full">
        <h2 className=" md:text-5xl text-4xl lg:text-7xl font-bebas text-white ">See What's Next</h2>
        <p className=' text-xl md:text-3xl text-white  italic'>WATCH ANYWHERE. CANCEL ANYTIME</p>
        <button className='bg-secondary text-white my-2 rounded-sm font-semibold px-6 py-2'>To Watch List</button>
      </div>
    </header>
  );
}

export default Header