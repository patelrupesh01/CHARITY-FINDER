import React from "react";
import VolunteerCard from "./volunteerCard";

import chaitanya from '../Home/images/chaitanya.jpeg';
import mayank from '../Home/images/mayank.jpeg';
import ayush from '../Home/images/ayush.jpeg';
import rupesh from '../Home/images/rupesh.jpeg';
import abhimanyu from '../Home/images/abhimanyu.jpeg';
import post from './images/post.png';

function SectionSix() {
  return (
    <div className="six">
      <h3>CONTRIBUTORS</h3>
      <h1>OUR CONTRIBUTORS</h1>
      <div className="sixcards">
        <VolunteerCard
          className="cardsix"
          image={chaitanya}
          name="Chaitanya Pandey"
          description="Contributor"
        />
        <VolunteerCard
          className="cardsix"
          image={mayank}
          name="Mayank Ahuja"
          description="Contributor"
        />
        <VolunteerCard
          className="cardsix"
          image={ayush}
          name="Ayush Mamgain"
          description="Contributor"
        />
        <VolunteerCard
          className="cardsix"
          image={rupesh}
          name="Rupesh Patel"
          description="Contributor"
        />
        <VolunteerCard
          className="cardsix"
          image={abhimanyu}
          name="Abhimanyu Kumar"
          description="Contributor"
        />
      </div>
      <h4>for expanding</h4>
    </div>
  );
}
export default SectionSix;
