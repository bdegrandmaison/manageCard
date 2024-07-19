import {
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import { Broker } from '../../types';

interface BrokerListProps {
  brokers: Broker[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  setSelectedBroker: React.Dispatch<React.SetStateAction<Broker | null>>;
}

const BrokerList = ({
  brokers,
  isLoading,
  isFetching,
  error,
  setSelectedBroker,
}: BrokerListProps) => (
  <div>
    {isLoading && <CircularProgress size={20} />}
    {error && <Typography color="error">Error: {error.message}</Typography>}
    {!isLoading && !isFetching && !error && brokers.length === 0 && (
      <StyledListItem>
        <ListItemText secondary="No broker found" />
      </StyledListItem>
    )}
    {!isLoading && !error && brokers.length > 0 && (
      <List>
        {brokers.map((broker) => {
          const brokerInfo = `${broker.name}, ${broker.address}, ${broker.city}, ${broker.country}`;
          return (
            <div key={broker.id} onClick={() => setSelectedBroker(broker)}>
              <StyledListItem>
                <ListItemText
                  secondary={brokerInfo}
                  secondaryTypographyProps={ListSecondaryTypographyStyleProps}
                />
              </StyledListItem>
              <Divider sx={{ width: '100%' }} />
            </div>
          );
        })}
      </List>
    )}
  </div>
);

const StyledListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 16px',
  '& .MuiListItemText-secondary': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
});

const ListSecondaryTypographyStyleProps = {
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.15000000596046448px',
  color: '#000000DE',
};

export default BrokerList;
