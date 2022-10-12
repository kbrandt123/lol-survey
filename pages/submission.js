import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";

const submission = () => {
  const [calc, setCalc] = useState();
  console.log(calc);
  // let location = useLocation();
  // const champName = location.state.userdata.champion;
  // console.log(champName);
  // const id = location.state.id;
  // const userName = location.state.userdata.username;

  const submissionData = async () => {
    await axios
      .get(`/api/data?id=${id}&champion=${champName}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const total = data.total;
        const count = data.count;
        const calc = Math.round((count / total) * 100);
        setCalc(calc);
        // allData.push({ count: count, total: total });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    submissionData();
  }, []);

  return (
    <>
      {/* <Card>
        <div className="submissionBox">
          <div className="innerBox">
            <h1>
              Thanks {userName} for your submission! <br></br>
              <br></br>
              <span className="percent"> {calc}% </span>of players who took this
              survey also main {champName}!
            </h1>
          </div>
          <img
            className="champImage"
            src={`/images/championImages/${champName}.png`}
          />
        </div>
      </Card> */}
    </>
  );
};

export default submission;
