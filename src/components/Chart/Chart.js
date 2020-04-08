import React from 'react'
import { connect } from 'react-redux'

import WeightTrackerInfo from '../../components/Info/WeightTrackerInfo/WeightTrackerInfo'

import { healthyProgress } from '../../util/equations'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

const Chart = ({ userData }) => {
  const { weightGoal, dailyWeightArray } = userData

  const healthy = healthyProgress(userData)

  let healthyArr = healthy.map(item => {
    return {
      day: item.date.slice(5, 10),
      healthy: item.weight
    }
  })

  // Can add healthy property to specific object?? 
  const calcHealthyProperty = item => {
    let output
    for (let i = 0; i < healthyArr.length; i++) {
      if (healthyArr[i].day === item.date.slice(5, 10)) {
        output = healthyArr[i].healthy
      }
    }
    return output
  }

  let dailyWeights = dailyWeightArray.map(item => {
    return {
      day: item.date.slice(5, 10),
      weight: item.weight,
      goal: weightGoal,
      ...(calcHealthyProperty(item) && { healthy: calcHealthyProperty(item) })
    }
  })

  const data = [...dailyWeights]
  console.log(data);

  let arr = []

  data.slice(0).map((item, index) => {
    arr.push(item.day)
  })
  console.log(arr);

  const dialyMin = dailyWeightArray
    .reduce((min, b) => Math.min(min, b.weight), dailyWeightArray[0].weight)
  const dialyMax = dailyWeightArray
    .reduce((max, b) => Math.max(max, b.weight), dailyWeightArray[0].weight)

  const renderLineChart = (
    <>
      <LineChart width={350} height={200} data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line
          name="actual weight"
          type="monotone"
          dot={false}
          strokeWidth="2"
          dataKey="weight"
          stroke="black"
        />
        <Line
          name="goal"
          type="monotone"
          dot={false}
          strokeWidth="2"
          dataKey="goal"
          stroke="red"
        />
        <Line
          name="healthy trend"
          type="monotone"
          dot={false}
          strokeWidth="20"
          dataKey="healthy"
          stroke="green"
          connectNulls={true}
          opacity="0.4"
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis unit="kg" domain={[
          dialyMin < weightGoal ? dialyMin - 2 : weightGoal - 2,
          dialyMax > weightGoal ? dialyMax + 2 : weightGoal + 2
        ]} />
        <Legend verticalAlign="bottom" height={10} />
      </LineChart>
      <div className="d-flex justify-content-center">
        <WeightTrackerInfo />
      </div>
    </>
  )

  return renderLineChart
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Chart)