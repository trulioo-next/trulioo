import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Link from 'next/link';
import Error from 'next/error';

import SectionMaker from '@/components/SectionMaker';
import NewsroomArticle from '@/components/NewsroomArticle';
import Layout from '@/containers/Layout/Layout';
import Header from '@/components/Header/Header';

import './Newsroom.scss';

import { reqNewsroomDataAction } from "@/stores/newsroom/actions";
import { newsroomDataSelector } from "@/stores/newsroom/selectors";


const Page = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const backToNewsroomHref = '/news-and-events';

  let post = null;
  let morePosts = [];

  const dispatch = useDispatch();
  useEffect(() => {
    const slug = props.query.slug;
    dispatch(reqNewsroomDataAction({ payload: slug }));
  }, [props.query.slug]);

  const data = useSelector(state => newsroomDataSelector(state));

  if (data)
  { if (data.post)
    { post = {...data.post};
    }
    if (data.morePosts)
    { morePosts = [...data.morePosts];
    }
  }

  return (
    <Layout>
      <Header title="Newsroom" />
      <div className="ContentContainer">
          <LeftPanel backToNewsroomHref={backToNewsroomHref} />
        { post && 
            <div className="NewsroomPost__page">
            <NewsroomArticle
                post={ {...post} }
            />
            </div>
        }

        <div className="NewsroomPost__more">
            <h3>More Stories</h3>
            {morePosts && 
              <SectionMaker
                type="section_newsroom_grid"
                params={ {
                    posts: [...morePosts],
                    isMorePosts: true,
                    numPerPage: 4,
                    canLoadMore: true
                  } }
                sectionIndex="newsroomMoreSection"
              />
            }
        </div>
      </div>
    </Layout>
  );
};


const LeftPanel = props => {

  return (
    <div className="LeftPanel">
      <BackToNewsroom backToNewsroomHref={props.backToNewsroomHref} />
    </div>
  )
}


const BackToNewsroom = props => {
  return (
    <Link href="/news-and-events" as={props.backToNewsroomHref}><a className="backToNewsroomLink"><span className="chevron">&lt;</span><span className="">Back to Newsroom</span></a></Link>
  )
}


Page.getInitialProps = async ({ query, res }) => {
  return { query };
};

export default Page;