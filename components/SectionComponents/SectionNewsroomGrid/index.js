import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import Container from 'react-bootstrap/Container';
import ColumnSpread from '@/components/ColumnSpread';
import NewsroomCard from '@/components/NewsroomCard';

import './SectionNewsroomGrid.scss';


const SectionNewsroomGrid = props => {
  let { posts, isFeature, isMorePosts, numPerPage, canLoadMore } = props;

  let columns = posts ? posts.length : 0;
  if(columns > 3 || !isFeature) {
    columns = 3;
  }
  if (isMorePosts)
  {  columns = 4;
  }

  const postsPerPage = numPerPage || 2;
  const [pageNum, setPageNum] = useState(0);

  const showLoadMoreButton = canLoadMore || false;

  useEffect(() => {
    setListPosts(getListPosts([...allPosts]));
  }, [pageNum]);


  const [allPosts, setAllPosts] = useState([]);
  const [listPosts, setListPosts] = useState([]);


  useEffect(() => {
    setAllPosts([...posts]);
    setListPosts(getListPosts([...posts]));
  }, [posts]);


  function getListPosts(postList)
  {  const limit = 0 + ((pageNum + 1) * postsPerPage);
     const posts = postList ? [...postList.slice(0, limit)] : [];
     return posts;
  }

  function nextPage()
  {  setPageNum(pageNum + postsPerPage);
  }

  function canShowLoadMoreButton()
  { return showLoadMoreButton && listPosts && listPosts.length < allPosts.length;
  }


  let columnClasses = classNames({'isFeature': isFeature}, {'isMorePosts': isMorePosts});

  return (
    <section className="Section SectionNewsroomGrid">
      <Container fluid className="px-0">
        <ColumnSpread spread={columns} className={columnClasses}>
          {listPosts && 
            listPosts.map((post, sectionKey) => (
              <NewsroomCard
                key={sectionKey}
                item={post}
                href={ '/newsroom/' + post.slug }
                isFeature={isFeature}
                isMorePosts={isMorePosts}
              />
            ))}
        </ColumnSpread>
      </Container>

      {canShowLoadMoreButton() && 
        <div className="loadMore">
          <a className="Button" onClick={() => nextPage() }>Load More</a>
        </div>
      }
    </section>
  );
};

SectionNewsroomGrid.defaultProps = {};

export default SectionNewsroomGrid;
