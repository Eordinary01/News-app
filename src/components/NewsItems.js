import React from "react";

const NewsItems = (props)=> {
 
  
    let {title, description,imageUrl,newsUrl,author,date} = props;
    return (
      <div>
        <div className="card" >
          <img
            className="card-img-top"
            src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJnDLNpzwIP8zCHc0TshXROlbGhuDmCt5xJRtp3mua1MAaQfggnDzGQvCzw&s":imageUrl}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItems;
