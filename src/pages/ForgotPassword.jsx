import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { ReactComponent as ArrowRightIcon } from '..//assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit =async e => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent to your address')
    } catch (error) {
      toast.error('Could not send reset email to your address')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="email@domain.com"
            className="emailInput"
            id="email"
            name="email"
            value={email}
            onChange={onChange} />

          <Link className="forgotPasswordLink"
            to='/sign-in'>
            Sign in
          </Link>
          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
              <button className="signInButton">
                <ArrowRightIcon
                fill="#ffffff"
                width="34px"
                height='34px'
                />
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword