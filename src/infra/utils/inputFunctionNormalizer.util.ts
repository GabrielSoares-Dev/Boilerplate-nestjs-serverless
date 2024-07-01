import { SQSEvent } from 'aws-lambda';

export const inputSQSNormalizer = <T>(event: SQSEvent): T => {
  const firstRecordIndex = 0;
  const message = event.Records[firstRecordIndex];

  return JSON.parse(message.body);
};
