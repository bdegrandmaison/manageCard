import { http, delay, HttpResponse } from 'msw';
import { brokers } from './brokers';
import { Broker, NewBrokerInfo } from '../types';

type BrokerQueryParams = {
  q: string;
};

type BrokerResponseBody = Broker[];

type AddBrokerRequestBody = NewBrokerInfo;
type AddBrokerResponseBody = Broker;

const createRegex = (query: string) => {
  const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  return new RegExp(escapedQuery.split('').join(''), 'i');
};

export const handlers = [
  http.get<BrokerQueryParams, BrokerResponseBody>(
    '/api/brokers',
    async ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get('q') || '';

      if (!query) {
        return HttpResponse.json([]);
      }

      const regex = createRegex(query);
      const filteredBrokers = brokers
        .filter((broker) => regex.test(broker.name))
        .slice(0, 5);

      await delay();

      return HttpResponse.json(filteredBrokers);
    }
  ),
  http.post<AddBrokerRequestBody, AddBrokerResponseBody>(
    '/api/brokers',
    async ({ request }) => {
      const body: AddBrokerRequestBody = await request.json();
      const newBrokerInfo: Broker = {
        id: brokers.length + 1,
        ...body,
      };
      brokers.push(newBrokerInfo);
      return HttpResponse.json(newBrokerInfo);
    }
  ),
];
