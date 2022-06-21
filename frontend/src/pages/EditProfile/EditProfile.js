import "./EditProfile.css"

import { uploads } from '../../utils/config';

//Hooks
import { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux'

//Redux
import { profile,resetMessage,updateProfile  } from "../../slices/userSlice";

//Components
import Message from '../../components/Message';

const EditProfile = () => {
  
  const dispatch = useDispatch();

  const { user , message , error , loading} = useSelector((state) => state.user)
  
  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setImageProfile] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  
  //Load user data
  useEffect(() => {
    dispatch(profile())
  },[dispatch]);
  
  console.log("passei aqui")
  console.log(user)
  // Fill form with user Data
  useEffect(() => {
    if(user){
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }
  }, [user])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    //gether user data from states
    const userData = {
      name
    }

    if(profileImage){
      userData.profileImage = profileImage;
    }

    if(bio){
      userData.bio = bio;
    }

    if(password){
      userData.password = password
    }
    // build form data
    const formData = new FormData()

    const userFormData = Object.keys(userData).forEach((key) =>  formData.append(key , userData[key]))
  
    formData.append("user",userFormData)
    
    await dispatch(updateProfile(formData))

    setTimeout(() => {
      dispatch(resetMessage())
    },2000)

  };

  const handleFile = (e) => {
    //image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // update image state
    setImageProfile(image)
  }

  return (
    <div id="edit-profile">
        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
        {(user.profileImage || previewImage )&& (
          <img src={
            previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
          } alt={user.name} className="profile-image" />
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ''} />
          <input type="email" name="E-mail" disabled value={email || ''} />
          <label>
            <span>Imagam do Profile:</span>
            <input type="file" onChange={handleFile}/>
          </label>
          <label>
              <span>Bio:</span>
              <input type="text" placeholder='Descrição' onChange={(e) => setBio(e.target.value)} value={bio || ''} />
          </label>
          <label>
            <span>Quer alterar sua senha?</span>
            <input type="password" placeholder="Digite sua nova senha " onChange={(e) => setPassword(e.target.value)} value={password || ''} />
          </label>

          
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." />}
        {error && <Message msg={error} type="error" /> } 
        {message && <Message msg={message} type="success" />}
      
        </form>
    </div>
  )
}

export default EditProfile