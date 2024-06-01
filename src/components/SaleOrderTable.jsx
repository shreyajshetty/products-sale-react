import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';

const SaleOrderTable = ({ orders, onEdit }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Customer ID</Th>
          <Th>SKU ID</Th>
          <Th>Price</Th>
          <Th>Quantity</Th>
          <Th>Invoice No</Th>
          <Th>Invoice Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order, index) => (
          <Tr key={index}>
            <Td>{order.customer_id}</Td>
            <Td>{order.items[0].sku_id}</Td>
            <Td>{order.items[0].price}</Td>
            <Td>{order.items[0].quantity}</Td>
            <Td>{order.invoice_no}</Td>
            <Td>{order.invoice_date}</Td>
            <Td>
              <Button onClick={() => onEdit(order)}>Edit</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SaleOrderTable;
