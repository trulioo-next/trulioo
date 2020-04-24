import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ListItemReward } from './items'

const Rewards = (rewardsKey) => {

    //TODO:: This value needs to come from the parent container
    const [tabKey, setTabKey] = useState(rewardsKey);

    return (
        <Tabs
            id="rewards-menu-tabs"
            activeKey={tabKey}
            onSelect={tabKey => setRewardsKey(tabKey)}>
            <Tab eventKey="tab1" title="1000 Points">
                <Container>
                    <Row>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="tab2" title="1500 Points">
                <Container>
                    <Row>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="tab3" title="2000 Points">
                <Container>
                    <Row>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="tab4" title="2750 Points">
                <Container>
                    <Row>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="tab5" title="4000 Points">
                <Container>
                    <Row>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="tab6" title="6000 Points">
                <Container>
                    <Row>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                        <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                        </Col>
                    </Row>
                </Container>
            </Tab>
        </Tabs>
    )
}

export default Rewards