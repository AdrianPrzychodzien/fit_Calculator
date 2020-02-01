import React from 'react'
import { connect } from 'react-redux'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

const Chart = ({ userData }) => {
  const { weightGoal, dailyWeightArray } = userData

  let dailyWeights = dailyWeightArray.map(item => {
    return { day: item.date.slice(5, 10), weight: item.weight, goal: weightGoal }
  })

  const data = [...dailyWeights]

  const dialyMin = dailyWeightArray
    .reduce((min, b) => Math.min(min, b.weight), dailyWeightArray[0].weight)

  const dialyMax = dailyWeightArray
    .reduce((max, b) => Math.max(max, b.weight), dailyWeightArray[0].weight)

  const renderLineChart = (
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
        name="weight goal"
        type="monotone"
        dot={false}
        strokeWidth="2"
        dataKey="goal"
        stroke="red"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis unit="kg" domain={[
        dialyMin < weightGoal ? dialyMin - 2 : weightGoal - 2,
        dialyMax > weightGoal ? dialyMax + 2 : weightGoal + 2
      ]} />
      <Tooltip />
      <Legend verticalAlign="bottom" height={2} />
    </LineChart>
  )

  return renderLineChart
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Chart)