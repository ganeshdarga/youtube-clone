


// import React, { useEffect, useState,useContext } from 'react'
// import './Feed.css'
// import { Link } from 'react-router-dom'
// import {API_KEY, value_converter} from '../../Data'
// import moment from 'moment/moment'
// import { SearchContext } from '../../App'


// const Feed = ({category}) => {

//     const { searchQuery } = useContext(SearchContext);
//     const [data,setData] = useState([]);

//     const [searchBase,setSearchBased]=useState(false)
//     const [categoryBase,setCategoryBased]=useState(false)
    

//     const fetchData = async(query ='')=>{
//         let videoList_url;
//         if (query){
//             videoList_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet,id&maxResults=25&q=${query}&key=${API_KEY}&order=viewCount`;
//             setSearchBased(true)
//             setCategoryBased(false)
//         }else{
//             videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
//             setCategoryBased(true)
//             setSearchBased(false)
//         }

//         try{
//             const response = await fetch(videoList_url);
//             const data = await response.json()
//             setData(data.items)
//         } catch(error){
//             console.log("Failed to fetch data:",error)
//         }
//     }

//     useEffect(()=>{
//         fetchData(searchQuery)
//     },[searchQuery])

//     useEffect(()=>{
//         fetchData(category)
//     },[category])

//     console.log(data)
//   return (
//     <div className='feed'>
//         {data.map((item,index)=>{
//             return(
//                 <>
//                 {searchBase&&(
//                 <Link to={`video/${0}/${item.id.videoId}`} className='card'>
               
//                 <img src={item.snippet.thumbnails.medium.url}></img>
//                 <h2>{item.snippet.title}</h2>
//                 <h3>{item.snippet.channelTitle}</h3>
//                 <p>{value_converter(item.statistics ? item.statistics.viewCount : undefined)}  views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
//                 </Link>
//             )}
//             {categoryBase&&(
//                                 <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
               
//                                 <img src={item.snippet.thumbnails.medium.url}></img>
//                                 <h2>{item.snippet.title}</h2>
//                                 <h3>{item.snippet.channelTitle}</h3>
//                                 <p>{value_converter(item.statistics ? item.statistics.viewCount : undefined)}  views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
//                                 </Link>
//             )}
//             </>
//             )
//         })}
//     </div>
//   )
// }

// export default Feed


import React, { useEffect, useState,useContext,useRef } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import {API_KEY, value_converter} from '../../Data'
import moment from 'moment/moment'
import { SearchContext } from '../../App'



const Feed = ({category}) => {

    const { setSearchId } = useContext(SearchContext);
    
   

    const { searchQuery } = useContext(SearchContext);
    const [data,setData] = useState([]);

    const [searchBase,setSearchBased]=useState(false)
    const [categoryBase,setCategoryBased]=useState(false)

    

    const fetchData = async(query ='')=>{
                let videoList_url;
                if (query){
                    videoList_url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet,id&maxResults=25&q=${query}&key=${API_KEY}&order=viewCount`
                    setSearchBased(true)
                    setCategoryBased(false)
                }else{
                    videoList_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&videoCategoryId=${category}&maxResults=50&chart=mostPopular`
                    setCategoryBased(true)
                    setSearchBased(false)
                }
        
                try{
                    const response = await fetch(videoList_url);
                    const data = await response.json()
                    setData(data.items)
                } catch(error){
                    console.log("Failed to fetch data:",error)
                }
            }

    useEffect(()=>{
        fetchData(searchQuery)
        
    },[searchQuery])

    useEffect(()=>{
        fetchData(category)
    },[category])

    

    const iframeRefs = useRef([]);

    const handleMouseOver = (index) => {
      const iframe = iframeRefs.current[index];
      if (iframe) {
        // Set autoplay to 1
        iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
      }
    };
  
    const handleMouseOut = (index) => {
      const iframe = iframeRefs.current[index];
      if (iframe) {
        // Set autoplay to 0
        iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
      }
    };
  return (
    <div className='feed'>
        {data.map((item,index)=>{
            return(
                <>
                {searchBase&&(
                <Link to={`video/${0}/${item.id.videoId}`} className='card' onClick={()=>(setSearchId(item.snippet.categoryId))}>
               <iframe
                  ref={(el) => (iframeRefs.current[index] = el)}
                  src={`https://www.youtube.com/embed/${item.id.videoId}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={() => handleMouseOut(index)}
                  frameBorder='0'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  className='iframe-disabled'
                ></iframe>
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>{value_converter(item.statistics ? item.statistics.viewCount : undefined)}  views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            )}
            {categoryBase&&(
                                <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card' onClick={()=>(setSearchId(item.snippet.categoryId))}>

                                <iframe
                  ref={(el) => (iframeRefs.current[index] = el)}
                  src={`https://www.youtube.com/embed/${item.id}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={() => handleMouseOut(index)}
                  frameBorder='0'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  className='iframe-disabled'
                ></iframe>
                                <h2>{item.snippet.title}</h2>

                                <h3>{item.snippet.channelTitle}</h3>
                                <p>{value_converter(item.statistics ? item.statistics.viewCount : undefined)}  views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                                </Link>
            )}
            </>
            )
        })}
    </div>
  )
}

export default Feed


