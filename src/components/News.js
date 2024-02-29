import React, { useEffect,useState } from "react";
import NewsItems from "./NewsItems";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import LoadingBar from 'react-top-loading-bar'

const  News=(props)=> {

const [articles , setArticles ] = useState([])
const [page , setPage ] = useState(1)
const [loading , setLoading ] = useState(true)
const [totalResults , settotalResults ] = useState(0)

 



/*
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    
  }
  */










  const updateNews = async ()=> {
    props.setProgress(15);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a283737eae9452788c05e708d53d456&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(45);
    let parseData = await data.json();
    // console.log(parseData);
    setArticles(parseData.articles)
    settotalResults(parseData.totalResults)
    setLoading(false)



    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    // });



    props.setProgress(100);
  }




  
  useEffect(()=>{
    updateNews();
    document.title = ` ${props.category} Section At-- NewsSpy`;
    // eslint-disable-next-line
  },[])








/*
  async componentDidMount() {
    // console.log("Hello!CDM")
    // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a283737eae9452788c05e708d53d456&page=1&pageSize=${props.pageSize}`;

    // let data = await fetch(url);
    // let parseData = await data.json()
    // // console.log(parseData);
    // this.setState({articles:parseData.articles,totalResults:parseData.totalResults})

  }       
   
  To remember concepts!! 

  */




/*
   const handlePrevClick = async () => {
    // console.log("previous");

    // let url=` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a283737eae9452788c05e708d53d456&page=${this.state.page - 1}&pageSize = ${props.pageSize}`;

    //   let data = await fetch(url);
    //   let parseData = await data.json()
    //   // console.log(parseData);

    //    this.setState({
    //     page: this.state.page + 1,
    //     articles:parseData.articles
    //    })

    // await setState({ page: page - 1 });
    setPage(page -1 )
    updateNews();
  };

  */





/*
   const handleNextClick = async () => {
    //  console.log("next");
    //  if(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)){

    //    let url=` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a283737eae9452788c05e708d53d456&page=${this.state.page + 1}&pageSize = ${props.pageSize}`;

    //    let data = await fetch(url);
    //    let parseData = await data.json()
    //    // console.log(parseData);

    //    this.setState({
    //      page: this.state.page + 1,
    //      articles:parseData.articles
    //     })
    //   }

    // await setState({ page: page + 1 });
    setPage(page +1 )
    updateNews();
  };
  */




   const fetchMoreData = async () => {
    // setState({ page: page + 1 });


    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a283737eae9452788c05e708d53d456&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)

    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
    


    // setState({
    //   articles: articles.concat(parseData.articles),
    //   totalResults: parseData.totalResults,
    // });



  };

  
    // console.log("hello! Render!")
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>NewsSpy -- Top HeadLines from {props.category} Section</h2>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={() => articles.length < totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 61) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 93)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 7,
  category: "General",
};

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};

export default News;
