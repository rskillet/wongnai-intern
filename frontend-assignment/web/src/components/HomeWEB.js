import React, { useState } from 'react';
import Axios from 'axios';
import '../css/style.css'

function Home() {
    const [tripList, getTripList] = useState([]);
    const [query, setQuery] = useState("");

    const search = () => {
        Axios.get(`http://localhost:3030/api/trips?keyword=${query}`).then((res) => {
            if(res.status === 200) {
            getTripList(res.data);
            console.log(res.data);
            }
        })
    };
    return (

        <div>
            <h1>เที่ยวไหนดี</h1>
            <form>
                <input className='search' type="text" placeholder="หาที่เที่ยวแล้วไปกัน..." onChange={(event) => { setQuery(event.target.value); }} onKeyPress={search} value={query}></input>
            </form>

            <div>
                {tripList.map((trip, index) => {
                    return (
                        <div className='trip_list'>
                            <img className='b_img' src={tripList[index].photos[0]} />
                            <h2 className='trip_title'>
                                <a href={tripList[index].url}>{tripList[index].title}</a>
                            </h2>
                            <p className='trip_details'>{tripList[index].description.substring(0, 200)} ... 
                            {/*Set all characters to be displayed. as many as we define*/}

                            <a href={tripList[index].url}>อ่านต่อ...</a></p>

                            <p className='trip_tags'> หมวดหมู่
                                <ul>
                                {
                                    tripList.map((tag, id) => {
                                        return (
                                            <li>
                                                <a className='trip_tags_list' onMouseDown={() => setQuery(tripList[index].tags[id])} onClick={search}>{tripList[index].tags[id]}</a>
                                                {/*When you click on the desired result, it will send the information to the search to find that result.*/}
                                            </li>
                                    )})
                                }
                                </ul>
                            </p>

                            <img className='s_img' src={tripList[index].photos[1]} />
                            <img className='s_img' src={tripList[index].photos[2]} />
                            <img className='s_img' src={tripList[index].photos[3]} />
                        </div>
                    )
                })}

            </div>

        </div>
    );
}

export default Home;