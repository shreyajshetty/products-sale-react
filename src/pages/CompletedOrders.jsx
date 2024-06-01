import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const CompletedOrders = ({ orders }) => {
  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order Name</Th>
            <Th>Customer</Th>
            <Th>SKU</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Invoice Date</Th>
            <Th>Invoice Number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => (
            <Tr key={index}>
              <Td>{order.orderName}</Td>
              <Td>{order.customer_id}</Td>
              <Td>{order.sku_id}</Td>
              <Td>{order.price}</Td>
              <Td>{order.quantity}</Td>
              <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
              <Td>{order.invoice_no}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedOrders;
