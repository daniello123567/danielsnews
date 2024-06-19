import { useEffect, useState, useRef } from "react"
import filter from '../assets/filter.png'
import Search from '../assets/seach.png'
import Skele from '../assets/skeleton.gif'
function News() {

  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryTerm, setCategoryTerm] = useState("business")
  const [show, hide] = useState(false);
  const [sho, setSho] = useState(true);
  const [showResult, setShowResult] = useState(false)
  const [searchFilter,setShowSearchFilter] = useState(false)
  const [searchFilters,setSearchFilters] = useState({
    sortBy: "",
    language:"",
    date: ""
  })
  const handleCategory = (e) => {
    setCategoryTerm(e.target.innerText.toLowerCase())
  }
  function Shorten(words) {
    if (words.length >= 62) {
      return words.slice(0, 62) + '...'
    } else {
      return words
    }
  }
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = "https://newsapi.org/v2/everything?q=food&apiKey=91fe30edbf41486f94268ab7d1311ab4";
        const response = await fetch(url);
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.log(error)
      }
    };
    // back to normal
    fetchNews()

  }, []);
  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines/sources?category=${categoryTerm}&apiKey=91fe30edbf41486f94268ab7d1311ab4`
        const response = await fetch(url);
        const data = await response.json();
        setCategory(data.sources)
      } catch (error) {
        console.log(error)
      }
    }
    // back to normal
    fetchByCategory()
  }, [categoryTerm]);
  const ShortenDes = (word) => {
    if (word?.length >= 70) {
      return word.slice(0, 70) + '....'
    } else {
      return word;
    }
  }
  const [filterTerm, setFilterTerms] = useState({
    country: "",
    category: "",
    language: "",
    searchTerm: ""
  })
  const handleCart = (e) => {
    setFilterTerms({ ...filterTerm, [e.target.name]: e.target.value })
  }
  console.log(filterTerm);
  const [filteredItems, setFilteredItems] = useState([])
  console.log("filtered", filteredItems)

  useEffect(() => {
    const fetchByFilter = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines/sources?category=${filterTerm.category}&country=${filterTerm.country}&language=${filterTerm.language}&apiKey=91fe30edbf41486f94268ab7d1311ab4`;
        const res = await fetch(url);
        const data = await res.json();
        setFilteredItems(data.sources)
      } catch (error) {
        console.log(error)
      }
    }
    //  back to normal
     fetchByFilter()
  }, [filterTerm])
  const searchTerm = useRef();
  const [searchResult,setSearchResults] = useState([]);
 console.log("howfar",searchFilters)
  const fetchBySearchQuery =async (query)=>{
    try {
       const url=`https://newsapi.org/v2/everything?q=${query}&from=${searchFilters.date}&to=""&sortBy=${searchFilters.sortBy}&apiKey=91fe30edbf41486f94268ab7d1311ab4`;
      const response =await fetch(url);
       const data = await response.json();
       setSearchResults(data.articles)
    } catch (error) {
      console.log(error)
    }
   }
   useEffect(()=>{
   },[searchTerm.current?.value])
  console.log(searchResult)

   const LandingNews = () => {
    return news?.map((paper, index) => {
      return <div key={index} className="w-full shadow-xl mb-6 overflow-hidden rounded-[.4em] h-[12em] mr-5 inline-block">
        <div className="relative w-full h-full">
          <img className="w-full object-cover rounded-[.6em]  h-[20em]" src={paper.urlToImage} alt="" />
          <div className="px-4 pt-2 h-[22%] shadow-lg w-[60%]  rounded absolute bottom-16">
            <p className="whitespace-normal text-white text-lg font-bold">
              {Shorten(paper.title)}
            </p>
          </div>
        </div>
      </div>
    })
  }

  console.log(searchTerm.current?.value)
  console.log(filteredItems)
  return (
    <div className="bg-slate-100 font-curry2 px-4 w-full pt-2 h-full">
      <div className="w-full bg-slate-100 z-50 flex justify-center border-b border-b-gray-300 items-center  h-[3em] mb-4 fixed left-0 top-0">
        <p className="font-curry text-black ">Daniel's news...</p>
      </div>
      <div className="flex mt-[4em] mb-6 items-center pr-3 justify-between pl-4 focus:outline-1 focus:outline-blue-500 bg-slate-200 w-full h-[3em] rounded-[.6em]">
        <input ref={searchTerm} placeholder="search for news" className="placeholder:text-sm bg-slate-200 w-full focus:outline-none" type="text" />
        <button onClick={()=>{if(searchTerm.current.value){setSho(false);fetchBySearchQuery(searchTerm.current?.value)}else{alert('input search field')}}} className="w-[max-content] py-3 mr-2 shadow-xl bg-slate-400">
          <img src={Search} className=" w-[1em]" alt="" />
        </button>


        <div className="border-l-2 relative border-gray-400 pl-2">
          {show &&
            <div className="w-[8em] h-[max-content] flex flex-col px-2 gap-y-2 text-center py-3 absolute bg-slate-400  right-8 -top-8 rounded">
              <select name="country" onChange={handleCart} className="liu">
                <option value="">country</option>
                <option value="us">US</option>
                <option value="ru">RU</option>
                <option value="ar">AR</option>
                <option value="ae">AE</option>
                <option value="cn">CN</option>
                <option value="ie">IE</option>
                <option value="no">NO</option>
              </select>
              <select name="category" onChange={handleCart} className="liu">
                <option value="">category</option>
                <option value="business">Business</option>
                <option value="entertainment">entertainment</option>
                <option value="general">General</option>
                <option value="health">health</option>
                <option value="science">science</option>
                <option value="sports">sports</option>
                <option value="technology">Tech</option>
              </select>
              <select name="language" onChange={handleCart} className="liu">
                <option value="">Langua...</option>
                <option value="ar">AR</option>
                <option value="en">EN</option>
                <option value="de">DE</option>
                <option value="ru">RU</option>
                <option value="it">IT</option>
                <option value="ud">UD</option>
              </select>
              <button onClick={() => {
                if (filterTerm.category || filterTerm.language || filterTerm.country) {
                  setSho(!sho);
                  hide(false);
                  setShowResult(true);
                }
              }} className="bg-green-700 active:bg-green-700 focus:bg-green-800 text-white">done</button>


            </div>
          }
        {searchFilter &&<div>

          <div className="w-[8em] h-[max-content] flex flex-col px-2 gap-y-2 text-center py-3 absolute bg-slate-400  right-8 -top-8 rounded">
               <div>
                <label htmlFor="date">News from:</label>
                <input onChange={(e)=>{setSearchFilters({...searchFilters,date:e.target.value})}} name="date" id="date" className="w-full rounded" type="date" />
               </div>
              <select name="sortBy" onChange={(e)=>{setSearchFilters({...searchFilters,sortBy:e.target.value})}} className="liu">
                <option value="">Sort By</option>
                <option value="popularity">popularity</option>
                <option value="relevancy">Relevancy</option>
                <option value="publishedAt">Newest</option>
              </select>
              <select name="language" onChange={(e)=>{setSearchFilters({...searchFilters,language:e.target.value})}} className="liu">
                <option value="">Langua...</option>
                <option value="ar">AR</option>
                <option value="en">EN</option>
                <option value="de">DE</option>
                <option value="ru">RU</option>
                <option value="it">IT</option>
                <option value="ud">UD</option>
              </select>
              {<button onClick={()=>{fetchBySearchQuery(searchTerm.current?.value);setSearchFilters(false)}} className="bg-green-700 active:bg-green-700 focus:bg-green-800 text-white">done</button>}


            </div>

          </div>}



          <img onClick={() =>{
            if(searchResult.length !==0){
              setShowSearchFilter(!searchFilter)
            }else{
              hide(!show)
            }
          }} className="w-[2em] opacity-80" src={filter} alt="" />
        </div>

      </div>

     {sho &&
        <div>
          <p className="font-bold text-blue-950 text-[1.2rem]">Discover.</p>
          <p className="mb-2 text-slate-300 text-sm">Discover news!</p>
          <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">

            {news.length <= 0 ?
              <div className="w-full shadow-xl mb-6 overflow-hidden rounded-[.4em] h-[12em] mr-5 inline-block">
                <img className="w-full" src={Skele} alt="" />
              </div> : <LandingNews />}

          </div>

          <div>
            <div className="flex gap-3 px-2 rounded bg-slate-300 py-2 overflow-x-scroll">
              <button onClick={handleCategory}>business</button>
              <button onClick={handleCategory}>Entertainment</button>
              <button onClick={handleCategory}>General</button>
              <button onClick={handleCategory}>Health</button>
              <button onClick={handleCategory}>Science</button>
              <button onClick={handleCategory}>Sports</button>
              <button onClick={handleCategory}>Technology</button>
            </div>

            <div className="allnewscategory">
              <div>
                {category.length != 0 ?
                  category?.map((paper) => {
                    return <div className="w-full gap-2 flex px-2 py-2 h-[5em] bg-slate-200 mb-2 rounded">

                      <div className="text-sm font-light w-[90%]">
                        <div className="w-[max-content] h-[max-content] text-sm px-1 py-0 rounded-sm bg-green-300">
                          {paper.country}
                        </div>
                        {ShortenDes(paper?.description)}
                      </div>
                      <div className="w-[8em] rounded bg-emerald-300 h-full">

                      </div>
                    </div>
                  })

                  :
                  <div>
                    <div className="w-full mt-2 justify-between flex px-2 py-2 h-[5em] bg-slate-200 mb-2 rounded">
                      <div className="w-[60%] flex flex-col gap-2 rounded-full ">
                        <div className="w-full shadow-inner h-[1em] bg-slate-100 rounded-full"></div>
                        <div className="w-full shadow-inner h-[1em] bg-slate-50 rounded-full"></div>
                        <div className="w-full shadow-inner h-[1em] bg-slate-50 rounded-full"></div>
                      </div>
                      <div className="w-[8em] shadow-2xl h-full overflow-hidden rounded">
                        <img className="w-full h-full" src={Skele} alt="" /></div>
                    </div>
                    <div className="w-full mt-2 justify-between flex px-2 py-2 h-[5em] bg-slate-200 mb-2 rounded">
                      <div className="w-[60%] flex flex-col gap-2 rounded-full ">
                        <div className="w-full shadow-inner h-[1em] bg-slate-100 rounded-full"></div>
                        <div className="w-full shadow-inner h-[1em] bg-slate-50 rounded-full"></div>
                        <div className="w-full shadow-inner h-[1em] bg-slate-50 rounded-full"></div>
                      </div>
                      <div className="w-[8em] shadow-2xl h-full overflow-hidden rounded">
                        <img className="w-full h-full" src={Skele} alt="" /></div>
                    </div>
                    <div className="w-full mt-2 justify-between flex px-2 py-2 h-[5em] bg-slate-200 mb-2 rounded">
                      <div className="w-[60%] flex flex-col gap-2 rounded-full ">
                        <div className="w-full shadow-inner h-[1em] bg-slate-100 rounded-full"></div>
                        <div className="w-full shadow-inner h-[1em] bg-slate-50 rounded-full"></div>
                        <div className="w-full shadow-inner h-[1em] bg-slate-50 rounded-full"></div>
                      </div>
                      <div className="w-[8em] shadow-2xl h-full overflow-hidden rounded">
                        <img className="w-full h-full" src={Skele} alt="" /></div>
                    </div>

                  </div>}

              </div>
            </div>
          </div>
        </div>}
      {showResult && <div>
        <h1>Results</h1>
        {filteredItems?.map((paper) => {
          return <div className="w-full px-2 py-2 gap-1 flex h-[5em] bg-slate-300 mb-2 rounded">
            <div className="w-[70%] text-sm">{ShortenDes(paper.description)}</div>
            <div className="w-[8em] rounded bg-emerald-300 h-full">

            </div>
          </div>
        })}</div>}

        {!sho && <div className="flex flex-col gap-3">
       {searchResult?.map((result)=>{
        return <div className="bg-slate-300 px-2 py-2 rounded gap-1 flex h-[7em]">
          <div>
            <p className="font-bold border-b text-sm">{result.title}.</p>
            <p className="text-sm mt-1 text-slate-500">{ShortenDes(result.description)}</p>
            </div>
          <div className="w-[30%] overflow-hidden rounded h-full">
            <img className="w-full object-cover h-full" src={result.urlToImage} alt="" />
            </div>
        </div>
       })}
          </div>}
    </div>

  )
}

export default News
