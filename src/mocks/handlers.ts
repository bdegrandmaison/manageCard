import { http, delay, HttpResponse } from 'msw';
import { brokers } from './brokers';

type BrokerQueryParams = {
  q: string;
};

type BrokerResponseBody = {
  id: number;
  name: string;
  address: string;
  country: string;
}[];

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
      const filteredBrokers = brokers.filter((broker) =>
        regex.test(broker.name)
      );

      await delay();

      return HttpResponse.json(filteredBrokers);
    }
  ),
];
