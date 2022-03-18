import React, { useEffect, useState } from "react";


function App() {
  const [countries, setCountries] = useState([]);
  const [filterParameter, setFilterParameter] = useState(countries);

  const URL = "https://restcountries.com/v2/all?fields=name,region,area";

  useEffect(() => {
    fetch(URL).then((res) => res.json()).then((result) => {
      setCountries(result);
    },);
  }, []);

  //sort data in both ways
  const sortByNameAscending = () => {
    const sorted = [...filterParameter].sort((b, a) => {
      return a.name.localeCompare(b.name);
    });
    setFilterParameter(sorted);
  }
  const sortByNameDescending = () => {
    const sorted = [...filterParameter].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setFilterParameter(sorted);
  }


  //filter by criteria
  const handleBtns = (e) => {
    let filterValue = e.target.value;

    if(filterValue === 'All') {
      setFilterParameter(countries);
    }
    else if(filterValue === 'Oceania') {
      const filtered = countries.filter(item => item.region === 'Oceania');
      setFilterParameter(filtered);
    }
    else if(filterValue === 'Smaller') {
      const filtered = countries.filter(item => item.area < 65300.0);
      setFilterParameter(filtered);
    }
  }

   return (
     <div className="allContent">
       <div className="filter">
          <button value="All" id="filtering" onClick={handleBtns} className="btn">All</button>
          <button value="Oceania" id="filtering" onClick={handleBtns} className="btn">Oceania</button>
          <button value="Smaller" id="filtering" onClick={handleBtns} className="btn">Smaller than Lithuania</button>   
      
          <button id="sort" onClick={sortByNameAscending} className="btn" >Sort Z-A</button>
          <button id="sort" onClick={sortByNameDescending}className="btn" >Sort A-Z</button>
          
        </div>
        
       <div className="displayList">
          <ul className="card-grid">
              {filterParameter.map((item) => (
                  <li key={item.name}>
                    <h1>{item.name}</h1>
                    <h3>Region: {item.region}</h3> 
                    <p>Area: {item.area}km²</p>          
                  </li>
                  
                ))}
          </ul>
       </div>
     </div>
      
  );
  }
export default App