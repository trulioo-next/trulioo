import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router'
import Link from 'next/link';

import './SectionSearchResults.scss';
import SearchIcon from '@/static/images/search.svg';

import { reqSearchSiteDataAction } from "../../../stores/searchSite/actions";
import { searchSiteDataSelector } from "../../../stores/searchSite/selectors";


const SectionSearchResults = ({props, ...params}) => {

	let searchQuery = props && props.query && props.query.search;
	if (typeof searchQuery === 'undefined')
	{	searchQuery = '';
	}

	const [searchTerm, setSearchTerm] = useState(searchQuery);
	const [inputText, setInputText] = useState(searchTerm);
	const [isLoading, setIsLoading] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	const dispatch = useDispatch();

	const handleSearchChange = e => {
		setInputText(e.target.value)
	}
	const handleSearchSubmit = event => {
		event.preventDefault();
		setSearchTerm(inputText);
		// Router.push('/search?search=' + encodeURIComponent(inputText), undefined, { shallow: true });
	}

	useEffect(() => {
		doSearch(searchTerm, dispatch, setIsLoading);
	 }, []);

	 useEffect(() => {
		 doSearch(searchTerm, dispatch, setIsLoading);
	  }, [searchTerm]);


	const searchSiteData = useSelector(state => searchSiteDataSelector(state));

	useEffect(() => {
		if (searchSiteData)
		{  setSearchResults(searchSiteData.results)
		   setIsLoading(false);
		}
	 }, [searchSiteData]);

	return  (
		<div className="Search inner__copy">
			<SearchForm searchTerm={inputText}
						handleSearchChange={handleSearchChange}
						handleSearchSubmit={handleSearchSubmit} />
			<SearchResults
						isLoading={isLoading}
						searchTerm={''+searchTerm}
						results={((searchResults && Array.isArray(searchResults)) ? [...searchResults] : [])} />
		</div>
	)
};



const doSearch = (searchTerm, dispatch, setIsLoading) => {
	if (searchTerm && searchTerm.trim() !== '')
	{
		dispatch(reqSearchSiteDataAction({ payload: searchTerm }));
		setIsLoading(true);
	}
}



const SearchForm = ({searchTerm, handleSearchChange, handleSearchSubmit}) => {
	// --- Main CSS in NavBar.scss

	return (
		<form className="Search__form" onSubmit={handleSearchSubmit}>
			<div className="Search__inputGroup">
				<label htmlFor="searchInput" className="Search__icon">
                	<SearchIcon />
              	</label>
				<input type="text"
						id="searchInput"
						className="Search__input"
						placeholder="Search Site"
						value={searchTerm}
						onChange={handleSearchChange}
				/>
				<input
					type="submit"
					className="Search__submit Button"
					value="Search"
				/>
			</div>
		</form>
	);
}


const SearchResults = ({isLoading, searchTerm, results}) => {

	let resultType = 'loading';
	if (searchTerm !== '')
	{
		if (!isLoading && results && results.length > 0)
		{	resultType = 'found';
		}else if (!isLoading && results && results.length < 1)
		{	resultType = 'notFound';
		}
	}else
	{	resultType = 'noSearch';
	}

	return (
		<section className="Search__results">
			{resultType === 'loading' && 
				<div>
					Searching for "{searchTerm}"...
				</div>
			}
			{resultType === 'found' && 
				<div>
					<div className="Search__resultsSummary">
						Found {results.length} result{results.length !== 1 && 's'} for "{searchTerm}":
					</div>
					<div className="Search_resultsListing">
						{results && results.map((item, idx) => (
							<div key={idx} className="Search__resultsItem">
								<Link href={item.slug}><a>{getItemTitle(item)}</a></Link>
								<div className="Search__resultsExcerpt">
									{item.excerpt}
								</div>
							</div>
						))}
					</div>
				</div> 
			}
			{resultType === 'notFound' &&
				<div>
					No results found for "{searchTerm}".
				</div>
			}
		</section>
	);
}

const getItemTitle = ({...item}) => {
	
	let title = item.title;

	if (item.post_type === 'se_food' && item.category != '')
	{	title = item.category + ': ' + title;
	}

	return title;
}



//SectionSearchResults.defaultProps = {};
SectionSearchResults.getInitialProps = async ({ query, res }) => {
	return { query }
  };

export default SectionSearchResults;
