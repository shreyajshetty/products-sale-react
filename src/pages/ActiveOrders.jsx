import React, { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const ActiveOrders = ({ orders }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleEdit = (orderId) => {
    setEditingId(orderId);
    const orderToEdit = orders.find((order) => order.id === orderId);
    setEditedValues({ ...orderToEdit });
  };

  const handleSave = (orderId) => {
    
    console.log(`Saving order with ID: ${orderId}`);
    console.log("Edited Values:", editedValues);
    setEditingId(null);
    setEditedValues({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValues({});
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  };

  const isEditing = (orderId) => {
    return orderId === editingId;
  };

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
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>
                {isEditing(order.id) ? (
                  <input
                    value={editedValues.orderName ?? order.orderName}
                    onChange={(e) => handleInputChange(e, 'orderName')}
                  />
                ) : (
                  order.orderName
                )}
              </Td>
              <Td>
                {isEditing(order.id) ? (
                  <input
                    value={editedValues.customer_id ?? order.customer_id}
                    onChange={(e) => handleInputChange(e, 'customer_id')}
                  />
                ) : (
                  order.customer_id
                )}
              </Td>
              <Td>
                {isEditing(order.id) ? (
                  <input
                    value={editedValues.sku_id ?? order.sku_id}
                    onChange={(e) => handleInputChange(e, 'sku_id')}
                  />
                ) : (
                  order.sku_id
                )}
              </Td>
              <Td>
                {isEditing(order.id) ? (
                  <input
                    value={editedValues.price ?? order.price}
                    onChange={(e) => handleInputChange(e, 'price')}
                  />
                ) : (
                  order.price
                )}
              </Td>
              <Td>
                {isEditing(order.id) ? (
                  <input
                    value={editedValues.quantity ?? order.quantity}
                    onChange={(e) => handleInputChange(e, 'quantity')}
                  />
                ) : (
                  order.quantity
                )}
              </Td>
              <Td>
                {isEditing(order.id) ? (
                  <input
                    type="date"
                    value={editedValues.invoice_date ? formatDate(editedValues.invoice_date) : formatDate(order.invoice_date)}
                    onChange={(e) => handleInputChange(e, 'invoice_date')}
                  />
                ) : (
                  new Date(order.invoice_date).toLocaleDateString()
                )}
              </Td>
              <Td>
                {isEditing(order.id) ? (
                  <input
                    value={editedValues.invoice_no ?? order.invoice_no}
                    onChange={(e) => handleInputChange(e, 'invoice_no')}
                  />
                ) : (
                  order.invoice_no
                )}
              </Td>
              <Td>
                {isEditing(order.id) ? (
                  <>
                    <IconButton aria-label="Save" icon={<CheckIcon />} onClick={() => handleSave(order.id)} />
                    <IconButton aria-label="Cancel" icon={<CloseIcon />} onClick={handleCancel} />
                  </>
                ) : (
                  <IconButton aria-label="Edit" icon={<EditIcon />} onClick={() => handleEdit(order.id)} />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveOrders;
