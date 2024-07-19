import { useRef, useMemo, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Popper, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import SearchBrokerInput from './SearchBrokerInput';
import BrokerList from './BrokerList';
import BrokerCardInfoSection from '../BrokerCardInfoSection';
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
    error,
  } = useQuery({
    queryKey: ['brokers', brokerName],
    queryFn: () => fetchBrokers(brokerName),
    enabled: brokerName.length > 0 && !selectedBroker,
  });

  return (
    <Card sx={{ width: 820 }}>
      <CardHeader
        title="Manage Broker"
        titleTypographyProps={cardTitleTypographyStyleProps}
        subheader="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        subheaderTypographyProps={cardSubheaderTypographyStyleProps}
      />
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <SearchBrokerInput
          inputRef={inputRef}
          onChange={(e) => {
            if (selectedBroker) {
              setSelectedBroker(null);
            }
            debouncedSetQuery(e.target.value);
            setPopperOpen(e.target.value.length > 0);
            setAnchorEl(inputRef.current);
          }}
        />
        <Popper
          open={popperOpen && !selectedBroker}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={popperStyleProps}
        >
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '8px',
              width: '100%',
            }}
          >
            <BrokerList
              brokers={brokers}
              isLoading={isLoading}
              error={error}
              setSelectedBroker={setSelectedBroker}
            />
            <Button onClick={() => {}}>Add broker manually</Button>
          </div>
        </Popper>
        {selectedBroker && (
          <>
            <BrokerCardInfoSection
              brokerInfoTitle="Address"
              brokerInfoText={`${selectedBroker.address}, ${selectedBroker.postalCode}`}
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

const popperStyleProps = {
  width: '769px',
  borderRadius: '4px',
  paddingTop: '8px',
  boxShadow: '0px 8px 10px 1px #00000024, 0px 5px 5px -3px #00000033',
};

export default ManageBrokerCard;
