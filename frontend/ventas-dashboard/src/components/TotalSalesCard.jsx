import React from 'react';
import { Card } from 'antd';

const TotalSalesCard = ({ totalSales }) => {
  return (
    <Card
      style={{
        width: 200,
        margin: '20px auto',
        textAlign: 'center',
        backgroundColor: '#45f5',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3>Total de Ventas</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#45f' }}>
        ${totalSales.toLocaleString()}
      </p>
    </Card>
  );
};

export default TotalSalesCard;
