import { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import GenericInput from './GenericInput';
import { Broker, NewBrokerInfo } from '../../types';

type AddBrokerModalProps = {
  open: boolean;
  handleClose: () => void;
  setSelectedBroker: React.Dispatch<React.SetStateAction<Broker | null>>;
};

const postNewBroker = async (newBrokerInfo: NewBrokerInfo): Promise<Broker> => {
  const response = await fetch('/api/brokers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBrokerInfo),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const AddBrokerModal = ({
  open,
  handleClose,
  setSelectedBroker,
}: AddBrokerModalProps) => {
  const [newBrokerInfo, setNewBrokerInfo] = useState<NewBrokerInfo>({
    name: '',
    address: '',
    city: '',
    country: '',
  });

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: postNewBroker,
    onSuccess: (data: Broker) => {
      handleClose();
      setSelectedBroker(data);
    },
  });

  useEffect(() => {
    if (data) {
      setNewBrokerInfo({ name: '', address: '', city: '', country: '' });
    }
  }, [data]);

  const handleChange =
    (field: keyof NewBrokerInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewBrokerInfo({ ...newBrokerInfo, [field]: e.target.value });
    };

  const handleSave = () => {
    if (
      newBrokerInfo.name &&
      newBrokerInfo.address &&
      newBrokerInfo.city &&
      newBrokerInfo.country
    ) {
      mutate(newBrokerInfo);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-broker-modal-title"
      aria-describedby="add-broker-modal-description"
    >
      <Box sx={addBrokerModalBoxStyleProps}>
        <Box sx={addbrokerModalTitleStyleProps}>
          <Typography
            variant="h6"
            sx={cardTitleTypographyStyleProps}
            id="add-broker-modal-title"
          >
            Add manually
          </Typography>
        </Box>
        <Box
          component="form"
          sx={modalContentStyleProps}
          noValidate
          autoComplete="off"
        >
          <Box sx={modalInputContainerStyleProps}>
            <GenericInput
              label="Legal Name"
              ariaLabel="Enter Legal Name"
              id="modal-legal-name-input"
              onChange={handleChange('name')}
              value={newBrokerInfo.name}
            />
            <GenericInput
              label="Address"
              ariaLabel="Enter Address"
              id="modal-address-input"
              onChange={handleChange('address')}
              value={newBrokerInfo.address}
            />
            <GenericInput
              label="City"
              ariaLabel="Enter City"
              id="modal-city-input"
              onChange={handleChange('city')}
              value={newBrokerInfo.city}
            />
            <GenericInput
              label="Country"
              ariaLabel="Enter Country"
              id="modal-country-input"
              onChange={handleChange('country')}
              value={newBrokerInfo.country}
            />
          </Box>
        </Box>
        {error && <Typography color="error">Error: {error.message}</Typography>}
        <Box sx={modalFooterStyleProps}>
          <Button
            variant="text"
            sx={{ color: '#757575' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#26BAD4' }}
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const addBrokerModalBoxStyleProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '753px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

const addbrokerModalTitleStyleProps = { padding: '16px 24px', height: '64px' };

const cardTitleTypographyStyleProps = {
  fontFamily: 'Roboto',
  fontSize: '24px',
  fontWeight: '500',
  lineHeight: '32px',
  letterSpacing: '0.15000000596046448px',
  textAlign: 'left',
};

const modalContentStyleProps = {
  padding: '8px 24px',
};

const modalInputContainerStyleProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
};

const modalFooterStyleProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '8px',
  padding: '8px 24px 24px 24px',
};

export default AddBrokerModal;
