import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';

import { Broker } from '../../types';

interface BrokerListProps {
  brokers: Broker[];
  isLoading: boolean;
  error: Error | null;
  setSelectedBroker: React.Dispatch<React.SetStateAction<Broker | null>>;
}

const BrokerList = ({
  brokers,
  isLoading,
  error,
  setSelectedBroker,
}: BrokerListProps) => (
  <div>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    <List>
      {brokers.length === 0 && !isLoading && (
        <StyledListItem>
          <ListItemText secondary="No broker found" />
        </StyledListItem>
      )}
      {brokers.map((broker) => {
        const brokerInfo = `${broker.name}, ${broker.address}, ${broker.postalCode}, ${broker.country}`;
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
