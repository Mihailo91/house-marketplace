import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { getAuth } from "firebase/auth"

function Profile() {
  const auth = getAuth()
  
  const [formData, setFormData] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email,
  })

  const {name, email} = formData

  const navigate = useNavigate()

  const onLogout = () =>{
    auth.signOut()
    navigate('/')
  }

  // useEffect(() => {
  //   setUser(auth.currentUser)
  // }, [])
  
  return <div className='profile'>
    <header className="profileHeader">
      <p className="pageHeader">My profile</p>
      <button className="logOut"
      type="button"
      onClick={onLogout}>Logout</button>
    </header>
  </div>
}

export default Profile 