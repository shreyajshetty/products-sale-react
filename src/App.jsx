import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider, Box, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useDisclosure } from '@chakra-ui/react';
import ActiveOrders from './pages/ActiveOrders';
import CompletedOrders from './pages/CompletedOrders';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';
import ThemeToggle from './components/ThemeToggle';
import SaleOrderModal from './components/SaleOrderModal';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orders, setOrders] = useState([]);

  const handleSaleOrderSubmit = (data) => {
    setOrders((prevOrders) => [...prevOrders, data]);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <ThemeToggle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Box>
                  <Tabs>
                    <TabList>
                      <Tab>Active Orders</Tab>
                      <Tab>Completed Orders</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Button colorScheme="teal" onClick={onOpen}>+ Sale Order</Button>
                        <SaleOrderModal isOpen={isOpen} onClose={onClose} onSubmit={handleSaleOrderSubmit} />
                        <ErrorBoundary>
                          <ActiveOrders orders={orders} />
                        </ErrorBoundary>
                      </TabPanel>
                      <TabPanel>
                        <ErrorBoundary>
                          <CompletedOrders orders={orders} />
                        </ErrorBoundary>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};

export default App;
