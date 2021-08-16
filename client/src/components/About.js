import React from "react";
import "./css/About.css";
const About = () => {
  return (
    <div className="About">
      <div>
        <h2>About Us</h2>
        <p>
          Leo Cycles was founded with one mission in mind: to create amazing and
          affordable bikes. For almost 15 years we’ve been designing,
          developing, and delivering the best bikes on the market and it’s been
          amazing to watch people from around the world use our bikes.
        </p>
      </div>
      <div className="About-flex">
        <div>
          <p>
            It all began in Europe, I was amazed how many people used bicycles
            every day to go anywhere from work, to school, and even taking a
            cross country trip from Sweden to Italy. I was in awe just how large
            the bicycle community was there and I was wondering why not as many
            fellow Americans ride bikes. Asking around, I kept coming back to
            the same issues - people wanted to ride, but they wanted bikes that
            were simple, affordable, and (maybe most importantly) looked great
            before making the leap. We decided to make the bikes everyone was
            waiting for - and thus Leo Cycles was born.
          </p>

          <p>
            And what began as a quest to make the perfect bike expanded as our
            company did. Our office moved, we hired employees, we got involved
            in advocacy and charity, we expanded internationally, we hired even
            more employees, and before we knew it, we were sitting at the head
            of a table full of bike-loving friends and colleagues.
          </p>
        </div>
        <div>
          <img src="/img/about/about_main.jpg" alt="about_main" />
        </div>
      </div>
      <div className="About-flex reverse">
        <div>
          <p>
            The commuters wanted to design something with gears, rack mounts,
            fenders, and all the bells and whistles to make their daily commute
            more delightful. The party-riders wanted to develop a beach cruiser
            and a coaster for kicked-back revelry and hands-free slow-rolls. The
            racers wanted a track bike that was light, stiff, and fast enough to
            compete on the mountains of California. And we wanted something for
            everyone - so we got to work.
          </p>
          <p>
            Now, as Leo Cycles, our bikes span several disciplines and
            occasions. Race bikes, road bikes, casual bikes, and we’re always
            cooking up new ideas because we always find new places and ways to
            ride! From our successful crowd-fund to breathe life into our
            e-bike, Voltas, to the top-secret newness peeking over the next
            horizon, each and every development furthers our goal that started
            it all - to get more people on bikes.
          </p>
          <p>
            Your dream bike is being built now, and we look forward to riding
            with you.
          </p>
        </div>
        <div>
          <img src="/img/about/about_bike.jpg" alt="about_bicycle" />
        </div>
      </div>
    </div>
  );
};

export default About;
