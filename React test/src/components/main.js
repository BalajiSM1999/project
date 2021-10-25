import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChartView from './charts'
import * as moment from 'moment';

export default function MainPage() {
    const [data, setData] = useState([])
    const [date, setDate] = useState([])
    const [group, setgroup] = useState('')
    const [chart, setChart] = useState('')
    const [charName, setCharName] = useState([])
    const [charPrice, setCharPrice] = useState([])

    //data fetch
    useEffect(() => {
        axios.get("https://itunes.apple.com/us/rss/toppaidapplications/limit=100/json")
            .then((response) => {
                setData(response.data.feed.entry)
                console.log(response.data.feed.entry)
                setDate(response.data.feed.entry["im:releaseDate"])
            })
    }, [])

    // set chart inputs
    function getCharvalues() {


        setChart("error")
        var i, j, text = [], prices = [], result;
        for (i = 0; i < data.length; i++) {
            text.push(data[i]["im:price"].attributes.amount)
        }
        for (j = 0; j < data.length; j++) {
            prices.push(data[j].title.label)
        }
        setCharPrice(text)
        setCharName(prices)


    }

    //sorting
    function btnSort() {
        var list, i, switching, b, a, shouldSwitch;
        list = document.querySelector("#divided");
        switching = true;

        while (switching) {
            switching = false;
            a = list.getElementsByClassName("card");
            b = list.getElementsByClassName(group)
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                a[i].parentNode.insertBefore(a[i + 1], a[i]);
                switching = true;
            }
        }
    }


    //filtering
    function doSearch() {
        var input, filter, found, div, element, row, i, j;
        input = document.getElementById("searchTerm");
        filter = input.value.toUpperCase();
        div = document.querySelector("#divided");
        element = div.getElementsByClassName("card");
        for (i = 0; i < element.length; i++) {
            row = element[i].getElementsByTagName("h5");
            for (j = 0; j < row.length; j++) {
                if (row[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                element[i].style.display = "";
                found = false;
            } else {
                element[i].style.display = "none";
            }
        }

        var a, b, c, d, selName = [], selectPrice = [], selectName = [], result;

        for (a = 0; a < data.length; a++) {

            if (data[a].title.label.toUpperCase() === filter) {
                console.log(data[a].title.label.toUpperCase())
                console.log(filter)
                selName.push(data[a].title.label)
                setCharName(selName)
                selectPrice.push(data[a]["im:price"].attributes.amount)
                setCharPrice(selectPrice)
            }

        }
    }
  

    return (
        <div>
            <h1 className="heading">iTune Top Paid Applications</h1>

            <button className="btn-primary" data-testid="btn" onClick={getCharvalues}>View Charts</button>
            {chart ? (

                <ChartView charName={charName} charPrice={charPrice} />
            ) : ""}<br></br>

            <div className="funcs">
                <div className="search">
                    <p>Search: <input type="text" id="searchTerm" placeholder="filter by app name" onKeyPress={doSearch} /></p>

                </div>


                <div className="dropdown">
                    <button className="dropbtn" title="drop-btn">Sort By</button>
                    <div className="dropdown-content" id="sort-content">
                        <a onMouseDown={() => setgroup("card-title")} onClick={btnSort}>Name</a>
                        <a onMouseDown={() => setgroup("card-price")} onClick={btnSort}>Price</a>
                        <a onMouseDown={() => setgroup("card-label")} onClick={btnSort}>Category</a>
                        <a onMouseDown={() => setgroup("card-date")} onClick={btnSort}>Date</a>

                    </div>
                </div>

            </div>

            <div id="divided">

                {
                    data.map((row) => (
                        <div key={row.title.label} className="card-main">
                            <div className="card">
                                <img className="card-img" src={row["im:image"][0].label}></img>
                                <h5 className="card-title">{row.title.label}</h5>
                                <div className="card-label">{row.category.attributes.label}</div>
                                <p className="card-price" value={row["im:price"].attributes.amount}>{row["im:price"].label}</p>
                                <p className="card-dates"  value={row["im:releaseDate"].label}>{row["im:releaseDate"].attributes.label}</p>
                                <p className="card-date"  value={row["im:releaseDate"].label}>{row["im:releaseDate"].label}</p>
                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}
