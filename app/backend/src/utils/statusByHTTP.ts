type CodesHTTPObject = { statusName: string; statusNumber: number };
type CodesHTTP = CodesHTTPObject[];

const codesHTTP: CodesHTTP = [
  { statusName: 'SUCCESSFULL', statusNumber: 200 },
  { statusName: 'CREATED', statusNumber: 201 },
  { statusName: 'NO_CONTENT', statusNumber: 204 },
  { statusName: 'BAD_REQUEST', statusNumber: 400 },
  { statusName: 'UNAUTHORIZED', statusNumber: 401 },
  { statusName: 'NOT_FOUND', statusNumber: 404 },
  { statusName: 'CONFLICT', statusNumber: 409 },
  { statusName: 'UNPROCESSABLE', statusNumber: 422 },
];

export const mapStatus = (status: string): number =>
  codesHTTP.find(({ statusName }) => statusName === status)?.statusNumber || 500;

export default {
  mapStatus,
};
