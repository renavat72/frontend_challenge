export const headers =  { 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'b68096f3-1811-4c28-a51a-3218161b0532' 
  }

export const handleAddFavorite= async (image)=>{
    (async () => {
      const rawResponse = await fetch('https://api.thecatapi.com/v1/favourites', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({"image_id": String(image.id), "sub_id": 'user-123'})
      });
      return rawResponse
    })();}
  
export const handleDeleteFavorite = async (id) =>{
      var requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
      };
      
      fetch(`https://api.thecatapi.com/v1/favourites/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }