import './Home.css'

// Components
import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from "react-router-dom"

//Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux";
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

//redux
import { getPhotos,like, resetMessage } from '../../slices/photoSlice';

export const Home = () => {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {photos,loading} = useSelector((state) => state.photo)
  console.log(photos + "passei aqi"+ photos.length())
  //Load all phots
  useEffect(() => {
    dispatch(getPhotos())
  },[dispatch])

  //Like a photo
  const handleLike = (photo) => {
   
    dispatch(like(photo._id))
  
    resetMessage()
  }
  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
      {photos && 
      photos.map((photo) => (
        <div key={photo._id}>
            <PhotoItem photo={photo}/>
          </div>
      ))}

    </div>
  )
}
