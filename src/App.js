import { useEffect, useState } from 'react';

import { Like, NotLike } from './assets/icons';
import { handleDeleteFavorite, handleAddFavorite, headers } from './Api';
import './App.css';



const requestOptions = {
  method: 'GET',
  headers: headers
}

function App() {
  const [favoritePage, setFavoritePage] = useState(false);
  const [fecthImg, setFetchImg] = useState([])
  const [likesImage, setLikesImage] = useState([])
	const [pageNo,setPageNo] = useState(1);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    loadUser();
     window.addEventListener("scroll", e => {
      handleScroll(e);
    });
  },[pageNo])
  
  const loadUser =  () => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=25&page=${pageNo}&order=Desc`,requestOptions)
    .then(response => response.json())
    .then(data => setFetchImg([...fecthImg,...data]));
    fetch('https://api.thecatapi.com/v1/favourites', requestOptions,)
    .then(response => response.json())
    .then(data => setLikesImage(data));
   
 };
 const loadMore = () => {
  setPageNo(prev=> prev + 1)  
  setLoading(true)
  return loadUser
};

const handleScroll = () => { 
  if (window.innerHeight + document.documentElement.scrollTop
    === document.documentElement.offsetHeight){    
      loadMore()
    }
};

  return (
    <div className="App">
      <div className="Header">
        <div className="Header_text" onClick={()=>{setFavoritePage(false)}}>Все котики</div>
        <div  className="Header_text"  onClick={()=>{setFavoritePage(true)}}>Любимые котики</div>
      </div>
   
       {favoritePage ? <FavoriteCardImage  likesImage={likesImage}/>:<CardImage fecthImg={fecthImg} loading={loading}/>}
    </div>
  );
}

const FavoriteCardImage = ({likesImage}) => {
  const [like, setLike] = useState(likesImage)

  return(
    <div>
      {like < 1 ? 
      <div className="EmptyPage" style={{ height:window.innerHeight - 50,  justifyItems: "center"}}>У вас нет любимых котиков </div> : 
        <div className="Content">
          <div className="CardImage">
              {likesImage.map(i =>
             <div key={i.id}  onClick={()=>handleDeleteFavorite(i.id)}>
              <div  className="ImageBtn"  >
                  {like ? <Like/>:<NotLike />}         
              </div>            
              <img src={i.image.url} alt="cat" id="Image"/>
              </div>
      )
    }
    </div>
              </div>
    }
</div>)}

const CardImage = ({fecthImg, loading}) => {
  const [like, setLike] = useState(false)
  if(!fecthImg) return null
  return(
    <div className="Content" >
    <div className="CardImage" >
      {fecthImg.map( i =>
         <div key={i.id}  className="WrapperImage"  onClick={()=> handleAddFavorite(i)}> 
          <div  className="ImageBtn">
            {like ? <Like onClick={()=> handleAddFavorite(i)}/>:<NotLike />}
          </div>
            <img  src={i.url} alt="cat" id="Image"/>
         </div>
       )}
          </div>
          <div className="Loading"> {loading ?"... загружаем еще котиков ... " : null}</div>

        </div>
  )
}

export default App;