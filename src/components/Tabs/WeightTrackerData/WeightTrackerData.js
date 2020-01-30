import React, { useState } from 'react'
import { connect } from 'react-redux'

import Chart from '../../Chart/Chart'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table } from 'reactstrap'
import classnames from 'classnames'

import { rangeBMIColor } from '../../../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faEquals } from '@fortawesome/free-solid-svg-icons'

const WeightTrackerData = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('History')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const { dailyWeightArray, height, start, finish } = userData

  let myDateFormat = date => {
    let d = new Date(date)
    let currDay = d.getDay()
    let currDate = d.getDate()
    let currMonth = d.getMonth() + 1
    let currYear = d.getFullYear()
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return `${days[currDay]}, ${currDate}-${currMonth}-${currYear} `
  }


  const historyItems = dailyWeightArray
    .slice(0)
    .reverse()
    .map((item, index) => {
      const itemBMI = (item.weight / ((height / 100) * (height / 100))).toFixed(2)

      let el = dailyWeightArray.slice(0).reverse()

      const icon = (index + 1) < dailyWeightArray.length && (
        item.weight - el[index + 1].weight > 0
          ? faArrowUp : item.weight - el[index + 1].weight < 0
            ? faArrowDown : faEquals
      )

      return (
        <tr key={item.id}>
          <td>{item.date}</td>
          <td>{item.weight} kg</td>
          <td style={{ color: rangeBMIColor(itemBMI), fontWeight: 'bold' }}>{itemBMI}</td>
          <td style={{ color: rangeBMIColor(itemBMI) }}>
            {icon && <FontAwesomeIcon className="" icon={icon} />}
          </td>
        </tr>
      )
    })

  return (
    <div>
      <Nav tabs className="d-flex justify-content-center">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'Chart' })}
            onClick={() => { toggle('Chart') }}
          >
            Chart
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'History' })}
            onClick={() => { toggle('History') }}
          >
            History
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'Bulking' })}
            onClick={() => { toggle('Bulking'); }}
          >
            Bulking
          </NavLink>
        </NavItem>
      </Nav>

      {/* Tab Content 1 - Chart */}
      <TabContent activeTab={activeTab}>
        <TabPane tabId="Chart">
          <Row>
            <Col sm="12">
              <p className="h6 text-center my-3">
                Start day was on {myDateFormat(start)} <br />
                Finish will be on {myDateFormat(finish)}
              </p>
            </Col>
          </Row>

          <Chart />
        </TabPane>

        {/* Tab Content 2 - History */}
        <TabPane tabId="History">
          <Row>
            <Col sm="12">
              <p className="h6 text-center my-3">
                Check your weight log
                </p>
            </Col>
          </Row>
          <Table>
            <thead className="text-center">
              <tr>
                <th>Date</th>
                <th>Weight</th>
                <th>BMI</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {historyItems}
            </tbody>
          </Table>
        </TabPane>

        {/* Tab Content 3 - Bulking */}
        <TabPane tabId="Bulking">
          <Row>
            <Col sm="12">
              <p className="h6 text-center my-3">
                These macronutrient values reflect your maintenance calories
                of  kcal per day, which is +500 calories
                from your maintenance.
                </p>
            </Col>
          </Row>
          <Table>
            <thead className="text-center">
              <tr>
                <th>Macro</th>
                <th>Medium Carb</th>
                <th>Low Carb</th>
                <th>High Carb</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>Protein</td>
              </tr>
              <tr >
                <td>Carbs</td>
              </tr>
              <tr >
                <td>Fats</td>
              </tr>
            </tbody>
          </Table>
        </TabPane>
      </TabContent>
    </div>
  )
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(WeightTrackerData)