import React, { useContext } from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "./UserContext";

const About = () => {
  const { setName } = useContext(UserContext);
  return (
    <div>
      <h1>About Page</h1>
      <input onChange={(e) => setName(e.target.value)} />
      <User name="Dhairyaa from functional component" />
      <UserClass name="Dhairya from class component" />
      <UserClass name="Elon from class component" />
    </div>
  );
};

export default About;
