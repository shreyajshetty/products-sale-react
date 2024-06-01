import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { MultiSelect } from 'chakra-multiselect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: defaultValues || {}
  });

  return (
    <Box p={4} maxWidth="400px" mx="auto" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.orderName}>
          <FormLabel>Order Name</FormLabel>
          <Input
            type="text"
            {...register("orderName", { required: "Order Name is required" })}
          />
          <FormErrorMessage>{errors.orderName && errors.orderName.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.quantity}>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            {...register("quantity", { required: "Quantity is required" })}
          />
          <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.invoiceDate}>
          <FormLabel>Invoice Date</FormLabel>
          <DatePicker
            selected={defaultValues?.invoiceDate || new Date()}
            onChange={(date) => setValue("invoiceDate", date)}
            dateFormat="MM/dd/yyyy"
          />
          <FormErrorMessage>{errors.invoiceDate && errors.invoiceDate.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Products</FormLabel>
          <MultiSelect
            options={[{ value: 'product1', label: 'Product 1' }, { value: 'product2', label: 'Product 2' }]}
            placeholder="Select products"
          />
        </FormControl>
        <Button mt={4} type="submit" colorScheme="teal">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SaleOrderForm;
