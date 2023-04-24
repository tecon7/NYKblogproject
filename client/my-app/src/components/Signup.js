function SignupForm({formik}){


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

          <form class="card-body cardbody-color p-lg-5" onSubmit={formik.handleSubmit}>
            <div>
                <h2>Sign Up</h2>
            </div>
            <div class="mb-3">
              <input 
              class="form-control"
              placeholder="Enter your email address"
              id='email'
              name='email'
              required
              onChange={formik.handleChange}
              value={formik.values.email}/>
            </div>
            <div class="mb-3">
              <input 
              class="form-control"
              placeholder="Enter new password"
              id="password"  
              name="password"
              required
              onChange={formik.handleChange}
              value={formik.values.password}/>
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Submit</button></div>
          </form>
        </div>
      </div>
    </div>
  </div> 
</>
    );
};

export default SignupForm;