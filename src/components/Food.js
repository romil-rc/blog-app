import React, { useEffect, useState } from 'react'
import arrowDown from '../assets/arrow.png'
import '../styles/bthff.css'
import axios from "axios";
import { TailSpin } from  'react-loader-spinner'

export default function Food({ q, title, category, pageSize }) {

    const [articles, setArticles] = useState([]);
    const [visible, setVisible] = useState(pageSize);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchData = async() => {
            setLoading(true);
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=cda72f59&app_key=5be87d9c43ea830578ae5656f755c5fb`);
            setArticles(response.data.hits);
            setLoading(false);
        }
        fetchData();
    }, []);

    const loadMore = () => {
        setVisible(visible + 5);
    }
    console.log(articles);
    return (
        <div className='container'>
            { loading ? 
            
            <div className='d-flex justify-content-center'>
                <TailSpin
                    height="100"
                    width="100"
                    color='grey'
                    ariaLabel='loading'
                    />
            </div>

            : 
            <div className="row prow">
                <div className="col-8" id="left-section">
                <h1 className='text m-3'>{title}</h1>
                    <hr className='bhr'/>
                    {articles.slice(0, visible).map((article, i) => {
                        return (
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        { article.recipe.image ? <img src={article.recipe.image} style={{height: "232px", width: "316px", borderRadius: "0px"}} alt={article.recipe.label} /> : <img src="https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg" style={{height: "232px", width: "316px", borderRadius: "0px"}} alt={article.recipe.label} />}
                                    </div>
                                    <div className='col-md-6'>
                                        <div>
                                            <h5 className='text-truncate fw-bold'><a href={article.recipe.url} className="mtlb">{article.recipe.label}</a></h5>
                                            <p className='text-capitalize'>Cuisine Type: {article.recipe.cuisineType}</p>
                                            <p className='text-capitalize'>Dish Type: {article.recipe.dishType}</p>
                                            <p className='text-capitalize'>Meal Type: {article.recipe.mealType}</p>
                                        </div>
                                        <div className=''>
                                            <p className='text-capitalize align-bottom'><span className='fw-bold'>{category}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                    {visible < articles.length && (

                        <div className="row mb-5 pt-1" role="button" id='load-more' onClick={loadMore}>
                            <img src={arrowDown} alt="arrow" className='down-arrow' /> 
                            LOAD MORE
                        </div>

                    )}
                    
                </div>
                <div className="col-4" id="right-section">
                    <div className="row mt-4" style={{display: 'block'}}>
                    <h2>Top Posts</h2>
                    <hr className='bhr'/>
                    <br />
                        {articles.slice(-1).map((element, i) => {
                            return (
                                <>
                                    <img src={element.recipe.image} alt={element.recipe.label} id='pbi'/>
                                    <div className="row mt-4 mb-3">
                                        <div className="col-md-7">
                                            <h5 id='ptpit'><a href={element.recipe.url} className="mtlb">{element.recipe.label}</a></h5><br />
                                            <p className="text-capitalize"><small className="text-muted"><b>{category}</b> / {element.recipe.dishType}</small></p>
                                        </div>
                                        <div className="col-md-5">
                                            <h2 id='post-number'><b>{i+1}</b></h2>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div className="row">
                            {articles.slice(16, 20).map((elements, i) => {
                                return (
                                    <div className="card mb-5 small-right-card post-show-card" style={{width: '100%'}}>
                                        <div className="row g-0">
                                            <div className="col-md-6 tpct">
                                                <img src={elements.recipe.image} className="img-fluid rounded-start tpkci" style={{height: "90%"}} alt="castle"/>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="card-body pcardb">
                                                    <h5 className="card-title tpkct"><a href={elements.recipe.url} className='mtlb'>{elements.recipe.label}</a></h5><br /><br />
                                                    <p className="card-text really-small text-capitalize"><small className="text-muted tpkcp"><b>{category}</b> / {elements.recipe.dishType}</small></p>
                                                </div>
                                            </div>
                                            <div className="col-md-1">
                                                <h2 className='arc-num'><b>{i+2}</b></h2>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="row advertisement" id='advertisement'>
                        <p id='advert'>Advertisement</p> 
                    </div>
                </div>
            </div>
        }
        </div>
    )
}