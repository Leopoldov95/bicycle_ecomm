import React from "react";
import "./css/About.css";
function About() {
  return (
    <div className="About">
      <div>
        <h2>About Us</h2>
        <p>
          Pure Cycles was founded with one mission in mind: to get more people
          on bikes. For almost 10 years we’ve been designing, developing, and
          delivering the coolest bikes on the market and it’s been a blast to
          watch our brand and our bikes spread around the world.
        </p>
      </div>
      <div className="About-flex">
        <div>
          <p>
            It all began in a dorm room, looking out on the bike racks below and
            wondering why there were so few bikes in general, and so few cool
            bikes specifically. Asking around campus, we kept coming back to the
            same sticking points - people wanted to ride, but they wanted bikes
            that were simple, affordable, and (maybe most importantly) looked
            awesome before making the leap. We decided to make the bikes
            everyone was waiting for - and Pure Fix Cycles was born.
          </p>

          <p>
            And what began as a quest to make the perfect campus bike, expanded
            as our company did. Our office moved, we hired employees, we got
            involved in advocacy and charity, we expanded internationally, we
            hired more employees, and before we knew it, we were sitting at the
            head of a table full of bike-loving friends and colleagues.
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
            fenders, and all the bells and whistles to make their daily trek
            more delightful. The party-riders wanted to develop a beach cruiser
            and a coaster for kicked-back revelry and hands-free slow-rolls. The
            racers (and we were all slowly becoming racers) wanted a track bike
            that was light, stiff, and fast enough to compete on the high-
            banked walls of the velodromes in Encino and Carson. And we wanted
            something for everyone - so we got to work.
          </p>
          <p>
            Now, as Pure Cycles, our bikes span several disciplines and
            occasions. Race bikes, road bikes, rad bikes, and we’re always
            cooking up new ideas because we always find new places and ways to
            ride! From our successful Kickstarter to breathe life into our
            e-bike, Volta, to the top-secret newness peeking over the next
            horizon, each and every development furthers our goal that started
            it all - to get more people on bikes.
          </p>
          <p>
            We’re building your dream bike right now. And we can’t wait to ride
            with you.
          </p>
        </div>
        <div>
          <img src="/img/about/about_bike.jpg" alt="about_bicycle" />
        </div>
      </div>
    </div>
  );
}

export default About;
