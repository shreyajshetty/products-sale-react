import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderModal = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: defaultValues || {}
  });
  const toast = useToast();

  useEffect(() => {
    if (defaultValues) {
      setValue('customer_id', defaultValues.customer_id);
      setValue('sku_id', defaultValues.sku_id);
      setValue('price', defaultValues.price);
      setValue('quantity', defaultValues.quantity);
      setValue('invoice_date', new Date(defaultValues.invoice_date));
      setValue('invoice_no', defaultValues.invoice_no);
    }
  }, [defaultValues, setValue]);

  const handleFormSubmit = data => {
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(data);
      toast({
        title: "Sale order created.",
        description: "Your sale order has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      onClose();
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{defaultValues ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="sale-order-form" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl isInvalid={errors.customer_id} isRequired>
              <FormLabel>Customer ID</FormLabel>
              <Input
                placeholder="Customer ID"
                {...register('customer_id', { required: 'Customer ID is required' })}
              />
            </FormControl>
            <FormControl isInvalid={errors.sku_id} isRequired>
              <FormLabel>SKU ID</FormLabel>
              <Input
                placeholder="SKU ID"
                {...register('sku_id', { required: 'SKU ID is required' })}
              />
            </FormControl>
            <FormControl isInvalid={errors.price} isRequired>
              <FormLabel>Price</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="Price"
                  {...register('price', { required: 'Price is required' })}
                />
              </NumberInput>
            </FormControl>
            <FormControl isInvalid={errors.quantity} isRequired>
              <FormLabel>Quantity</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="Quantity"
                  {...register('quantity', { required: 'Quantity is required' })}
                />
              </NumberInput>
            </FormControl>
            <FormControl isInvalid={errors.invoice_date} isRequired>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                control={control}
                name="invoice_date"
                rules={{ required: 'Invoice date is required' }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="MM/dd/yyyy"
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Invoice Number</FormLabel>
              <Input placeholder="Invoice Number" {...register('invoice_no')} />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" form="sale-order-form">
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
