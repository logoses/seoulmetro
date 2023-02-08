import "./App.css";
import { useState } from "react";
import { csvFileToArray } from "./utils/csvFileToArray";
import { metroApi } from "./apis/index";

function App() {
  const [array, setArray] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileRead = e => {
    const target = e.currentTarget;
    const file = target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsText(file);
      fileReader.onload = e => {
        const text = e.target.result;
        const arr = csvFileToArray(text);
        setArray(arr[0]);

        const headerKeys = Object.keys(Object.assign({}, ...arr[0]));
        setHeaders(headerKeys);

        const data = arr[1];
        const body = {
          line: data[1],
          snumber: data[2],
          sname: data[3],
          column1: data[4],
          column2: data[5],
          column3: data[6],
          column4: data[7],
          column5: data[8],
        };

        metroApi.insertRequest(body);
      };
    }
  };

  const onList = async () => {
    await metroApi
      .showListRequest()
      .then(res => res.data)
      .then(data => {
        setHeaders(data.headers);
        setArray(data.values);
      });
  };

  const onExam1 = () => {};
  const onExam2 = () => {};
  const onExam3 = () => {};

  return (
    <div className="container">
      <h1>서울교통공사 역별 승하차 인원 정보</h1>
      <form>
        <input type="file" accept=".csv" onChange={handleFileRead} />
      </form>

      <div className="buttons">
        <button onClick={onList}>List</button>
        <button onClick={onExam1}>Exam1</button>
        <button onClick={onExam2}>Exam2</button>
        <button onClick={onExam3}>Exam3</button>
      </div>

      <br />

      <table>
        <thead>
          <tr key="header">
            {headers.map((key, idx) => (
              <th key={idx}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item, idx) => (
            <tr key={idx}>
              {Object.values(item).map((e, idx) => (
                <td key={idx}>{e}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
