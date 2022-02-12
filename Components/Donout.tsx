import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Donout extends React.Component{

  render() {
  
  console.log(this.props.data)
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={this.props.data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        innerRadius={25}
        outerRadius={80}
        fill="#8884d8"
        dataKey="count"
      >
         
        {this.props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="middle" align="right" layout="vertical" height={36} 
      onClick={(e:any)=>{
        console.log(e);
      }}/>
      <Tooltip />
    </PieChart>
  );
}
}
