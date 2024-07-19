export type Broker = {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
};

export type NewBrokerInfo = Omit<Broker, 'id'>;
