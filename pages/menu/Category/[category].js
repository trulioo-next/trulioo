import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Layout from '@/containers/Layout';
import Header from '@/components/Header';
import Button from '@/components/Button';
import appActions from '@/stores/nutritionals/actions';
import userSelectors from '@/stores/user/selectors';
import menuSelectors from '@/stores/nutritionals/selectors';
import SectionMaker from '../../../components/SectionMaker';
import Hero from '@/components/Hero';
import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';
import SectionPostGrid from '@/components/SectionComponents/SectionPostGrid';

import './Category.scss';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
 
  }

  static async getInitialProps({ isServer, store, res, req}) {
    let category = res.req.params.category ? res.req.params.category : false

    
    let { nutritionals } = store.getState()
    console.log('SLUG nutritionals ', nutritionals.taxonomies  )

    let taxonomyData = [];
    if(nutritionals && nutritionals.taxonomies) {
      for(var i = 0; i < nutritionals.taxonomies.length; i++ ) {
        if(nutritionals.taxonomies[i].slug === category) {
          taxonomyData = nutritionals.taxonomies[i]
        }
      }
    }
    return { category, taxonomyData };
  }

  componentDidMount() {
    this.props.getTheData();
   
  }
  componentDidUpdate() {}

  //
  render() {

    let { data, category, taxonomyData } = this.props
    let headerTitle = "Menu | " + taxonomyData.name 
    let pageTitle = taxonomyData.name
    let headerImage = taxonomyData.banner_image ? taxonomyData.banner_image.url : "/static/images/placeholders/Pizza_Hero.jpg";
    // console.log(' taxonomy component data ::>> ', taxonomyData )

    return (
      <Layout>
        <Header title={headerTitle} />
        <section className="Section">
          <Hero src={ headerImage }>
            <Hero.Title title={pageTitle} color="#FFF" shadow />
          </Hero>
        </section>
        <div className="Menu__page">

        { taxonomyData.components &&
          taxonomyData.components.map((section, sectionKey) => (
          <SectionMaker
            type={section.acf_fc_layout}
            params={section}
            category={category}
            key={sectionKey}
            sectionIndex={sectionKey}
          />
        ))
        }


          <ColumnSpread spread="3">
            <MediaObjectCard
              title="New York Deli Meat Lover's"
              image="/static/images/placeholders/NewYorkDeliMeatLovers.png"
              product={{ href: '/menu/pizza/meat-lovers', calories: 20 }}
              stacked
              pizza
            >
              Loaded with hand-pinched sausage, diced pepperoni and ham, our New
              York Deli Meat Lover’s Pizza also satisfies with fire roasted red
              onions and sweet and savoury sauce for an authentic Italian style
              taste.
            </MediaObjectCard>
            <MediaObjectCard
              title="Classic Pepperoni"
              image="/static/images/placeholders/pepperoni.png"
              product={{ href: '/menu/pizza/pepperoni', calories: 20 }}
              stacked
              pizza
            >
              With classic sourdough for a crispy crust, a blend of 100%
              Canadian milk-made Mozzarella and Provolone topped with Montreal
              slow-cured pepperoni, it’s no wonder we call it a classic.
            </MediaObjectCard>
            <MediaObjectCard
              title="Cheese"
              image="/static/images/placeholders/cheese.png"
              product={{ href: '/menu/pizza/cheese', calories: 20 }}
              stacked
              pizza
            >
              Our hand-panned dough with authentic sourdough flavour and aroma
              is loaded with Mozzarella and Provolone made in Canada with 100%
              Canadian milk for a satisfying and delicious Italian inspired
              bite.
            </MediaObjectCard>
          </ColumnSpread>
          <ColumnSpread spread="2">
            <MediaObjectCard
              title="7-Eleven Coffee"
              image="/static/images/placeholders/Coffee.jpg"
              product={{
                href: '/menu/coffee-lattes/7-eleven-coffee',
                calories: 20,
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo
            </MediaObjectCard>
            <MediaObjectCard
              title="7-Eleven Coffee"
              image="/static/images/placeholders/Coffee.jpg"
              product={{
                href: '/menu/coffee-lattes/7-eleven-coffee',
                calories: 20,
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo
            </MediaObjectCard>
            <MediaObjectCard
              title="7-Eleven Coffee"
              image="/static/images/placeholders/Coffee.jpg"
              product={{
                href: '/menu/coffee-lattes/7-eleven-coffee',
                calories: 20,
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo
            </MediaObjectCard>
          </ColumnSpread>
          <ColumnSpread spread="3">
            <MediaObjectCard
              title="100% Canadian Wheat Crust"
              image="/static/images/placeholders/ColumnSpread2_Block1.jpg"
              stacked
            >
              <p>
                Our hand-stretched crust is Canadian-crafted using authentic
                Italian sourdough for a light &amp; crispy texture.
              </p>
            </MediaObjectCard>
            <MediaObjectCard
              title="Dry-cured Montréal Pepperoni"
              image="/static/images/placeholders/ColumnSpread2_Block2.jpg"
              stacked
            >
              <p>
                Traditionally slow-cured in Montréal, our mouth-watering
                pepperoni bursts with smokey, spicy flavours.
              </p>
            </MediaObjectCard>
            <MediaObjectCard
              title="100% Canadian Mozzarella, Parmesan &amp; Provolone Cheese"
              image="/static/images/placeholders/ColumnSpread2_Block3.jpg"
              stacked
            >
              <p>
                Made with all-Canadian dairy from Ontario and BC farms, our
                gooey cheese is all flavour.
              </p>
            </MediaObjectCard>
          </ColumnSpread>
        </div>
 
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelectors.userDataSelector(state),
  data: menuSelectors.taxonomiesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  getTheData: payload => dispatch(appActions.reqNutritionalsAction(payload)),
});

const Category_ = connect(mapStateToProps, mapDispatchToProps)(Category);

export default Category_;
