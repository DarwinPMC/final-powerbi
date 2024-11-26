import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SalesChart = ({ sales }) => {
  if (!sales || sales.length === 0) {
    return <p>No hay datos para mostrar en los gráficos.</p>;
  }

  // Procesar los datos para los gráficos
  const months = [...new Set(sales.map((sale) => `${sale.mes}/${sale.anio}`))];
  const totalsByMonth = months.map((month) =>
    sales
      .filter((sale) => `${sale.mes}/${sale.anio}` === month)
      .reduce((acc, curr) => acc + curr.total, 0)
  );

  const years = [...new Set(sales.map((sale) => sale.anio))];
  const totalsByYear = years.map((year) =>
    sales.filter((sale) => sale.anio === year).reduce((acc, curr) => acc + curr.total, 0)
  );

  // Datos para el gráfico de barras (Ventas por Mes)
  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Ventas por Mes',
        data: totalsByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Datos para el gráfico de torta (Ventas por Año)
  const pieData = {
    labels: years,
    datasets: [
      {
        label: 'Porcentaje de Ventas por Año',
        data: totalsByYear,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'row', // Cambiar de columna a fila
      justifyContent: 'space-between', // Espaciado entre gráficos
      alignItems: 'center', // Alinear verticalmente
      gap: '20px', // Espaciado entre los gráficos
      padding: '30px', // Espaciado interior
    }}
  >
    {/* Gráfico de Barras */}
    <div style={{ flex: 1, maxWidth: '60%', height: '400px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Gráfico de Barras: Ventas por Mes</h2>
      <Bar data={barData} />
    </div>
  
    {/* Gráfico de Torta */}
    <div style={{ flex: 1, maxWidth: '30%', height: '400px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Gráfico de Torta: Ventas por Año</h2>
      <Pie data={pieData} />
    </div>
  </div>
  );
};

export default SalesChart;
