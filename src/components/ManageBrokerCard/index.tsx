import { useRef, useMemo, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Popper, Link, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import BrokerList from './BrokerList';
import BrokerCardInfoSection from './BrokerCardInfoSection';
import AddBrokerModal from './AddBrokerModal';
import GenericInput from './GenericInput';
import { Broker } from '../../types';

const fetchBrokers = async (searchQuery: string): Promise<Broker[]> => {
  const response = await fetch(`/api/brokers?q=${searchQuery}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ManageBrokerCard = () => {
  const [brokerName, setBrokerName] = useState('');
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    if (selectedBroker) {
      setBrokerName(selectedBroker.name);
      inputRef.current!.value = selectedBroker.name;
    }
  }, [selectedBroker]);

  const debouncedSetQuery = useMemo(
    () =>
      debounce((searchQuery: string) => {
        setBrokerName(searchQuery);
      }, 300),
    []
  );

  const {
    data: brokers = [],
    isLoading,
    isFetching,
    error,
    isFetched,
  } = useQuery({
    queryKey: ['brokers', brokerName],
    queryFn: () => fetchBrokers(brokerName),
    enabled: !!brokerName && brokerName.length > 0 && !selectedBroker,
  });

  const queryActiveBoolean = isLoading || isFetching || isFetched || !!error;

  return (
    <Card sx={{ width: 820 }}>
      <CardHeader
        title="Manage Broker"
        titleTypographyProps={cardTitleTypographyStyleProps}
        subheader="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        subheaderTypographyProps={cardSubheaderTypographyStyleProps}
      />
      <CardContent sx={cardContentStyleProps}>
        <GenericInput
          label="Name"
          ariaLabel="Search Broker"
          id="broker-name-input"
          onChange={(e) => {
            if (selectedBroker) {
              setSelectedBroker(null);
            }
            debouncedSetQuery(e.target.value);
            setPopperOpen(e.target.value.length > 0);
            setAnchorEl(inputRef.current);
          }}
          inputRef={inputRef}
          showSearchIcon={true}
        />
        <Popper
          open={popperOpen && !selectedBroker && queryActiveBoolean}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={popperStyleProps}
        >
          <div style={popperInnerStyleProps}>
            <BrokerList
              brokers={brokers}
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              setSelectedBroker={setSelectedBroker}
            />
            <Box sx={{ display: 'flex', ml: '16px' }}>
              <Typography
                typography={cardFooterTypographyStyleProps}
                sx={{ mr: 0.5 }}
              >
                or
              </Typography>
              <Link
                component="button"
                onClick={handleOpenModal}
                sx={cardFooterTypographyStyleProps}
              >
                Add broker manually
              </Link>
            </Box>
          </div>
        </Popper>
        <AddBrokerModal
          open={modalOpen}
          handleClose={handleCloseModal}
          setSelectedBroker={setSelectedBroker}
        />
        {selectedBroker && (
          <>
            <BrokerCardInfoSection
              brokerInfoTitle="Address"
              brokerInfoText={`${selectedBroker.address}, ${selectedBroker.city}`}
            />
            <BrokerCardInfoSection
              brokerInfoTitle="Country"
              brokerInfoText={selectedBroker.country}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

const cardTitleTypographyStyleProps = {
  fontSize: '24px',
  lineHeight: '32.02px',
};

const cardSubheaderTypographyStyleProps = {
  fontSize: '14px',
  lineHeight: '20.02px',
  letterSpacing: '0.17000000178813934px',
};

const cardContentStyleProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const cardFooterTypographyStyleProps = {
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '21px',
  letterSpacing: '0.15000000596046448px',
  textAlign: 'left',
  color: 'black',
};

const popperStyleProps = {
  width: '769px',
  borderRadius: '4px',
  paddingTop: '8px',
  boxShadow: '0px 8px 10px 1px #00000024, 0px 5px 5px -3px #00000033',
};

const popperInnerStyleProps = {
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '8px',
  width: '100%',
};

export default ManageBrokerCard;
