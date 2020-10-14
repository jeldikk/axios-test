const dotenv = require('dotenv')
const axios = require('axios');

dotenv.config();

const request_queries = [
    'redux',
    'react-native',
    'react router',
    'react bootstrap',
    'react native'
]

const makeGetRequest = async ()=>{
    let results = await axios.get("https://hn.algolia.com/api/v1/search?query=kamal");


    // response object contains all the below given properties
    // console.log(results.data);
    // console.log(results.status);
    // console.log(results.statusText);
    // console.log(results.headers);
    // console.log(results.request)
    console.log(Object.keys(results))
    results.data.hits.map((hit)=>{
        console.log(hit.title)
    })

}

const makeManyRequests = async ()=>{
    let results = await Promise.all(
        request_queries.map((query)=> axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`))
    );

    results
    .then((results)=>{
        console.log(results.map(res => res.data.nbHits));
    })
    .catch((err)=>{
        throw new Error(err)
    })
}

// const makeConfigBasedRequest = async (arg)=>{

//     const config = {
//         method: 'get',
//         url: 'https://hn.algolia.com/api/v1/search',
//         params:{
//             query: arg
//         }
//     })
// }

const makeWikipediaConfigRequest = async (arg)=>{

    const config = {
        method: 'get',
        url: 'http://en.wikipedia.org/w/api.php',
        params:{
            action: 'query',
            list: 'search',
            format: 'json',
            srsearch: arg
        }
        
    }

    let results = await axios(config);


    // console.log(results.headers);

    // console.log(results.status);
    // console.log(results.statusText);

    // console.log(results.request)
    // console.log(results.data);
    // results.data.query.search.map((srch)=>{
    //     console.log(srch)
    // })
    console.log(results.data)
}

const makeOpenWeatherMapRequest = async ()=>{

    const config={
        method: 'get',
        url: "https://api.openweathermap.org/data/2.5/weather",
        params:{
            q: 'gadanki',
            appid: process.env.OWM_APIKEY,
            units: 'metric'
        }
    }
    try{
        const results = await axios(config);
        console.log(results.data)
    }
    catch(error){
        console.log(error);
    }

    
}


// makeGetRequest();
// makeManyRequests();
// makeConfigBasedRequest('redux');
// makeWikipediaConfigRequest('india')
makeOpenWeatherMapRequest();
