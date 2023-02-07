import './App.css';
import { useState } from 'react';
import { csvFileToArray } from './utils/csvFileToArray';
import axios from 'axios';

function App() {
  const [array, setArray] = useState([]);

  const handleFileRead = e => {
    const target = e.currentTarget;
    const file = target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsText(file, 'euc-kr');
      fileReader.onload = e => {
        const text = e.target.result;
        const arr = csvFileToArray(text);
        setArray(arr[0]);

        const data = arr[1];

        axios.post('http://localhost:4000/insert', {
          line: data[1],
          snumber: data[2],
          sname: data[3],
          column1: data[4],
          column2: data[5],
          column3: data[6],
          column4: data[7],
          column5: data[8],
        });
      };
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

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
            {headerKeys.map((key, idx) => (
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
