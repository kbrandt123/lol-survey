import Card from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";

export const Submission = withRouter(function (props) {
  const [calc, setCalc] = useState();
  const userdata = props.router.query.userData;
  if (!props.router.query.champion) return;
  console.log("REEEEEEE", props.router.query);
  const champName = props.router.query.champion;
  const id = props.router.query.id;
  console.log(id);
  const userName = props.router.query.username;
  console.log(props.router);

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
      <Card>
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
      </Card>
    </>
  );
});

// export function Submission (props) {
//   console.log(props.router.query);
//   const [calc, setCalc] = useState();
//   console.log(calc);
//   const userdata = JSON.parse(props.router.query.userData);
//   const champName = userdata.champion;
//   const id = props.router.query.id;
//   const userName = userdata.username;
//   console.log(userdata);
//   console.log(champName);
//   console.log(id);
//   console.log(userName);

//   const submissionData = async () => {
//     await axios
//       .get(`/api/data?id=${id}&champion=${champName}`)
//       .then((res) => {
//         const data = res.data;
//         console.log(data);
//         const total = data.total;
//         const count = data.count;
//         const calc = Math.round((count / total) * 100);
//         setCalc(calc);
//         // allData.push({ count: count, total: total });
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     submissionData();
//   }, []);

//   return (
//     <>
//       <Card>
//         <div className="submissionBox">
//           <div className="innerBox">
//             <h1>
//               Thanks {userName} for your submission! <br></br>
//               <br></br>
//               <span className="percent"> {calc}% </span>of players who took this
//               survey also main {champName}!
//             </h1>
//           </div>
//           <img
//             className="champImage"
//             src={`/images/championImages/${champName}.png`}
//           />
//         </div>
//       </Card>
//     </>
//   );
// };
