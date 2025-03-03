const LandingSections = () =>
{
    return (
        <div>
            <section id="reviews" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Company Reviews</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Google</h5>
                <p>"Great work culture and opportunities!"</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Amazon</h5>
                <p>"Challenging environment with great benefits."</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Microsoft</h5>
                <p>"Innovation-driven company with a great work-life balance."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="jobs" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Latest Job Openings</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Software Engineer</h5>
                <p>Google | Bangalore</p>
                <a href="#" className="btn btn-primary">View Now</a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Data Analyst</h5>
                <p>Amazon | Hyderabad</p>
                <a href="#" className="btn btn-primary">View Now</a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Product Manager</h5>
                <p>Microsoft | Delhi</p>
                <a href="#" className="btn btn-primary">View Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}
export default LandingSections;