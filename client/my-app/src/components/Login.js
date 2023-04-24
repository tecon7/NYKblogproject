import * as React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function Login({ handleSubmit, user }) {
    return (
<>
<section class="title-wrapper">
  <div class="top-title"></div>
  <div class="bottom-title" aria-hidden="true">Knicks & Clicks</div>
  <em style={{ color: 'white',}} className="sub-title">A diehard fan's blog to vent about the last 20 years of NY Basketball</em>
</section>
 <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>

            <div class="text-center">
              <img src="https://1000logos.net/wp-content/uploads/2017/12/New-York-Knicks-Emblem.jpg" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="Username" name="username"/>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Password" name="password"/>
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
              Registered? <a href="signin" class="text-dark fw-bold"> Create an
                Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div> 
  </>
    )
}