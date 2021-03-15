import React, { useState, useEffect }  from 'react';
import styles from './Articles.module.css';
import axios from 'axios';
import Loader from "react-loader-spinner";

const url = "https://covid19-tracker-app-express.herokuapp.com/articles";

function Articles() {
    const [ articles, setArticles ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const fetchAllArticles = async () => {
        try {
            const articles = await axios.get(url); //articles is an object with 'data' property/attribute
            await setIsLoading(false);
            return articles.data //articles.data is an array of articles
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await setIsLoading(true);
            let articles_array = await fetchAllArticles();
            setArticles(articles_array);
        }
        fetchMyAPI();
    }, []); 

    //article.postDate will return a date string.
    // To convert the date string into a readable date, refer to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse &  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

    const articlesContainer = articles.map((article) => 
            <div key={article._id}>
                <h3>{article.title}</h3>
                <div className={styles.limitText}>{article.body}</div>
                <div className={styles.fontsize}>{article.authorName}</div>
                <div className={styles.fontsize}>{(new Date(article.postDate)).toLocaleDateString('en-GB')}</div>
                <a href={`/articles/${article._id}`} target="_blank" rel="noopener noreferrer"><button>Read more</button></a>
                <br></br>
                <br></br> 
            </div>
    ).reverse(); // we use .reverse() here to reverse the array so the article posts are listed from most-recent to most-oldest

    const articlesContainerHeader = <h1>Articles</h1>;
    
    return(
        <div className={styles.container}>
            { isLoading ? <div className={styles.loader}><Loader type="TailSpin" color="black" height={80} width={80} /></div> : <div>{articlesContainerHeader} {articlesContainer}</div> }
        </div>
    );
}

export default Articles;