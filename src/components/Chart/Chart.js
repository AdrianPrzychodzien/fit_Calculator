import React from 'react'
import { connect } from 'react-redux'

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const Chart = ({ userData }) => {
  const { weightGoal, finish, dailyWeightArray } = userData

  let dailyWeights = dailyWeightArray.map(item => {
    return { day: item.date.slice(5, 10), weight: item.weight, weightGoal: weightGoal }
  })

  console.log(dailyWeights)

  const data = [
    dailyWeights[0],
    dailyWeights[1],
    { day: finish.slice(5, 10), weight: 86, weightGoal: weightGoal }
  ]

  const renderLineChart = (
    <LineChart width={350} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="weight" stroke="black" />
      <Line type="monotone" dataKey="weightGoal" stroke="red" />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
    </LineChart>
  )

  return renderLineChart
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Chart)