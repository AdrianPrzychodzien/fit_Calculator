import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Table
} from 'reactstrap';
import classnames from 'classnames';

import {
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle,
  ModerateCarb,
  LowCarb,
  HighCarb
} from '../../../util/equations';

import { State } from '../../../interfaces';

const Macronutrients = () => {
  const userData = useSelector((state: State) => state.data);
  const [activeTab, setActiveTab] = useState('Maintenance');

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { formula } = userData;

  const formulaOption =
    formula === 'MifflinStJeor'
      ? MifflinStJeor(userData)
      : formula === 'HarrisBenedict'
      ? HarrisBenedict(userData)
      : KatchMcardle(userData);

  const kcalAmount =
    activeTab === 'Maintenance'
      ? formulaOption
      : activeTab === 'Cutting'
      ? formulaOption - 500
      : formulaOption + 500;

  const [proteinModerate, carbsModerate, fatsModerate] = ModerateCarb(
    kcalAmount
  );
  const [proteinLow, carbsLow, fatsLow] = LowCarb(kcalAmount);
  const [proteinHigh, carbsHigh, fatsHigh] = HighCarb(kcalAmount);

  return (
    <div>
      <Nav tabs className='d-flex justify-content-center'>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'Maintenance' })}
            onClick={() => {
              toggle('Maintenance');
            }}
          >
            Maintenance
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'Cutting' })}
            onClick={() => {
              toggle('Cutting');
            }}
          >
            Cutting
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'Bulking' })}
            onClick={() => {
              toggle('Bulking');
            }}
          >
            Bulking
          </NavLink>
        </NavItem>
      </Nav>

      {/* Tab Content 1 - Maintenance */}
      <TabContent activeTab={activeTab}>
        <TabPane tabId='Maintenance'>
          <Row>
            <Col sm='12'>
              <p className='h6 text-center my-3'>
                These macronutrient values reflect your maintenance calories of{' '}
                {kcalAmount} kcal per day.
              </p>
            </Col>
          </Row>
          <Table>
            <thead className='text-center'>
              <tr>
                <th>Macro</th>
                <th>Medium Carb</th>
                <th>Low Carb</th>
                <th>High Carb</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td>Protein</td>
                <td>{proteinModerate}g</td>
                <td>{proteinLow}g</td>
                <td>{proteinHigh}g</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{carbsModerate}g</td>
                <td>{carbsLow}g</td>
                <td>{carbsHigh}g</td>
              </tr>
              <tr>
                <td>Fats</td>
                <td>{fatsModerate}g</td>
                <td>{fatsLow}g</td>
                <td>{fatsHigh}g</td>
              </tr>
            </tbody>
          </Table>
        </TabPane>

        {/* Tab Content 2 - Cutting */}
        <TabPane tabId='Cutting'>
          <Row>
            <Col sm='12'>
              <p className='h6 text-center my-3'>
                These macronutrient values reflect your maintenance calories of{' '}
                {kcalAmount} kcal per day, which is a 500 calories deficit.
              </p>
            </Col>
          </Row>
          <Table>
            <thead className='text-center'>
              <tr>
                <th>Macro</th>
                <th>Medium Carb</th>
                <th>Low Carb</th>
                <th>High Carb</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td>Protein</td>
                <td>{proteinModerate}g</td>
                <td>{proteinLow}g</td>
                <td>{proteinHigh}g</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{carbsModerate}g</td>
                <td>{carbsLow}g</td>
                <td>{carbsHigh}g</td>
              </tr>
              <tr>
                <td>Fats</td>
                <td>{fatsModerate}g</td>
                <td>{fatsLow}g</td>
                <td>{fatsHigh}g</td>
              </tr>
            </tbody>
          </Table>
        </TabPane>

        {/* Tab Content 3 - Bulking */}
        <TabPane tabId='Bulking'>
          <Row>
            <Col sm='12'>
              <p className='h6 text-center my-3'>
                These macronutrient values reflect your maintenance calories of{' '}
                {kcalAmount} kcal per day, which is a 500 calories surplus.
              </p>
            </Col>
          </Row>
          <Table>
            <thead className='text-center'>
              <tr>
                <th>Macro</th>
                <th>Medium Carb</th>
                <th>Low Carb</th>
                <th>High Carb</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td>Protein</td>
                <td>{proteinModerate}g</td>
                <td>{proteinLow}g</td>
                <td>{proteinHigh}g</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{carbsModerate}g</td>
                <td>{carbsLow}g</td>
                <td>{carbsHigh}g</td>
              </tr>
              <tr>
                <td>Fats</td>
                <td>{fatsModerate}g</td>
                <td>{fatsLow}g</td>
                <td>{fatsHigh}g</td>
              </tr>
            </tbody>
          </Table>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Macronutrients;
