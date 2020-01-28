import React from 'react'
import { connect } from 'react-redux'

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const Chart = ({ userData }) => {
  const { weight, weightGoal, start, finish } = userData

  const data = [
    { name: start.slice(5, 10), uv: weight, pv: weightGoal },
    { name: 'Day 2', uv: weight + 10, pv: weightGoal },
    { name: 'Day 3', uv: weight - 10, pv: weightGoal },
    { name: finish, uv: 86, pv: weightGoal },
  ]

  const renderLineChart = (
    <LineChart width={350} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="red" />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  )

  return renderLineChart
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Chart)