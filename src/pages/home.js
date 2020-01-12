import React from 'react'
import { connect } from 'react-redux'

const Home = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <>
      {currentUser ? (
        <p>Hello {currentUser.currentUser.displayName}, how are you?</p>
      ) : (
          <p>Login in first, please!</p>
        )}
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(Home)