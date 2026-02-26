
import HomeBanner from "../../Components/HomeBanner";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="banner">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeuNb8OMqMpAfkftf2BvE5i2vKM5GdO-LebA&s"
                  alt="Fashion banner"
                  className="cursor"
                />
              </div>
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;