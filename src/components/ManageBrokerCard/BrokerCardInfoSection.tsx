import Box from '@mui/system/Box';
import { Typography } from '@mui/material';

type BrokerCardInfoSectionProps = {
  brokerInfoTitle: string;
  brokerInfoText: string;
};

const BrokerCardInfoSection = ({
  brokerInfoTitle,
  brokerInfoText,
}: BrokerCardInfoSectionProps) => {
  return (
    <Box sx={boxSectionStyleProps}>
      <Typography
        typography={brokerInfoHeaderTypographyStyleProps}
        color="#757575"
      >
        {brokerInfoTitle}
      </Typography>
      <Typography typography={brokerInfoTypographyStyleProps}>
        {brokerInfoText}
      </Typography>
    </Box>
  );
};

const boxSectionStyleProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const brokerInfoHeaderTypographyStyleProps = {
  fontFamily: 'Montserrat',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '14.63px',
};

const brokerInfoTypographyStyleProps = {
  fontFamily: 'Montserrat',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '17.07px',
};

export default BrokerCardInfoSection;
