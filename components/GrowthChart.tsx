import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { SimulationPoint } from '../types';

interface GrowthChartProps {
  data: SimulationPoint[];
}

const formatCurrencyShort = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
};

export const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Yıl', position: 'insideBottomRight', offset: -5 }} 
            tick={{fontSize: 12}}
            stroke="#94a3b8"
          />
          <YAxis 
            tickFormatter={formatCurrencyShort} 
            stroke="#94a3b8"
            tick={{fontSize: 12}}
          />
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value)}
            labelFormatter={(label) => `Yıl: ${label}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{paddingTop: '20px'}}/>
          <Area 
            type="monotone" 
            dataKey="totalSavings" 
            name="Toplam Birikim" 
            stackId="1" 
            stroke="#16a34a" 
            fill="#22c55e" 
            fillOpacity={0.6} 
          />
          <Area 
            type="monotone" 
            dataKey="totalPrincipal" 
            name="Sizin Yatırdığınız" 
            stackId="2" 
            stroke="#3b82f6" 
            fill="#60a5fa" 
            fillOpacity={0.4} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};