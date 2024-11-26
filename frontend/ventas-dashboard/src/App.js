import React, { useState, useEffect } from 'react';
import TotalSalesCard from './components/TotalSalesCard';
import SalesChart from './components/SalesChart';
import api from './api/axios';
import { Select, Row, Col } from 'antd';

const { Option } = Select;

const App = () => {
  const [filters, setFilters] = useState({
    month: null,
    year: null,
    genero: null,
    medio: null,
    ciudad: null,
  });
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const [generos, setGeneros] = useState([]);
  const [medios, setMedios] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const generoResponse = await api.get('/dimensions/products');
        setGeneros([...new Set(generoResponse.data.map((product) => product.genero))]);

        const medioResponse = await api.get('/dimensions/channels');
        setMedios([...new Set(medioResponse.data.map((medio) => medio.nombre))]);

        const clienteResponse = await api.get('/dimensions/clients');
        setCiudades([...new Set(clienteResponse.data.map((client) => client.ciudad_casa))]);
      } catch (error) {
        console.error('Error al cargar los datos de filtros:', error);
      }
    };

    fetchFiltersData();
  }, []);

  useEffect(() => {
    const fetchFilteredSales = async () => {
      try {
        const response = await api.get('/sales/');
        const sales = response.data;

        const filteredSales = sales.filter((sale) => {
          const matchMonth = filters.month ? sale.mes === filters.month : true;
          const matchYear = filters.year ? sale.anio === filters.year : true;
          const matchGenero = filters.genero ? sale.genero === filters.genero : true;
          const matchMedio = filters.medio ? sale.nombre_medio === filters.medio : true;
          const matchCiudad = filters.ciudad ? sale.ciudad_casa === filters.ciudad : true;
          return matchMonth && matchYear && matchGenero && matchMedio && matchCiudad;
        });

        setFilteredSales(filteredSales);

        const total = filteredSales.reduce((acc, sale) => acc + sale.total, 0);
        setTotalSales(total);
      } catch (error) {
        console.error('Error al obtener las ventas filtradas:', error);
      }
    };

    fetchFilteredSales();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column'   }}>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 'bold' }}>Dashboard de Ventas</h2>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Inicio</a></li>
          <li><a href="/acerca" style={{ color: '#fff', textDecoration: 'none' }}>Acerca</a></li>
          <li><a href="/contacto" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</a></li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div style={{ padding: '30px', flex: 1, backgroundColor: '#f9f9f9' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Dashboard de Ventas
        </h1>

        {/* Filtros */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <Select
            placeholder="Seleccionar Mes"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange('month', value)}
            allowClear
          >
            <Option value={1}>Enero</Option>
            <Option value={2}>Febrero</Option>
            <Option value={3}>Marzo</Option>
            <Option value={4}>Abril</Option>
            <Option value={5}>Mayo</Option>
            <Option value={6}>Junio</Option>
            <Option value={7}>Julio</Option>
            <Option value={8}>Agosto</Option>
            <Option value={9}>Septiembre</Option>
            <Option value={10}>Octubre</Option>
            <Option value={11}>Noviembre</Option>
            <Option value={12}>Diciembre</Option>
          </Select>
          <Select
            placeholder="Seleccionar Año"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange('year', value)}
            allowClear
          >
            <Option value={2021}>2021</Option>
            <Option value={2022}>2022</Option>
            <Option value={2023}>2023</Option>
            <Option value={2024}>2024</Option>
            <Option value={2025}>2025</Option>
          </Select>
          <Select
            placeholder="Seleccionar Género"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange('genero', value)}
            allowClear
          >
            {generos.map((genero) => (
              <Option key={genero} value={genero}>
                {genero}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Seleccionar Medio"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange('medio', value)}
            allowClear
          >
            {medios.map((medio) => (
              <Option key={medio} value={medio}>
                {medio}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Seleccionar Ciudad"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange('ciudad', value)}
            allowClear
          >
            {ciudades.map((ciudad) => (
              <Option key={ciudad} value={ciudad}>
                {ciudad}
              </Option>
            ))}
          </Select>
        </div>

        {/* Contenido */}
        <Row gutter={[16, 16]}>
          {/* Tarjeta con el total de ventas */}
          <Col xs={24} sm={24} md={8}>
            <TotalSalesCard totalSales={totalSales} />
          </Col>

          {/* Gráfico de Barras */}
          <Col xs={24} sm={24} md={16}>
            <SalesChart sales={filteredSales} />
          </Col>
        </Row>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#f8f9fa',
          padding: '10px 20px',
          textAlign: 'center',
          borderTop: '1px solid #ddd',
        }}
      >
        <p style={{ margin: 0 }}>© 2024 Dashboard de Ventas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
