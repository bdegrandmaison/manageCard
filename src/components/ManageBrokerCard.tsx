import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';

const titleTypographyStyleProps = {
  fontSize: '24px',
  lineHeight: '32.02px',
};

const subheaderTypographyStyleProps = {
  fontSize: '14px',
  lineHeight: '20.02px',
  letterSpacing: '0.17000000178813934px',
};

const ManageBrokerCard = () => {
  return (
    <Card sx={{ width: 820 }}>
      <CardHeader
        title="Manage Broker"
        titleTypographyProps={titleTypographyStyleProps}
        subheader="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        subheaderTypographyProps={subheaderTypographyStyleProps}
      />
      <CardContent></CardContent>
    </Card>
  );
};
export default ManageBrokerCard;
