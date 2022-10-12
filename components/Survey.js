// import Image from "./images/League.jpg";
import Card from "./Card";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const champNames = async () => {
  const res = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json`
  );
  const data = await res.json();

  const keys = Object.keys(data.data);
  let champs = [];
  for (let i = 0; i < keys.length; i++) {
    champs.push({ name: data.data[keys[i]].name, id: data.data[keys[i]].id });
  }

  return champs;
};

const Survey = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [champions, setChampions] = useState([]);
  const [timeIsValid, setTimeValid] = useState(true);
  const [champIsValid, setChampValid] = useState(true);

  useEffect(() => {
    champNames().then((res) => {
      setChampions(res);
    });
  }, []);

  const handleSubmission = async (data) => {
    if (data.time === "Time Played") {
      setTimeValid(false);
      return;
    }

    if (data.champion === "Select Champion") {
      setChampValid(false);
      return;
    }

    // return alert("Please select a valid time played");

    // return alert("Please select a champion");

    await axios
      .post("/api/submission", data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        // const id = resp.data[0].insertId;
        // console.log(id);
        // const userData = JSON.parse(resp.config.data);
        // console.log(userData.champion);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card>
        <h1 className="header">
          <strong>Leauge of Legends Survey</strong>
        </h1>
        {/* <!--Start of htmlForm--> */}
        <form
          method="post"
          className="surveyInfo"
          onSubmit={handleSubmit(handleSubmission)}
        >
          {/* <!--username input--> */}
          <div className="name">
            <p>
              <span>*</span> Username
            </p>
          </div>

          <input
            type="text"
            required
            placeholder="Enter Username"
            // defaultValue="kevin"
            {...register("username")}
          />

          {/* <!--Email input--> */}
          <div>
            <p>
              <span>*</span> Email
            </p>
            <input
              type="text"
              required
              placeholder="Enter Email"
              {...register("email")}
              // defaultValue={"reee@reee.com"}
            />
          </div>

          {/* <!--Age input--> */}
          <div>
            <p className="age">Age (optional)</p>
            <input
              type="text"
              placeholder="Age"
              {...register("age")}
              // defaultValue={14}
            />
          </div>

          {/* <!--Time played Input--> */}

          <p>
            <span>*</span> How long have you been playing?
          </p>
          <select
            className={timeIsValid ? "dropdown" : "dropdownInvalid"}
            {...register("time")}
          >
            <option hidden disabled selected value={"Time Played"}>
              Time Played
            </option>
            <option value="1">Less than 1 year</option>
            <option value="2-3">2-3 years</option>
            <option value="4-6">4-6 years</option>
            <option value="7+">7+</option>
          </select>

          {/* <!--recommendation section--> */}
          <p>
            <span>*</span> Would you recommend League of Legends to a friend?
          </p>
          <div className="inputRadio">
            <label for="Definitely">
              <input
                id="Definitely"
                type="radio"
                value="Definitely"
                required
                {...register("recommendations")}
              />
              Definitely{" "}
            </label>
            <br />

            <label for="Maybe">
              <input
                id="Maybe"
                type="radio"
                value="Maybe"
                {...register("recommendations")}
              />
              Maybe{" "}
            </label>
            <br />

            <label for="Never">
              <input
                id="Never"
                type="radio"
                value="Never"
                {...register("recommendations")}
              />
              Never
            </label>
          </div>

          {/* <!--Champion selector --> */}
          <div>
            <p>
              <span>*</span> Who is your main champion?
            </p>
            <select
              required
              className={champIsValid ? "dropdown" : "dropdown-invalid"}
              {...register("champion")}
            >
              <option hidden disabled selected value={"Select Champion"}>
                Select Champion
              </option>
              {champions.map((champ, index) => (
                <option key={index} value={champ.id}>
                  {champ.name}
                </option>
              ))}
            </select>
          </div>
          {/* <!-- Game improvements --> */}
          <div className="checkboxes">
            <p>How can League of Legends improve? (check all that apply)</p>
            <label for="fix client">
              <input
                id="fix client"
                type="checkbox"
                value="fix client"
                {...register("improvements")}
              />
              Fix Client{" "}
            </label>
            <br />

            <label for="Smaller pool of champions">
              <input
                id="Smaller pool of champions"
                type="checkbox"
                value="Smaller pool of champions"
                {...register("improvements")}
              />
              Smaller pool of champions{" "}
            </label>
            <br />

            <label for="remove toxic players">
              <input
                id="remove toxic players"
                type="checkbox"
                value="remove toxic players"
                {...register("improvements")}
              />
              Remove Toxic Players{" "}
            </label>
            <br />

            <label for="Bring back the old league">
              <input
                id="Bring back the old league"
                type="checkbox"
                value="Bring back the old league"
                {...register("improvements")}
              />
              Bring back the old league{" "}
            </label>
            <br />

            <label for="listen to the community">
              <input
                id="Listen to the community"
                type="checkbox"
                value="Listen to the community"
                {...register("improvements")}
              />
              Listen to the community{" "}
            </label>
            <br />

            <label for="Focus more on gameplay">
              <input
                id="Focus more on gameplay"
                type="checkbox"
                value="Focus more on gameplay"
                {...register("improvements")}
              />
              Focus more on gameplay
            </label>
          </div>

          {/* <!-- Comments --> */}
          <div className="comments">
            <p>Any comments or suggestions?</p>
            <textarea
              className="inputTextarea"
              {...register("comments")}
              placeholder="Enter your comments here..."
            ></textarea>
          </div>

          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </Card>
    </>
  );
};

export default Survey;
