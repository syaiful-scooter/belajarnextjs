import React, { useEffect, useState } from "react";

interface IListData {
  id: number;
  name: string;
}

interface IProps {
  nama?: string;
  subject: any;
  urutan: number;
  listData: IListData[];
  mode: "register" | "update";
}

console.log("BEFORE");

export default function TestComponent(props: IProps) {
  const nama = "TEST";
  const { nama: personName, subject, urutan, listData } = props;

  const [counter, setCounter] = useState(0);
  const [karakter, setKarakter]: any = useState([]);
  const [person, setPerson] = useState({
    nama: "",
    umur: 0,
    pekerjaan: "",
  });

  useEffect(() => {
    console.log("Masuk effect");
    if (counter === 5) {
      setPerson({
        nama: "ABC",
        umur: 10,
        pekerjaan: "CEO",
      });
    }
  }, [counter]);

  console.log("karakter", karakter);

  const handleReset = () => {
    setCounter(0);
  };

  let index = 1;
  const addIndex = () => {
    index++;
    console.log("index", index);
  };

  const updatePerson = () => {
    const tmpPerson = { ...person };
    tmpPerson.nama = "Alvin";
    tmpPerson.umur = 17;
    tmpPerson.pekerjaan = "Developer";
    setPerson(tmpPerson);
  };

  const handleAddKarakter = () => {
    // Kalau misalkan state nya array / object / array of object, kita harus tampung dulu didalam variable lain pakai spread attribute
    const tmpListKarakter = [...karakter];
    tmpListKarakter.push({
      id: karakter.length,
      name: karakter.length,
    });
    setKarakter(tmpListKarakter);
  };

  return (
    <div>
      <p>{nama}</p>
      <p>Hello, nama saya adalah : {personName}</p>
      <p>Saya sedang belajar {subject}</p>
      <p>Saya urutan {urutan}</p>

      <ul>
        {listData.map((value, i) => (
          <li key={i}>{value.name}</li>
        ))}
      </ul>

      <div>Counter : {counter}</div>
      <div>
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          Add Counter
        </button>
        <button onClick={handleReset}>Reset</button>
        <button
          onClick={() => {
            setCounter(index);
          }}
        >
          Mutate
        </button>
      </div>
      <div>
        index : {index}
        <button onClick={addIndex}>Add Index</button>
      </div>

      {/* =============== START KARAKTER ===============*/}
      <div>
        <ul>
          {karakter.map((v: any, i: number) => (
            <li key={i}>{v.name}</li>
          ))}
        </ul>
        <button onClick={handleAddKarakter}>Add Karakter</button>
      </div>
      {/* =============== END KARAKTER ===============*/}
      {/* =============== START PERSON ===============*/}
      <div className="dataPerson">
        {person.nama !== "" ? (
          <React.Fragment>
            <p>Nama orang : {person.nama}</p>
            <p>Umur orang : {person.umur}</p>
            <p>Pekerjaan : {person.pekerjaan}</p>
          </React.Fragment>
        ) : null}
        <button onClick={updatePerson}>Update Person</button>
      </div>
      {/* =============== END PERSON ===============*/}
    </div>
  );
}
